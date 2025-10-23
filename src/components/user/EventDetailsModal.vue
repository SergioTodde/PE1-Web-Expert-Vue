<template>
  <Modal
      :title="event.title"
      size="lg"
      @close="$emit('close')"
      class="event-details-modal"
  >
    <div class="event-details">
      <!-- Event Header -->
      <div class="event-header">
        <div class="event-image">
          <img :src="event.imageUrl" :alt="event.title" @error="handleImageError">
          <div class="event-badges">
            <span v-if="event.isNew" class="badge new">Nieuw</span>
            <span v-if="event.isPopular" class="badge popular">Populair</span>
            <span v-if="event.ticketsLeft < 10" class="badge limited">Bijna vol</span>
            <span v-if="event.isSoldOut" class="badge sold-out">Uitverkocht</span>
          </div>
        </div>

        <div class="event-basic-info">
          <h1 class="event-title">{{ event.title }}</h1>
          <div class="event-meta">
            <div class="meta-item">
              <i class="fas fa-calendar-alt"></i>
              <span>{{ formatDate(event.date) }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-clock"></i>
              <span>{{ event.time }} ({{ event.duration }})</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ event.location }}</span>
            </div>
            <div class="meta-item" v-if="event.organizer">
              <i class="fas fa-user"></i>
              <span>Georganiseerd door {{ event.organizer }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Content -->
      <div class="event-content">
        <div class="content-grid">
          <!-- Main Content -->
          <div class="main-content">
            <!-- Description -->
            <section class="description-section">
              <h3>Beschrijving</h3>
              <div class="description-content">
                <p>{{ event.description }}</p>
              </div>
            </section>

            <!-- Additional Info -->
            <section v-if="event.additionalInfo" class="info-section">
              <h3>Extra Informatie</h3>
              <div class="info-content">
                <p>{{ event.additionalInfo }}</p>
              </div>
            </section>

            <!-- Requirements -->
            <section v-if="event.requirements && event.requirements.length > 0" class="requirements-section">
              <h3>Wat mee te nemen</h3>
              <ul class="requirements-list">
                <li v-for="requirement in event.requirements" :key="requirement">
                  <i class="fas fa-check"></i>
                  {{ requirement }}
                </li>
              </ul>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="sidebar">
            <!-- Ticket Info -->
            <div class="ticket-card">
              <h4>Tickets</h4>
              <div class="price-section">
                <span class="current-price">€{{ event.price }}</span>
                <span v-if="event.originalPrice" class="original-price">€{{ event.originalPrice }}</span>
              </div>

              <div class="ticket-availability">
                <div class="availability-info">
                  <i class="fas fa-ticket-alt"></i>
                  <span v-if="event.ticketsLeft > 0">
                    {{ event.ticketsLeft }} tickets beschikbaar
                  </span>
                  <span v-else class="sold-out-text">
                    Uitverkocht
                  </span>
                </div>

                <div v-if="event.maxTicketsPerPerson" class="ticket-limit">
                  Max. {{ event.maxTicketsPerPerson }} tickets per persoon
                </div>
              </div>

              <!-- Booking Form -->
              <div v-if="!event.isSoldOut && event.ticketsLeft > 0" class="booking-form">
                <div class="quantity-selector">
                  <label for="ticketQuantity">Aantal tickets:</label>
                  <select
                      id="ticketQuantity"
                      v-model="selectedQuantity"
                      :max="Math.min(event.maxTicketsPerPerson || 10, event.ticketsLeft)"
                  >
                    <option
                        v-for="n in Math.min(event.maxTicketsPerPerson || 10, event.ticketsLeft)"
                        :key="n"
                        :value="n"
                    >
                      {{ n }} ticket(s)
                    </option>
                  </select>
                </div>

                <div class="total-price">
                  <strong>Totaal: €{{ totalPrice }}</strong>
                </div>

                <button
                    @click="handleBook"
                    class="btn btn-primary book-btn"
                    :disabled="bookingInProgress"
                >
                  <i class="fas fa-shopping-cart"></i>
                  {{ bookingInProgress ? 'Bezig...' : 'Boek Nu' }}
                </button>
              </div>

              <div v-else class="sold-out-message">
                <p>Dit evenement is helaas uitverkocht.</p>
                <button class="btn btn-outline" @click="$emit('close')">
                  Andere evenementen bekijken
                </button>
              </div>
            </div>

            <!-- Event Stats -->
            <div class="stats-card">
              <h4>Evenement Details</h4>
              <div class="stats-list">
                <div class="stat-item">
                  <i class="fas fa-users"></i>
                  <span>{{ event.attendees || 0 }} deelnemers</span>
                </div>
                <div class="stat-item">
                  <i class="fas fa-star"></i>
                  <span>{{ event.rating || 'Nog geen reviews' }}</span>
                </div>
                <div class="stat-item">
                  <i class="fas fa-tag"></i>
                  <span>{{ event.category }}</span>
                </div>
                <div v-if="event.ageRestriction" class="stat-item">
                  <i class="fas fa-exclamation-triangle"></i>
                  <span>Leeftijd: {{ event.ageRestriction }}+</span>
                </div>
              </div>
            </div>

            <!-- Share Options -->
            <div class="share-card">
              <h4>Delen</h4>
              <div class="share-buttons">
                <button class="share-btn facebook" @click="shareOnFacebook">
                  <i class="fab fa-facebook-f"></i>
                </button>
                <button class="share-btn twitter" @click="shareOnTwitter">
                  <i class="fab fa-twitter"></i>
                </button>
                <button class="share-btn whatsapp" @click="shareOnWhatsApp">
                  <i class="fab fa-whatsapp"></i>
                </button>
                <button class="share-btn link" @click="copyLink">
                  <i class="fas fa-link"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="modal-footer-actions">
        <button
            @click="toggleFavorite"
            class="btn btn-outline"
            :class="{ 'favorited': event.isFavorite }"
        >
          <i class="fas fa-heart"></i>
          {{ event.isFavorite ? 'Verwijder uit favorieten' : 'Toevoegen aan favorieten' }}
        </button>
        <button @click="$emit('close')" class="btn btn-secondary">
          Sluiten
        </button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/shared/Modal.vue'

export default {
  name: 'EventDetailsModal',
  components: {
    Modal
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedQuantity: 1,
      bookingInProgress: false
    }
  },
  computed: {
    totalPrice() {
      return (this.event.price * this.selectedQuantity).toFixed(2)
    }
  },
  methods: {
    async handleBook() {
      this.bookingInProgress = true
      try {
        this.$emit('book', {
          event: this.event,
          quantity: this.selectedQuantity
        })
      } catch (error) {
        console.error('Booking error:', error)
        this.$toast.error('Kon niet boeken. Probeer het opnieuw.')
      } finally {
        this.bookingInProgress = false
      }
    },

    async toggleFavorite() {
      try {
        if (this.event.isFavorite) {
          await this.$api.delete(`/user/favorites/${this.event.id}`)
          this.$toast.success('Verwijderd uit favorieten')
        } else {
          await this.$api.post(`/user/favorites/${this.event.id}`)
          this.$toast.success('Toegevoegd aan favorieten')
        }

        // Emit event to parent to update favorite status
        this.$emit('favoriteToggled', this.event.id)
      } catch (error) {
        this.$toast.error('Kon favoriet niet bijwerken')
      }
    },

    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent(`Bekijk dit evenement: ${this.event.title}`)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank')
    },

    shareOnTwitter() {
      const text = encodeURIComponent(`Bekijk dit evenement: ${this.event.title}`)
      const url = encodeURIComponent(window.location.href)
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
    },

    shareOnWhatsApp() {
      const text = encodeURIComponent(`Bekijk dit evenement: ${this.event.title} - ${window.location.href}`)
      window.open(`https://wa.me/?text=${text}`, '_blank')
    },

    async copyLink() {
      try {
        await navigator.clipboard.writeText(window.location.href)
        this.$toast.success('Link gekopieerd naar klembord')
      } catch (error) {
        this.$toast.error('Kon link niet kopiëren')
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('nl-NL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },

    handleImageError(event) {
      event.target.src = '/images/event-placeholder.jpg'
    }
  }
}
</script>

<style scoped>
.event-details-modal {
  max-height: 90vh;
}

.event-details {
  max-height: calc(90vh - 140px);
  overflow-y: auto;
}

.event-header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.event-image {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 200px;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  color: white;
}

.badge.new { background: #e74c3c; }
.badge.popular { background: #9b59b6; }
.badge.limited { background: #e67e22; }
.badge.sold-out { background: #7f8c8d; }

.event-basic-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.event-title {
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 28px;
  line-height: 1.2;
}

.event-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #7f8c8d;
  font-size: 14px;
}

.meta-item i {
  width: 16px;
  color: #3498db;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.main-content h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 20px;
  border-bottom: 2px solid #f8f9fa;
  padding-bottom: 8px;
}

.description-content p {
  line-height: 1.6;
  color: #5d6d7e;
  margin: 0;
}

.requirements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.requirements-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  color: #5d6d7e;
}

.requirements-list li i {
  color: #27ae60;
  font-size: 12px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ticket-card,
.stats-card,
.share-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
}

.ticket-card h4,
.stats-card h4,
.share-card h4 {
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 18px;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.current-price {
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
}

.original-price {
  font-size: 16px;
  color: #95a5a6;
  text-decoration: line-through;
}

.ticket-availability {
  margin-bottom: 20px;
}

.availability-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: #27ae60;
  font-weight: 500;
}

.sold-out-text {
  color: #e74c3c;
  font-weight: 500;
}

.ticket-limit {
  font-size: 12px;
  color: #7f8c8d;
  font-style: italic;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.quantity-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quantity-selector label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.quantity-selector select {
  padding: 10px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  background: white;
}

.total-price {
  text-align: center;
  padding: 10px;
  background: white;
  border-radius: 6px;
  border: 2px solid #e9ecef;
  font-size: 16px;
}

.book-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
}

.sold-out-message {
  text-align: center;
  padding: 20px 0;
}

.sold-out-message p {
  margin: 0 0 15px 0;
  color: #e74c3c;
  font-weight: 500;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #5d6d7e;
  font-size: 14px;
}

.stat-item i {
  width: 16px;
  color: #3498db;
}

.share-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-btn:hover {
  transform: translateY(-2px);
}

.share-btn.facebook { background: #3b5998; }
.share-btn.twitter { background: #1da1f2; }
.share-btn.whatsapp { background: #25d366; }
.share-btn.link { background: #6c757d; }

.modal-footer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
  border-color: #2980b9;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border-color: #6c757d;
}

.btn-secondary:hover:not(:disabled) {
  background: #5a6268;
  border-color: #5a6268;
}

.btn-outline {
  background: transparent;
  border-color: #3498db;
  color: #3498db;
}

.btn-outline:hover:not(:disabled) {
  background: #3498db;
  color: white;
}

.btn-outline.favorited {
  background: #e74c3c;
  border-color: #e74c3c;
  color: white;
}

.btn-outline.favorited:hover {
  background: #c0392b;
  border-color: #c0392b;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .sidebar {
    order: -1;
  }
}

@media (max-width: 768px) {
  .event-header {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .event-image {
    height: 200px;
  }

  .modal-footer-actions {
    flex-direction: column;
    gap: 10px;
  }

  .modal-footer-actions .btn {
    width: 100%;
    justify-content: center;
  }

  .share-buttons {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .event-title {
    font-size: 24px;
  }

  .ticket-card,
  .stats-card,
  .share-card {
    padding: 20px;
  }

  .current-price {
    font-size: 24px;
  }
}
</style>