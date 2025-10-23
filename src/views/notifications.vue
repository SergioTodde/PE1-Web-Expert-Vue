<template>
  <div class="notifications-view">
    <!-- Header Section -->
    <div class="notifications-header">
      <div class="container">
        <div class="header-content">
          <div class="header-text">
            <h1 class="page-title">Meldingen</h1>
            <p class="page-subtitle">Blijf op de hoogte van alle activiteiten</p>
          </div>
          <div class="header-actions">
            <button
                @click="markAllAsRead"
                class="btn-mark-all"
                :disabled="unreadCount === 0"
            >
              <i class="fas fa-check-double"></i>
              Alles als gelezen markeren
            </button>
            <button
                @click="showSettings = true"
                class="btn-settings"
            >
              <i class="fas fa-cog"></i>
              Instellingen
            </button>
          </div>
        </div>

        <!-- Stats Bar -->
        <div class="stats-bar">
          <div class="stat-item">
            <span class="stat-number">{{ unreadCount }}</span>
            <span class="stat-label">Ongelezen</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ notifications.length }}</span>
            <span class="stat-label">Totaal</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ todayCount }}</span>
            <span class="stat-label">Vandaag</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- Filters and Actions -->
      <div class="filters-section">
        <div class="filters-left">
          <div class="filter-group">
            <button
                @click="setFilter('all')"
                :class="{ active: currentFilter === 'all' }"
                class="filter-btn"
            >
              Alle meldingen
            </button>
            <button
                @click="setFilter('unread')"
                :class="{ active: currentFilter === 'unread' }"
                class="filter-btn"
            >
              Ongelezen
              <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
            </button>
            <button
                @click="setFilter('events')"
                :class="{ active: currentFilter === 'events' }"
                class="filter-btn"
            >
              Evenementen
            </button>
            <button
                @click="setFilter('system')"
                :class="{ active: currentFilter === 'system' }"
                class="filter-btn"
            >
              Systeem
            </button>
          </div>
        </div>

        <div class="filters-right">
          <div class="search-box">
            <i class="fas fa-search search-icon"></i>
            <input
                type="text"
                v-model="searchQuery"
                placeholder="Zoek in meldingen..."
                class="search-input"
            >
          </div>
          <button
              @click="toggleSortOrder"
              class="sort-btn"
          >
            <i class="fas" :class="sortAscending ? 'fa-sort-up' : 'fa-sort-down'"></i>
            Sorteren
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <p>Meldingen laden...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredNotifications.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-bell-slash"></i>
        </div>
        <h3>Geen meldingen gevonden</h3>
        <p v-if="currentFilter !== 'all' || searchQuery">
          Probeer je filters aan te passen of je zoekterm te wijzigen
        </p>
        <p v-else>
          Je hebt op dit moment geen meldingen. We laten het weten wanneer er nieuws is!
        </p>
        <button
            v-if="currentFilter !== 'all' || searchQuery"
            @click="clearFilters"
            class="btn-primary"
        >
          <i class="fas fa-times"></i>
          Alle filters wissen
        </button>
      </div>

      <!-- Notifications List -->
      <div v-else class="notifications-list">
        <div
            v-for="notification in filteredNotifications"
            :key="notification.id"
            :class="['notification-item', { unread: !notification.read, priority: notification.priority }]"
            @click="handleNotificationClick(notification)"
        >
          <div class="notification-icon">
            <i :class="getNotificationIcon(notification.type)"></i>
          </div>

          <div class="notification-content">
            <div class="notification-header">
              <h4 class="notification-title">{{ notification.title }}</h4>
              <span class="notification-time">{{ formatTime(notification.timestamp) }}</span>
            </div>
            <p class="notification-message">{{ notification.message }}</p>

            <div v-if="notification.meta" class="notification-meta">
              <span class="meta-item" v-if="notification.meta.event">
                <i class="fas fa-calendar"></i>
                {{ notification.meta.event }}
              </span>
              <span class="meta-item" v-if="notification.meta.user">
                <i class="fas fa-user"></i>
                {{ notification.meta.user }}
              </span>
            </div>

            <div v-if="notification.actions" class="notification-actions">
              <button
                  v-for="action in notification.actions"
                  :key="action.label"
                  @click.stop="handleAction(notification, action)"
                  :class="['action-btn', action.type]"
              >
                {{ action.label }}
              </button>
            </div>
          </div>

          <div class="notification-actions-right">
            <button
                v-if="!notification.read"
                @click.stop="markAsRead(notification)"
                class="btn-mark-read"
                title="Markeren als gelezen"
            >
              <i class="fas fa-circle"></i>
            </button>
            <button
                @click.stop="deleteNotification(notification)"
                class="btn-delete"
                title="Verwijderen"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="hasMoreNotifications && !loading" class="load-more-section">
        <button @click="loadMore" class="btn-load-more">
          <i class="fas fa-redo"></i>
          Meer meldingen laden
        </button>
      </div>
    </div>

    <!-- Settings Modal -->
    <div v-if="showSettings" class="modal-overlay" @click="showSettings = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Meldingen Instellingen</h3>
          <button @click="showSettings = false" class="modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <div class="settings-section">
            <h4>Meldingstypes</h4>
            <div class="setting-item">
              <label class="setting-label">
                <input type="checkbox" v-model="settings.emailNotifications" />
                <span class="checkmark"></span>
                E-mail meldingen
              </label>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <input type="checkbox" v-model="settings.pushNotifications" />
                <span class="checkmark"></span>
                Push meldingen
              </label>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <input type="checkbox" v-model="settings.smsNotifications" />
                <span class="checkmark"></span>
                SMS meldingen
              </label>
            </div>
          </div>

          <div class="settings-section">
            <h4>Meldingen voor</h4>
            <div class="setting-item">
              <label class="setting-label">
                <input type="checkbox" v-model="settings.eventReminders" />
                <span class="checkmark"></span>
                Evenement herinneringen
              </label>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <input type="checkbox" v-model="settings.newEvents" />
                <span class="checkmark"></span>
                Nieuwe evenementen
              </label>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <input type="checkbox" v-model="settings.eventUpdates" />
                <span class="checkmark"></span>
                Evenement updates
              </label>
            </div>
            <div class="setting-item">
              <label class="setting-label">
                <input type="checkbox" v-model="settings.systemMessages" />
                <span class="checkmark"></span>
                Systeem berichten
              </label>
            </div>
          </div>

          <div class="settings-section">
            <h4>Frequentie</h4>
            <select v-model="settings.frequency" class="settings-select">
              <option value="immediate">Direct</option>
              <option value="hourly">Elk uur</option>
              <option value="daily">Dagelijks samenvatting</option>
              <option value="weekly">Wekelijks samenvatting</option>
            </select>
          </div>
        </div>

        <div class="modal-actions">
          <button @click="showSettings = false" class="btn-cancel">
            Annuleren
          </button>
          <button @click="saveSettings" class="btn-save">
            Instellingen Opslaan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationsView',
  data() {
    return {
      loading: false,
      showSettings: false,
      currentFilter: 'all',
      searchQuery: '',
      sortAscending: false,
      hasMoreNotifications: true,
      settings: {
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        eventReminders: true,
        newEvents: true,
        eventUpdates: true,
        systemMessages: false,
        frequency: 'immediate'
      },
      notifications: [
        {
          id: 1,
          type: 'event_reminder',
          title: 'Evenement herinnering',
          message: 'Je evenement "Tech Conference 2024" begint over 2 uur',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minuten geleden
          read: false,
          priority: 'high',
          meta: {
            event: 'Tech Conference 2024'
          },
          actions: [
            { label: 'Bekijken', type: 'primary', action: 'view' },
            { label: 'Uitstellen', type: 'secondary', action: 'snooze' }
          ]
        },
        {
          id: 2,
          type: 'new_event',
          title: 'Nieuw evenement in jouw interessegebied',
          message: 'Er is een nieuw evenement "Web Development Workshop" dat mogelijk interessant voor je is',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 uur geleden
          read: false,
          meta: {
            event: 'Web Development Workshop'
          },
          actions: [
            { label: 'Bekijken', type: 'primary', action: 'view' }
          ]
        },
        {
          id: 3,
          type: 'event_update',
          title: 'Evenement bijgewerkt',
          message: 'Het evenement "Design Sprint" heeft een locatiewijziging',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 uur geleden
          read: true,
          meta: {
            event: 'Design Sprint'
          }
        },
        {
          id: 4,
          type: 'system',
          title: 'Welkom bij de app!',
          message: 'Bedankt voor het aanmelden. Begin met het verkennen van evenementen in jouw omgeving.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dag geleden
          read: true
        },
        {
          id: 5,
          type: 'friend_activity',
          title: 'Vriend gaat naar evenement',
          message: 'Sarah gaat naar "JavaScript Meetup" vanavond',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 dagen geleden
          read: true,
          meta: {
            user: 'Sarah',
            event: 'JavaScript Meetup'
          },
          actions: [
            { label: 'Bekijken', type: 'primary', action: 'view' }
          ]
        }
      ]
    }
  },
  computed: {
    filteredNotifications() {
      let filtered = this.notifications

      // Apply filter
      if (this.currentFilter === 'unread') {
        filtered = filtered.filter(n => !n.read)
      } else if (this.currentFilter === 'events') {
        filtered = filtered.filter(n => n.type.includes('event'))
      } else if (this.currentFilter === 'system') {
        filtered = filtered.filter(n => n.type === 'system')
      }

      // Apply search
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(n =>
            n.title.toLowerCase().includes(query) ||
            n.message.toLowerCase().includes(query)
        )
      }

      // Apply sorting
      filtered.sort((a, b) => {
        return this.sortAscending
            ? a.timestamp - b.timestamp
            : b.timestamp - a.timestamp
      })

      return filtered
    },

    unreadCount() {
      return this.notifications.filter(n => !n.read).length
    },

    todayCount() {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return this.notifications.filter(n => new Date(n.timestamp) >= today).length
    }
  },
  methods: {
    setFilter(filter) {
      this.currentFilter = filter
    },

    toggleSortOrder() {
      this.sortAscending = !this.sortAscending
    },

    clearFilters() {
      this.currentFilter = 'all'
      this.searchQuery = ''
    },

    markAsRead(notification) {
      notification.read = true
    },

    markAllAsRead() {
      this.notifications.forEach(notification => {
        notification.read = true
      })
    },

    deleteNotification(notification) {
      const index = this.notifications.findIndex(n => n.id === notification.id)
      if (index !== -1) {
        this.notifications.splice(index, 1)
      }
    },

    handleNotificationClick(notification) {
      this.markAsRead(notification)
      // Navigate based on notification type
      if (notification.type.includes('event')) {
        this.$router.push('/events')
      }
    },

    handleAction(notification, action) {
      this.markAsRead(notification)

      switch (action.action) {
        case 'view':
          if (notification.meta?.event) {
            this.$router.push('/events')
          }
          break
        case 'snooze':
          // Implement snooze logic
          console.log('Snooze notification:', notification.id)
          break
      }
    },

    getNotificationIcon(type) {
      const icons = {
        event_reminder: 'fas fa-bell',
        new_event: 'fas fa-calendar-plus',
        event_update: 'fas fa-edit',
        system: 'fas fa-cog',
        friend_activity: 'fas fa-user-friends'
      }
      return icons[type] || 'fas fa-bell'
    },

    formatTime(timestamp) {
      const now = new Date()
      const diff = now - new Date(timestamp)
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)

      if (minutes < 1) return 'Zojuist'
      if (minutes < 60) return `${minutes} min geleden`
      if (hours < 24) return `${hours} uur geleden`
      if (days === 1) return 'Gisteren'
      return `${days} dagen geleden`
    },

    loadMore() {
      this.loading = true
      // Simulate API call
      setTimeout(() => {
        // In a real app, you would fetch more notifications from an API
        this.hasMoreNotifications = false
        this.loading = false
      }, 1000)
    },

    saveSettings() {
      // In a real app, you would save settings to an API
      console.log('Saving settings:', this.settings)
      this.showSettings = false
      this.$toast.success('Instellingen opgeslagen!')
    }
  },

  mounted() {
    // Simulate loading notifications
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 500)
  }
}
</script>

<style scoped>
.notifications-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Header Section */
.notifications-header {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
  color: white;
  padding: 3rem 0 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.btn-mark-all, .btn-settings {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn-mark-all:hover:not(:disabled), .btn-settings:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.btn-mark-all:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Stats Bar */
.stats-bar {
  display: flex;
  gap: 3rem;
  padding: 1.5rem 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Filters Section */
.filters-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: -1rem auto 2rem;
  position: relative;
  z-index: 10;
}

.filters-left, .filters-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-group {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #e2e8f0;
  background: white;
  color: #64748b;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  position: relative;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.filter-btn:hover:not(.active) {
  border-color: #667eea;
  color: #667eea;
}

.badge {
  background: #ef4444;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: #9ca3af;
}

.search-input {
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  width: 250px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.sort-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #e2e8f0;
  background: white;
  color: #64748b;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.sort-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

/* Notifications List */
.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.notification-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.notification-item.unread {
  border-left: 4px solid #667eea;
  background: #f8fafc;
}

.notification-item.priority {
  border: 2px solid #ef4444;
}

.notification-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: #f1f5f9;
  border-radius: 12px;
  color: #667eea;
  font-size: 1.2rem;
}

.notification-item.unread .notification-icon {
  background: #667eea;
  color: white;
}

.notification-content {
  flex: 1;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.notification-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.notification-item.unread .notification-title {
  color: #111827;
}

.notification-time {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
}

.notification-message {
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.notification-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #6b7280;
  background: #f8fafc;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
}

.notification-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  background: white;
  color: #64748b;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.8rem;
}

.action-btn.primary {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.action-btn:hover {
  transform: translateY(-1px);
}

.action-btn.primary:hover {
  background: #5a6fd8;
  border-color: #5a6fd8;
}

.notification-actions-right {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn-mark-read, .btn-delete {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.btn-mark-read:hover {
  color: #667eea;
  background: #f0f4ff;
}

.btn-delete:hover {
  color: #ef4444;
  background: #fef2f2;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.loading-spinner {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 1rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.empty-icon {
  font-size: 4rem;
  color: #9ca3af;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #374151;
  margin-bottom: 1rem;
}

.empty-state p {
  color: #6b7280;
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

/* Load More Section */
.load-more-section {
  text-align: center;
  padding: 2rem;
}

.btn-load-more {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
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

.btn-load-more:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* Modal */
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
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 2rem;
}

.settings-section {
  margin-bottom: 2rem;
}

.settings-section h4 {
  font-size: 1.1rem;
  color: #374151;
  margin-bottom: 1rem;
  font-weight: 600;
}

.setting-item {
  margin-bottom: 1rem;
}

.setting-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-weight: 500;
  color: #4b5563;
}

.setting-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

.settings-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
}

.settings-select:focus {
  outline: none;
  border-color: #667eea;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
}

.btn-cancel {
  background: #f8fafc;
  color: #374151;
  border: 1px solid #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel:hover {
  background: #e2e8f0;
}

.btn-save {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-save:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .filters-section {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .filters-left, .filters-right {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .header-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .stats-bar {
    gap: 2rem;
    justify-content: center;
  }

  .filters-section {
    margin-top: -2rem;
  }

  .filter-group {
    flex-wrap: wrap;
    justify-content: center;
  }

  .search-input {
    width: 200px;
  }

  .notification-item {
    flex-direction: column;
    gap: 1rem;
  }

  .notification-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .notification-actions-right {
    flex-direction: row;
    align-self: flex-end;
  }

  .modal-overlay {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }

  .header-actions {
    flex-direction: column;
  }

  .stats-bar {
    flex-direction: column;
    gap: 1rem;
  }

  .filters-left, .filters-right {
    flex-direction: column;
    width: 100%;
  }

  .search-input {
    width: 100%;
  }

  .notification-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .notification-actions {
    flex-direction: column;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>