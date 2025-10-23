<template>
  <Modal
      title="Ticket Details"
      size="md"
      @close="$emit('close')"
  >
    <div class="ticket-detail-modal">
      <div class="ticket-header">
        <h3>{{ ticket.eventName }}</h3>
        <span class="ticket-status" :class="ticket.status">
          {{ getStatusText(ticket.status) }}
        </span>
      </div>

      <div class="ticket-info">
        <div class="info-row">
          <label>Ticket Nummer:</label>
          <span>#{{ ticket.ticketNumber }}</span>
        </div>
        <div class="info-row">
          <label>Evenement Datum:</label>
          <span>{{ formatDate(ticket.eventDate) }}</span>
        </div>
        <div class="info-row">
          <label>Locatie:</label>
          <span>{{ ticket.eventLocation }}</span>
        </div>
        <div class="info-row">
          <label>Type:</label>
          <span>{{ ticket.ticketType }}</span>
        </div>
        <div class="info-row">
          <label>Prijs:</label>
          <span>€{{ ticket.price }}</span>
        </div>
        <div v-if="ticket.seatInfo" class="info-row">
          <label>Stoel:</label>
          <span>{{ ticket.seatInfo }}</span>
        </div>
      </div>

      <div class="qr-code-section">
        <img :src="ticket.qrCodeUrl" alt="QR Code" class="qr-code">
        <p class="qr-note">Toon deze QR-code bij binnenkomst</p>
      </div>
    </div>

    <template #footer>
      <div class="modal-actions">
        <button @click="$emit('download', ticket.id)" class="btn btn-primary">
          <i class="fas fa-download"></i>
          Download Ticket
        </button>
        <button @click="$emit('close')" class="btn btn-outline">
          Sluiten
        </button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/shared/Modal.vue'

export default {
  name: 'TicketDetailModal',
  components: {
    Modal
  },
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  methods: {
    getStatusText(status) {
      const statusMap = {
        'active': 'Actief',
        'used': 'Gebruikt',
        'cancelled': 'Geannuleerd'
      }
      return statusMap[status] || status
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
.ticket-detail-modal {
  text-align: center;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
}

.ticket-header h3 {
  margin: 0;
  color: #2c3e50;
}

.ticket-status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.ticket-status.active {
  background: #d4edda;
  color: #155724;
}

.ticket-status.used {
  background: #fff3cd;
  color: #856404;
}

.ticket-status.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.ticket-info {
  margin-bottom: 25px;
  text-align: left;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f8f9fa;
}

.info-row label {
  font-weight: 600;
  color: #7f8c8d;
}

.info-row span {
  color: #2c3e50;
  font-weight: 500;
}

.qr-code-section {
  margin: 25px 0;
}

.qr-code {
  width: 200px;
  height: 200px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 10px;
  background: white;
}

.qr-note {
  margin: 10px 0 0 0;
  color: #7f8c8d;
  font-size: 12px;
  font-style: italic;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
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
}

.btn-primary {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.btn-primary:hover {
  background: #2980b9;
  border-color: #2980b9;
}

.btn-outline {
  background: transparent;
  border-color: #6c757d;
  color: #6c757d;
}

.btn-outline:hover {
  background: #6c757d;
  color: white;
}
</style>