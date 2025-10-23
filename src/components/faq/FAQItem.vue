<template>
  <div class="faq-item" :class="{ active: isOpen }">
    <button class="faq-question" @click="toggle">
      <span class="question-text">{{ question }}</span>
      <i class="fas" :class="isOpen ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
    </button>

    <transition name="slide">
      <div v-if="isOpen" class="faq-answer">
        <div class="answer-content">
          <p>{{ answer }}</p>
        </div>

        <div class="faq-actions">
          <button class="action-btn" @click="copyToClipboard" title="Kopieer antwoord">
            <i class="fas fa-copy"></i>
          </button>
          <button class="action-btn" @click="markHelpful" title="Dit antwoord was nuttig">
            <i class="fas fa-thumbs-up"></i>
            <span v-if="helpfulCount > 0">{{ helpfulCount }}</span>
          </button>
          <button class="action-btn" @click="markUnhelpful" title="Dit antwoord was niet nuttig">
            <i class="fas fa-thumbs-down"></i>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'FAQItem',
  props: {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      helpfulCount: 0
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },

    copyToClipboard() {
      navigator.clipboard.writeText(this.answer)
          .then(() => {
            this.$toast.success('Antwoord gekopieerd naar klembord')
          })
          .catch(() => {
            this.$toast.error('Kon niet kopiëren naar klembord')
          })
    },

    markHelpful() {
      this.helpfulCount++
      this.$toast.success('Bedankt voor je feedback!')
    },

    markUnhelpful() {
      this.$toast.info('Bedankt voor je feedback. We werken continu aan verbetering.')
    }
  }
}
</script>

<style scoped>
.faq-item {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: #3498db;
}

.faq-item.active {
  border-color: #3498db;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.15);
}

.faq-question {
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background: #f8f9fa;
}

.question-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.4;
  flex: 1;
}

.faq-question i {
  color: #3498db;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.faq-answer {
  border-top: 1px solid #e9ecef;
}

.answer-content {
  padding: 1.5rem;
}

.answer-content p {
  color: #5d6d7e;
  line-height: 1.6;
  margin: 0;
  font-size: 1rem;
}

.faq-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid #f8f9fa;
  padding-top: 1rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  color: #7f8c8d;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.action-btn:hover {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

/* Slide transition */
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s ease-in;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .faq-question {
    padding: 1.25rem;
  }

  .question-text {
    font-size: 1rem;
  }

  .answer-content {
    padding: 1.25rem;
  }

  .faq-actions {
    padding: 0 1.25rem 1.25rem;
  }
}

@media (max-width: 480px) {
  .faq-question {
    padding: 1rem;
  }

  .answer-content {
    padding: 1rem;
  }

  .faq-actions {
    padding: 0 1rem 1rem;
    flex-wrap: wrap;
  }
}
</style>