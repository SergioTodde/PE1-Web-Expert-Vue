<template>
  <div class="admin-events">
    <div class="admin-header">
      <h2>Evenementen Beheer</h2>
      <div class="header-actions">
        <button @click="exportEvents" class="btn btn-outline">
          <i class="fas fa-download"></i>
          Exporteren
        </button>
        <button @click="refreshEvents" class="btn btn-outline">
          <i class="fas fa-sync-alt"></i>
          Vernieuwen
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <div class="filter-group">
        <label>Status:</label>
        <select v-model="filters.status" @change="applyFilters">
          <option value="">Alle</option>
          <option value="active">Actief</option>
          <option value="upcoming">Binnenkort</option>
          <option value="past">Afgelopen</option>
          <option value="draft">Concept</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Categorie:</label>
        <select v-model="filters.category" @change="applyFilters">
          <option value="">Alle</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>Zoeken:</label>
        <input
            v-model="filters.search"
            type="text"
            placeholder="Titel, locatie..."
            @input="applyFilters"
        >
      </div>
    </div>

    <!-- Events Table -->
    <div class="table-container">
      <table class="admin-table">
        <thead>
        <tr>
          <th>
            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
          </th>
          <th @click="sortBy('title')" class="sortable">
            Titel
            <i class="fas" :class="sortIcon('title')"></i>
          </th>
          <th @click="sortBy('organizer')" class="sortable">
            Organisator
            <i class="fas" :class="sortIcon('organizer')"></i>
          </th>
          <th @click="sortBy('date')" class="sortable">
            Datum
            <i class="fas" :class="sortIcon('date')"></i>
          </th>
          <th @click="sortBy('tickets_sold')" class="sortable">
            Tickets
            <i class="fas" :class="sortIcon('tickets_sold')"></i>
          </th>
          <th @click="sortBy('status')" class="sortable">
            Status
            <i class="fas" :class="sortIcon('status')"></i>
          </th>
          <th>Acties</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="event in paginatedEvents" :key="event.id">
          <td>
            <input type="checkbox" v-model="selectedEvents" :value="event.id">
          </td>
          <td>
            <div class="event-cell">
              <img :src="event.image_url" :alt="event.title" class="event-thumb">
              <div class="event-info">
                <strong>{{ event.title }}</strong>
                <span class="event-category">{{ event.category }}</span>
              </div>
            </div>
          </td>
          <td>
            <div class="organizer-cell">
              <img :src="event.organizer.avatar" :alt="event.organizer.name" class="organizer-avatar">
              <span>{{ event.organizer.name }}</span>
            </div>
          </td>
          <td>{{ formatDate(event.start_date) }}</td>
          <td>
            <div class="tickets-cell">
              <span class="tickets-sold">{{ event.tickets_sold || 0 }}</span>
              <span class="tickets-total">/ {{ event.total_tickets || 0 }}</span>
            </div>
          </td>
          <td>
              <span class="status-badge" :class="getEventStatus(event)">
                {{ getEventStatusText(event) }}
              </span>
          </td>
          <td>
            <div class="action-buttons">
              <button @click="viewEvent(event)" class="btn-icon" title="Bekijken">
                <i class="fas fa-eye"></i>
              </button>
              <button @click="editEvent(event)" class="btn-icon" title="Bewerken">
                <i class="fas fa-edit"></i>
              </button>
              <button
                  @click="toggleEventStatus(event)"
                  class="btn-icon"
                  :class="{ 'btn-warning': event.is_public }"
                  :title="event.is_public ? 'Deactiveren' : 'Activeren'"
              >
                <i class="fas" :class="event.is_public ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
              <button @click="deleteEvent(event)" class="btn-icon btn-danger" title="Verwijderen">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Bulk Actions -->
    <div v-if="selectedEvents.length > 0" class="bulk-actions">
      <span>{{ selectedEvents.length }} evenementen geselecteerd</span>
      <div class="bulk-buttons">
        <button @click="bulkActivate" class="btn btn-success btn-sm">
          <i class="fas fa-eye"></i>
          Activeren
        </button>
        <button @click="bulkDeactivate" class="btn btn-warning btn-sm">
          <i class="fas fa-eye-slash"></i>
          Deactiveren
        </button>
        <button @click="bulkDelete" class="btn btn-danger btn-sm">
          <i class="fas fa-trash"></i>
          Verwijderen
        </button>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="btn btn-outline"
      >
        <i class="fas fa-chevron-left"></i>
      </button>

      <span class="page-info">
        Pagina {{ currentPage }} van {{ totalPages }}
      </span>

      <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="btn btn-outline"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <LoadingSpinner />
      <p>Evenementen laden...</p>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && filteredEvents.length === 0" class="empty-state">
      <i class="fas fa-calendar-times"></i>
      <h3>Geen evenementen gevonden</h3>
      <p>Er zijn geen evenementen die voldoen aan je filters.</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

export default {
  name: 'AdminEvents',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      loading: false,
      selectedEvents: [],
      currentPage: 1,
      itemsPerPage: 10,
      sortField: 'date',
      sortDirection: 'desc',
      filters: {
        status: '',
        category: '',
        search: ''
      },
      categories: [
        'Muziek', 'Sport', 'Kunst', 'Technologie', 'Educatie',
        'Food & Drink', 'Wellness', 'Business', 'Anders'
      ]
    }
  },
  computed: {
    ...mapGetters('events', ['events']),

    filteredEvents() {
      let events = [...this.events]

      // Apply status filter
      if (this.filters.status) {
        events = events.filter(event => this.getEventStatus(event) === this.filters.status)
      }

      // Apply category filter
      if (this.filters.category) {
        events = events.filter(event => event.category === this.filters.category)
      }

      // Apply search filter
      if (this.filters.search) {
        const query = this.filters.search.toLowerCase()
        events = events.filter(event =>
            event.title.toLowerCase().includes(query) ||
            event.location.toLowerCase().includes(query) ||
            event.organizer.name.toLowerCase().includes(query)
        )
      }

      // Apply sorting
      events.sort((a, b) => {
        let aValue, bValue

        switch (this.sortField) {
          case 'title':
            aValue = a.title.toLowerCase()
            bValue = b.title.toLowerCase()
            break
          case 'organizer':
            aValue = a.organizer.name.toLowerCase()
            bValue = b.organizer.name.toLowerCase()
            break
          case 'date':
            aValue = new Date(a.start_date)
            bValue = new Date(b.start_date)
            break
          case 'tickets_sold':
            aValue = a.tickets_sold || 0
            bValue = b.tickets_sold || 0
            break
          case 'status':
            aValue = this.getEventStatus(a)
            bValue = this.getEventStatus(b)
            break
          default:
            aValue = a[this.sortField]
            bValue = b[this.sortField]
        }

        if (this.sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })

      return events
    },

    paginatedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredEvents.slice(start, end)
    },

    totalPages() {
      return Math.ceil(this.filteredEvents.length / this.itemsPerPage)
    },

    selectAll: {
      get() {
        return this.filteredEvents.length > 0 &&
            this.selectedEvents.length === this.filteredEvents.length
      },
      set(value) {
        if (value) {
          this.selectedEvents = this.filteredEvents.map(event => event.id)
        } else {
          this.selectedEvents = []
        }
      }
    }
  },
  async mounted() {
    await this.loadEvents()
  },
  methods: {
    ...mapActions('events', ['fetchEvents', 'deleteEvent', 'updateEvent']),

    async loadEvents() {
      this.loading = true
      try {
        await this.fetchEvents()
      } catch (error) {
        this.$toast.error('Fout bij laden evenementen')
      } finally {
        this.loading = false
      }
    },

    sortBy(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortField = field
        this.sortDirection = 'asc'
      }
    },

    sortIcon(field) {
      if (this.sortField !== field) return 'fa-sort'
      return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down'
    },

    applyFilters() {
      this.currentPage = 1
    },

    getEventStatus(event) {
      const now = new Date()
      const startDate = new Date(event.start_date)
      const endDate = new Date(event.end_date)

      if (!event.is_public) return 'draft'
      if (now < startDate) return 'upcoming'
      if (now > endDate) return 'past'
      return 'active'
    },

    getEventStatusText(event) {
      const status = this.getEventStatus(event)
      const statusTexts = {
        draft: 'Concept',
        upcoming: 'Binnenkort',
        active: 'Actief',
        past: 'Afgelopen'
      }
      return statusTexts[status]
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('nl-BE')
    },

    viewEvent(event) {
      this.$router.push({ name: 'EventDetail', params: { id: event.id } })
    },

    editEvent(event) {
      this.$router.push({ name: 'EditEvent', params: { id: event.id } })
    },

    async toggleEventStatus(event) {
      try {
        await this.updateEvent({
          eventId: event.id,
          eventData: { is_public: !event.is_public }
        })
        this.$toast.success(`Evenement ${event.is_public ? 'gedeactiveerd' : 'geactiveerd'}`)
      } catch (error) {
        this.$toast.error('Fout bij bijwerken evenement')
      }
    },

    async deleteEvent(event) {
      if (confirm(`Weet je zeker dat je "${event.title}" wilt verwijderen?`)) {
        try {
          await this.deleteEvent(event.id)
          this.$toast.success('Evenement verwijderd')
        } catch (error) {
          this.$toast.error('Fout bij verwijderen evenement')
        }
      }
    },

    bulkActivate() {
      // Implement bulk activate
      this.$toast.info(`${this.selectedEvents.length} evenementen activeren...`)
      this.selectedEvents = []
    },

    bulkDeactivate() {
      // Implement bulk deactivate
      this.$toast.info(`${this.selectedEvents.length} evenementen deactiveren...`)
      this.selectedEvents = []
    },

    bulkDelete() {
      if (confirm(`Weet je zeker dat je ${this.selectedEvents.length} evenementen wilt verwijderen?`)) {
        // Implement bulk delete
        this.$toast.info(`${this.selectedEvents.length} evenementen verwijderen...`)
        this.selectedEvents = []
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },

    refreshEvents() {
      this.loadEvents()
      this.$toast.success('Evenementen vernieuwd')
    },

    exportEvents() {
      // Implement export functionality
      this.$toast.info('Exporteer evenementen...')
    }
  }
}
</script>

<style scoped>
.admin-events {
  padding: 1rem 0;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.admin-header h2 {
  margin: 0;
  color: #333;
}

.filters-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #495057;
}

.filter-group select,
.filter-group input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
}

.table-container {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th,
.admin-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.admin-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #495057;
  position: sticky;
  top: 0;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  background: #e9ecef;
}

.event-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.event-thumb {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
}

.event-info {
  display: flex;
  flex-direction: column;
}

.event-info strong {
  color: #333;
  margin-bottom: 0.25rem;
}

.event-category {
  font-size: 0.8rem;
  color: #6c757d;
}

.organizer-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.organizer-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.tickets-cell {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.tickets-sold {
  font-weight: 600;
  color: #333;
}

.tickets-total {
  color: #6c757d;
  font-size: 0.9rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.draft {
  background: #6c757d;
  color: white;
}

.status-badge.upcoming {
  background: #ffc107;
  color: #212529;
}

.status-badge.active {
  background: #28a745;
  color: white;
}

.status-badge.past {
  background: #dc3545;
  color: white;
}

.action-buttons {
  display: flex;
  gap: 0.25rem;
}

.btn-icon {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  color: #6c757d;
  transition: all 0.3s ease;
}

.btn-icon:hover {
  background: #f8f9fa;
  color: #007bff;
}

.btn-icon.btn-warning:hover {
  color: #ffc107;
}

.btn-icon.btn-danger:hover {
  color: #dc3545;
  background: #f8d7da;
}

.bulk-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #e7f3ff;
  border: 1px solid #b3d9ff;
  border-radius: 6px;
  margin: 1rem 0;
}

.bulk-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.page-info {
  color: #6c757d;
  font-weight: 600;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.empty-state i {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  margin: 0 0 1rem 0;
  color: #495057;
}

@media (max-width: 768px) {
  .admin-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .filters-section {
    flex-direction: column;
  }

  .filter-group select,
  .filter-group input {
    min-width: 100%;
  }

  .action-buttons {
    flex-direction: column;
  }

  .bulk-actions {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>