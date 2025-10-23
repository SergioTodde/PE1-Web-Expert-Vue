<template>
  <div class="profile-view">
    <!-- Hero Section -->
    <section class="profile-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Mijn Profiel</h1>
          <p class="hero-subtitle">Beheer je account en evenementen</p>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="profile-content">
        <!-- Sidebar -->
        <div class="profile-sidebar">
          <!-- User Card -->
          <div class="user-card">
            <div class="user-avatar-section">
              <div class="user-avatar">
                <img :src="user.avatar_url || '/images/avatar-placeholder.png'" :alt="user.name">
                <button @click="changeAvatar" class="avatar-edit-btn" title="Avatar wijzigen">
                  <i class="fas fa-camera"></i>
                </button>
              </div>
              <div class="user-basic-info">
                <h2 class="user-name">{{ user.name }}</h2>
                <p class="user-email">{{ user.email }}</p>
                <div class="user-role-badge" :class="user.role">
                  <i class="fas fa-shield-alt"></i>
                  {{ user.role === 'admin' ? 'Beheerder' : 'Gebruiker' }}
                </div>
              </div>
            </div>

            <!-- User Stats -->
            <div class="user-stats">
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fas fa-calendar-check"></i>
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ userStats.eventsAttended }}</div>
                  <div class="stat-label">Bezocht</div>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fas fa-heart"></i>
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ userStats.favorites }}</div>
                  <div class="stat-label">Favorieten</div>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fas fa-ticket-alt"></i>
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ userStats.tickets }}</div>
                  <div class="stat-label">Tickets</div>
                </div>
              </div>
            </div>

            <!-- Edit Profile Button -->
            <button @click="editProfile" class="btn-edit-profile">
              <i class="fas fa-edit"></i>
              Profiel Bewerken
            </button>
          </div>

          <!-- Navigation -->
          <nav class="profile-nav">
            <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="{ active: activeTab === tab.id }"
                class="nav-item"
            >
              <div class="nav-icon">
                <i :class="tab.icon"></i>
              </div>
              <div class="nav-content">
                <span class="nav-name">{{ tab.name }}</span>
                <span v-if="tab.count" class="nav-count">{{ tab.count }}</span>
              </div>
            </button>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="profile-main">
          <!-- Personal Info Tab -->
          <div v-if="activeTab === 'info'" class="tab-content">
            <div class="tab-header">
              <h2 class="tab-title">
                <i class="fas fa-user"></i>
                Persoonlijke Informatie
              </h2>
            </div>

            <div class="info-sections">
              <div class="info-section">
                <h3 class="section-title">Basis Informatie</h3>
                <div class="info-grid">
                  <div class="info-card">
                    <div class="info-icon">
                      <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="info-content">
                      <label>Volledige Naam</label>
                      <p>{{ user.name }}</p>
                    </div>
                  </div>
                  <div class="info-card">
                    <div class="info-icon">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div class="info-content">
                      <label>E-mailadres</label>
                      <p>{{ user.email }}</p>
                    </div>
                  </div>
                  <div class="info-card">
                    <div class="info-icon">
                      <i class="fas fa-phone"></i>
                    </div>
                    <div class="info-content">
                      <label>Telefoonnummer</label>
                      <p>{{ user.phone || 'Niet ingesteld' }}</p>
                    </div>
                  </div>
                  <div class="info-card">
                    <div class="info-icon">
                      <i class="fas fa-calendar-plus"></i>
                    </div>
                    <div class="info-content">
                      <label>Lid sinds</label>
                      <p>{{ formatDate(user.created_at) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="info-section">
                <h3 class="section-title">Notificatie Voorkeuren</h3>
                <div class="preferences-grid">
                  <div class="preference-card">
                    <div class="preference-content">
                      <div class="preference-info">
                        <i class="fas fa-bell"></i>
                        <div>
                          <h4>E-mail notificaties</h4>
                          <p>Ontvang updates over je evenementen</p>
                        </div>
                      </div>
                      <toggle-switch v-model="preferences.emailNotifications" />
                    </div>
                  </div>
                  <div class="preference-card">
                    <div class="preference-content">
                      <div class="preference-info">
                        <i class="fas fa-sms"></i>
                        <div>
                          <h4>SMS notificaties</h4>
                          <p>Belangrijke meldingen via SMS</p>
                        </div>
                      </div>
                      <toggle-switch v-model="preferences.smsNotifications" />
                    </div>
                  </div>
                  <div class="preference-card">
                    <div class="preference-content">
                      <div class="preference-info">
                        <i class="fas fa-newspaper"></i>
                        <div>
                          <h4>Nieuwsbrief</h4>
                          <p>Weekelijkse evenementen updates</p>
                        </div>
                      </div>
                      <toggle-switch v-model="preferences.newsletter" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- My Events Tab -->
          <div v-if="activeTab === 'events'" class="tab-content">
            <div class="tab-header">
              <h2 class="tab-title">
                <i class="fas fa-calendar"></i>
                Mijn Evenementen
              </h2>
              <router-link to="/events/create" class="btn-create-event">
                <i class="fas fa-plus"></i>
                Nieuw Evenement
              </router-link>
            </div>
            <UserEvents :events="userEvents" />
          </div>

          <!-- My Tickets Tab -->
          <div v-if="activeTab === 'tickets'" class="tab-content">
            <div class="tab-header">
              <h2 class="tab-title">
                <i class="fas fa-ticket-alt"></i>
                Mijn Tickets
              </h2>
            </div>
            <UserTickets :tickets="userTickets" />
          </div>

          <!-- Favorites Tab -->
          <div v-if="activeTab === 'favorites'" class="tab-content">
            <div class="tab-header">
              <h2 class="tab-title">
                <i class="fas fa-heart"></i>
                Favoriete Evenementen
              </h2>
            </div>
            <FavoriteEvents :events="favoriteEvents" />
          </div>

          <!-- Settings Tab -->
          <div v-if="activeTab === 'settings'" class="tab-content">
            <div class="tab-header">
              <h2 class="tab-title">
                <i class="fas fa-cog"></i>
                Account Instellingen
              </h2>
            </div>

            <div class="settings-sections">
              <div class="settings-section">
                <h3 class="section-title">Beveiliging</h3>
                <div class="settings-actions">
                  <button @click="changePassword" class="btn-settings">
                    <div class="btn-icon">
                      <i class="fas fa-key"></i>
                    </div>
                    <div class="btn-content">
                      <strong>Wachtwoord Wijzigen</strong>
                      <span>Update je account wachtwoord</span>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              <div class="settings-section">
                <h3 class="section-title">Gegevens</h3>
                <div class="settings-actions">
                  <button @click="exportData" class="btn-settings">
                    <div class="btn-icon">
                      <i class="fas fa-download"></i>
                    </div>
                    <div class="btn-content">
                      <strong>Gegevens Exporteren</strong>
                      <span>Download al je account gegevens</span>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              <div class="settings-section danger-section">
                <h3 class="section-title">Gevaarlijke Instellingen</h3>
                <div class="settings-actions">
                  <button @click="deleteAccount" class="btn-settings btn-danger">
                    <div class="btn-icon">
                      <i class="fas fa-trash"></i>
                    </div>
                    <div class="btn-content">
                      <strong>Account Verwijderen</strong>
                      <span>Verwijder permanent je account en alle gegevens</span>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <Modal v-if="showEditModal" @close="showEditModal = false">
      <EditProfileForm
          :user="user"
          @save="handleProfileUpdate"
          @cancel="showEditModal = false"
      />
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserEvents from '@/components/user/UserEvents.vue'
import UserTickets from '@/components/user/UserTickets.vue'
import FavoriteEvents from '@/components/user/FavoriteEvents.vue'
import EditProfileForm from '@/components/user/EditProfileForm.vue'
import Modal from '@/components/shared/Modal.vue'
import ToggleSwitch from '@/components/shared/ToggleSwitch.vue'

export default {
  name: 'ProfileView',
  components: {
    UserEvents,
    UserTickets,
    FavoriteEvents,
    EditProfileForm,
    Modal,
    ToggleSwitch
  },
  data() {
    return {
      activeTab: 'info',
      showEditModal: false,
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        newsletter: true
      },
      userStats: {
        eventsAttended: 12,
        favorites: 8,
        tickets: 24
      },
      tabs: [
        { id: 'info', name: 'Profiel', icon: 'fas fa-user' },
        { id: 'events', name: 'Mijn Evenementen', icon: 'fas fa-calendar', count: 5 },
        { id: 'tickets', name: 'Mijn Tickets', icon: 'fas fa-ticket-alt', count: 8 },
        { id: 'favorites', name: 'Favorieten', icon: 'fas fa-heart', count: 3 },
        { id: 'settings', name: 'Instellingen', icon: 'fas fa-cog' }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('events', ['userEvents', 'favoriteEvents']),
    ...mapGetters('tickets', ['userTickets']),

    user() {
      return this.currentUser || {}
    }
  },
  async mounted() {
    await this.loadUserData()
  },
  methods: {
    ...mapActions('events', ['fetchUserEvents', 'fetchFavoriteEvents']),
    ...mapActions('tickets', ['fetchUserTickets']),
    ...mapActions('auth', ['updateProfile']),

    async loadUserData() {
      await Promise.all([
        this.fetchUserEvents(),
        this.fetchFavoriteEvents(),
        this.fetchUserTickets()
      ])
    },

    editProfile() {
      this.showEditModal = true
    },

    async handleProfileUpdate(profileData) {
      try {
        await this.updateProfile(profileData)
        this.showEditModal = false
        this.$toast.success('Profiel succesvol bijgewerkt')
      } catch (error) {
        this.$toast.error('Fout bij bijwerken profiel')
      }
    },

    changeAvatar() {
      this.$toast.info('Avatar wijzigen functie komt binnenkort')
    },

    changePassword() {
      this.$router.push('/password-reset')
    },

    exportData() {
      this.$toast.info('Gegevens exporteren functie komt binnenkort')
    },

    deleteAccount() {
      if (confirm('Weet je zeker dat je je account wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.')) {
        this.$toast.info('Account verwijderen functie komt binnenkort')
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('nl-BE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.profile-view {
  min-height: 100vh;
  background: #f8fafc;
}

/* Hero Section */
.profile-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Profile Content Layout */
.profile-content {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

/* Sidebar */
.profile-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* User Card */
.user-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.user-avatar-section {
  margin-bottom: 1.5rem;
}

.user-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f1f5f9;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.avatar-edit-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.avatar-edit-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.user-basic-info {
  margin-bottom: 1.5rem;
}

.user-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.user-email {
  color: #6b7280;
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
}

.user-role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f0f4ff;
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.user-role-badge.admin {
  background: #fef2f2;
  color: #ef4444;
}

/* User Stats */
.user-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-icon {
  width: 40px;
  height: 40px;
  background: #f0f4ff;
  color: #667eea;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content {
  text-align: left;
}

.stat-number {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.stat-label {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
}

/* Edit Profile Button */
.btn-edit-profile {
  width: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-edit-profile:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Profile Navigation */
.profile-nav {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1.25rem;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  color: #64748b;
  text-align: left;
  margin-bottom: 0.5rem;
}

.nav-item:last-child {
  margin-bottom: 0;
}

.nav-item:hover {
  background: #f8fafc;
  color: #374151;
  transform: translateX(5px);
}

.nav-item.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.nav-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.nav-item:not(.active) .nav-icon {
  background: #f1f5f9;
  color: #64748b;
}

.nav-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.nav-count {
  background: #ef4444;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

/* Main Content */
.profile-main {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.tab-content {
  padding: 2.5rem;
}

/* Tab Header */
.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f1f5f9;
}

.tab-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.8rem;
  color: #1f2937;
  margin: 0;
}

.tab-title i {
  color: #667eea;
}

.btn-create-event {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-create-event:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Info Sections */
.info-sections {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.section-title {
  font-size: 1.3rem;
  color: #374151;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.info-card:hover {
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.info-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.info-content label {
  display: block;
  font-weight: 600;
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.info-content p {
  margin: 0;
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Preferences Grid */
.preferences-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preference-card {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.preference-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preference-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.preference-info i {
  font-size: 1.5rem;
  color: #667eea;
  width: 40px;
}

.preference-info h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
  font-size: 1rem;
}

.preference-info p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

/* Settings */
.settings-sections {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.danger-section .section-title {
  color: #ef4444;
}

.settings-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-settings {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.btn-settings:hover {
  background: white;
  border-color: #cbd5e1;
  transform: translateX(5px);
}

.btn-settings.btn-danger {
  background: #fef2f2;
  border-color: #fecaca;
  color: #ef4444;
}

.btn-settings.btn-danger:hover {
  background: #fecaca;
}

.btn-icon {
  width: 50px;
  height: 50px;
  background: #e2e8f0;
  color: #64748b;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.btn-settings.btn-danger .btn-icon {
  background: #fecaca;
  color: #ef4444;
}

.btn-content {
  flex: 1;
}

.btn-content strong {
  display: block;
  font-size: 1rem;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.btn-content span {
  font-size: 0.9rem;
  color: #6b7280;
}

.btn-settings.btn-danger .btn-content strong {
  color: #ef4444;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .profile-content {
    grid-template-columns: 300px 1fr;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .profile-content {
    grid-template-columns: 1fr;
  }

  .profile-hero {
    padding: 2rem 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .tab-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .user-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .stat-item {
    justify-content: center;
  }

  .preference-content {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .tab-content {
    padding: 1.5rem;
  }

  .tab-title {
    font-size: 1.5rem;
  }

  .user-card {
    padding: 1.5rem;
  }

  .profile-nav {
    padding: 1rem;
  }

  .nav-item {
    padding: 0.75rem 1rem;
  }

  .info-card {
    padding: 1.25rem;
  }

  .btn-settings {
    padding: 1.25rem;
  }
}
</style>