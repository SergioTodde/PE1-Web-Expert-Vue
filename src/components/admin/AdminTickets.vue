<template>
  <div class="admin-tickets">
    <div class="header">
      <h2>Tickets Beheer</h2>
      <div class="filters">
        <select v-model="statusFilter" @change="filterTickets">
          <option value="">Alle statussen</option>
          <option value="active">Actief</option>
          <option value="used">Gebruikt</option>
          <option value="cancelled">Geannuleerd</option>
        </select>
        <input
            v-model="searchQuery"
            @input="filterTickets"
            placeholder="Zoek op gebruiker of event..."
            class="search-input"
        >
      </div>
    </div>

    <div class="tickets-list">
      <div v-if="loading" class="loading">Laden...</div>

      <div v-else-if="filteredTickets.length === 0" class="no-tickets">
        Geen tickets gevonden
      </div>

      <div v-else class="tickets-grid">
        <div
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="ticket-card"
            :class="`status-${ticket.status}`"
        >
          <div class="ticket-header">
            <h3>{{ ticket.eventName }}</h3>
            <span class="status-badge" :class="ticket.status">
              {{ getStatusText(ticket.status) }}
            </span>
          </div>

          <div class="ticket-details">
            <p><strong>Ticket ID:</strong> {{ ticket.ticketNumber }}</p>
            <p><strong>Gebruiker:</strong> {{ ticket.userName }}</p>
            <p><strong>Datum:</strong> {{ formatDate(ticket.eventDate) }}</p>
            <p><strong>Aankoopdatum:</strong> {{ formatDate(ticket.purchaseDate) }}</p>
            <p><strong>Prijs:</strong> €{{ ticket.price }}</p>
          </div>

          <div class="ticket-actions">
            <button
                v-if="ticket.status === 'active'"
                @click="markAsUsed(ticket.id)"
                class="btn btn-primary"
            >
              Markeer als gebruikt
            </button>
            <button
                v-if="ticket.status === 'active'"
                @click="cancelTicket(ticket.id)"
                class="btn btn-danger"
            >
              Annuleren
            </button>
            <button
                @click="viewTicketDetails(ticket.id)"
                class="btn btn-secondary"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Ticket Details Modal -->
    <div v-if="selectedTicket" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Ticket Details</h3>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <TicketDetails :ticket="selectedTicket" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TicketDetails from './TicketDetails.vue'

export default {
  name: 'AdminTickets',
  components: {
    TicketDetails
  },
  data() {
    return {
      tickets: [],
      filteredTickets: [],
      loading: false,
      statusFilter: '',
      searchQuery: '',
      selectedTicket: null
    }
  },
  async mounted() {
    await this.loadTickets()
  },
  methods: {
    async loadTickets() {
      this.loading = true
      try {
        // API call om tickets op te halen
        const response = await this.$api.get('/admin/tickets')
        this.tickets = response.data
        this.filteredTickets = [...this.tickets]
      } catch (error) {
        console.error('Fout bij laden tickets:', error)
        this.$toast.error('Kon tickets niet laden')
      } finally {
        this.loading = false
      }
    },

    filterTickets() {
      let filtered = this.tickets

      if (this.statusFilter) {
        filtered = filtered.filter(ticket => ticket.status === this.statusFilter)
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(ticket =>
            ticket.userName.toLowerCase().includes(query) ||
            ticket.eventName.toLowerCase().includes(query) ||
            ticket.ticketNumber.toLowerCase().includes(query)
        )
      }

      this.filteredTickets = filtered
    },

    async markAsUsed(ticketId) {
      try {
        await this.$api.put(`/admin/tickets/${ticketId}/mark-used`)
        await this.loadTickets()
        this.$toast.success('Ticket gemarkeerd als gebruikt')
      } catch (error) {
        this.$toast.error('Kon ticket niet bijwerken')
      }
    },

    async cancelTicket(ticketId) {
      if (!confirm('Weet je zeker dat je dit ticket wilt annuleren?')) return

      try {
        await this.$api.put(`/admin/tickets/${ticketId}/cancel`)
        await this.loadTickets()
        this.$toast.success('Ticket geannuleerd')
      } catch (error) {
        this.$toast.error('Kon ticket niet annuleren')
      }
    },

    async viewTicketDetails(ticketId) {
      try {
        const response = await this.$api.get(`/admin/tickets/${ticketId}`)
        this.selectedTicket = response.data
      } catch (error) {
        this.$toast.error('Kon ticket details niet laden')
      }
    },

    closeModal() {
      this.selectedTicket = null
    },

    getStatusText(status) {
      const statusMap = {
        'active': 'Actief',
        'used': 'Gebruikt',
        'cancelled': 'Geannuleerd'
      }
      return statusMap[status] || status
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('nl-NL')
    }
  }
}
</script>

<style scoped>
.admin-tickets {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 250px;
}

.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.ticket-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.ticket-card.status-active {
  border-left: 4px solid #28a745;
}

.ticket-card.status-used {
  border-left: 4px solid #6c757d;
}

.ticket-card.status-cancelled {
  border-left: 4px solid #dc3545;
}

.ticket-header {
  display: flex;
  justify-content: between;
  align-items: start;
  margin-bottom: 15px;
}

.ticket-header h3 {
  margin: 0;
  flex: 1;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.status-badge.active {
  background: #d4edda;
  color: #155724;
}

.status-badge.used {
  background: #e2e3e5;
  color: #383d41;
}

.status-badge.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.ticket-details p {
  margin: 5px 0;
  font-size: 14px;
}

.ticket-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

.loading, .no-tickets {
  text-align: center;
  padding: 40px;
  color: #6c757d;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }

  .filters {
    flex-direction: column;
  }

  .search-input {
    min-width: auto;
  }

  .tickets-grid {
    grid-template-columns: 1fr;
  }

  .ticket-actions {
    flex-direction: column;
  }
}
</style>