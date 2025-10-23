<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <i class="fas fa-calendar-alt"></i>
          <span>EventPlan</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <router-link to="/events" class="nav-link">
            <i class="fas fa-calendar"></i>
            Evenementen
          </router-link>

          <router-link v-if="isAuthenticated" to="/create-event" class="nav-link">
            <i class="fas fa-plus"></i>
            Evenement Aanmaken
          </router-link>

          <router-link v-if="isAdmin" to="/admin" class="nav-link">
            <i class="fas fa-cog"></i>
            Admin
          </router-link>
        </nav>

        <!-- Search Bar (Desktop) -->
        <div class="search-container">
          <SearchBar @search="handleSearch" />
        </div>

        <!-- User Menu -->
        <div class="user-menu">
          <template v-if="isAuthenticated">
            <!-- Notifications -->
            <div class="notifications">
              <button class="icon-btn" @click="toggleNotifications">
                <i class="fas fa-bell"></i>
                <span v-if="unreadNotifications > 0" class="notification-badge">
                  {{ unreadNotifications }}
                </span>
              </button>
            </div>

            <!-- User Dropdown -->
            <div class="user-dropdown">
              <button class="user-btn" @click="toggleUserDropdown">
                <img :src="currentUser?.avatar || '/images/avatar-placeholder.png'" :alt="currentUser?.name" class="user-avatar">
                <span class="user-name">{{ currentUser?.name || 'Gebruiker' }}</span>
                <i class="fas fa-chevron-down"></i>
              </button>

              <div v-if="showUserDropdown" class="dropdown-menu">
                <router-link to="/profile" class="dropdown-item">
                  <i class="fas fa-user"></i>
                  Mijn Profiel
                </router-link>
                <router-link to="/profile?tab=tickets" class="dropdown-item">
                  <i class="fas fa-ticket-alt"></i>
                  Mijn Tickets
                </router-link>
                <router-link to="/profile?tab=events" class="dropdown-item">
                  <i class="fas fa-calendar"></i>
                  Mijn Evenementen
                </router-link>
                <div class="dropdown-divider"></div>
                <button @click="logout" class="dropdown-item">
                  <i class="fas fa-sign-out-alt"></i>
                  Uitloggen
                </button>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="auth-buttons">
              <router-link to="/login" class="btn btn-outline">Inloggen</router-link>
              <router-link to="/register" class="btn btn-primary">Registreren</router-link>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="mobile-menu">
        <nav class="mobile-nav">
          <router-link to="/events" class="mobile-nav-link" @click="closeMobileMenu">
            <i class="fas fa-calendar"></i>
            Evenementen
          </router-link>

          <router-link v-if="isAuthenticated" to="/create-event" class="mobile-nav-link" @click="closeMobileMenu">
            <i class="fas fa-plus"></i>
            Evenement Aanmaken
          </router-link>

          <router-link v-if="isAdmin" to="/admin" class="mobile-nav-link" @click="closeMobileMenu">
            <i class="fas fa-cog"></i>
            Admin
          </router-link>

          <!-- Mobile Search -->
          <div class="mobile-search">
            <SearchBar @search="handleMobileSearch" />
          </div>

          <!-- Mobile Auth -->
          <template v-if="!isAuthenticated">
            <div class="mobile-auth-buttons">
              <router-link to="/login" class="btn btn-outline btn-block" @click="closeMobileMenu">
                Inloggen
              </router-link>
              <router-link to="/register" class="btn btn-primary btn-block" @click="closeMobileMenu">
                Registreren
              </router-link>
            </div>
          </template>

          <!-- Mobile User Menu -->
          <template v-else>
            <div class="mobile-user-info">
              <img :src="currentUser?.avatar || '/images/avatar-placeholder.png'" :alt="currentUser?.name" class="mobile-user-avatar">
              <div class="mobile-user-details">
                <strong>{{ currentUser?.name || 'Gebruiker' }}</strong>
                <span>{{ currentUser?.email || '' }}</span>
              </div>
            </div>

            <router-link to="/profile" class="mobile-nav-link" @click="closeMobileMenu">
              <i class="fas fa-user"></i>
              Mijn Profiel
            </router-link>
            <router-link to="/profile?tab=tickets" class="mobile-nav-link" @click="closeMobileMenu">
              <i class="fas fa-ticket-alt"></i>
              Mijn Tickets
            </router-link>
            <router-link to="/profile?tab=events" class="mobile-nav-link" @click="closeMobileMenu">
              <i class="fas fa-calendar"></i>
              Mijn Evenementen
            </router-link>

            <button @click="logout" class="mobile-nav-link logout-btn">
              <i class="fas fa-sign-out-alt"></i>
              Uitloggen
            </button>
          </template>
        </nav>
      </div>

      <!-- Notifications Dropdown -->
      <div v-if="showNotifications" class="notifications-dropdown">
        <div class="notifications-header">
          <h3>Notificaties</h3>
          <button @click="markAllAsRead" class="btn btn-sm btn-outline">
            Alles lezen
          </button>
        </div>
        <div class="notifications-list">
          <div
              v-for="notification in notifications"
              :key="notification.id"
              class="notification-item"
              :class="{ unread: !notification.read }"
          >
            <div class="notification-icon">
              <i :class="notification.icon"></i>
            </div>
            <div class="notification-content">
              <p class="notification-message">{{ notification.message }}</p>
              <span class="notification-time">{{ notification.time }}</span>
            </div>
          </div>
        </div>
        <div class="notifications-footer">
          <router-link to="/notifications" class="link">Alle notificaties bekijken</router-link>
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div
        v-if="showMobileMenu || showUserDropdown || showNotifications"
        class="overlay"
        @click="closeAll"
    ></div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SearchBar from '@/components/shared/SearchBar.vue'

export default {
  name: 'AppHeader',
  components: {
    SearchBar
  },
  data() {
    return {
      showMobileMenu: false,
      showUserDropdown: false,
      showNotifications: false,
      notifications: [
        {
          id: 1,
          message: 'Je ticket voor Tech Conference 2024 is klaar',
          icon: 'fas fa-ticket-alt',
          time: '5 min geleden',
          read: false
        },
        {
          id: 2,
          message: 'Nieuw evenement in jouw stad',
          icon: 'fas fa-calendar-plus',
          time: '1 uur geleden',
          read: true
        }
      ]
    }
  },
  computed: {
    // Gebruik optional chaining om errors te voorkomen
    isAuthenticated() {
      return this.$store?.getters['auth/isAuthenticated'] || false
    },

    currentUser() {
      return this.$store?.getters['auth/currentUser'] || null
    },

    isAdmin() {
      return this.$store?.getters['auth/isAdmin'] || false
    },

    unreadNotifications() {
      return this.notifications.filter(n => !n.read).length
    }
  },
  methods: {
    // Gebruik direct store access als fallback
    async logout() {
      try {
        if (this.$store) {
          await this.$store.dispatch('auth/logout')
        }
        this.closeAll()
        this.$router.push('/')
        this.$toast.success('Succesvol uitgelogd')
      } catch (error) {
        console.error('Logout error:', error)
        // Fallback: clear local storage en redirect
        localStorage.removeItem('auth_token')
        this.$router.push('/')
      }
    },

    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
      this.showUserDropdown = false
      this.showNotifications = false
    },

    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown
      this.showMobileMenu = false
      this.showNotifications = false
    },

    toggleNotifications() {
      this.showNotifications = !this.showNotifications
      this.showMobileMenu = false
      this.showUserDropdown = false
    },

    closeMobileMenu() {
      this.showMobileMenu = false
    },

    closeAll() {
      this.showMobileMenu = false
      this.showUserDropdown = false
      this.showNotifications = false
    },

    handleSearch(query) {
      this.$router.push({
        path: '/events',
        query: { search: query }
      })
    },

    handleMobileSearch(query) {
      this.handleSearch(query)
      this.closeMobileMenu()
    },

    markAllAsRead() {
      this.notifications.forEach(notification => {
        notification.read = true
      })
      this.showNotifications = false
    }
  }
}
</script>

<style scoped>
/* Reset en basis stijlen */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  left: 0;
  right: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  text-decoration: none;
  flex-shrink: 0;
}

.logo i {
  color: #3498db;
}

.logo:hover {
  color: #2980b9;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 0 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #5d6d7e;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #3498db;
  background: #f8f9fa;
}

/* Search Bar */
.search-container {
  flex: 1;
  max-width: 400px;
  margin: 0 2rem;
}

/* User Menu */
.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

/* Notifications */
.notifications {
  position: relative;
}

.icon-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #5d6d7e;
  position: relative;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.icon-btn:hover {
  background: #f8f9fa;
  color: #3498db;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #e74c3c;
  color: white;
  border-radius: 10px;
  padding: 0.1rem 0.4rem;
  font-size: 0.7rem;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
  line-height: 1;
}

/* User Dropdown */
.user-dropdown {
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  color: #5d6d7e;
}

.user-btn:hover {
  background: #f8f9fa;
  color: #3498db;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9ecef;
}

.user-name {
  font-weight: 500;
  color: #2c3e50;
  white-space: nowrap;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  min-width: 200px;
  z-index: 1001;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #5d6d7e;
  text-decoration: none;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #3498db;
}

.dropdown-divider {
  height: 1px;
  background: #e9ecef;
  margin: 0.5rem 0;
}

/* Auth Buttons - VERBETERD */
.auth-buttons {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

/* Knop stijlen - NIEUW TOEGEVOEGD */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  line-height: 1;
}

.btn-outline {
  background: transparent;
  border-color: #3498db;
  color: #3498db;
}

.btn-outline:hover {
  background: #3498db;
  color: white;
}

.btn-primary {
  background: #3498db;
  border-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
  border-color: #2980b9;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 12px;
}

.btn-block {
  width: 100%;
  justify-content: center;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #5d6d7e;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
  background: #f8f9fa;
  color: #3498db;
}

/* Mobile Menu */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e9ecef;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 1001;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  color: #5d6d7e;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  border: none;
  background: none;
  text-align: left;
  font-size: 14px;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background: #f8f9fa;
  color: #3498db;
}

.mobile-search {
  margin: 1rem 0;
  padding: 0 1rem;
}

.mobile-auth-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1rem 0;
  padding: 0 1rem;
}

.mobile-user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.mobile-user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9ecef;
}

.mobile-user-details {
  display: flex;
  flex-direction: column;
}

.mobile-user-details strong {
  color: #2c3e50;
  font-size: 14px;
}

.mobile-user-details span {
  font-size: 0.8rem;
  color: #7f8c8d;
}

.logout-btn {
  color: #e74c3c;
}

.logout-btn:hover {
  color: #e74c3c;
  background: #f8d7da;
}

/* Notifications Dropdown */
.notifications-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 350px;
  max-height: 400px;
  z-index: 1001;
  margin-top: 0.5rem;
}

.notifications-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.notifications-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 16px;
}

.notifications-list {
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #f8f9fa;
  transition: background-color 0.3s ease;
}

.notification-item:hover {
  background: #f8f9fa;
}

.notification-item.unread {
  background: #f0f7ff;
}

.notification-icon {
  width: 32px;
  height: 32px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
}

.notification-content {
  flex: 1;
}

.notification-message {
  margin: 0 0 0.25rem 0;
  color: #2c3e50;
  font-size: 14px;
  line-height: 1.4;
}

.notification-time {
  font-size: 0.8rem;
  color: #7f8c8d;
}

.notifications-footer {
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #e9ecef;
}

.link {
  color: #3498db;
  text-decoration: none;
  font-size: 14px;
}

.link:hover {
  text-decoration: underline;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .desktop-nav,
  .search-container,
  .auth-buttons {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .header-content {
    padding: 0.75rem 0;
  }

  .notifications-dropdown {
    width: 300px;
    right: 1rem;
  }

  .user-name {
    display: none;
  }

  .logo span {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }

  .notifications-dropdown {
    width: calc(100vw - 2rem);
    right: 1rem;
  }

  .logo {
    font-size: 1.25rem;
  }
}
</style>