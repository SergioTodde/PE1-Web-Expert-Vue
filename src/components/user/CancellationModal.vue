<template>
  <Modal
      title="Ticket Annuleren"
      size="sm"
      @close="$emit('close')"
  >
    <div class="cancellation-modal">
      <div class="warning-message">
        <i class="fas fa-exclamation-triangle"></i>
        <h4>Weet je het zeker?</h4>
        <p>Je staat op het punt om je ticket voor <strong>{{ ticket.eventName }}</strong> te annuleren.</p>
      </div>

      <div class="cancellation-details">
        <div class="refund-info">
          <i class="fas fa-euro-sign"></i>
          <span>Terugbetaling: €{{ ticket.price }}</span>
        </div>
        <div class="refund-time">
          <i class="fas fa-clock"></i>
          <span>Terugbetaling duurt 3-5 werkdagen</span>
        </div>
      </div>

      <div class="cancellation-reason">
        <label for="cancellationReason">Reden van annulering (optioneel):</label>
        <textarea
            id="cancellationReason"
            v-model="cancellationReason"
            placeholder="Vertel ons waarom je annuleert..."
            rows="3"
        ></textarea>
      </div>
    </div>

    <template #footer>
      <div class="modal-actions">
        <button @click="$emit('close')" class="btn btn-outline">
          Behoud Ticket
        </button>
        <button
            @click="confirmCancellation"
            class="btn btn-danger"
            :disabled="cancelling"
        >
          <i class="fas fa-times"></i>
          {{ cancelling ? 'Bezig...' : 'Annuleer Ticket' }}
        </button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/shared/Modal.vue'

export default {
  name: 'CancellationModal',
  components: {
    Modal
  },
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cancellationReason: '',
      cancelling: false
    }
  },
  methods: {
    async confirmCancellation() {
      this.cancelling = true
      try {
        this.$emit('confirm', {
          reason: this.cancellationReason
        })
      } finally {
        this.cancelling = false
      }
    }
  }
}
</script>

<style scoped>
.cancellation-modal {
  text-align: center;
}

.warning-message {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.warning-message i {
  font-size: 32px;
  color: #f39c12;
  margin-bottom: 10px;
}

.warning-message h4 {
  margin: 0 0 10px 0;
  color: #856404;
}

.warning-message p {
  margin: 0;
  color: #856404;
}

.cancellation-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.refund-info,
.refund-time {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #2c3e50;
  font-size: 14px;
}

.refund-info i {
  color: #27ae60;
}

.refund-time i {
  color: #3498db;
}

.cancellation-reason {
  text-align: left;
}

.cancellation-reason label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.cancellation-reason textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.cancellation-reason textarea:focus {
  outline: none;
  border-color: #3498db;
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

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

.btn-danger {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.btn-danger:hover:not(:disabled) {
  background: #c0392b;
  border-color: #c0392b;
}
</style>