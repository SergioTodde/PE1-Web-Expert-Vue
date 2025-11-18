<template>
  <div class="not-found">
    <div class="container">
      <div class="error-content">
        <h1>404</h1>
        <h2>Pagina niet gevonden</h2>
        <p>De pagina die je zoekt bestaat niet of is verplaatst.</p>

        <div class="actions">
          <router-link to="/" class="btn btn-primary">
            ← Terug naar Home
          </router-link>
          <router-link to="/events" class="btn btn-secondary">
            Bekijk Evenementen
          </router-link>
        </div>

        <div class="search-suggestions" v-if="suggestedEvents.length">
          <h3>Misschien zoek je een van deze evenementen?</h3>
          <div class="suggested-events">
            <router-link
                v-for="event in suggestedEvents"
                :key="event.id"
                :to="`/events/${event.id}`"
                class="event-suggestion"
            >
              <img
                  v-if="event.primary_image"
                  :src="event.primary_image"
                  :alt="event.title"
              >
              <div class="event-info">
                <h4>{{ event.title }}</h4>
                <p>{{ event.location }}</p>
                <small>{{ formatDate(event.start_date) }}</small>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'NotFound',
  data() {
    return {
      suggestedEvents: []
    }
  },
  computed: {
    ...mapState('events', ['events'])
  },
  async created() {
    // Laad enkele populaire events als suggesties
    await this.loadSuggestedEvents()
  },
  methods: {
    ...mapActions('events', ['fetchEvents']),

    async loadSuggestedEvents() {
      try {
        if (this.events.length === 0) {
          await this.fetchEvents()
        }
        // Toon 3 willekeurige events als suggestie
        this.suggestedEvents = this.events
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
      } catch (error) {
        console.error('Error loading suggested events:', error)
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('nl-BE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.not-found {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.error-content {
  text-align: center;
}

.error-content h1 {
  font-size: 8rem;
  font-weight: bold;
  color: #e74c3c;
  margin: 0;
  line-height: 1;
}

.error-content h2 {
  font-size: 2rem;
  margin: 1rem 0;
  color: #2c3e50;
}

.error-content p {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #3498db;
  color: white;
  border: 2px solid #3498db;
}

.btn-primary:hover {
  background: #2980b9;
  border-color: #2980b9;
}

.btn-secondary {
  background: transparent;
  color: #3498db;
  border: 2px solid #3498db;
}

.btn-secondary:hover {
  background: #3498db;
  color: white;
}

.search-suggestions {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #ecf0f1;
}

.search-suggestions h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.suggested-events {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.event-suggestion {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ecf0f1;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.event-suggestion:hover {
  border-color: #3498db;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.15);
}

.event-suggestion img {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  object-fit: cover;
  margin-right: 1rem;
}

.event-info h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1rem;
}

.event-info p {
  margin: 0 0 0.25rem 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.event-info small {
  color: #95a5a6;
  font-size: 0.8rem;
}

/* Responsive */
@media (max-width: 768px) {
  .error-content h1 {
    font-size: 6rem;
  }

  .error-content h2 {
    font-size: 1.5rem;
  }

  .actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 200px;
  }

  .suggested-events {
    grid-template-columns: 1fr;
  }
}
</style>