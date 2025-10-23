<template>
  <div class="admin-stats">
    <h2>Dashboard Overzicht</h2>

    <!-- Statistieken Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon total-users">
          <i class="fas fa-users"></i>
        </div>
        <div class="stat-info">
          <h3>{{ formatNumber(stats.totalUsers) }}</h3>
          <p>Totaal Gebruikers</p>
          <span class="stat-change" :class="getChangeClass(stats.userGrowth)">
            {{ formatPercentage(stats.userGrowth) }}
          </span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon total-events">
          <i class="fas fa-calendar-alt"></i>
        </div>
        <div class="stat-info">
          <h3>{{ formatNumber(stats.totalEvents) }}</h3>
          <p>Evenementen</p>
          <span class="stat-change" :class="getChangeClass(stats.eventGrowth)">
            {{ formatPercentage(stats.eventGrowth) }}
          </span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon total-tickets">
          <i class="fas fa-ticket-alt"></i>
        </div>
        <div class="stat-info">
          <h3>{{ formatNumber(stats.totalTickets) }}</h3>
          <p>Tickets Verkocht</p>
          <span class="stat-change" :class="getChangeClass(stats.ticketGrowth)">
            {{ formatPercentage(stats.ticketGrowth) }}
          </span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon total-revenue">
          <i class="fas fa-euro-sign"></i>
        </div>
        <div class="stat-info">
          <h3>€{{ formatNumber(stats.totalRevenue) }}</h3>
          <p>Totaal Omzet</p>
          <span class="stat-change" :class="getChangeClass(stats.revenueGrowth)">
            {{ formatPercentage(stats.revenueGrowth) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-section">
      <div class="chart-card">
        <h3>Omzet Overzicht</h3>
        <div class="chart-container">
          <RevenueChart :chart-data="revenueData" />
        </div>
      </div>

      <div class="chart-card">
        <h3>Ticket Verkoop</h3>
        <div class="chart-container">
          <TicketsChart :chart-data="ticketsData" />
        </div>
      </div>
    </div>

    <!-- Recente Activiteiten -->
    <div class="recent-activities">
      <h3>Recente Activiteiten</h3>
      <div class="activities-list">
        <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="activity-item"
        >
          <div class="activity-icon" :class="activity.type">
            <i :class="getActivityIcon(activity.type)"></i>
          </div>
          <div class="activity-details">
            <p class="activity-description">{{ activity.description }}</p>
            <span class="activity-time">{{ formatTime(activity.timestamp) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Snelle Acties -->
    <div class="quick-actions">
      <h3>Snelle Acties</h3>
      <div class="actions-grid">
        <button @click="$router.push('/admin/events/new')" class="action-btn">
          <i class="fas fa-plus"></i>
          <span>Nieuw Evenement</span>
        </button>
        <button @click="$router.push('/admin/users')" class="action-btn">
          <i class="fas fa-user-cog"></i>
          <span>Beheer Gebruikers</span>
        </button>
        <button @click="exportReports" class="action-btn">
          <i class="fas fa-file-export"></i>
          <span>Exporteer Rapport</span>
        </button>
        <button @click="refreshData" class="action-btn">
          <i class="fas fa-sync-alt"></i>
          <span>Vernieuw Data</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import RevenueChart from './charts/RevenueChart.vue'
import TicketsChart from './charts/TicketsChart.vue'

export default {
  name: 'AdminStats',
  components: {
    RevenueChart,
    TicketsChart
  },
  data() {
    return {
      stats: {
        totalUsers: 0,
        totalEvents: 0,
        totalTickets: 0,
        totalRevenue: 0,
        userGrowth: 0,
        eventGrowth: 0,
        ticketGrowth: 0,
        revenueGrowth: 0
      },
      recentActivities: [],
      revenueData: {},
      ticketsData: {},
      loading: false
    }
  },
  async mounted() {
    await this.loadDashboardData()
  },
  methods: {
    async loadDashboardData() {
      this.loading = true
      try {
        // Laad alle dashboard data
        await Promise.all([
          this.loadStats(),
          this.loadRecentActivities(),
          this.loadChartData()
        ])
      } catch (error) {
        console.error('Fout bij laden dashboard data:', error)
        this.$toast.error('Kon dashboard data niet laden')
      } finally {
        this.loading = false
      }
    },

    async loadStats() {
      const response = await this.$api.get('/admin/stats')
      this.stats = response.data
    },

    async loadRecentActivities() {
      const response = await this.$api.get('/admin/activities')
      this.recentActivities = response.data
    },

    async loadChartData() {
      const [revenueResponse, ticketsResponse] = await Promise.all([
        this.$api.get('/admin/charts/revenue'),
        this.$api.get('/admin/charts/tickets')
      ])

      this.revenueData = revenueResponse.data
      this.ticketsData = ticketsResponse.data
    },

    async refreshData() {
      await this.loadDashboardData()
      this.$toast.success('Data vernieuwd')
    },

    async exportReports() {
      try {
        const response = await this.$api.get('/admin/export/reports', {
          responseType: 'blob'
        })

        // Download het bestand
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `rapport-${new Date().toISOString().split('T')[0]}.xlsx`)
        document.body.appendChild(link)
        link.click()
        link.remove()

        this.$toast.success('Rapport geëxporteerd')
      } catch (error) {
        this.$toast.error('Kon rapport niet exporteren')
      }
    },

    getChangeClass(change) {
      return change >= 0 ? 'positive' : 'negative'
    },

    formatNumber(num) {
      return new Intl.NumberFormat('nl-NL').format(num)
    },

    formatPercentage(value) {
      if (value === 0) return '0%'
      const sign = value > 0 ? '+' : ''
      return `${sign}${value.toFixed(1)}%`
    },

    getActivityIcon(type) {
      const icons = {
        'user': 'fas fa-user-plus',
        'event': 'fas fa-calendar-plus',
        'ticket': 'fas fa-ticket-alt',
        'payment': 'fas fa-euro-sign',
        'system': 'fas fa-cog'
      }
      return icons[type] || 'fas fa-info-circle'
    },

    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString('nl-NL', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.admin-stats {
  padding: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
}

.stat-icon.total-users { background: #3498db; }
.stat-icon.total-events { background: #9b59b6; }
.stat-icon.total-tickets { background: #2ecc71; }
.stat-icon.total-revenue { background: #f39c12; }

.stat-info h3 {
  margin: 0 0 5px 0;
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
}

.stat-info p {
  margin: 0 0 5px 0;
  color: #7f8c8d;
  font-size: 14px;
}

.stat-change {
  font-size: 12px;
  font-weight: bold;
}

.stat-change.positive {
  color: #27ae60;
}

.stat-change.negative {
  color: #e74c3c;
}

.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.chart-card {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.chart-card h3 {
  margin: 0 0 20px 0;
  color: #2c3e50;
}

.chart-container {
  height: 250px;
}

.recent-activities {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.recent-activities h3 {
  margin: 0 0 20px 0;
  color: #2c3e50;
}

.activities-list {
  max-height: 300px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #ecf0f1;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  color: #7f8c8d;
}

.activity-icon.user { color: #3498db; }
.activity-icon.event { color: #9b59b6; }
.activity-icon.ticket { color: #2ecc71; }
.activity-icon.payment { color: #f39c12; }
.activity-icon.system { color: #95a5a6; }

.activity-details {
  flex: 1;
}

.activity-description {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.activity-time {
  font-size: 12px;
  color: #7f8c8d;
}

.quick-actions {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.quick-actions h3 {
  margin: 0 0 20px 0;
  color: #2c3e50;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #495057;
}

.action-btn:hover {
  background: #e9ecef;
  border-color: #3498db;
  color: #3498db;
}

.action-btn i {
  font-size: 18px;
}

.action-btn span {
  font-weight: 500;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .charts-section {
    grid-template-columns: 1fr;
  }

  .chart-card {
    padding: 15px;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 20px;
  }
}
</style>