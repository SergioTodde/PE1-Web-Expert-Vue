<template>
  <div class="event-detail-view">
    <div class="container">
      <LoadingSpinner v-if="loading" />

      <div v-else-if="event" class="event-detail">
        <!-- Navigation -->
        <div class="breadcrumb">
          <router-link to="/events">Evenementen</router-link>
          <i class="fas fa-chevron-right"></i>
          <span>{{ event.title }}</span>
        </div>

        <!-- Event Navbar -->
        <div class="event-header">
          <div class="event-gallery">
            <img :src="event.image_url" :alt="event.title" class="main-image">
            <div class="image-thumbnails" v-if="event.images && event.images.length > 1">
              <img
                  v-for="(image, index) in event.images"
                  :key="index"
                  :src="image.url"
                  :alt="`${event.title} ${index + 1}`"
                  @click="setMainImage(image.url)"
                  :class="{ active: image.url === event.image_url }"
              >
            </div>
          </div>

          <div class="event-info">
            <div class="event-meta">
              <span class="event-category">{{ event.category }}</span>
              <span class="event-date">{{ formatDate(event.start_date) }}</span>
            </div>

            <h1 class="event-title">{{ event.title }}</h1>
            <p class="event-organizer">
              Georganiseerd door <strong>{{ event.organizer?.name }}</strong>
              <span v-if="event.co_hosts?.length">
                met {{ event.co_hosts.map(h => h.name).join(', ') }}
              </span>
            </p>

            <div class="event-actions">
              <button
                  @click="toggleFavorite"
                  class="btn btn-outline"
                  :class="{ active: event.is_favorite }"
              >
                <i class="fas fa-heart"></i>
                {{ event.is_favorite ? 'Favoriet' : 'Toevoegen aan favorieten' }}
              </button>

              <button class="btn btn-outline" @click="shareEvent">
                <i class="fas fa-share-alt"></i>
                Delen
              </button>

              <button
                  v-if="canEditEvent"
                  @click="editEvent"
                  class="btn btn-outline"
              >
                <i class="fas fa-edit"></i>
                Bewerken
              </button>
            </div>

            <!-- Quick Info -->
            <div class="quick-info">
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Locatie</strong>
                  <p>{{ event.location }}</p>
                </div>
              </div>
              <div class="info-item">
                <i class="fas fa-clock"></i>
                <div>
                  <strong>Datum & Tijd</strong>
                  <p>{{ formatDateTime(event.start_date, event.end_date) }}</p>
                </div>
              </div>
              <div class="info-item">
                <i class="fas fa-users"></i>
                <div>
                  <strong>Beschikbaarheid</strong>
                  <p>{{ event.available_tickets }} van {{ event.total_tickets }} tickets over</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="event-content">
          <div class="content-main">
            <!-- Description -->
            <section class="description-section">
              <h2>Over dit evenement</h2>
              <div class="description-content" v-html="event.description"></div>
            </section>

            <!-- Schedule -->
            <section v-if="event.schedule" class="schedule-section">
              <h2>Programma</h2>
              <div class="schedule-list">
                <div
                    v-for="item in event.schedule"
                    :key="item.time"
                    class="schedule-item"
                >
                  <div class="schedule-time">{{ item.time }}</div>
                  <div class="schedule-content">
                    <h4>{{ item.title }}</h4>
                    <p v-if="item.description">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Location Details -->
            <section class="location-section">
              <h2>Locatie Details</h2>
              <div class="location-info">
                <p><strong>Adres:</strong> {{ event.full_address }}</p>
                <p v-if="event.venue_info"><strong>Locatie:</strong> {{ event.venue_info }}</p>
                <p v-if="event.transportation"><strong>Bereikbaarheid:</strong> {{ event.transportation }}</p>
                <p v-if="event.parking"><strong>Parkeren:</strong> {{ event.parking }}</p>
              </div>
              <div class="location-map">
                <!-- Map placeholder -->
                <div class="map-placeholder">
                  <i class="fas fa-map"></i>
                  <p>Kaart weergave</p>
                </div>
              </div>
            </section>
          </div>

          <div class="content-sidebar">
            <!-- Ticket Booking -->
            <div class="booking-widget">
              <h3>Tickets</h3>

              <div v-if="canBookTickets" class="ticket-options">
                <div
                    v-for="ticket in event.tickets"
                    :key="ticket.id"
                    class="ticket-option"
                    :class="{ selected: selectedTicket?.id === ticket.id }"
                    @click="selectTicket(ticket)"
                >
                  <div class="ticket-info">
                    <h4>{{ ticket.name }}</h4>
                    <p>{{ ticket.description }}</p>
                    <div class="ticket-price">€{{ ticket.price }}</div>
                  </div>
                  <div class="ticket-availability">
                    {{ ticket.available }} beschikbaar
                  </div>
                </div>

                <div v-if="selectedTicket" class="booking-form">
                  <div class="quantity-selector">
                    <label>Aantal:</label>
                    <div class="quantity-controls">
                      <button @click="decreaseQuantity">-</button>
                      <span>{{ quantity }}</span>
                      <button @click="increaseQuantity">+</button>
                    </div>
                  </div>

                  <div class="booking-summary">
                    <div class="summary-row">
                      <span>Tickets ({{ quantity }}x)</span>
                      <span>€{{ (selectedTicket.price * quantity).toFixed(2) }}</span>
                    </div>
                    <div class="summary-row">
                      <span>Servicekosten</span>
                      <span>€{{ (selectedTicket.price * quantity * 0.1).toFixed(2) }}</span>
                    </div>
                    <div class="summary-row total">
                      <strong>Totaal</strong>
                      <strong>€{{ calculateTotal().toFixed(2) }}</strong>
                    </div>
                  </div>

                  <button
                      @click="startBooking"
                      class="btn btn-primary btn-block"
                      :disabled="!canBook"
                  >
                    Doorgaan naar Betaling
                  </button>
                </div>
              </div>

              <div v-else class="booking-disabled">
                <p v-if="isSaleFuture">
                  Ticketverkoop start op {{ formatDate(event.ticket_sale_start) }}
                </p>
                <p v-else-if="isSoldOut">
                  Uitverkocht
                </p>
                <p v-else>
                  Tickets zijn momenteel niet beschikbaar
                </p>
              </div>
            </div>

            <!-- Event Stats -->
            <div class="event-stats">
              <h4>Evenement Statistieken</h4>
              <div class="stats-list">
                <div class="stat">
                  <span>Weergaven</span>
                  <strong>{{ event.views || 0 }}</strong>
                </div>
                <div class="stat">
                  <span>Favorieten</span>
                  <strong>{{ event.favorite_count || 0 }}</strong>
                </div>
                <div class="stat">
                  <span>Tickets verkocht</span>
                  <strong>{{ event.tickets_sold || 0 }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Similar Events -->
      <section v-if="similarEvents.length > 0" class="similar-events">
        <h2>Vergelijkbare Evenementen</h2>
        <div class="similar-events-grid">
          <EventCard
              v-for="similarEvent in similarEvents"
              :key="similarEvent.id"
              :event="similarEvent"
          />
        </div>
      </section>
    </div>

    <!-- Payment Modal -->
    <PaymentSimulation
        v-if="showPaymentModal"
        :booking-details="bookingDetails"
        @success="handlePaymentSuccess"
        @cancel="showPaymentModal = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import EventCard from '@/components/events/EventCard.vue'
import PaymentSimulation from '@/components/tickets/PaymentSimulation.vue'

export default {
  name: 'EventDetailView',
  components: {
    LoadingSpinner,
    EventCard,
    PaymentSimulation
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      loading: false,
      selectedTicket: null,
      quantity: 1,
      showPaymentModal: false,
      bookingDetails: null,
      similarEvents: []
    }
  },
  computed: {
    ...mapGetters('events', ['currentEvent']),
    ...mapGetters('auth', ['currentUser', 'isAdmin']),

    event() {
      return this.currentEvent
    },

    canEditEvent() {
      if (!this.currentUser) return false
      return this.isAdmin || this.event.organizer_id === this.currentUser.id
    },

    canBookTickets() {
      if (!this.event.tickets || this.event.tickets.length === 0) return false
      if (this.isSoldOut) return false

      const now = new Date()
      const saleStart = new Date(this.event.ticket_sale_start)
      return now >= saleStart
    },

    isSoldOut() {
      return this.event.available_tickets <= 0
    },

    isSaleFuture() {
      const now = new Date()
      const saleStart = new Date(this.event.ticket_sale_start)
      return now < saleStart
    },

    canBook() {
      return this.selectedTicket && this.quantity > 0 &&
          this.quantity <= this.selectedTicket.available
    }
  },
  async mounted() {
    await this.loadEvent()
    await this.loadSimilarEvents()
  },
  methods: {
    ...mapActions('events', ['fetchEvent', 'toggleFavorite']),
    ...mapActions('tickets', ['createBooking']),

    async loadEvent() {
      this.loading = true
      try {
        await this.fetchEvent(this.id)
      } catch (error) {
        this.$toast.error('Evenement niet gevonden')
        this.$router.push('/events')
      } finally {
        this.loading = false
      }
    },

    async loadSimilarEvents() {
      // Simulate similar events based on category
      if (this.event) {
        // This would be an API call in reality
        this.similarEvents = [
          // Mock similar events
        ]
      }
    },

    async toggleFavorite() {
      try {
        await this.toggleFavorite(this.event.id)
        this.$toast.success(
            this.event.is_favorite ? 'Toegevoegd aan favorieten' : 'Verwijderd uit favorieten'
        )
      } catch (error) {
        this.$toast.error('Fout bij bijwerken favorieten')
      }
    },

    selectTicket(ticket) {
      this.selectedTicket = ticket
      this.quantity = 1
    },

    increaseQuantity() {
      if (this.quantity < this.selectedTicket.available) {
        this.quantity++
      }
    },

    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },

    calculateTotal() {
      const subtotal = this.selectedTicket.price * this.quantity
      const serviceFee = subtotal * 0.1
      return subtotal + serviceFee
    },

    startBooking() {
      this.bookingDetails = {
        event: this.event,
        ticket: this.selectedTicket,
        quantity: this.quantity,
        total: this.calculateTotal()
      }
      this.showPaymentModal = true
    },

    async handlePaymentSuccess(paymentResult) {
      try {
        await this.createBooking({
          event_id: this.event.id,
          ticket_id: this.selectedTicket.id,
          quantity: this.quantity,
          payment_reference: paymentResult.reference
        })

        this.$toast.success('Ticket succesvol geboekt!')
        this.showPaymentModal = false
        this.$router.push('/profile/tickets')
      } catch (error) {
        this.$toast.error('Fout bij boeken ticket')
      }
    },

    editEvent() {
      this.$router.push(`/events/${this.event.id}/edit`)
    },

    shareEvent() {
      // Implement share functionality
      if (navigator.share) {
        navigator.share({
          title: this.event.title,
          text: this.event.description,
          url: window.location.href
        })
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href)
        this.$toast.success('Link gekopieerd naar klembord')
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('nl-BE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },

    formatDateTime(start, end) {
      const startDate = new Date(start)
      const endDate = new Date(end)

      const timeOptions = { hour: '2-digit', minute: '2-digit' }
      return `${startDate.toLocaleDateString('nl-BE')} ${startDate.toLocaleTimeString('nl-BE', timeOptions)} - ${endDate.toLocaleTimeString('nl-BE', timeOptions)}`
    },

    setMainImage(url) {
      this.event.image_url = url
    }
  }
}
</script>

<style scoped>
.event-detail-view {
  padding: 2rem 0;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: #6c757d;
}

.breadcrumb a {
  color: #007bff;
  text-decoration: none;
}

.event-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.event-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
}

.image-thumbnails {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
}

.image-thumbnails img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
}

.image-thumbnails img.active {
  border-color: #007bff;
}

.event-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.event-category {
  background: #007bff;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.event-date {
  background: #28a745;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.event-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.event-organizer {
  color: #6c757d;
  margin-bottom: 2rem;
}

.event-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.quick-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.info-item i {
  color: #007bff;
  margin-top: 0.25rem;
}

.event-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.content-main section {
  margin-bottom: 3rem;
}

.content-main h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.description-content {
  line-height: 1.8;
  color: #495057;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.schedule-item {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.schedule-time {
  font-weight: 600;
  color: #007bff;
  min-width: 100px;
}

.location-info {
  margin-bottom: 2rem;
}

.location-info p {
  margin-bottom: 0.5rem;
}

.map-placeholder {
  height: 200px;
  background: #e9ecef;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.booking-widget {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
  position: sticky;
  top: 2rem;
}

.booking-widget h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.ticket-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.ticket-option {
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ticket-option:hover,
.ticket-option.selected {
  border-color: #007bff;
  background: #f8f9ff;
}

.ticket-info h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.ticket-info p {
  margin: 0 0 0.5rem 0;
  color: #6c757d;
  font-size: 0.9rem;
}

.ticket-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #28a745;
}

.ticket-availability {
  font-size: 0.8rem;
  color: #6c757d;
  text-align: right;
}

.quantity-selector {
  margin-bottom: 1.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.quantity-controls button {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
}

.quantity-controls span {
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.booking-summary {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.summary-row.total {
  border-top: 1px solid #ddd;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
}

.btn-block {
  width: 100%;
}

.booking-disabled {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.event-stats {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
}

.event-stats h4 {
  margin-bottom: 1rem;
  color: #333;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.similar-events {
  margin-top: 4rem;
}

.similar-events h2 {
  margin-bottom: 2rem;
  text-align: center;
}

.similar-events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .event-header {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .event-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .event-actions {
    flex-direction: column;
  }

  .schedule-item {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>