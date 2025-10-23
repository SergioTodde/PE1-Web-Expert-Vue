<template>
  <div class="event-list">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Evenementen laden...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="events.length === 0" class="empty-state">
      <div class="empty-icon">
        <i class="fas fa-calendar-times"></i>
      </div>
      <h3>Geen evenementen gevonden</h3>
      <p v-if="hasFilters">Probeer je zoekcriteria aan te passen</p>
      <p v-else>Er zijn momenteel geen evenementen beschikbaar</p>
      <button v-if="hasFilters" @click="clearFilters" class="btn btn-primary">
        <i class="fas fa-times"></i>
        Filters wissen
      </button>
      <router-link v-else to="/create-event" class="btn btn-primary">
        <i class="fas fa-plus"></i>
        Maak eerste evenement
      </router-link>
    </div>

    <!-- Events Grid -->
    <div v-else class="events-grid" :class="viewMode">
      <EventCard
          v-for="event in sortedEvents"
          :key="event.id"
          :event="event"
          :featured="event.is_featured"
          :show-organizer="showOrganizer"
          @toggle-favorite="handleToggleFavorite"
          @view-details="handleViewDetails"
          @book-tickets="handleBookTickets"
      />
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore && !loading" class="load-more-section">
      <button @click="loadMore" class="btn btn-outline btn-load-more">
        <i class="fas fa-plus"></i>
        Meer evenementen laden
      </button>
    </div>

    <!-- End of List -->
    <div v-if="!hasMore && events.length > 0" class="end-of-list">
      <p>Je hebt alle evenementen gezien!</p>
    </div>
  </div>
</template>

<script>
import EventCard from './EventCard.vue'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  props: {
    events: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    viewMode: {
      type: String,
      default: 'grid', // 'grid' or 'list'
      validator: (value) => ['grid', 'list'].includes(value)
    },
    sortBy: {
      type: String,
      default: 'date', // 'date', 'title', 'price', 'popularity'
      validator: (value) => ['date', 'title', 'price', 'popularity'].includes(value)
    },
    sortOrder: {
      type: String,
      default: 'asc', // 'asc' or 'desc'
      validator: (value) => ['asc', 'desc'].includes(value)
    },
    showOrganizer: {
      type: Boolean,
      default: true
    },
    paginated: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    hasMore: {
      type: Boolean,
      default: false
    },
    hasFilters: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'toggle-favorite',
    'view-details',
    'book-tickets',
    'load-more',
    'clear-filters'
  ],
  computed: {
    sortedEvents() {
      if (!this.events.length) return []

      const events = [...this.events]

      switch (this.sortBy) {
        case 'date':
          return events.sort((a, b) => {
            const dateA = new Date(a.start_date)
            const dateB = new Date(b.start_date)
            return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA
          })

        case 'title':
          return events.sort((a, b) => {
            const titleA = a.title.toLowerCase()
            const titleB = b.title.toLowerCase()
            if (this.sortOrder === 'asc') {
              return titleA.localeCompare(titleB)
            } else {
              return titleB.localeCompare(titleA)
            }
          })

        case 'price':
          return events.sort((a, b) => {
            const priceA = this.getLowestPrice(a) || 0
            const priceB = this.getLowestPrice(b) || 0
            return this.sortOrder === 'asc' ? priceA - priceB : priceB - priceA
          })

        case 'popularity':
          return events.sort((a, b) => {
            const popularityA = (a.favorite_count || 0) + (a.views || 0)
            const popularityB = (b.favorite_count || 0) + (b.views || 0)
            return this.sortOrder === 'asc' ? popularityA - popularityB : popularityB - popularityA
          })

        default:
          return events
      }
    }
  },
  methods: {
    getLowestPrice(event) {
      if (!event.tickets || !event.tickets.length) return null
      return Math.min(...event.tickets.map(ticket => ticket.price))
    },

    handleToggleFavorite(eventId) {
      this.$emit('toggle-favorite', eventId)
    },

    handleViewDetails(event) {
      this.$emit('view-details', event)
    },

    handleBookTickets(event) {
      this.$emit('book-tickets', event)
    },

    loadMore() {
      this.$emit('load-more')
    },

    clearFilters() {
      this.$emit('clear-filters')
    }
  }
}
</script>

<style scoped>
.event-list {
  width: 100%;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #6c757d;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
}

.empty-icon {
  font-size: 4rem;
  color: #dee2e6;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  color: #495057;
  margin-bottom: 1rem;
}

.empty-state p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.events-grid {
  display: grid;
  gap: 1.5rem;
}

.events-grid.grid {
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}

.events-grid.list {
  grid-template-columns: 1fr;
  gap: 1rem;
}

.events-grid.list .event-card {
  display: flex;
  min-height: 200px;
}

.events-grid.list .event-image {
  width: 300px;
  height: auto;
  flex-shrink: 0;
}

.events-grid.list .event-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.events-grid.list .event-actions {
  margin-top: auto;
}

.load-more-section {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.btn-load-more {
  padding: 1rem 2rem;
  font-size: 1rem;
}

.end-of-list {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-style: italic;
  border-top: 1px solid #e9ecef;
  margin-top: 2rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .events-grid.grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

@media (max-width: 768px) {
  .events-grid.grid {
    grid-template-columns: 1fr;
  }

  .events-grid.list .event-card {
    flex-direction: column;
  }

  .events-grid.list .event-image {
    width: 100%;
    height: 200px;
  }

  .loading-state,
  .empty-state {
    padding: 3rem 1rem;
  }

  .empty-icon {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .events-grid {
    gap: 1rem;
  }

  .load-more-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }

  .btn-load-more {
    width: 100%;
  }
}

/* Animation for new items */
.event-card {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger animation for multiple items */
.events-grid.grid .event-card:nth-child(odd) {
  animation-delay: 0.1s;
}

.events-grid.grid .event-card:nth-child(even) {
  animation-delay: 0.2s;
}

/* Hover effects for list view */
.events-grid.list .event-card:hover {
  transform: translateX(5px);
}

/* Custom scrollbar for grid */
.events-grid {
  scrollbar-width: thin;
  scrollbar-color: #007bff #f1f1f1;
}

.events-grid::-webkit-scrollbar {
  width: 6px;
}

.events-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.events-grid::-webkit-scrollbar-thumb {
  background: #007bff;
  border-radius: 3px;
}

.events-grid::-webkit-scrollbar-thumb:hover {
  background: #0056b3;
}
</style>