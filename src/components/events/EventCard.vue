<template>
  <div class="event-card" :class="{ featured: featured, 'has-tickets': hasTickets }">
    <div class="event-image">
      <img :src="event.image_url" :alt="event.title" @error="handleImageError">
      <div class="event-overlay">
        <button
            v-if="$store.getters['auth/isAuthenticated']"
            @click="toggleFavorite"
            class="favorite-btn"
            :class="{ active: event.is_favorite }"
            :aria-label="event.is_favorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'"
        >
          <i class="fas fa-heart"></i>
        </button>
        <div class="event-category">
          {{ event.category }}
        </div>
        <div v-if="isSoldOut" class="sold-out-badge">
          Uitverkocht
        </div>
        <div v-else-if="isUpcoming" class="upcoming-badge">
          Binnenkort
        </div>
      </div>
    </div>

    <div class="event-content">
      <div class="event-header">
        <h3 class="event-title">{{ event.title }}</h3>
        <div class="event-price" v-if="hasTickets && lowestPrice > 0">
          Vanaf €{{ lowestPrice }}
        </div>
        <div class="event-price free" v-else-if="hasTickets && lowestPrice === 0">
          Gratis
        </div>
      </div>

      <p class="event-description">{{ truncatedDescription }}</p>

      <div class="event-meta">
        <div class="meta-item">
          <i class="fas fa-calendar"></i>
          <span>{{ formattedDate }}</span>
        </div>
        <div class="meta-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ event.location }}</span>
        </div>
        <div class="meta-item" v-if="event.available_tickets !== undefined">
          <i class="fas fa-ticket-alt"></i>
          <span>{{ ticketAvailability }}</span>
        </div>
        <div class="meta-item" v-if="event.organizer">
          <i class="fas fa-user"></i>
          <span>Door {{ event.organizer.name }}</span>
        </div>
      </div>

      <div class="event-actions">
        <button @click="viewDetails" class="btn btn-primary">
          <i class="fas fa-eye"></i>
          Bekijk Details
        </button>
        <button
            v-if="canBookTickets"
            @click="bookTickets"
            class="btn btn-secondary"
        >
          <i class="fas fa-ticket-alt"></i>
          Tickets Boeken
        </button>
        <button
            v-else-if="isSaleFuture"
            class="btn btn-outline disabled"
            disabled
        >
          Verkoop start {{ formattedSaleStart }}
        </button>
        <button
            v-else-if="isSoldOut"
            class="btn btn-outline disabled"
            disabled
        >
          Uitverkocht
        </button>
      </div>

      <!-- Co-hosts indicator -->
      <div v-if="event.co_hosts && event.co_hosts.length > 0" class="co-hosts-indicator">
        <div class="co-hosts-avatars">
          <img
              v-for="coHost in event.co_hosts.slice(0, 3)"
              :key="coHost.id"
              :src="coHost.avatar"
              :alt="coHost.name"
              class="co-host-avatar"
          >
          <div v-if="event.co_hosts.length > 3" class="more-co-hosts">
            +{{ event.co_hosts.length - 3 }}
          </div>
        </div>
        <span class="co-hosts-label">Samen met {{ event.co_hosts.map(h => h.name).join(', ') }}</span>
      </div>
    </div>

    <!-- Quick stats -->
    <div class="event-stats" v-if="featured">
      <div class="stat">
        <i class="fas fa-eye"></i>
        <span>{{ event.views || 0 }}</span>
      </div>
      <div class="stat">
        <i class="fas fa-heart"></i>
        <span>{{ event.favorite_count || 0 }}</span>
      </div>
      <div class="stat">
        <i class="fas fa-ticket-alt"></i>
        <span>{{ event.tickets_sold || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.title && value.start_date
      }
    },
    featured: {
      type: Boolean,
      default: false
    },
    showOrganizer: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hasTickets() {
      return this.event.tickets && this.event.tickets.length > 0
    },

    lowestPrice() {
      if (!this.hasTickets) return null
      const prices = this.event.tickets.map(ticket => ticket.price)
      return Math.min(...prices)
    },

    truncatedDescription() {
      const maxLength = 120
      if (!this.event.description) return ''
      if (this.event.description.length <= maxLength) return this.event.description
      return this.event.description.substring(0, maxLength) + '...'
    },

    formattedDate() {
      return new Date(this.event.start_date).toLocaleDateString('nl-BE', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },

    formattedSaleStart() {
      if (!this.event.ticket_sale_start) return ''
      return new Date(this.event.ticket_sale_start).toLocaleDateString('nl-BE', {
        day: 'numeric',
        month: 'short'
      })
    },

    canBookTickets() {
      if (!this.hasTickets || this.isSoldOut) return false

      const now = new Date()
      const saleStart = new Date(this.event.ticket_sale_start)
      return now >= saleStart
    },

    isSoldOut() {
      return this.event.available_tickets <= 0
    },

    isSaleFuture() {
      if (!this.event.ticket_sale_start) return false
      const now = new Date()
      const saleStart = new Date(this.event.ticket_sale_start)
      return now < saleStart
    },

    isUpcoming() {
      const now = new Date()
      const eventDate = new Date(this.event.start_date)
      const daysUntilEvent = (eventDate - now) / (1000 * 60 * 60 * 24)
      return daysUntilEvent <= 7 && daysUntilEvent > 0
    },

    ticketAvailability() {
      if (this.isSoldOut) return 'Uitverkocht'
      if (this.event.available_tickets < 10) return `Nog ${this.event.available_tickets} beschikbaar`
      return `${this.event.available_tickets} beschikbaar`
    }
  },
  methods: {
    toggleFavorite() {
      this.$emit('toggle-favorite', this.event.id)
    },

    viewDetails() {
      this.$emit('view-details', this.event)
      this.$router.push({ name: 'EventDetail', params: { id: this.event.id } })
    },

    bookTickets() {
      this.$emit('book-tickets', this.event)
      this.$router.push({
        name: 'EventDetail',
        params: { id: this.event.id },
        query: { book: 'true' }
      })
    },

    handleImageError(event) {
      event.target.src = '/images/event-placeholder.jpg'
    }
  }
}
</script>

<style scoped>
.event-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  position: relative;
  height: fit-content;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.event-card.featured {
  border: 2px solid #ff6b6b;
  box-shadow: 0 4px 20px rgba(255, 107, 107, 0.2);
}

.event-card.featured:hover {
  box-shadow: 0 8px 30px rgba(255, 107, 107, 0.3);
}

.event-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.event-card:hover .event-image img {
  transform: scale(1.05);
}

.event-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.4));
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
}

.favorite-btn {
  background: rgba(255, 255, 255, 0.95);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6c757d;
  backdrop-filter: blur(10px);
}

.favorite-btn:hover,
.favorite-btn.active {
  background: #ff6b6b;
  color: white;
  transform: scale(1.1);
}

.event-category {
  background: rgba(0, 123, 255, 0.95);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.sold-out-badge,
.upcoming-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(10px);
}

.sold-out-badge {
  background: rgba(220, 53, 69, 0.95);
}

.upcoming-badge {
  background: rgba(40, 167, 69, 0.95);
}

.event-content {
  padding: 1.5rem;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.event-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
  line-height: 1.3;
  flex: 1;
}

.event-price {
  background: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
}

.event-price.free {
  background: #6c757d;
}

.event-description {
  color: #4a5568;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #718096;
  font-size: 0.9rem;
}

.meta-item i {
  width: 16px;
  color: #007bff;
  text-align: center;
}

.event-actions {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
  font-size: 0.9rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #28a745;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #1e7e34;
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  border: 2px solid #e9ecef;
  color: #6c757d;
}

.btn-outline.disabled {
  background: #f8f9fa;
  border-color: #e9ecef;
  color: #6c757d;
}

.co-hosts-indicator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 1rem;
}

.co-hosts-avatars {
  display: flex;
  align-items: center;
}

.co-host-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid white;
  margin-left: -8px;
  object-fit: cover;
}

.co-host-avatar:first-child {
  margin-left: 0;
}

.more-co-hosts {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
  margin-left: -8px;
  border: 2px solid white;
}

.co-hosts-label {
  font-size: 0.8rem;
  color: #6c757d;
  flex: 1;
}

.event-stats {
  display: flex;
  justify-content: space-around;
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.8rem;
}

.stat i {
  color: #007bff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .event-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .event-actions {
    flex-direction: column;
  }

  .event-meta {
    gap: 0.5rem;
  }

  .meta-item {
    font-size: 0.8rem;
  }

  .co-hosts-indicator {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .event-stats {
    padding: 0.75rem 1rem;
  }

  .stat {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }
}

/* Animation for favorite button */
.favorite-btn {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 107, 107, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0);
  }
}

.favorite-btn.active {
  animation: none;
}
</style>