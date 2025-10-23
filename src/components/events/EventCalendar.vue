<template>
  <div class="event-calendar">
    <div class="calendar-header">
      <button @click="previousMonth" class="nav-btn" aria-label="Vorige maand">
        <i class="fas fa-chevron-left"></i>
      </button>
      <h3 class="month-title">{{ currentMonthYear }}</h3>
      <button @click="nextMonth" class="nav-btn" aria-label="Volgende maand">
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
            'today': day.isToday,
            'selected': selectedDate === day.date
          }"
            @click="selectDay(day)"
        >
          <div class="day-number">{{ day.day }}</div>
          <div class="day-events">
            <div
                v-for="event in day.events.slice(0, 3)"
                :key="event.id"
                class="event-indicator"
                :style="{ backgroundColor: getEventColor(event.category) }"
                :title="event.title"
                @click.stop="viewEvent(event)"
            ></div>
            <div
                v-if="day.events.length > 3"
                class="more-events"
            >
              +{{ day.events.length - 3 }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Selected Day Events -->
    <div v-if="selectedDay && selectedDay.events.length > 0" class="selected-day-events">
      <h4>Evenementen op {{ selectedDay.formattedDate }}</h4>
      <div class="events-list">
        <div
            v-for="event in selectedDay.events"
            :key="event.id"
            class="event-item"
            @click="viewEvent(event)"
        >
          <div class="event-time">{{ formatTime(event.start_date) }}</div>
          <div class="event-info">
            <h5>{{ event.title }}</h5>
            <p class="event-location">{{ event.location }}</p>
            <div class="event-category-tag">{{ event.category }}</div>
          </div>
          <div class="event-actions">
            <button @click.stop="toggleEventFavorite(event)" class="btn-icon" :class="{ active: event.is_favorite }">
              <i class="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Events Message -->
    <div v-else-if="selectedDay" class="no-events-message">
      <p>Geen evenementen op {{ selectedDay.formattedDate }}</p>
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
    },
    initialDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentDate: new Date(this.initialDate),
      selectedDate: null,
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
      this.selectedDate = null
      this.selectedDay = null
    },

    nextMonth() {
      this.currentDate = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth() + 1,
          1
      )
      this.selectedDate = null
      this.selectedDay = null
    },

    selectDay(day) {
      this.selectedDate = day.date
      this.selectedDay = day
      this.$emit('day-selected', day)
    },

    viewEvent(event) {
      this.$emit('event-click', event)
    },

    toggleEventFavorite(event) {
      this.$emit('toggle-favorite', event.id)
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
    },

    goToToday() {
      this.currentDate = new Date()
      this.selectedDate = null
      this.selectedDay = null
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
  text-align: center;
  flex: 1;
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
  color: #495057;
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
  padding: 0.75rem 0.5rem;
  font-size: 0.9rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #e9ecef;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.calendar-day {
  background: white;
  min-height: 100px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.calendar-day:hover {
  background: #f8f9fa;
  transform: scale(1.02);
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.calendar-day.other-month {
  background: #f8f9fa;
  color: #6c757d;
}

.calendar-day.today {
  background: #fff3cd;
  font-weight: 600;
}

.calendar-day.selected {
  background: #007bff;
  color: white;
}

.calendar-day.has-events::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: #007bff;
  border-radius: 50%;
}

.calendar-day.selected.has-events::after {
  background: white;
}

.day-number {
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.calendar-day.selected .day-number {
  color: white;
}

.day-events {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 0.25rem;
}

.event-indicator {
  height: 4px;
  border-radius: 2px;
  cursor: pointer;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.event-indicator:hover {
  transform: scale(1.2);
}

.more-events {
  font-size: 0.7rem;
  color: #6c757d;
  text-align: center;
  margin-top: 2px;
}

.calendar-day.selected .more-events {
  color: rgba(255,255,255,0.8);
}

.selected-day-events {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.selected-day-events h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.event-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.event-item:hover {
  border-color: #007bff;
  box-shadow: 0 2px 8px rgba(0,123,255,0.1);
  transform: translateY(-1px);
}

.event-time {
  font-weight: 600;
  color: #007bff;
  min-width: 60px;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.event-info {
  flex: 1;
}

.event-info h5 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 0.95rem;
  line-height: 1.3;
}

.event-location {
  margin: 0 0 0.5rem 0;
  color: #6c757d;
  font-size: 0.8rem;
}

.event-category-tag {
  display: inline-block;
  background: #e9ecef;
  color: #495057;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
}

.event-actions {
  flex-shrink: 0;
}

.btn-icon {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #6c757d;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-icon:hover {
  background: #f8f9fa;
  color: #dc3545;
}

.btn-icon.active {
  color: #dc3545;
}

.no-events-message {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-style: italic;
  margin-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

/* Responsive Design */
@media (max-width: 768px) {
  .event-calendar {
    padding: 1rem;
  }

  .calendar-day {
    min-height: 80px;
    padding: 0.25rem;
  }

  .day-number {
    font-size: 0.8rem;
  }

  .event-item {
    flex-direction: column;
    gap: 0.5rem;
  }

  .event-time {
    min-width: auto;
  }

  .weekday {
    padding: 0.5rem 0.25rem;
    font-size: 0.8rem;
  }
}

/* Print Styles */
@media print {
  .event-calendar {
    box-shadow: none;
    border: 1px solid #ddd;
  }

  .nav-btn {
    display: none;
  }
}
</style>