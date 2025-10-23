<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Ontdek Onvergetelijke Evenementen</h1>
          <p class="hero-subtitle">Boek tickets voor de beste evenementen in jouw buurt</p>
          <div class="hero-search">
            <SearchBar
                @search="handleSearch"
                placeholder="Zoek evenementen, locaties, categorieën..."
                :large="true"
            />
          </div>
          <div class="hero-tags">
            <span class="tag" @click="filterByCategory('Muziek')">Muziek</span>
            <span class="tag" @click="filterByCategory('Sport')">Sport</span>
            <span class="tag" @click="filterByCategory('Kunst')">Kunst</span>
            <span class="tag" @click="filterByCategory('Food & Drink')">Food & Drink</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Events -->
    <section class="featured-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Uitgelichte Evenementen</h2>
          <router-link to="/events" class="view-all-link">
            Bekijk alle <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
        <div class="featured-grid">
          <div
              v-for="event in featuredEvents"
              :key="event.id"
              class="featured-card"
          >
            <div class="card-image">
              <div class="image-placeholder">
                <i class="fas fa-calendar-alt"></i>
              </div>
              <div class="card-badge featured-badge">
                <i class="fas fa-star"></i>
                Uitgelicht
              </div>
            </div>
            <div class="card-content">
              <div class="card-category">{{ event.category }}</div>
              <h3 class="card-title">{{ event.title }}</h3>
              <p class="card-description">{{ event.description }}</p>
              <div class="card-details">
                <div class="detail">
                  <i class="fas fa-calendar"></i>
                  <span>{{ event.date }}</span>
                </div>
                <div class="detail">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ event.location }}</span>
                </div>
                <div class="detail">
                  <i class="fas fa-users"></i>
                  <span>{{ event.attendees }} deelnemers</span>
                </div>
              </div>
              <div class="card-footer">
                <div class="price">{{ event.price === 0 ? 'Gratis' : `€${event.price}` }}</div>
                <button class="btn-primary">Meer info</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="categories-section">
      <div class="container">
        <div class="categories-header">
          <h2 class="section-title">Populaire Categorieën</h2>
          <div class="scroll-controls">
            <button @click="scrollCategories(-1)" class="scroll-btn scroll-left" aria-label="Scroll naar links">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button @click="scrollCategories(1)" class="scroll-btn scroll-right" aria-label="Scroll naar rechts">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div class="categories-scroll-container">
          <div class="categories-scroll" ref="categoriesScroll">
            <div
                v-for="category in categories"
                :key="category.id"
                class="category-card"
                @click="filterByCategory(category.name)"
            >
              <div class="category-icon">
                <i :class="category.icon"></i>
              </div>
              <h3>{{ category.name }}</h3>
              <p>{{ category.count }} evenementen</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Upcoming Events -->
    <section class="upcoming-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Binnenkort</h2>
          <router-link to="/events" class="view-all-link">
            Bekijk alle evenementen <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
        <div class="upcoming-grid">
          <div
              v-for="event in upcomingEvents"
              :key="event.id"
              class="upcoming-card"
          >
            <div class="upcoming-date">
              <div class="date-day">{{ formatDay(event.date) }}</div>
              <div class="date-month">{{ formatMonth(event.date) }}</div>
            </div>
            <div class="upcoming-content">
              <h3 class="event-title">{{ event.title }}</h3>
              <p class="event-location">
                <i class="fas fa-map-marker-alt"></i>
                {{ event.location }}
              </p>
              <div class="event-meta">
                <span class="meta-item">
                  <i class="fas fa-clock"></i>
                  {{ event.time }}
                </span>
                <span class="meta-item">
                  <i class="fas fa-users"></i>
                  {{ event.attendees }}
                </span>
              </div>
            </div>
            <button class="btn-attend">Info</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-icon">
              <i class="fas fa-calendar-check"></i>
            </div>
            <div class="stat-number">{{ stats.totalEvents }}+</div>
            <div class="stat-label">Evenementen</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-number">{{ stats.totalUsers }}+</div>
            <div class="stat-label">Gebruikers</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <i class="fas fa-ticket-alt"></i>
            </div>
            <div class="stat-number">{{ stats.ticketsSold }}+</div>
            <div class="stat-label">Tickets Verkocht</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">
              <i class="fas fa-city"></i>
            </div>
            <div class="stat-number">{{ stats.cities }}+</div>
            <div class="stat-label">Steden</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Klaar om je volgende evenement te vinden?</h2>
          <p class="cta-description">Ontdek duizenden evenementen en maak herinneringen die een leven lang meegaan.</p>
          <div class="cta-actions">
            <router-link to="/events" class="btn-cta-primary">
              <i class="fas fa-search"></i>
              Evenementen Ontdekken
            </router-link>
            <button
                v-if="$store.getters['auth/isAuthenticated']"
                @click="$router.push('/create-event')"
                class="btn-cta-secondary"
            >
              <i class="fas fa-plus"></i>
              Evenement Aanmaken
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SearchBar from '@/components/shared/SearchBar.vue'

export default {
  name: 'HomeView',
  components: {
    SearchBar
  },
  data() {
    return {
      categories: [
        { id: 1, name: 'Muziek', icon: 'fas fa-music', count: 124 },
        { id: 2, name: 'Sport', icon: 'fas fa-running', count: 89 },
        { id: 3, name: 'Kunst', icon: 'fas fa-palette', count: 67 },
        { id: 4, name: 'Technologie', icon: 'fas fa-laptop-code', count: 45 },
        { id: 5, name: 'Food & Drink', icon: 'fas fa-utensils', count: 78 },
        { id: 6, name: 'Wellness', icon: 'fas fa-spa', count: 34 },
        { id: 7, name: 'Business', icon: 'fas fa-briefcase', count: 56 },
        { id: 8, name: 'Educatie', icon: 'fas fa-graduation-cap', count: 42 },
        { id: 9, name: 'Comedy', icon: 'fas fa-theater-masks', count: 23 },
        { id: 10, name: 'Festivals', icon: 'fas fa-glass-cheers', count: 38 }
      ],
      stats: {
        totalEvents: 450,
        totalUsers: 12500,
        ticketsSold: 89000,
        cities: 25
      },
      featuredEvents: [
        {
          id: 1,
          title: 'Amsterdam Music Festival',
          description: 'Het grootste elektronische muziek festival van Nederland met internationale DJs.',
          category: 'Muziek',
          date: '15 Nov 2024',
          location: 'Amsterdam',
          attendees: 2500,
          price: 75
        },
        {
          id: 2,
          title: 'Tech Summit 2024',
          description: 'Jaarlijks technologie congres met sprekers uit de hele wereld.',
          category: 'Technologie',
          date: '22 Nov 2024',
          location: 'Rotterdam',
          attendees: 800,
          price: 120
        },
        {
          id: 3,
          title: 'Food & Wine Experience',
          description: 'Proef de beste gerechten en wijnen van topchefs en sommeliers.',
          category: 'Food & Drink',
          date: '30 Nov 2024',
          location: 'Utrecht',
          attendees: 300,
          price: 65
        }
      ],
      upcomingEvents: [
        {
          id: 4,
          title: 'Yoga in het Park',
          description: 'Ontspannende yoga sessie in het Vondelpark',
          category: 'Wellness',
          date: '2024-11-08',
          time: '09:00',
          location: 'Amsterdam',
          attendees: 45,
          price: 0
        },
        {
          id: 5,
          title: 'Startup Networking',
          description: 'Netwerk event voor startups en investeerders',
          category: 'Business',
          date: '2024-11-10',
          time: '18:30',
          location: 'Rotterdam',
          attendees: 120,
          price: 25
        },
        {
          id: 6,
          title: 'Comedy Night',
          description: 'Avond vol humor met de beste comedians van Nederland',
          category: 'Comedy',
          date: '2024-11-12',
          time: '20:00',
          location: 'Den Haag',
          attendees: 200,
          price: 35
        },
        {
          id: 7,
          title: 'Art Exhibition',
          description: 'Tentoonstelling van moderne kunst van lokale kunstenaars',
          category: 'Kunst',
          date: '2024-11-14',
          time: '10:00',
          location: 'Utrecht',
          attendees: 85,
          price: 15
        }
      ]
    }
  },
  computed: {
    ...mapGetters('events', ['getFeaturedEvents', 'getUpcomingEvents'])
  },
  async mounted() {
    // In een echte app zou je deze data van de store halen
    // await this.fetchFeaturedEvents()
    // await this.fetchUpcomingEvents()
  },
  methods: {
    ...mapActions('events', ['fetchFeaturedEvents', 'fetchUpcomingEvents']),

    handleSearch(query) {
      this.$router.push({
        path: '/events',
        query: { search: query }
      })
    },

    filterByCategory(category) {
      this.$router.push({
        path: '/events',
        query: { category: category }
      })
    },

    scrollCategories(direction) {
      const scrollContainer = this.$refs.categoriesScroll
      if (scrollContainer) {
        const scrollAmount = 300
        scrollContainer.scrollBy({
          left: direction * scrollAmount,
          behavior: 'smooth'
        })
      }
    },

    formatDay(dateString) {
      const date = new Date(dateString)
      return date.getDate()
    },

    formatMonth(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('nl-NL', { month: 'short' })
    }
  }
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="rgba(255,255,255,0.05)" points="0,1000 1000,0 1000,1000"/></svg>');
  background-size: cover;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  font-weight: 400;
}

.hero-search {
  max-width: 600px;
  margin: 0 auto 3rem;
}

.hero-tags {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.tag:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* Sections Common */
.featured-section,
.categories-section,
.upcoming-section {
  padding: 5rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.view-all-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 0.75rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
}

.view-all-link:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
  transform: translateX(5px);
}

/* Featured Events */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2.5rem;
}

.featured-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #f1f5f9;
}

.featured-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  color: rgba(255, 255, 255, 0.8);
  font-size: 3.5rem;
}

.featured-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.95);
  color: #f59e0b;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(10px);
}

.card-content {
  padding: 2rem;
}

.card-category {
  background: #f0f4ff;
  color: #667eea;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.card-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.detail {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4b5563;
  font-size: 0.9rem;
}

.detail i {
  color: #667eea;
  width: 16px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #059669;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Categories Section */
.categories-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.scroll-controls {
  display: flex;
  gap: 0.75rem;
}

.scroll-btn {
  background: white;
  border: 2px solid #e2e8f0;
  color: #667eea;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.scroll-btn:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.scroll-btn:active {
  transform: scale(0.95);
}

.categories-scroll-container {
  position: relative;
  overflow: hidden;
  padding: 1rem 0;
}

.categories-scroll {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 0.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.categories-scroll::-webkit-scrollbar {
  display: none;
}

.category-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;
  flex-shrink: 0;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.category-card:hover::before {
  transform: scaleX(1);
}

.category-icon {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.2);
  color: #764ba2;
}

.category-card h3 {
  margin-bottom: 0.75rem;
  color: #1f2937;
  font-weight: 700;
  font-size: 1.2rem;
}

.category-card p {
  color: #6b7280;
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Upcoming Events */
.upcoming-section {
  background: #f8fafc;
}

.upcoming-grid {
  display: grid;
  gap: 1.5rem;
}

.upcoming-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border-left: 4px solid #667eea;
}

.upcoming-card:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.upcoming-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  min-width: 80px;
  text-align: center;
}

.date-day {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1;
}

.date-month {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.9;
}

.upcoming-content {
  flex: 1;
}

.event-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.event-location {
  color: #6b7280;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.event-meta {
  display: flex;
  gap: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.85rem;
}

.btn-attend {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-attend:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  color: white;
  padding: 5rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  text-align: center;
}

.stat-item {
  padding: 2rem;
}

.stat-icon {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 1.1rem;
  color: #d1d5db;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.cta-description {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-cta-primary {
  background: white;
  color: #667eea;
  padding: 1.25rem 2.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn-cta-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
}

.btn-cta-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1.25rem 2.5rem;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.btn-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }

  .featured-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }

  .hero-section {
    padding: 4rem 0;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .categories-header {
    flex-direction: column;
    gap: 1.5rem;
  }

  .scroll-controls {
    order: -1;
  }

  .featured-section,
  .categories-section,
  .upcoming-section {
    padding: 3rem 0;
  }

  .featured-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .categories-scroll {
    gap: 1rem;
  }

  .category-card {
    min-width: 160px;
    padding: 2rem 1.5rem;
  }

  .upcoming-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .event-meta {
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn-cta-primary,
  .btn-cta-secondary {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .featured-card {
    margin: 0 -0.5rem;
  }

  .category-card {
    min-width: 140px;
    padding: 1.5rem 1rem;
  }

  .category-icon {
    font-size: 2.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-number {
    font-size: 3rem;
  }

  .cta-title {
    font-size: 2rem;
  }
}
</style>