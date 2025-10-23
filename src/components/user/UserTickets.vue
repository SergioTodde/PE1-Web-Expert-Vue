<template>
  <div class="user-tickets">
    <div class="tickets-header">
      <h2>Mijn Tickets</h2>
      <div class="tabs">
        <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="['tab-btn', { active: activeTab === tab.key }]"
        >
          {{ tab.label }}
          <span class="tab-count">{{ getTabCount(tab.key) }}</span>
        </button>
      </div>
    </div>

    <div class="tickets-content">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Tickets laden...</p>
      </div>

      <div v-else-if="filteredTickets.length === 0" class="empty-state">
        <i class="fas fa-ticket-alt"></i>
        <h3>Geen tickets gevonden</h3>
        <p v-if="activeTab === 'upcoming'">
          Je hebt geen aankomende evenementen.
          <router-link to="/events" class="link">Bekijk evenementen</router-link>
        </p>
        <p v-else-if="activeTab === 'past'">
          Je hebt nog geen evenementen bijgewoond.
        </p>
        <p v-else>
          Je hebt geen geannuleerde tickets.
        </p>
      </div>

      <div v-else class="tickets-list">
        <div
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="ticket-card"
            :class="getTicketStatusClass(ticket)"
        >
          <div class="ticket-header">
            <div class="ticket-info">
              <h3 class="event-title">{{ ticket.eventName }}</h3>
              <p class="event-date">
                <i class="fas fa-calendar-alt"></i>
                {{ formatDate(ticket.eventDate) }}
              </p>
              <p class="event-location">
                <i class="fas fa-map-marker-alt"></i>
                {{ ticket.eventLocation }}
              </p>
            </div>
            <div class="ticket-status">
              <span class="status-badge" :class="ticket.status">
                {{ getStatusText(ticket.status) }}
              </span>
              <div class="ticket-id">
                #{{ ticket.ticketNumber }}
              </div>
            </div>
          </div>

          <div class="ticket-details">
            <div class="detail-item">
              <label>Aankoopdatum:</label>
              <span>{{ formatDate(ticket.purchaseDate) }}</span>
            </div>
            <div class="detail-item">
              <label>Type:</label>
              <span>{{ ticket.ticketType }}</span>
            </div>
            <div class="detail-item">
              <label>Prijs:</label>
              <span>€{{ ticket.price }}</span>
            </div>
            <div v-if="ticket.seatInfo" class="detail-item">
              <label>Stoel:</label>
              <span>{{ ticket.seatInfo }}</span>
            </div>
          </div>

          <div class="ticket-actions">
            <button
                v-if="ticket.status === 'active' && isUpcoming(ticket.eventDate)"
                @click="viewTicket(ticket.id)"
                class="btn btn-primary"
            >
              <i class="fas fa-eye"></i>
              Bekijk Ticket
            </button>

            <button
                v-if="ticket.status === 'active' && isUpcoming(ticket.eventDate)"
                @click="downloadTicket(ticket.id)"
                class="btn btn-secondary"
            >
              <i class="fas fa-download"></i>
              Download
            </button>

            <button
                v-if="ticket.status === 'active' && canCancel(ticket)"
                @click="cancelTicket(ticket.id)"
                class="btn btn-danger"
            >
              <i class="fas fa-times"></i>
              Annuleren
            </button>

            <button
                v-if="ticket.status === 'cancelled'"
                @click="viewCancellationDetails(ticket)"
                class="btn btn-outline"
            >
              <i class="fas fa-info-circle"></i>
              Details
            </button>

            <router-link
                :to="`/events/${ticket.eventId}`"
                class="btn btn-outline"
            >
              <i class="fas fa-calendar"></i>
              Evenement
            </router-link>
          </div>

          <!-- QR Code voor actieve tickets -->
          <div v-if="ticket.status === 'active' && ticket.showQrCode" class="ticket-qr">
            <div class="qr-code">
              <img :src="ticket.qrCodeUrl" alt="QR Code" />
            </div>
            <p class="qr-note">Toon deze QR-code bij binnenkomst</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Ticket Detail Modal -->
    <TicketDetailModal
        v-if="selectedTicket"
        :ticket="selectedTicket"
        @close="selectedTicket = null"
        @download="downloadTicket"
    />

    <!-- Cancellation Modal -->
    <CancellationModal
        v-if="ticketToCancel"
        :ticket="ticketToCancel"
        @confirm="confirmCancellation"
        @close="ticketToCancel = null"
    />
  </div>
</template>

<script>
import TicketDetailModal from './TicketDetailModal.vue'
import CancellationModal from './CancellationModal.vue'

export default {
  name: 'UserTickets',
  components: {
    TicketDetailModal,
    CancellationModal
  },
  data() {
    return {
      tickets: [],
      loading: false,
      activeTab: 'upcoming',
      selectedTicket: null,
      ticketToCancel: null,
      tabs: [
        { key: 'upcoming', label: 'Aankomend' },
        { key: 'past', label: 'Voltooid' },
        { key: 'cancelled', label: 'Geannuleerd' }
      ]
    }
  },
  computed: {
    filteredTickets() {
      const now = new Date()

      switch (this.activeTab) {
        case 'upcoming':
          return this.tickets.filter(ticket =>
              ticket.status === 'active' && new Date(ticket.eventDate) > now
          )
        case 'past':
          return this.tickets.filter(ticket =>
              ticket.status === 'used' ||
              (ticket.status === 'active' && new Date(ticket.eventDate) <= now)
          )
        case 'cancelled':
          return this.tickets.filter(ticket => ticket.status === 'cancelled')
        default:
          return this.tickets
      }
    }
  },
  async mounted() {
    await this.loadTickets()
  },
  methods: {
    async loadTickets() {
      this.loading = true
      try {
        const response = await this.$api.get('/user/tickets')
        this.tickets = response.data
      } catch (error) {
        console.error('Fout bij laden tickets:', error)
        this.$toast.error('Kon tickets niet laden')
      } finally {
        this.loading = false
      }
    },

    getTabCount(tabKey) {
      return this.filteredTickets.length
    },

    getTicketStatusClass(ticket) {
      const now = new Date()
      const eventDate = new Date(ticket.eventDate)

      if (ticket.status === 'cancelled') return 'cancelled'
      if (ticket.status === 'used') return 'used'
      if (eventDate < now) return 'past'
      return 'upcoming'
    },

    getStatusText(status) {
      const statusMap = {
        'active': 'Actief',
        'used': 'Gebruikt',
        'cancelled': 'Geannuleerd'
      }
      return statusMap[status] || status
    },

    isUpcoming(eventDate) {
      return new Date(eventDate) > new Date()
    },

    canCancel(ticket) {
      if (ticket.status !== 'active') return false

      const eventDate = new Date(ticket.eventDate)
      const now = new Date()
      const hoursUntilEvent = (eventDate - now) / (1000 * 60 * 60)

      // Sta annulering toe tot 24 uur voor het evenement
      return hoursUntilEvent > 24 && ticket.isRefundable
    },

    async viewTicket(ticketId) {
      try {
        const response = await this.$api.get(`/user/tickets/${ticketId}`)
        this.selectedTicket = response.data
      } catch (error) {
        this.$toast.error('Kon ticket niet laden')
      }
    },

    async downloadTicket(ticketId) {
      try {
        const response = await this.$api.get(`/user/tickets/${ticketId}/download`, {
          responseType: 'blob'
        })

        // Create download link
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `ticket-${ticketId}.pdf`)
        document.body.appendChild(link)
        link.click()
        link.remove()

        this.$toast.success('Ticket gedownload')
      } catch (error) {
        this.$toast.error('Kon ticket niet downloaden')
      }
    },

    cancelTicket(ticket) {
      this.ticketToCancel = ticket
    },

    async confirmCancellation(cancellationData) {
      try {
        await this.$api.put(`/user/tickets/${this.ticketToCancel.id}/cancel`, cancellationData)
        await this.loadTickets()
        this.$toast.success('Ticket geannuleerd')
        this.ticketToCancel = null
      } catch (error) {
        this.$toast.error('Kon ticket niet annuleren')
      }
    },

    viewCancellationDetails(ticket) {
      // Toon annuleringsdetails
      this.$toast.info(`Geannuleerd op: ${this.formatDate(ticket.cancellationDate)}`)
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('nl-NL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.user-tickets {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.tickets-header {
  margin-bottom: 30px;
}

.tickets-header h2 {
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 28px;
}

.tabs {
  display: flex;
  border-bottom: 2px solid #e9ecef;
  gap: 5px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tab-btn:hover {
  color: #3498db;
}

.tab-btn.active {
  color: #3498db;
  border-bottom-color: #3498db;
}

.tab-count {
  background: #e9ecef;
  color: #6c757d;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: normal;
}

.tab-btn.active .tab-count {
  background: #3498db;
  color: white;
}

.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ticket-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-left: 4px solid #3498db;
}

.ticket-card.upcoming {
  border-left-color: #27ae60;
}

.ticket-card.past {
  border-left-color: #95a5a6;
}

.ticket-card.used {
  border-left-color: #f39c12;
}

.ticket-card.cancelled {
  border-left-color: #e74c3c;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.event-title {
  margin: 0 0 8px 0;
  font-size: 20px;
  color: #2c3e50;
}

.event-date,
.event-location {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 5px 0;
  color: #7f8c8d;
  font-size: 14px;
}

.ticket-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.status-badge.active {
  background: #d4edda;
  color: #155724;
}

.status-badge.used {
  background: #fff3cd;
  color: #856404;
}

.status-badge.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.ticket-id {
  font-size: 12px;
  color: #95a5a6;
  font-family: monospace;
}

.ticket-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail-item label {
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-item span {
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
}

.ticket-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
}

.btn-outline {
  background: transparent;
  border: 2px solid #3498db;
  color: #3498db;
}

.btn-outline:hover {
  background: #3498db;
  color: white;
}

.ticket-qr {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
  text-align: center;
}

.qr-code {
  display: inline-block;
  padding: 15px;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 10px;
}

.qr-code img {
  width: 150px;
  height: 150px;
}

.qr-note {
  font-size: 12px;
  color: #6c757d;
  font-style: italic;
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
}

.empty-state i {
  font-size: 64px;
  margin-bottom: 20px;
  color: #bdc3c7;
}

.empty-state h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.link {
  color: #3498db;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .user-tickets {
    padding: 15px;
  }

  .tabs {
    flex-direction: column;
    border-bottom: none;
    gap: 5px;
  }

  .tab-btn {
    border: 1px solid #e9ecef;
    border-radius: 6px;
    justify-content: space-between;
  }

  .tab-btn.active {
    border-color: #3498db;
  }

  .ticket-header {
    flex-direction: column;
    align-items: stretch;
  }

  .ticket-status {
    align-items: stretch;
    flex-direction: row;
    justify-content: space-between;
  }

  .ticket-details {
    grid-template-columns: 1fr;
  }

  .ticket-actions {
    flex-direction: column;
  }

  .ticket-actions .btn {
    justify-content: center;
  }
}
</style>