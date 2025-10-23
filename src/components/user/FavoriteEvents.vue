<template>
  <div class="favorite-events">
    <div class="favorites-header">
      <h2>
        <i class="fas fa-heart"></i>
        Mijn Favorieten
      </h2>
      <p class="subtitle">Jouw opgeslagen evenementen</p>
    </div>

    <div class="favorites-content">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Favorieten laden...</p>
      </div>

      <div v-else-if="favorites.length === 0" class="empty-state">
        <i class="fas fa-heart-broken"></i>
        <h3>Nog geen favorieten</h3>
        <p>Voeg evenementen toe aan je favorieten om ze hier terug te vinden</p>
        <router-link to="/events" class="btn btn-primary">
          <i class="fas fa-calendar-plus"></i>
          Evenementen Bekijken
        </router-link>
      </div>

      <div v-else class="favorites-grid">
        <div
            v-for="event in favorites"
            :key="event.id"
            class="favorite-card"
        >
          <div class="event-image">
            <img :src="event.imageUrl" :alt="event.title" @error="handleImageError">
            <button
                class="favorite-btn active"
                @click="removeFromFavorites(event.id)"
                title="Verwijder uit favorieten"
            >
              <i class="fas fa-heart"></i>
            </button>
            <div class="event-badges">
              <span v-if="event.isNew" class="badge new">Nieuw</span>
              <span v-if="event.ticketsLeft < 10" class="badge limited">Bijna vol</span>
            </div>
          </div>

          <div class="event-content">
            <div class="event-date">
              <i class="fas fa-calendar-alt"></i>
              {{ formatDate(event.date) }}
            </div>
            <h3 class="event-title">{{ event.title }}</h3>
            <p class="event-location">
              <i class="fas fa-map-marker-alt"></i>
              {{ event.location }}
            </p>
            <p class="event-description">{{ event.shortDescription }}</p>

            <div class="event-meta">
              <div class="meta-item" v-if="event.duration">
                <i class="fas fa-clock"></i>
                {{ event.duration }}
              </div>
              <div class="meta-item" v-if="event.rating">
                <i class="fas fa-star"></i>
                {{ event.rating }}
              </div>
              <div class="meta-item" v-if="event.attendees">
                <i class="fas fa-users"></i>
                {{ event.attendees }} deelnemers
              </div>
            </div>

            <div class="event-footer">
              <div class="event-price">
                <span class="price">€{{ event.price }}</span>
                <span v-if="event.originalPrice" class="original-price">
                  €{{ event.originalPrice }}
                </span>
              </div>
              <div class="event-actions">
                <button
                    class="btn btn-primary"
                    :disabled="event.ticketsLeft === 0"
                    @click="bookEvent(event)"
                >
                  {{ event.ticketsLeft > 0 ? 'Boek Nu' : 'Uitverkocht' }}
                </button>
                <button
                    class="btn btn-outline"
                    @click="viewEventDetails(event.id)"
                >
                  <i class="fas fa-info-circle"></i>
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Actions -->
    <div v-if="favorites.length > 0" class="bulk-actions">
      <div class="bulk-info">
        <span>{{ favorites.length }} evenementen in favorieten</span>
      </div>
      <div class="bulk-buttons">
        <button
            @click="clearAllFavorites"
            class="btn btn-danger"
            :disabled="clearingAll"
        >
          <i class="fas fa-trash"></i>
          {{ clearingAll ? 'Bezig...' : 'Alles Verwijderen' }}
        </button>
        <button
            @click="exportFavorites"
            class="btn btn-secondary"
        >
          <i class="fas fa-download"></i>
          Exporteren
        </button>
      </div>
    </div>

    <!-- Recommendations -->
    <div v-if="recommendations.length > 0" class="recommendations-section">
      <h3>Misschien vind je deze ook leuk</h3>
      <div class="recommendations-grid">
        <div
            v-for="event in recommendations"
            :key="event.id"
            class="recommendation-card"
        >
          <div class="event-image">
            <img :src="event.imageUrl" :alt="event.title" @error="handleImageError">
            <button
                class="favorite-btn"
                @click="addToFavorites(event.id)"
                :class="{ active: event.isFavorite }"
            >
              <i class="fas fa-heart"></i>
            </button>
          </div>
          <div class="event-content">
            <h4>{{ event.title }}</h4>
            <p class="event-date-small">{{ formatDate(event.date) }}</p>
            <button
                @click="viewEventDetails(event.id)"
                class="btn btn-sm btn-outline"
            >
              Bekijk
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Details Modal -->
    <EventDetailsModal
        v-if="selectedEvent"
        :event="selectedEvent"
        @close="closeEventDetails"
        @book="handleBookEvent"
    />
  </div>
</template>

<script>
import EventDetailsModal from './EventDetailsModal.vue'

export default {
  name: 'FavoriteEvents',
  components: {
    EventDetailsModal
  },
  data() {
    return {
      favorites: [],
      recommendations: [],
      loading: false,
      clearingAll: false,
      selectedEvent: null
    }
  },
  async mounted() {
    await this.loadFavorites()
    await this.loadRecommendations()
  },
  methods: {
    async loadFavorites() {
      this.loading = true
      try {
        const response = await this.$api.get('/user/favorites')
        this.favorites = response.data
      } catch (error) {
        console.error('Fout bij laden favorieten:', error)
        this.$toast.error('Kon favorieten niet laden')
      } finally {
        this.loading = false
      }
    },

    async loadRecommendations() {
      try {
        const response = await this.$api.get('/user/recommendations')
        this.recommendations = response.data
      } catch (error) {
        console.error('Fout bij laden aanbevelingen:', error)
      }
    },

    async removeFromFavorites(eventId) {
      try {
        await this.$api.delete(`/user/favorites/${eventId}`)

        // Update local state
        this.favorites = this.favorites.filter(event => event.id !== eventId)
        this.$toast.success('Verwijderd uit favorieten')

        // Reload recommendations
        await this.loadRecommendations()
      } catch (error) {
        this.$toast.error('Kon evenement niet verwijderen')
      }
    },

    async addToFavorites(eventId) {
      try {
        await this.$api.post(`/user/favorites/${eventId}`)

        // Update local state for recommendation
        const event = this.recommendations.find(e => e.id === eventId)
        if (event) {
          event.isFavorite = true
        }

        this.$toast.success('Toegevoegd aan favorieten')

        // Reload favorites to include the new one
        await this.loadFavorites()
      } catch (error) {
        this.$toast.error('Kon evenement niet toevoegen')
      }
    },

    async clearAllFavorites() {
      if (!confirm('Weet je zeker dat je alle favorieten wilt verwijderen?')) return

      this.clearingAll = true
      try {
        await this.$api.delete('/user/favorites')
        this.favorites = []
        this.$toast.success('Alle favorieten verwijderd')
      } catch (error) {
        this.$toast.error('Kon favorieten niet verwijderen')
      } finally {
        this.clearingAll = false
      }
    },

    async exportFavorites() {
      try {
        const response = await this.$api.get('/user/favorites/export', {
          responseType: 'blob'
        })

        // Create download link
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `mijn-favorieten-${new Date().toISOString().split('T')[0]}.pdf`)
        document.body.appendChild(link)
        link.click()
        link.remove()

        this.$toast.success('Favorieten geëxporteerd')
      } catch (error) {
        this.$toast.error('Kon favorieten niet exporteren')
      }
    },

    async viewEventDetails(eventId) {
      try {
        const response = await this.$api.get(`/user/events/${eventId}`)
        this.selectedEvent = response.data
      } catch (error) {
        this.$toast.error('Kon evenement details niet laden')
      }
    },

    closeEventDetails() {
      this.selectedEvent = null
    },

    handleBookEvent(event) {
      this.$router.push(`/booking/${event.id}`)
    },

    bookEvent(event) {
      this.handleBookEvent(event)
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('nl-NL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },

    handleImageError(event) {
      event.target.src = '/images/event-placeholder.jpg'
    }
  }
}
</script>

<style scoped>
.favorite-events {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.favorites-header {
  text-align: center;
  margin-bottom: 40px;
}

.favorites-header h2 {
  margin: 0 0 10px 0;
  color: #e74c3c;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.subtitle {
  color: #7f8c8d;
  font-size: 16px;
  margin: 0;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.favorite-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.favorite-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.event-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.favorite-card:hover .event-image img {
  transform: scale(1.05);
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #bdc3c7;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.favorite-btn:hover,
.favorite-btn.active {
  background: #e74c3c;
  color: white;
  transform: scale(1.1);
}

.event-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  color: white;
}

.badge.new { background: #e74c3c; }
.badge.limited { background: #e67e22; }

.event-content {
  padding: 20px;
}

.event-date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 10px;
}

.event-title {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.3;
}

.event-location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 10px;
}

.event-description {
  color: #5d6d7e;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #7f8c8d;
  font-size: 12px;
}

.event-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.event-price {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
}

.original-price {
  font-size: 14px;
  color: #95a5a6;
  text-decoration: line-through;
}

.event-actions {
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

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
}

.btn-primary:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
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

.btn-danger:hover:not(:disabled) {
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

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.bulk-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 15px;
}

.bulk-info {
  font-weight: 500;
  color: #2c3e50;
}

.bulk-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.recommendations-section {
  margin-top: 40px;
}

.recommendations-section h3 {
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 24px;
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.recommendation-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.recommendation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.recommendation-card .event-image {
  height: 120px;
}

.recommendation-card .event-content {
  padding: 15px;
}

.recommendation-card h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #2c3e50;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-date-small {
  font-size: 12px;
  color: #7f8c8d;
  margin: 0 0 10px 0;
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
  padding: 80px 20px;
  color: #7f8c8d;
}

.empty-state i {
  font-size: 80px;
  margin-bottom: 20px;
  color: #bdc3c7;
}

.empty-state h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 24px;
}

.empty-state p {
  margin: 0 0 30px 0;
  font-size: 16px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .favorite-events {
    padding: 15px;
  }

  .favorites-grid {
    grid-template-columns: 1fr;
  }

  .event-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .event-actions {
    flex-direction: column;
  }

  .event-actions .btn {
    justify-content: center;
  }

  .bulk-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .bulk-buttons {
    justify-content: stretch;
  }

  .bulk-buttons .btn {
    flex: 1;
    justify-content: center;
  }

  .recommendations-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>