<template>
  <div class="event-card" :class="{ featured: featured }">
    <div class="event-image">
      <img :src="event.image_url" :alt="event.title" @error="handleImageError">
      <div class="event-overlay">
        <button
            v-if="$store.getters['auth/isAuthenticated']"
            @click="toggleFavorite"
            class="favorite-btn"
            :class="{ active: event.is_favorite }"
        >
          <i class="fas fa-heart"></i>
        </button>
        <div class="event-category">
          {{ event.category }}
        </div>
      </div>
    </div>

    <div class="event-content">
      <div class="event-header">
        <h3 class="event-title">{{ event.title }}</h3>
        <div class="event-price" v-if="event.tickets && event.tickets.length">
          Vanaf €{{ Math.min(...event.tickets.map(t => t.price)) }}
        </div>
      </div>

      <p class="event-description">{{ event.description }}</p>

      <div class="event-meta">
        <div class="meta-item">
          <i class="fas fa-calendar"></i>
          <span>{{ formatDate(event.start_date) }}</span>
        </div>
        <div class="meta-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ event.location }}</span>
        </div>
        <div class="meta-item" v-if="event.available_tickets !== undefined">
          <i class="fas fa-ticket-alt"></i>
          <span>{{ event.available_tickets }} tickets beschikbaar</span>
        </div>
      </div>

      <div class="event-actions">
        <button @click="viewDetails" class="btn btn-primary">
          Bekijk Details
        </button>
        <button
            v-if="canBookTickets"
            @click="bookTickets"
            class="btn btn-secondary"
        >
          Tickets Boeken
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    canBookTickets() {
      if (!this.event.tickets || !this.event.tickets.length) return false

      const now = new Date()
      const saleStart = new Date(this.event.ticket_sale_start)
      return now >= saleStart
    }
  },
  methods: {
    toggleFavorite() {
      this.$emit('toggle-favorite', this.event.id)
    },

    viewDetails() {
      this.$router.push({ name: 'EventDetail', params: { id: this.event.id } })
    },

    bookTickets() {
      this.$router.push({
        name: 'EventDetail',
        params: { id: this.event.id },
        query: { book: 'true' }
      })
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('nl-BE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },

    handleImageError(event) {
      event.target.src = '/images/event-placeholder.jpg'
    }
  }
}
</script>

<style scoped>
.event-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}

.event-card.featured {
  border: 2px solid #ff6b6b;
}

.event-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.event-card:hover .event-image img {
  transform: scale(1.05);
}

.event-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.3));
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
}

.favorite-btn {
  background: rgba(255,255,255,0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6c757d;
}

.favorite-btn:hover,
.favorite-btn.active {
  background: #ff6b6b;
  color: white;
}

.event-category {
  background: rgba(0,123,255,0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.event-content {
  padding: 1.5rem;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.event-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  flex: 1;
  margin-right: 1rem;
}

.event-price {
  background: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.event-description {
  color: #6c757d;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #495057;
  font-size: 0.9rem;
}

.meta-item i {
  width: 16px;
  color: #007bff;
}

.event-actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

@media (max-width: 768px) {
  .event-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .event-actions {
    flex-direction: column;
  }
}
</style>