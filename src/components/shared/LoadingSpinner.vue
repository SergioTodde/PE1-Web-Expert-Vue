<template>
  <div class="loading-spinner" :class="{ small: small, large: large, inline: inline }">
    <div class="spinner"></div>
    <p v-if="text" class="loading-text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-spinner.inline {
  display: inline-flex;
  flex-direction: row;
  gap: 0.75rem;
  padding: 0.5rem;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-spinner:not(.small):not(.large) .spinner {
  width: 40px;
  height: 40px;
}

.loading-spinner.small .spinner {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.loading-spinner.large .spinner {
  width: 60px;
  height: 60px;
  border-width: 4px;
}

.loading-text {
  margin-top: 1rem;
  color: #6c757d;
  font-size: 0.9rem;
  text-align: center;
}

.loading-spinner.inline .loading-text {
  margin-top: 0;
  margin-left: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Color variants */
.spinner.primary {
  border-top-color: #007bff;
}

.spinner.secondary {
  border-top-color: #6c757d;
}

.spinner.success {
  border-top-color: #28a745;
}

.spinner.danger {
  border-top-color: #dc3545;
}

.spinner.warning {
  border-top-color: #ffc107;
}

.spinner.info {
  border-top-color: #17a2b8;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .spinner {
    border-color: #4a5568;
  }

  .loading-text {
    color: #a0aec0;
  }
}
</style>