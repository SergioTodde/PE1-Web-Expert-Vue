<template>
  <div class="success-stories-page">
    <div class="container">
      <div class="page-header">
        <h1>Succesverhalen</h1>
        <p>Ontdek hoe andere organisatoren succesvolle evenementen creëren met EventPlan</p>
      </div>

      <!-- Featured Stories -->
      <section class="featured-stories">
        <h2>Uitgelichte Verhalen</h2>
        <div class="stories-grid">
          <div
              v-for="story in featuredStories"
              :key="story.id"
              class="story-card"
              @click="openStory(story)"
          >
            <div class="story-image">
              <img :src="story.image" :alt="story.title">
              <div class="story-category">{{ story.category }}</div>
            </div>
            <div class="story-content">
              <h3>{{ story.title }}</h3>
              <p class="story-excerpt">{{ story.excerpt }}</p>
              <div class="story-meta">
                <div class="organizer">
                  <img :src="story.organizer.avatar" :alt="story.organizer.name" class="organizer-avatar">
                  <span>{{ story.organizer.name }}</span>
                </div>
                <div class="stats">
                  <span class="stat">
                    <i class="fas fa-ticket-alt"></i>
                    {{ story.stats.tickets }} tickets
                  </span>
                  <span class="stat">
                    <i class="fas fa-star"></i>
                    {{ story.stats.rating }}/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Statistics -->
      <section class="statistics-section">
        <div class="stats-grid">
          <div class="stat-item">
            <i class="fas fa-calendar-check"></i>
            <div class="stat-number">10.000+</div>
            <div class="stat-label">Evenementen Georganiseerd</div>
          </div>
          <div class="stat-item">
            <i class="fas fa-ticket-alt"></i>
            <div class="stat-number">500.000+</div>
            <div class="stat-label">Tickets Verkocht</div>
          </div>
          <div class="stat-item">
            <i class="fas fa-users"></i>
            <div class="stat-number">50.000+</div>
            <div class="stat-label">Tevreden Bezoekers</div>
          </div>
          <div class="stat-item">
            <i class="fas fa-chart-line"></i>
            <div class="stat-number">95%</div>
            <div class="stat-label">Succesratio</div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="testimonials-section">
        <h2>Wat Onze Organisatoren Zeggen</h2>
        <div class="testimonials-grid">
          <div
              v-for="testimonial in testimonials"
              :key="testimonial.id"
              class="testimonial-card"
          >
            <div class="testimonial-content">
              <i class="fas fa-quote-left"></i>
              <p>{{ testimonial.content }}</p>
            </div>
            <div class="testimonial-author">
              <img :src="testimonial.author.avatar" :alt="testimonial.author.name" class="author-avatar">
              <div class="author-info">
                <strong>{{ testimonial.author.name }}</strong>
                <span>{{ testimonial.author.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="success-cta">
        <div class="cta-content">
          <h2>Start Jouw Succesverhaal</h2>
          <p>Word de volgende succesvolle organisator op EventPlan</p>
          <div class="cta-buttons">
            <router-link to="/create-event" class="btn btn-primary btn-large">
              <i class="fas fa-plus"></i>
              Evenement Aanmaken
            </router-link>
            <router-link to="/pricing" class="btn btn-outline btn-large">
              <i class="fas fa-chart-line"></i>
              Bekijk Prijzen
            </router-link>
          </div>
        </div>
      </section>

      <!-- Story Modal -->
      <div v-if="selectedStory" class="story-modal" @click="closeStory">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="closeStory">
            <i class="fas fa-times"></i>
          </button>

          <div class="story-details">
            <div class="story-header">
              <img :src="selectedStory.image" :alt="selectedStory.title" class="story-hero">
              <div class="story-info">
                <h2>{{ selectedStory.title }}</h2>
                <p class="story-category">{{ selectedStory.category }}</p>
                <div class="story-stats">
                  <div class="stat">
                    <i class="fas fa-ticket-alt"></i>
                    <span>{{ selectedStory.stats.tickets }} tickets verkocht</span>
                  </div>
                  <div class="stat">
                    <i class="fas fa-euro-sign"></i>
                    <span>€{{ selectedStory.stats.revenue }} omzet</span>
                  </div>
                  <div class="stat">
                    <i class="fas fa-star"></i>
                    <span>{{ selectedStory.stats.rating }}/5 beoordeling</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="story-body">
              <div class="organizer-profile">
                <img :src="selectedStory.organizer.avatar" :alt="selectedStory.organizer.name" class="organizer-avatar-large">
                <div class="organizer-details">
                  <h4>{{ selectedStory.organizer.name }}</h4>
                  <p>{{ selectedStory.organizer.bio }}</p>
                </div>
              </div>

              <div class="story-content">
                <h3>Het Verhaal</h3>
                <p>{{ selectedStory.fullStory }}</p>

                <h3>Uitdagingen</h3>
                <p>{{ selectedStory.challenges }}</p>

                <h3>Oplossing met EventPlan</h3>
                <p>{{ selectedStory.solution }}</p>

                <h3>Resultaten</h3>
                <p>{{ selectedStory.results }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuccessStories',
  data() {
    return {
      selectedStory: null,
      featuredStories: [
        {
          id: 1,
          title: 'Tech Conference 2024',
          category: 'Conferentie',
          excerpt: 'Hoe een kleine tech community uitgroeide tot een evenement met 500+ bezoekers',
          image: '/images/stories/tech-conference.jpg',
          organizer: {
            name: 'Lisa van Dijk',
            avatar: '/images/avatars/organizer1.jpg',
            bio: 'Oprichtster van TechCommunity NL met 5 jaar ervaring in tech evenementen'
          },
          stats: {
            tickets: 520,
            revenue: 25000,
            rating: 4.8
          },
          fullStory: 'TechConference begon als een klein maandelijkse meetup met slechts 20 deelnemers. Met behulp van EventPlan konden we groeien naar een jaarlijks evenement met meer dan 500 tech-enthousiastelingen.',
          challenges: 'We worstelden met ticketverkoop, betalingen en communicatie met bezoekers. Het beheer van meerdere kanalen was tijdrovend en foutgevoelig.',
          solution: 'EventPlan bood een alles-in-één oplossing voor ticketing, marketing en bezoekersmanagement. De geautomatiseerde processen bespaarden ons uren werk per week.',
          results: 'Binnen 2 jaar groeide ons evenement met 400%. De tevredenheid van bezoekers steeg naar 4.8 sterren en we behaalden een volledige uitverkocht status.'
        },
        {
          id: 2,
          title: 'Amsterdam Music Festival',
          category: 'Muziek',
          excerpt: 'Van lokale band naar internationaal muziekfestival met 2000 bezoekers',
          image: '/images/stories/music-festival.jpg',
          organizer: {
            name: 'David Chen',
            avatar: '/images/avatars/organizer2.jpg',
            bio: 'Muziekproducent en festivalorganisator met 8 jaar ervaring'
          },
          stats: {
            tickets: 2000,
            revenue: 75000,
            rating: 4.9
          },
          fullStory: 'Amsterdam Music Festival startte als een bescheiden showcase voor lokale talenten en groeide uit tot een 2-daags festival met internationale artiesten.',
          challenges: 'Complexe line-up planning, ticket distributie en veiligheidsmanagement waren onze grootste uitdagingen.',
          solution: 'Met EventPlan konden we verschillende tickettypes aanbieden, real-time sales volgen en efficiënt communiceren met alle stakeholders.',
          results: 'We verdubbelden onze ticketverkoop in één jaar en behaalden een recordaantal van 2000 bezoekers met een bijna perfecte beoordeling.'
        }
      ],
      testimonials: [
        {
          id: 1,
          content: 'EventPlan heeft ons evenement naar een hoger niveau getild. De tools zijn intuïtief en de support is fantastisch!',
          author: {
            name: 'Sarah Johnson',
            role: 'Evenementen Manager bij Creative Events',
            avatar: '/images/avatars/testimonial1.jpg'
          }
        },
        {
          id: 2,
          content: 'Als startende organisator was ik overweldigd door de logistiek. EventPlan maakte het proces eenvoudig en professioneel.',
          author: {
            name: 'Mike Rodriguez',
            role: 'Oprichter van Startup Meetups',
            avatar: '/images/avatars/testimonial2.jpg'
          }
        },
        {
          id: 3,
          content: 'De analytics en rapportage functies helpen ons om elk evenement beter te maken dan het vorige. Een onmisbare tool!',
          author: {
            name: 'Emma Wilson',
            role: 'Directeur bij Wilson Productions',
            avatar: '/images/avatars/testimonial3.jpg'
          }
        }
      ]
    }
  },
  methods: {
    openStory(story) {
      this.selectedStory = story
      document.body.style.overflow = 'hidden'
    },
    closeStory() {
      this.selectedStory = null
      document.body.style.overflow = ''
    }
  },
  mounted() {
    document.title = 'Succesverhalen - EventPlan'
  }
}
</script>

<style scoped>
.success-stories-page {
  padding: 2rem 0;
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  color: #2c3e50;
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #7f8c8d;
  font-size: 1.2rem;
}

.featured-stories {
  margin-bottom: 4rem;
}

.featured-stories h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.story-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.story-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.story-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.story-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.story-card:hover .story-image img {
  transform: scale(1.05);
}

.story-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.story-content {
  padding: 1.5rem;
}

.story-content h3 {
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.story-excerpt {
  color: #5d6d7e;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.story-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.organizer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.organizer-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #7f8c8d;
}

.stat i {
  color: #3498db;
}

.statistics-section {
  margin-bottom: 4rem;
  padding: 3rem 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-item i {
  font-size: 3rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #7f8c8d;
  font-weight: 500;
}

.testimonials-section {
  margin-bottom: 4rem;
}

.testimonials-section h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.testimonial-content {
  position: relative;
  margin-bottom: 1.5rem;
}

.testimonial-content i {
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  font-size: 2rem;
  color: #e9ecef;
  z-index: 1;
}

.testimonial-content p {
  position: relative;
  z-index: 2;
  color: #5d6d7e;
  line-height: 1.6;
  font-style: italic;
  margin: 0;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.author-info span {
  color: #7f8c8d;
  font-size: 0.875rem;
}

.success-cta {
  background: white;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.cta-content h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.cta-content p {
  color: #7f8c8d;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.btn-primary:hover {
  background: #2980b9;
  border-color: #2980b9;
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

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

/* Story Modal */
.story-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
}

.close-btn:hover {
  background: rgba(0,0,0,0.7);
}

.story-header {
  position: relative;
}

.story-hero {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.story-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
  padding: 2rem;
}

.story-info h2 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.story-category {
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
  font-weight: 600;
  margin-bottom: 1rem;
}

.story-stats {
  display: flex;
  gap: 2rem;
}

.story-stats .stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
}

.story-body {
  padding: 2rem;
}

.organizer-profile {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.organizer-avatar-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.organizer-details h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.organizer-details p {
  color: #5d6d7e;
  margin: 0;
  line-height: 1.5;
}

.story-content h3 {
  color: #2c3e50;
  margin: 1.5rem 0 1rem 0;
  font-size: 1.5rem;
}

.story-content p {
  color: #5d6d7e;
  line-height: 1.6;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .stories-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }

  .story-modal {
    padding: 1rem;
  }

  .modal-content {
    max-height: 95vh;
  }

  .story-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .organizer-profile {
    flex-direction: column;
    text-align: center;
  }
}
</style>