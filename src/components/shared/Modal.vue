<template>
  <transition name="modal">
    <div class="modal-overlay" @click.self="handleOverlayClick">
      <div
          class="modal-container"
          :class="modalClass"
          :style="modalStyle"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'modal-title' : null"
      >
        <!-- Header -->
        <div v-if="showHeader" class="modal-header">
          <h2 v-if="title" id="modal-title" class="modal-title">
            {{ title }}
          </h2>
          <button
              v-if="closable"
              @click="handleClose"
              class="modal-close-btn"
              aria-label="Sluiten"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Content -->
        <div class="modal-content">
          <slot name="default"></slot>
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
    },
    closable: {
      type: Boolean,
      default: true
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    maxWidth: {
      type: String,
      default: null
    }
  },
  computed: {
    modalClass() {
      return [
        `modal-${this.size}`,
        {
          'modal-with-header': this.showHeader,
          'modal-with-footer': this.$slots.footer
        }
      ]
    },
    modalStyle() {
      const styles = {}
      if (this.maxWidth) {
        styles.maxWidth = this.maxWidth
      }
      return styles
    }
  },
  mounted() {
    // Add event listeners
    document.addEventListener('keydown', this.handleKeydown)
    document.body.style.overflow = 'hidden'
  },
  beforeUnmount() {
    // Clean up event listeners
    document.removeEventListener('keydown', this.handleKeydown)
    document.body.style.overflow = ''
  },
  methods: {
    handleClose() {
      if (this.closable) {
        this.$emit('close')
      }
    },
    handleOverlayClick() {
      if (this.closeOnOverlay && this.closable) {
        this.handleClose()
      }
    },
    handleKeydown(event) {
      if (event.key === 'Escape' && this.closable) {
        this.handleClose()
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: overlay-fade-in 0.3s ease;
}

.modal-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: modal-slide-in 0.3s ease;
  overflow: hidden;
}

/* Modal Sizes */
.modal-sm {
  width: 400px;
  max-width: 100%;
}

.modal-md {
  width: 600px;
  max-width: 100%;
}

.modal-lg {
  width: 800px;
  max-width: 100%;
}

.modal-xl {
  width: 1000px;
  max-width: 100%;
}

.modal-full {
  width: 95vw;
  height: 95vh;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 30px 0 30px;
  flex-shrink: 0;
}

.modal-title {
  margin: 0;
  color: #2c3e50;
  font-size: 24px;
  font-weight: 600;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #7f8c8d;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.modal-close-btn:hover {
  background: #f8f9fa;
  color: #e74c3c;
}

.modal-content {
  padding: 30px;
  flex: 1;
  overflow-y: auto;
}

.modal-with-header .modal-content {
  padding-top: 20px;
}

.modal-footer {
  padding: 0 30px 25px 30px;
  flex-shrink: 0;
}

/* Animations */
@keyframes overlay-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal-slide-in {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}

/* Scrollbar Styling */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }

  .modal-container {
    max-height: 95vh;
  }

  .modal-header {
    padding: 20px 20px 0 20px;
  }

  .modal-content {
    padding: 20px;
  }

  .modal-footer {
    padding: 0 20px 20px 20px;
  }

  .modal-title {
    font-size: 20px;
  }

  /* Mobile sizes */
  .modal-sm,
  .modal-md,
  .modal-lg,
  .modal-xl {
    width: 100%;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 5px;
  }

  .modal-header {
    padding: 15px 15px 0 15px;
  }

  .modal-content {
    padding: 15px;
  }

  .modal-footer {
    padding: 0 15px 15px 15px;
  }
}

/* Print Styles */
@media print {
  .modal-overlay {
    position: static;
    background: white;
    padding: 0;
  }

  .modal-container {
    box-shadow: none;
    max-height: none;
    border: 1px solid #ddd;
  }

  .modal-close-btn {
    display: none;
  }
}
</style>