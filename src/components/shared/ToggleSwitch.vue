<template>
  <button
      class="toggle-switch"
      :class="toggleClasses"
      @click="handleToggle"
      type="button"
      role="switch"
      :aria-checked="modelValue.toString()"
      :aria-label="label"
      :disabled="disabled"
  >
    <span class="toggle-track">
      <span class="toggle-thumb" :style="thumbStyle">
        <span v-if="showIcons" class="toggle-icon">
          <i v-if="modelValue" class="fas fa-check"></i>
          <i v-else class="fas fa-times"></i>
        </span>
      </span>
    </span>
    <span v-if="$slots.default || label" class="toggle-label">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'success', 'warning', 'danger', 'secondary'].includes(value)
    },
    showIcons: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change'],
  computed: {
    toggleClasses() {
      return [
        `toggle-${this.size}`,
        `toggle-${this.variant}`,
        {
          'toggle-on': this.modelValue,
          'toggle-off': !this.modelValue,
          'toggle-disabled': this.disabled
        }
      ]
    },
    thumbStyle() {
      if (this.modelValue) {
        const translateX = this.getTrackWidth() - this.getThumbSize() - 4
        return {
          transform: `translateX(${translateX}px)`
        }
      }
      return {}
    }
  },
  methods: {
    handleToggle() {
      if (this.disabled) return

      const newValue = !this.modelValue
      this.$emit('update:modelValue', newValue)
      this.$emit('change', newValue)
    },
    getTrackWidth() {
      const sizes = {
        sm: 40,
        md: 50,
        lg: 60
      }
      return sizes[this.size]
    },
    getThumbSize() {
      const sizes = {
        sm: 16,
        md: 20,
        lg: 24
      }
      return sizes[this.size]
    },
    getRtlTransform() {
      // Voor RTL: wanneer aan, beweeg naar links i.p.v. rechts
      const translateX = this.getTrackWidth() - this.getThumbSize() - 4
      return `translateX(-${translateX}px)`
    }
  }
}
</script>

<style scoped>
.toggle-switch {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  padding: 8px;
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.toggle-switch:hover:not(.toggle-disabled) {
  background: #f8f9fa;
}

.toggle-switch:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.toggle-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.toggle-disabled:hover {
  background: none;
}

/* Track */
.toggle-track {
  position: relative;
  background: #bdc3c7;
  border-radius: 50px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.toggle-sm .toggle-track {
  width: 40px;
  height: 20px;
}

.toggle-md .toggle-track {
  width: 50px;
  height: 24px;
}

.toggle-lg .toggle-track {
  width: 60px;
  height: 28px;
}

/* Thumb */
.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-sm .toggle-thumb {
  width: 16px;
  height: 16px;
}

.toggle-md .toggle-thumb {
  width: 20px;
  height: 20px;
}

.toggle-lg .toggle-thumb {
  width: 24px;
  height: 24px;
}

/* Icons */
.toggle-icon {
  font-size: 8px;
  color: #7f8c8d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-sm .toggle-icon {
  font-size: 6px;
}

.toggle-lg .toggle-icon {
  font-size: 10px;
}

/* Variants when ON */
.toggle-on.toggle-primary .toggle-track {
  background: #3498db;
}

.toggle-on.toggle-success .toggle-track {
  background: #27ae60;
}

.toggle-on.toggle-warning .toggle-track {
  background: #f39c12;
}

.toggle-on.toggle-danger .toggle-track {
  background: #e74c3c;
}

.toggle-on.toggle-secondary .toggle-track {
  background: #95a5a6;
}

/* Label */
.toggle-label {
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
  user-select: none;
}

.toggle-disabled .toggle-label {
  color: #bdc3c7;
}

/* Focus styles for accessibility */
.toggle-switch:focus-visible {
  outline: 2px solid #3498db;
  outline-offset: 2px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .toggle-switch,
  .toggle-track,
  .toggle-thumb {
    transition: none;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .toggle-switch:hover:not(.toggle-disabled) {
    background: #34495e;
  }

  .toggle-track {
    background: #7f8c8d;
  }

  .toggle-label {
    color: #ecf0f1;
  }

  .toggle-disabled .toggle-label {
    color: #7f8c8d;
  }
}

/* RTL support */
[dir="rtl"] .toggle-thumb {
  left: auto;
  right: 2px;
}

[dir="rtl"] .toggle-on .toggle-thumb {
  transform: translateX(-36px) !important;
}

[dir="rtl"].toggle-sm .toggle-on .toggle-thumb {
  transform: translateX(-20px) !important;
}

[dir="rtl"].toggle-md .toggle-on .toggle-thumb {
  transform: translateX(-26px) !important;
}

[dir="rtl"].toggle-lg .toggle-on .toggle-thumb {
  transform: translateX(-32px) !important;
}
</style>