<template>
  <div class="revenue-chart">
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
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'

export default {
  name: 'RevenueChart',
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
      chart: null
    }
  },
  mounted() {
    Chart.register(...registerables)
    this.initializeChart()
  },
  watch: {
    chartData: {
      handler(newData) {
        if (this.chart && newData && Object.keys(newData).length > 0) {
          this.updateChart(newData)
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
        labels: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Omzet',
            data: [1200, 1900, 1500, 2200, 1800, 2500, 3000, 2800, 3200, 2900, 3500, 4000],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }
        ]
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.chartData.labels ? this.chartData : defaultData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#2c3e50',
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(44, 62, 80, 0.9)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: '#3498db',
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  return `€${context.parsed.y.toLocaleString('nl-NL')}`
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
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
                callback: function(value) {
                  return `€${value.toLocaleString('nl-NL')}`
                }
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          },
          elements: {
            point: {
              radius: 4,
              hoverRadius: 6,
              backgroundColor: '#3498db'
            }
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

    async loadChartData() {
      this.loading = true
      this.error = false

      try {
        // Hier zou je je API call doen
        // const response = await this.$api.get('/admin/charts/revenue')
        // this.updateChart(response.data)

        // Voor nu gebruiken we mock data
        await new Promise(resolve => setTimeout(resolve, 1000))

        const mockData = {
          labels: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun'],
          datasets: [
            {
              label: 'Omzet 2024',
              data: [1500, 2300, 1800, 2700, 2100, 3200],
              borderColor: '#3498db',
              backgroundColor: 'rgba(52, 152, 219, 0.1)',
              borderWidth: 3,
              fill: true,
              tension: 0.4
            }
          ]
        }

        this.updateChart(mockData)
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
.revenue-chart {
  height: 100%;
  position: relative;
}

.chart-container {
  height: 100%;
  min-height: 250px;
}

.chart-loading,
.chart-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;
  color: #7f8c8d;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.chart-error i {
  font-size: 48px;
  color: #e74c3c;
  margin-bottom: 1rem;
}

.chart-error p {
  margin-bottom: 1rem;
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
</style>