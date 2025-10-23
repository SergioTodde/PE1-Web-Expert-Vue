<template>
  <div class="event-calendar">
    <div class="calendar-header">
      <button @click="previousMonth" class="nav-btn">
        <i class="fas fa-chevron-left"></i>
      </button>
      <h3 class="month-title">{{ currentMonthYear }}</h3>
      <button @click="nextMonth" class="nav-btn">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <div class="calendar-grid">
      <div class="weekdays">
        <div v-for="day in weekdays" :key="day" class="weekday">
          {{ day }}
        </div>
      </div>

      <div class="days-grid">
        <div
            v-for="day in calendarDays"
            :key="day.date"
            class="calendar-day"
            :class="{
            'other-month': !day.isCurrentMonth,
            'has-events': day.events.length > 0,
            'today': day.isToday
          }"
            @click="selectDay(day)"
        >
          <div class="day-number">{{ day.day }}</div>
          <div class="day-events">
            <div
                v-for="event in day.events.slice(0, 2)"
                :key="event.id"
                class="event-indicator"
                :style="{ backgroundColor: getEventColor(event.category) }"
                @click.stop="viewEvent(event)"
            ></div>
            <div
                v-if="day.events.length > 2"
                class="more-events"
            >
              +{{ day.events.length - 2 }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Day Events Modal -->
    <div v-if="selectedDay" class="day-events-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Evenementen op {{ selectedDay.formattedDate }}</h4>
          <button @click="selectedDay = null" class="close-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="events-list">
          <div
              v-for="event in selectedDay.events"
              :key="event.id"
              class="modal-event-item"
              @click="viewEvent(event)"
          >
            <div class="event-time">{{ formatTime(event.start_date) }}</div>
            <div class="event-info">
              <h5>{{ event.title }}</h5>
              <p>{{ event.location }}</p>
            </div>
            <div class="event-category" :style="{
              backgroundColor: getEventColor(event.category)
            }">
              {{ event.category }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCalendar',
  props: {
    events: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentDate: new Date(),
      selectedDay: null,
      weekdays: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za']
    }
  },
  computed: {
    currentMonthYear() {
      return this.currentDate.toLocaleDateString('nl-BE', {
        month: 'long',
        year: 'numeric'
      })
    },

    calendarDays() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()

      // First day of month
      const firstDay = new Date(year, month, 1)
      // Last day of month
      const lastDay = new Date(year, month + 1, 0)

      // Start from Sunday of the week containing the first day
      const startDate = new Date(firstDay)
      startDate.setDate(startDate.getDate() - startDate.getDay())

      // End on Saturday of the week containing the last day
      const endDate = new Date(lastDay)
      endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))

      const days = []
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dayEvents = this.events.filter(event => {
          const eventDate = new Date(event.start_date)
          return eventDate.toDateString() === date.toDateString()
        })

        days.push({
          date: date.toISOString().split('T')[0],
          day: date.getDate(),
          isCurrentMonth: date.getMonth() === month,
          isToday: date.toDateString() === today.toDateString(),
          events: dayEvents,
          formattedDate: date.toLocaleDateString('nl-BE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        })
      }

      return days
    }
  },
  methods: {
    previousMonth() {
      this.currentDate = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth() - 1,
          1
      )
    },

    nextMonth() {
      this.currentDate = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth() + 1,
          1
      )
    },

    selectDay(day) {
      if (day.events.length > 0) {
        this.selectedDay = day
      }
    },

    viewEvent(event) {
      this.$emit('event-click', event)
      this.selectedDay = null
    },

    formatTime(dateString) {
      return new Date(dateString).toLocaleTimeString('nl-BE', {
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    getEventColor(category) {
      const colors = {
        'Muziek': '#e74c3c',
        'Sport': '#3498db',
        'Kunst': '#9b59b6',
        'Technologie': '#2ecc71',
        'Educatie': '#f39c12',
        'Food & Drink': '#e67e22',
        'Wellness': '#1abc9c',
        'Business': '#34495e'
      }
      return colors[category] || '#95a5a6'
    }
  }
}
</script>

<style scoped>
.event-calendar {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.month-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.nav-btn {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  margin-bottom: 0.5rem;
}

.weekday {
  text-align: center;
  font-weight: 600;
  color: #495057;
  padding: 0.5rem;
  font-size: 0.9rem;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #e9ecef;
  border: 1px solid #e9ecef;
}

.calendar-day {
  background: white;
  min-height: 100px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.calendar-day:hover {
  background: #f8f9fa;
}

.calendar-day.other-month {
  background: #f8f9fa;
  color: #6c757d;
}

.calendar-day.today {
  background: #fff3cd;
}

.calendar-day.has-events {
  border-bottom: 3px solid #007bff;
}

.day-number {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.day-events {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.event-indicator {
  height: 4px;
  border-radius: 2px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.event-indicator:hover {
  transform: scale(1.1);
}

.more-events {
  font-size: 0.7rem;
  color: #6c757d;
  text-align: center;
  margin-top: 2px;
}

.day-events-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h4 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #6c757d;
  padding: 0.5rem;
}

.close-btn:hover {
  color: #333;
}

.modal-event-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-event-item:hover {
  background: #f8f9fa;
  border-color: #007bff;
}

.event-time {
  font-weight: 600;
  color: #007bff;
  min-width: 60px;
}

.event-info {
  flex: 1;
}

.event-info h5 {
  margin: 0 0 0.25rem 0;
  color: #333;
}

.event-info p {
  margin: 0;
  color: #6c757d;
  font-size: 0.9rem;
}

.event-category {
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .calendar-day {
    min-height: 80px;
    padding: 0.25rem;
  }

  .day-number {
    font-size: 0.8rem;
  }

  .modal-content {
    margin: 1rem;
    width: calc(100% - 2rem);
  }
}
</style>