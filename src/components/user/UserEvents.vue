<template>
  <div class="user-events">
    <div class="events-header">
      <h2>Evenementen</h2>
      <div class="header-controls">
        <div class="search-box">
          <input
              v-model="searchQuery"
              @input="handleSearch"
              placeholder="Zoek evenementen..."
              class="search-input"
          >
          <i class="fas fa-search search-icon"></i>
        </div>
        <select v-model="categoryFilter" @change="filterEvents" class="category-filter">
          <option value="">Alle categorieën</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <select v-model="sortBy" @change="sortEvents" class="sort-select">
          <option value="date">Datum</option>
          <option value="name">Naam</option>
          <option value="price">Prijs</option>
        </select>
      </div>
    </div>

    <div class="events-container">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Evenementen laden...</p>
      </div>

      <div v-else-if="filteredEvents.length === 0" class="empty-state">
        <i class="fas fa-calendar-times"></i>
        <h3>Geen evenementen gevonden</h3>
        <p>Probeer een andere zoekterm of filter</p>
      </div>

      <div v-else class="events-grid">
        <div
            v-for="event in filteredEvents"
            :key="event.id"
            class="event-card"
            @click="viewEventDetails(event.id)"
        >
          <div class="event-image">
            <img :src="event.imageUrl" :alt="event.title" @error="handleImageError">
            <div class="event-badges">
              <span v-if="event.isNew" class="badge new">Nieuw</span>
              <span v-if="event.isPopular" class="badge popular">Populair</span>
              <span v-if="event.ticketsLeft < 10" class="badge limited">Bijna vol</span>
            </div>
            <button
                class="favorite-btn"
                @click.stop="toggleFavorite(event.id)"
                :class="{ active: event.isFavorite }"
            >
              <i class="fas fa-heart"></i>
            </button>
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
                    @click.stop="bookEvent(event)"
                >
                  {{ event.ticketsLeft > 0 ? 'Boek Nu' : 'Uitverkocht' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMoreEvents && !loading" class="load-more">
      <button @click="loadMoreEvents" class="btn btn-outline">
        Meer evenementen laden
      </button>
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
  name: 'UserEvents',
  components: {
    EventDetailsModal
  },
  data() {
    return {
      events: [],
      filteredEvents: [],
      categories: [],
      loading: false,
      searchQuery: '',
      categoryFilter: '',
      sortBy: 'date',
      selectedEvent: null,
      currentPage: 1,
      hasMoreEvents: true,
      searchTimeout: null
    }
  },
  async mounted() {
    await this.loadInitialData()
  },
  methods: {
    async loadInitialData() {
      this.loading = true
      try {
        await Promise.all([
          this.loadEvents(),
          this.loadCategories()
        ])
      } catch (error) {
        console.error('Fout bij laden data:', error)
        this.$toast.error('Kon evenementen niet laden')
      } finally {
        this.loading = false
      }
    },

    async loadEvents() {
      const params = {
        page: this.currentPage,
        search: this.searchQuery,
        category: this.categoryFilter,
        sort: this.sortBy
      }

      const response = await this.$api.get('/user/events', { params })
      const newEvents = response.data.events

      if (this.currentPage === 1) {
        this.events = newEvents
      } else {
        this.events = [...this.events, ...newEvents]
      }

      this.filteredEvents = [...this.events]
      this.hasMoreEvents = response.data.hasMore
    },

    async loadCategories() {
      const response = await this.$api.get('/categories')
      this.categories = response.data
    },

    handleSearch() {
      // Debounce zoekopdracht
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1
        this.loadEvents()
      }, 500)
    },

    filterEvents() {
      this.currentPage = 1
      this.loadEvents()
    },

    sortEvents() {
      this.currentPage = 1
      this.loadEvents()
    },

    async loadMoreEvents() {
      this.currentPage++
      await this.loadEvents()
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

    async toggleFavorite(eventId) {
      try {
        const event = this.events.find(e => e.id === eventId)
        if (event.isFavorite) {
          await this.$api.delete(`/user/favorites/${eventId}`)
          this.$toast.success('Verwijderd uit favorieten')
        } else {
          await this.$api.post(`/user/favorites/${eventId}`)
          this.$toast.success('Toegevoegd aan favorieten')
        }

        // Update local state
        event.isFavorite = !event.isFavorite
      } catch (error) {
        this.$toast.error('Kon favoriet niet bijwerken')
      }
    },

    handleBookEvent(event) {
      this.$router.push(`/booking/${event.id}`)
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
.user-events {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.events-header {
  margin-bottom: 30px;
}

.events-header h2 {
  margin: 0 0 20px 0;
  color: #2c3e50;
  font-size: 28px;
}

.header-controls {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
}

.category-filter,
.sort-select {
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  min-width: 150px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.event-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.event-card:hover {
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

.event-card:hover .event-image img {
  transform: scale(1.05);
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
.badge.popular { background: #9b59b6; }
.badge.limited { background: #e67e22; }

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #bdc3c7;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-btn:hover,
.favorite-btn.active {
  background: #e74c3c;
  color: white;
}

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

.event-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
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

.btn-outline {
  background: transparent;
  border: 2px solid #3498db;
  color: #3498db;
}

.btn-outline:hover {
  background: #3498db;
  color: white;
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
  padding: 60px 20px;
  color: #7f8c8d;
}

.empty-state i {
  font-size: 64px;
  margin-bottom: 20px;
  color: #bdc3c7;
}

.empty-state h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.load-more {
  text-align: center;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .user-events {
    padding: 15px;
  }

  .header-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    min-width: auto;
  }

  .category-filter,
  .sort-select {
    min-width: auto;
  }

  .events-grid {
    grid-template-columns: 1fr;
  }

  .event-footer {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .event-actions .btn {
    width: 100%;
  }
}
</style>