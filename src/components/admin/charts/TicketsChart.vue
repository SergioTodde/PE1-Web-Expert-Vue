<template>
  <div class="tickets-chart">
    <div class="chart-header">
      <h4>Ticket Verkoop</h4>
      <div class="chart-controls">
        <select v-model="timeRange" @change="handleTimeRangeChange" class="time-select">
          <option value="week">Week</option>
          <option value="month">Maand</option>
          <option value="year">Jaar</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="chart-loading">
      <div class="spinner"></div>
      <p>Data laden...</p>
    </div>

    <div v-else-if="error" class="chart-error">
      <i class="fas fa-exclamation-triangle"></i>
      <p>Kon data niet laden</p>
      <button @click="loadChartData" class="btn btn-sm btn-outline">
        Opnieuw proberen
      </button>
    </div>

    <div v-else class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>

    <div class="chart-stats">
      <div class="stat-item">
        <span class="stat-label">Totaal Verkocht</span>
        <span class="stat-value">{{ totalTickets }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Groei</span>
        <span class="stat-value" :class="growthClass">
          {{ growthPercentage }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'

export default {
  name: 'TicketsChart',
  props: {
    chartData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: false,
      error: false,
      chart: null,
      timeRange: 'month',
      totalTickets: 0,
      growthPercentage: 0
    }
  },
  computed: {
    growthClass() {
      return this.growthPercentage >= 0 ? 'positive' : 'negative'
    }
  },
  mounted() {
    Chart.register(...registerables)
    this.initializeChart()
    this.calculateStats()
  },
  watch: {
    chartData: {
      handler(newData) {
        if (this.chart && newData && Object.keys(newData).length > 0) {
          this.updateChart(newData)
          this.calculateStats(newData)
        }
      },
      deep: true
    }
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy()
    }
  },
  methods: {
    initializeChart() {
      if (!this.$refs.chartCanvas) return

      const ctx = this.$refs.chartCanvas.getContext('2d')

      const defaultData = {
        labels: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
        datasets: [
          {
            label: 'Tickets Verkocht',
            data: [45, 62, 38, 75, 52, 88, 65],
            backgroundColor: [
              'rgba(52, 152, 219, 0.7)',
              'rgba(46, 204, 113, 0.7)',
              'rgba(155, 89, 182, 0.7)',
              'rgba(241, 196, 15, 0.7)',
              'rgba(230, 126, 34, 0.7)',
              'rgba(231, 76, 60, 0.7)',
              'rgba(52, 73, 94, 0.7)'
            ],
            borderColor: [
              '#3498db',
              '#2ecc71',
              '#9b59b6',
              '#f1c40f',
              '#e67e22',
              '#e74c3c',
              '#34495e'
            ],
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false,
          }
        ]
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: this.chartData.labels ? this.chartData : defaultData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(44, 62, 80, 0.9)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: '#3498db',
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  return `${context.parsed.y} tickets`
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#7f8c8d'
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                color: '#7f8c8d',
                precision: 0
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      })
    },

    updateChart(newData) {
      if (!this.chart) return

      this.chart.data.labels = newData.labels || this.chart.data.labels
      this.chart.data.datasets[0].data = newData.datasets?.[0]?.data || this.chart.data.datasets[0].data

      this.chart.update('none')
    },

    calculateStats(data = null) {
      const chartData = data || this.chart?.data
      if (!chartData || !chartData.datasets[0].data) return

      const currentData = chartData.datasets[0].data
      this.totalTickets = currentData.reduce((sum, value) => sum + value, 0)

      // Simpele groei berekening (laatste week vs vorige week)
      if (currentData.length >= 7) {
        const lastWeek = currentData.slice(-7).reduce((sum, val) => sum + val, 0)
        const previousWeek = currentData.slice(-14, -7).reduce((sum, val) => sum + val, 0)
        this.growthPercentage = previousWeek > 0
            ? Math.round(((lastWeek - previousWeek) / previousWeek) * 100)
            : 100
      } else {
        this.growthPercentage = 15 // Mock data
      }
    },

    async handleTimeRangeChange() {
      this.loading = true

      try {
        // Hier zou je je API call doen met de nieuwe timeRange
        // const response = await this.$api.get('/admin/charts/tickets', {
        //   params: { range: this.timeRange }
        // })

        // Voor nu gebruiken we mock data gebaseerd op timeRange
        await new Promise(resolve => setTimeout(resolve, 800))

        const mockData = this.generateMockData(this.timeRange)
        this.updateChart(mockData)
        this.calculateStats(mockData)
      } catch (error) {
        console.error('Error loading chart data:', error)
        this.error = true
      } finally {
        this.loading = false
      }
    },

    generateMockData(range) {
      const dataMap = {
        week: {
          labels: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
          data: [45, 62, 38, 75, 52, 88, 65]
        },
        month: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          data: [320, 450, 380, 520]
        },
        year: {
          labels: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
          data: [1200, 1500, 1300, 1700, 1600, 1900, 2100, 2000, 2300, 2200, 2500, 2800]
        }
      }

      const selectedData = dataMap[range] || dataMap.month

      return {
        labels: selectedData.labels,
        datasets: [
          {
            label: 'Tickets Verkocht',
            data: selectedData.data,
            backgroundColor: this.generateColors(selectedData.labels.length),
            borderColor: '#2c3e50',
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false,
          }
        ]
      }
    },

    generateColors(count) {
      const baseColors = [
        'rgba(52, 152, 219, 0.7)',
        'rgba(46, 204, 113, 0.7)',
        'rgba(155, 89, 182, 0.7)',
        'rgba(241, 196, 15, 0.7)',
        'rgba(230, 126, 34, 0.7)',
        'rgba(231, 76, 60, 0.7)',
        'rgba(52, 73, 94, 0.7)'
      ]

      const colors = []
      for (let i = 0; i < count; i++) {
        colors.push(baseColors[i % baseColors.length])
      }
      return colors
    },

    async loadChartData() {
      this.loading = true
      this.error = false

      try {
        await this.handleTimeRangeChange()
      } catch (error) {
        console.error('Error loading chart data:', error)
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.tickets-chart {
  height: 100%;
  position: relative;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 16px;
}

.time-select {
  padding: 0.375rem 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  font-size: 12px;
  background: white;
  color: #2c3e50;
}

.chart-container {
  height: 200px;
  min-height: 200px;
}

.chart-loading,
.chart-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #7f8c8d;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.chart-error i {
  font-size: 36px;
  color: #e74c3c;
  margin-bottom: 0.5rem;
}

.chart-error p {
  margin-bottom: 0.5rem;
  font-size: 14px;
}

.chart-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f8f9fa;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 12px;
  color: #7f8c8d;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.stat-value.positive {
  color: #27ae60;
}

.stat-value.negative {
  color: #e74c3c;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 12px;
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

@media (max-width: 768px) {
  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .time-select {
    align-self: flex-end;
  }

  .chart-stats {
    flex-direction: column;
    gap: 0.5rem;
  }

  .stat-item {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>