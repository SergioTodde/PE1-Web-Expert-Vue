<template>
  <div class="admin-view">
    <div class="container">
      <div class="admin-header">
        <h1>Admin Dashboard</h1>
        <div class="admin-stats">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.totalUsers }}</div>
              <div class="stat-label">Gebruikers</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-calendar"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.totalEvents }}</div>
              <div class="stat-label">Evenementen</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-ticket-alt"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">{{ stats.totalTickets }}</div>
              <div class="stat-label">Tickets</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-euro-sign"></i>
            </div>
            <div class="stat-info">
              <div class="stat-number">€{{ stats.totalRevenue }}</div>
              <div class="stat-label">Omzet</div>
            </div>
          </div>
        </div>
      </div>

      <div class="admin-content">
        <div class="admin-sidebar">
          <nav class="admin-nav">
            <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="{ active: activeTab === tab.id }"
                class="nav-item"
            >
              <i :class="tab.icon"></i>
              {{ tab.name }}
              <span v-if="tab.count" class="nav-count">{{ tab.count }}</span>
            </button>
          </nav>
        </div>

        <div class="admin-main">
          <!-- Users Management -->
          <div v-if="activeTab === 'users'" class="tab-content">
            <div class="tab-header">
              <h2>Gebruikersbeheer</h2>
              <div class="header-actions">
                <button @click="exportUsers" class="btn btn-outline">
                  <i class="fas fa-download"></i>
                  Exporteren
                </button>
              </div>
            </div>

            <div class="table-container">
              <table class="admin-table">
                <thead>
                <tr>
                  <th>Gebruiker</th>
                  <th>E-mail</th>
                  <th>Rol</th>
                  <th>Evenementen</th>
                  <th>Status</th>
                  <th>Acties</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>
                    <div class="user-cell">
                      <img :src="user.avatar" :alt="user.name" class="user-avatar">
                      <div class="user-info">
                        <strong>{{ user.name }}</strong>
                        <span>Lid sinds {{ formatDate(user.created_at) }}</span>
                      </div>
                    </div>
                  </td>
                  <td>{{ user.email }}</td>
                  <td>
                    <select
                        v-model="user.role"
                        @change="updateUserRole(user)"
                        class="role-select"
                    >
                      <option value="user">Gebruiker</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>{{ user.events_count }}</td>
                  <td>
                      <span class="status-badge" :class="user.status">
                        {{ user.status }}
                      </span>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button @click="viewUser(user)" class="btn btn-sm btn-outline">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button @click="editUser(user)" class="btn btn-sm btn-outline">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                          @click="deleteUser(user)"
                          class="btn btn-sm btn-danger"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Events Management -->
          <div v-if="activeTab === 'events'" class="tab-content">
            <div class="tab-header">
              <h2>Evenementenbeheer</h2>
              <div class="header-actions">
                <button @click="exportEvents" class="btn btn-outline">
                  <i class="fas fa-download"></i>
                  Exporteren
                </button>
              </div>
            </div>

            <AdminEvents />
          </div>

          <!-- Tickets Management -->
          <div v-if="activeTab === 'tickets'" class="tab-content">
            <h2>Ticketbeheer</h2>
            <AdminTickets />
          </div>

          <!-- Statistics -->
          <div v-if="activeTab === 'stats'" class="tab-content">
            <h2>Statistieken</h2>
            <AdminStats :stats="stats" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AdminEvents from '@/components/admin/AdminEvents.vue'
import AdminTickets from '@/components/admin/AdminTickets.vue'
import AdminStats from '@/components/admin/AdminStats.vue'

export default {
  name: 'AdminView',
  components: {
    AdminEvents,
    AdminTickets,
    AdminStats
  },
  data() {
    return {
      activeTab: 'users',
      stats: {
        totalUsers: 1250,
        totalEvents: 450,
        totalTickets: 8900,
        totalRevenue: 125000
      },
      tabs: [
        { id: 'users', name: 'Gebruikers', icon: 'fas fa-users', count: 1250 },
        { id: 'events', name: 'Evenementen', icon: 'fas fa-calendar', count: 450 },
        { id: 'tickets', name: 'Tickets', icon: 'fas fa-ticket-alt', count: 8900 },
        { id: 'stats', name: 'Statistieken', icon: 'fas fa-chart-bar' }
      ]
    }
  },
  computed: {
    ...mapGetters('users', ['users']),
    ...mapGetters('auth', ['isAdmin'])
  },
  async mounted() {
    if (!this.isAdmin) {
      this.$router.push('/')
      return
    }

    await this.loadAdminData()
  },
  methods: {
    ...mapActions('users', ['fetchUsers', 'updateUserRole']),

    async loadAdminData() {
      await this.fetchUsers()
    },

    async updateUserRole(user) {
      try {
        await this.updateUserRole({ userId: user.id, role: user.role })
        this.$toast.success(`Rol van ${user.name} bijgewerkt naar ${user.role}`)
      } catch (error) {
        this.$toast.error('Fout bij bijwerken rol')
      }
    },

    viewUser(user) {
      // Implement view user details
      this.$toast.info(`Bekijk gebruiker: ${user.name}`)
    },

    editUser(user) {
      // Implement edit user
      this.$toast.info(`Bewerk gebruiker: ${user.name}`)
    },

    deleteUser(user) {
      if (confirm(`Weet je zeker dat je ${user.name} wilt verwijderen?`)) {
        // Implement delete user
        this.$toast.info(`Verwijder gebruiker: ${user.name}`)
      }
    },

    exportUsers() {
      this.$toast.info('Exporteer gebruikers...')
    },

    exportEvents() {
      this.$toast.info('Exporteer evenementen...')
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('nl-BE')
    }
  }
}
</script>

<style scoped>
.admin-view {
  padding: 2rem 0;
  min-height: 100vh;
  background: #f8f9fa;
}

.admin-header {
  margin-bottom: 2rem;
}

.admin-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
}

.admin-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: #007bff;
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  line-height: 1;
}

.stat-label {
  color: #6c757d;
  font-weight: 600;
}

.admin-content {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

.admin-sidebar {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: #495057;
  text-align: left;
  position: relative;
}

.nav-item:hover {
  background: #f8f9fa;
}

.nav-item.active {
  background: #007bff;
  color: white;
}

.nav-count {
  background: #dc3545;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.7rem;
  margin-left: auto;
}

.admin-main {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
}

.tab-header h2 {
  margin: 0;
  color: #333;
}

.table-container {
  overflow-x: auto;
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
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-info strong {
  color: #333;
}

.user-info span {
  font-size: 0.8rem;
  color: #6c757d;
}

.role-select {
  padding: 0.5rem;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  background: white;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: #d4edda;
  color: #155724;
}

.status-badge.inactive {
  background: #f8d7da;
  color: #721c24;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.5rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .admin-content {
    grid-template-columns: 1fr;
  }

  .admin-stats {
    grid-template-columns: 1fr;
  }

  .tab-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .admin-table {
    font-size: 0.8rem;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>