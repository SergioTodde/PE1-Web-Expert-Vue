<template>
  <div class="events-view">
    <div class="container">
      <!-- Header Section -->
      <div class="events-header">
        <div class="header-content">
          <h1 class="page-title">Evenementen</h1>
          <p class="page-subtitle">Ontdek alle beschikbare evenementen</p>
        </div>
        <div class="header-actions">
          <button
              v-if="$store.getters['auth/isAuthenticated']"
              @click="showCreateEventModal = true"
              class="btn-create-event"
          >
            <span class="btn-icon">
              <i class="fas fa-plus"></i>
            </span>
            <span class="btn-text">Nieuw Evenement</span>
          </button>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="search-filters-section">
        <div class="search-section">
          <SearchBar @search="handleSearch" />
        </div>

        <div class="filters-section">
          <div class="filters-header">
            <h3>
              <i class="fas fa-filter"></i>
              Filters
            </h3>
            <button
                @click="clearFilters"
                class="btn-clear-filters"
                :disabled="!hasActiveFilters"
            >
              <i class="fas fa-times"></i>
              Wissen
            </button>
          </div>

          <div class="filters-grid">
            <!-- Category Filter -->
            <div class="filter-card">
              <div class="filter-header">
                <i class="fas fa-tag filter-icon"></i>
                <label class="filter-title">Categorie</label>
              </div>
              <select
                  v-model="filters.category"
                  @change="applyFilters"
                  class="filter-select"
              >
                <option value="">Alle categorieën</option>
                <option
                    v-for="category in categories"
                    :key="category"
                    :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </div>

            <!-- Location Filter -->
            <div class="filter-card">
              <div class="filter-header">
                <i class="fas fa-map-marker-alt filter-icon"></i>
                <label class="filter-title">Locatie</label>
              </div>
              <div class="input-with-icon">
                <i class="fas fa-search input-icon"></i>
                <input
                    type="text"
                    v-model="filters.location"
                    placeholder="Zoek op locatie..."
                    @input="applyFilters"
                    class="filter-input"
                >
              </div>
            </div>

            <!-- Date Filter -->
            <div class="filter-card">
              <div class="filter-header">
                <i class="fas fa-calendar-day filter-icon"></i>
                <label class="filter-title">Datum</label>
              </div>
              <div class="input-with-icon">
                <i class="fas fa-calendar input-icon"></i>
                <input
                    type="date"
                    v-model="filters.date"
                    @change="applyFilters"
                    class="filter-input"
                >
              </div>
            </div>
          </div>

          <!-- Active Filters Badges -->
          <div v-if="hasActiveFilters" class="active-filters">
            <div class="active-filters-header">
              <span>Actieve filters:</span>
            </div>
            <div class="filter-badges">
              <span
                  v-if="filters.category"
                  class="filter-badge"
                  @click="clearFilter('category')"
              >
                Categorie: {{ filters.category }}
                <i class="fas fa-times"></i>
              </span>
              <span
                  v-if="filters.location"
                  class="filter-badge"
                  @click="clearFilter('location')"
              >
                Locatie: {{ filters.location }}
                <i class="fas fa-times"></i>
              </span>
              <span
                  v-if="filters.date"
                  class="filter-badge"
                  @click="clearFilter('date')"
              >
                Datum: {{ formatDate(filters.date) }}
                <i class="fas fa-times"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- View Mode Toggle -->
      <div class="view-mode-section">
        <div class="view-mode-header">
          <h3>Weergave</h3>
        </div>
        <div class="view-mode-toggle">
          <button
              @click="setViewMode('list')"
              :class="{ active: viewMode === 'list' }"
              class="view-btn"
          >
            <i class="fas fa-list"></i>
            Lijstweergave
          </button>
          <button
              @click="setViewMode('calendar')"
              :class="{ active: viewMode === 'calendar' }"
              class="view-btn"
          >
            <i class="fas fa-calendar-alt"></i>
            Kalenderweergave
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <LoadingSpinner v-if="loading" />

      <!-- Events Content -->
      <div v-else class="events-content">
        <!-- Featured Events -->
        <section v-if="featuredEvents.length > 0" class="featured-section">
          <div class="section-header">
            <h2 class="section-title">
              <i class="fas fa-star featured-icon"></i>
              Uitgelichte Evenementen
            </h2>
            <div class="section-actions">
              <button class="btn-view-all">
                Alles bekijken
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div class="featured-events-grid">
            <EventCard
                v-for="event in featuredEvents"
                :key="'featured-' + event.id"
                :event="event"
                :featured="true"
                @toggle-favorite="toggleFavorite"
            />
          </div>
        </section>

        <!-- All Events -->
        <section class="all-events-section">
          <div class="section-header">
            <h2 class="section-title">
              <i class="fas fa-calendar-week"></i>
              Alle Evenementen
              <span class="events-count">({{ filteredEvents.length }})</span>
            </h2>
          </div>

          <!-- List View -->
          <div v-if="viewMode === 'list'" class="events-list">
            <EventCard
                v-for="event in filteredEvents"
                :key="event.id"
                :event="event"
                @toggle-favorite="toggleFavorite"
            />

            <div v-if="filteredEvents.length === 0" class="no-events">
              <div class="no-events-icon">
                <i class="fas fa-calendar-times"></i>
              </div>
              <h3>Geen evenementen gevonden</h3>
              <p>Probeer je zoekcriteria aan te passen of maak een nieuw evenement aan</p>
              <button
                  v-if="$store.getters['auth/isAuthenticated']"
                  @click="showCreateEventModal = true"
                  class="btn-primary"
              >
                <i class="fas fa-plus"></i>
                Maak je eerste evenement
              </button>
            </div>
          </div>

          <!-- Calendar View -->
          <EventCalendar
              v-else
              :events="filteredEvents"
              @event-click="handleEventClick"
          />
        </section>
      </div>

      <!-- Create Event Modal -->
      <EventForm
          v-if="showCreateEventModal"
          :event="null"
          @save="handleCreateEvent"
          @cancel="showCreateEventModal = false"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import SearchBar from '@/components/shared/SearchBar.vue'
import EventCard from '@/components/events/EventCard.vue'
import EventCalendar from '@/components/events/EventCalendar.vue'
import EventForm from '@/components/events/EventForm.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

export default {
  name: 'EventsView',
  components: {
    SearchBar,
    EventCard,
    EventCalendar,
    EventForm,
    LoadingSpinner
  },
  data() {
    return {
      showCreateEventModal: false,
      filters: {
        category: '',
        location: '',
        date: ''
      },
      categories: [
        'Muziek',
        'Sport',
        'Kunst',
        'Technologie',
        'Educatie',
        'Food & Drink',
        'Wellness',
        'Business'
      ]
    }
  },
  computed: {
    ...mapState('events', ['loading', 'viewMode']),
    ...mapGetters('events', ['filteredEvents', 'featuredEvents']),
    ...mapGetters('auth', ['isAuthenticated']),

    hasActiveFilters() {
      return Object.values(this.filters).some(value => value !== '')
    }
  },
  async mounted() {
    await this.fetchEvents()
  },
  methods: {
    ...mapActions('events', [
      'fetchEvents',
      'setViewMode',
      'setSearchQuery',
      'setFilters',
      'toggleFavorite',
      'createEvent'
    ]),

    handleSearch(query) {
      this.setSearchQuery(query)
      this.fetchEvents()
    },

    applyFilters() {
      this.setFilters(this.filters)
      this.fetchEvents()
    },

    clearFilters() {
      this.filters = {
        category: '',
        location: '',
        date: ''
      }
      this.applyFilters()
    },

    clearFilter(filterName) {
      this.filters[filterName] = ''
      this.applyFilters()
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('nl-NL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    },

    handleEventClick(event) {
      this.$router.push({ name: 'EventDetail', params: { id: event.id } })
    },

    async handleCreateEvent(eventData) {
      try {
        await this.createEvent(eventData)
        this.showCreateEventModal = false
        this.$toast.success('Evenement succesvol aangemaakt!')
      } catch (error) {
        this.$toast.error('Fout bij aanmaken evenement')
      }
    }
  }
}
</script>

<style scoped>
.events-view {
  padding: 2rem 0;
  min-height: 100vh;
  background: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header Section */
.events-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.btn-create-event {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-create-event:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-icon {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 8px;
}

/* Search and Filters Section */
.search-filters-section {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.search-section {
  margin-bottom: 2rem;
}

.filters-section {
  border-top: 2px solid #f1f5f9;
  padding-top: 2rem;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.filters-header h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.3rem;
  color: #1e293b;
  margin: 0;
  font-weight: 600;
}

.filters-header h3 i {
  color: #667eea;
}

.btn-clear-filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
}

.btn-clear-filters:hover:not(:disabled) {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
  transform: translateY(-1px);
}

.btn-clear-filters:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Filters Grid */
.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.filter-card {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.filter-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filter-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.filter-icon {
  color: #667eea;
  font-size: 1rem;
  width: 20px;
  text-align: center;
}

.filter-title {
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
  margin: 0;
}

/* Input and Select Styles */
.filter-select,
.filter-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  background: white;
  color: #374151;
}

.filter-select:focus,
.filter-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* Input with Icon */
.input-with-icon {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 0.9rem;
}

.input-with-icon .filter-input {
  padding-left: 2.5rem;
}

/* Active Filters */
.active-filters {
  background: #f0f9ff;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid #e0f2fe;
}

.active-filters-header {
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.filter-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #374151;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid #d1d5db;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-badge:hover {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
  transform: translateY(-1px);
}

.filter-badge i {
  font-size: 0.7rem;
}

/* View Mode Section */
.view-mode-section {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.view-mode-header {
  margin-bottom: 1rem;
}

.view-mode-header h3 {
  font-size: 1.2rem;
  color: #374151;
  margin: 0;
  font-weight: 600;
}

.view-mode-toggle {
  display: flex;
  gap: 1rem;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #64748b;
  flex: 1;
  justify-content: center;
}

.view-btn:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

.view-btn.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* Sections */
.featured-section,
.all-events-section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.8rem;
  color: #2d3748;
  margin: 0;
}

.featured-icon {
  color: #f59e0b;
}

.events-count {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 1rem;
}

.section-actions {
  display: flex;
  gap: 1rem;
}

.btn-view-all {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 2px solid #667eea;
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn-view-all:hover {
  background: #667eea;
  color: white;
}

/* Events Grid */
.featured-events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.events-list {
  display: grid;
  gap: 1.5rem;
}

/* No Events State */
.no-events {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  color: #64748b;
}

.no-events-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.no-events h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #4a5568;
}

.no-events p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .featured-events-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .events-header {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .search-filters-section {
    padding: 1.5rem;
  }

  .filters-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .view-mode-toggle {
    flex-direction: column;
  }

  .featured-events-grid {
    grid-template-columns: 1fr;
  }

  .filter-badges {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-badge {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .featured-events-grid {
    gap: 1rem;
  }

  .view-mode-section {
    padding: 1.5rem;
  }

  .view-btn {
    padding: 0.75rem 1rem;
  }
}
</style>