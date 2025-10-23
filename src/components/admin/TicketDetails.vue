<template>
  <div class="ticket-details">
    <!-- Ticket Header -->
    <div class="ticket-header">
      <div class="ticket-basic-info">
        <h3 class="event-title">{{ ticket.eventName }}</h3>
        <div class="ticket-meta">
          <span class="ticket-id">Ticket #{{ ticket.ticketNumber }}</span>
          <span class="status-badge" :class="ticket.status">
            {{ getStatusText(ticket.status) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Ticket Information Grid -->
    <div class="ticket-grid">
      <!-- Event Information -->
      <div class="info-section">
        <h4 class="section-title">
          <i class="fas fa-calendar-alt"></i>
          Evenement Informatie
        </h4>
        <div class="info-grid">
          <div class="info-item">
            <label>Evenement:</label>
            <span>{{ ticket.eventName }}</span>
          </div>
          <div class="info-item">
            <label>Datum & Tijd:</label>
            <span>{{ formatDateTime(ticket.eventDate) }}</span>
          </div>
          <div class="info-item">
            <label>Locatie:</label>
            <span>{{ ticket.eventLocation }}</span>
          </div>
          <div class="info-item">
            <label>Organisator:</label>
            <span>{{ ticket.organizer || 'Niet gespecificeerd' }}</span>
          </div>
        </div>
      </div>

      <!-- Ticket Information -->
      <div class="info-section">
        <h4 class="section-title">
          <i class="fas fa-ticket-alt"></i>
          Ticket Informatie
        </h4>
        <div class="info-grid">
          <div class="info-item">
            <label>Ticket Type:</label>
            <span>{{ ticket.ticketType || 'Standaard' }}</span>
          </div>
          <div class="info-item">
            <label>Prijs:</label>
            <span class="price">€{{ ticket.price }}</span>
          </div>
          <div class="info-item">
            <label>Aankoopdatum:</label>
            <span>{{ formatDateTime(ticket.purchaseDate) }}</span>
          </div>
          <div class="info-item">
            <label>Betaalmethode:</label>
            <span>{{ ticket.paymentMethod || 'iDEAL' }}</span>
          </div>
        </div>
      </div>

      <!-- User Information -->
      <div class="info-section">
        <h4 class="section-title">
          <i class="fas fa-user"></i>
          Gebruikersinformatie
        </h4>
        <div class="info-grid">
          <div class="info-item">
            <label>Naam:</label>
            <span>{{ ticket.userName }}</span>
          </div>
          <div class="info-item">
            <label>E-mail:</label>
            <span>{{ ticket.userEmail }}</span>
          </div>
          <div class="info-item">
            <label>Telefoon:</label>
            <span>{{ ticket.userPhone || 'Niet opgegeven' }}</span>
          </div>
          <div class="info-item">
            <label>User ID:</label>
            <span class="user-id">#{{ ticket.userId }}</span>
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="info-section">
        <h4 class="section-title">
          <i class="fas fa-info-circle"></i>
          Extra Informatie
        </h4>
        <div class="info-grid">
          <div v-if="ticket.seatInfo" class="info-item">
            <label>Stoel/Zitplaats:</label>
            <span>{{ ticket.seatInfo }}</span>
          </div>
          <div v-if="ticket.vip" class="info-item">
            <label>VIP:</label>
            <span class="vip-badge">Ja</span>
          </div>
          <div class="info-item">
            <label>QR Code:</label>
            <span v-if="ticket.qrCode" class="qr-available">Beschikbaar</span>
            <span v-else class="qr-unavailable">Niet beschikbaar</span>
          </div>
          <div v-if="ticket.cancellationDate" class="info-item">
            <label>Geannuleerd op:</label>
            <span>{{ formatDateTime(ticket.cancellationDate) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Ticket Actions -->
    <div class="ticket-actions">
      <div class="action-buttons">
        <button
            v-if="ticket.status === 'active'"
            @click="markAsUsed"
            class="btn btn-success"
            :disabled="actionLoading"
        >
          <i class="fas fa-check-circle"></i>
          Markeer als Gebruikt
        </button>

        <button
            v-if="ticket.status === 'active'"
            @click="cancelTicket"
            class="btn btn-warning"
            :disabled="actionLoading"
        >
          <i class="fas fa-times-circle"></i>
          Annuleer Ticket
        </button>

        <button
            v-if="ticket.status === 'used'"
            @click="undoMarkAsUsed"
            class="btn btn-outline"
            :disabled="actionLoading"
        >
          <i class="fas fa-undo"></i>
          Ongedaan Maken
        </button>

        <button
            @click="downloadTicket"
            class="btn btn-secondary"
            :disabled="actionLoading"
        >
          <i class="fas fa-download"></i>
          Download PDF
        </button>

        <button
            @click="sendEmail"
            class="btn btn-info"
            :disabled="actionLoading"
        >
          <i class="fas fa-envelope"></i>
          Verstuur E-mail
        </button>
      </div>
    </div>

    <!-- Activity Log -->
    <div v-if="ticket.activityLog && ticket.activityLog.length > 0" class="activity-log">
      <h4 class="section-title">
        <i class="fas fa-history"></i>
        Activiteiten Log
      </h4>
      <div class="activity-list">
        <div
            v-for="activity in ticket.activityLog"
            :key="activity.id"
            class="activity-item"
        >
          <div class="activity-icon" :class="activity.type">
            <i :class="getActivityIcon(activity.type)"></i>
          </div>
          <div class="activity-content">
            <p class="activity-description">{{ activity.description }}</p>
            <span class="activity-time">{{ formatDateTime(activity.timestamp) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Ticket details laden...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketDetails',
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      actionLoading: false
    }
  },
  methods: {
    getStatusText(status) {
      const statusMap = {
        'active': 'Actief',
        'used': 'Gebruikt',
        'cancelled': 'Geannuleerd',
        'refunded': 'Terugbetaald'
      }
      return statusMap[status] || status
    },

    formatDateTime(dateString) {
      if (!dateString) return 'Onbekend'

      const date = new Date(dateString)
      return date.toLocaleDateString('nl-NL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    getActivityIcon(type) {
      const icons = {
        'purchase': 'fas fa-shopping-cart',
        'used': 'fas fa-check-circle',
        'cancelled': 'fas fa-times-circle',
        'refund': 'fas fa-euro-sign',
        'email': 'fas fa-envelope',
        'system': 'fas fa-cog'
      }
      return icons[type] || 'fas fa-info-circle'
    },

    async markAsUsed() {
      this.actionLoading = true
      try {
        await this.$api.put(`/admin/tickets/${this.ticket.id}/mark-used`)
        this.$emit('ticketUpdated', { ...this.ticket, status: 'used' })
        this.$toast.success('Ticket gemarkeerd als gebruikt')
      } catch (error) {
        console.error('Error marking ticket as used:', error)
        this.$toast.error('Kon ticket niet bijwerken')
      } finally {
        this.actionLoading = false
      }
    },

    async cancelTicket() {
      if (!confirm('Weet je zeker dat je dit ticket wilt annuleren? Dit kan niet ongedaan worden gemaakt.')) {
        return
      }

      this.actionLoading = true
      try {
        await this.$api.put(`/admin/tickets/${this.ticket.id}/cancel`)
        this.$emit('ticketUpdated', { ...this.ticket, status: 'cancelled' })
        this.$toast.success('Ticket geannuleerd')
      } catch (error) {
        console.error('Error cancelling ticket:', error)
        this.$toast.error('Kon ticket niet annuleren')
      } finally {
        this.actionLoading = false
      }
    },

    async undoMarkAsUsed() {
      this.actionLoading = true
      try {
        await this.$api.put(`/admin/tickets/${this.ticket.id}/undo-used`)
        this.$emit('ticketUpdated', { ...this.ticket, status: 'active' })
        this.$toast.success('Actie ongedaan gemaakt')
      } catch (error) {
        console.error('Error undoing mark as used:', error)
        this.$toast.error('Kon actie niet ongedaan maken')
      } finally {
        this.actionLoading = false
      }
    },

    async downloadTicket() {
      this.actionLoading = true
      try {
        const response = await this.$api.get(`/admin/tickets/${this.ticket.id}/download`, {
          responseType: 'blob'
        })

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `ticket-${this.ticket.ticketNumber}.pdf`)
        document.body.appendChild(link)
        link.click()
        link.remove()

        this.$toast.success('Ticket gedownload')
      } catch (error) {
        console.error('Error downloading ticket:', error)
        this.$toast.error('Kon ticket niet downloaden')
      } finally {
        this.actionLoading = false
      }
    },

    async sendEmail() {
      this.actionLoading = true
      try {
        await this.$api.post(`/admin/tickets/${this.ticket.id}/send-email`)
        this.$toast.success('E-mail verzonden naar gebruiker')
      } catch (error) {
        console.error('Error sending email:', error)
        this.$toast.error('Kon e-mail niet verzenden')
      } finally {
        this.actionLoading = false
      }
    }
  }
}
</script>

<style scoped>
.ticket-details {
  max-width: 100%;
  color: #2c3e50;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
}

.ticket-basic-info {
  flex: 1;
}

.event-title {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
}

.ticket-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.ticket-id {
  color: #7f8c8d;
  font-family: monospace;
  font-size: 0.9rem;
}

.status-badge {
  padding: 0.375rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

.status-badge.refunded {
  background: #e2e3e5;
  color: #383d41;
}

.ticket-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}

.section-title i {
  color: #3498db;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item label {
  font-weight: 600;
  color: #5d6d7e;
  font-size: 0.9rem;
  min-width: 120px;
}

.info-item span {
  text-align: right;
  color: #2c3e50;
  font-size: 0.9rem;
}

.price {
  font-weight: 600;
  color: #27ae60;
}

.user-id {
  font-family: monospace;
  background: #e9ecef;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.vip-badge {
  background: #f39c12;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.qr-available {
  color: #27ae60;
  font-weight: 600;
}

.qr-unavailable {
  color: #e74c3c;
  font-weight: 600;
}

.ticket-actions {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-success {
  background: #27ae60;
  color: white;
  border-color: #27ae60;
}

.btn-success:hover:not(:disabled) {
  background: #219653;
  border-color: #219653;
}

.btn-warning {
  background: #f39c12;
  color: white;
  border-color: #f39c12;
}

.btn-warning:hover:not(:disabled) {
  background: #e67e22;
  border-color: #e67e22;
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

.btn-info {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.btn-info:hover:not(:disabled) {
  background: #2980b9;
  border-color: #2980b9;
}

.btn-outline {
  background: transparent;
  border-color: #6c757d;
  color: #6c757d;
}

.btn-outline:hover:not(:disabled) {
  background: #6c757d;
  color: white;
}

.activity-log {
  margin-top: 2rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.activity-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
}

.activity-icon.purchase { background: #27ae60; }
.activity-icon.used { background: #3498db; }
.activity-icon.cancelled { background: #e74c3c; }
.activity-icon.refund { background: #f39c12; }
.activity-icon.email { background: #9b59b6; }
.activity-icon.system { background: #7f8c8d; }

.activity-content {
  flex: 1;
}

.activity-description {
  margin: 0 0 0.25rem 0;
  color: #2c3e50;
  font-size: 0.9rem;
  line-height: 1.4;
}

.activity-time {
  font-size: 0.8rem;
  color: #7f8c8d;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #7f8c8d;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .ticket-header {
    flex-direction: column;
    gap: 1rem;
  }

  .ticket-meta {
    justify-content: flex-start;
  }

  .ticket-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .info-item {
    flex-direction: column;
    gap: 0.25rem;
  }

  .info-item label {
    min-width: auto;
  }

  .info-item span {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .info-section {
    padding: 1rem;
  }

  .ticket-actions {
    padding: 1rem;
  }

  .activity-item {
    flex-direction: column;
    text-align: center;
  }

  .activity-icon {
    align-self: center;
  }
}
</style>