<template>
  <div class="sitemap-page">
    <div class="container">
      <div class="page-header">
        <h1>Sitemap</h1>
        <p>Overzicht van alle pagina's op EventPlan</p>
      </div>

      <div class="sitemap-content">
        <!-- Main Sections -->
        <div class="sitemap-section">
          <h2>Hoofdpagina's</h2>
          <div class="links-grid">
            <router-link to="/" class="sitemap-link">
              <i class="fas fa-home"></i>
              Home
            </router-link>
            <router-link to="/events" class="sitemap-link">
              <i class="fas fa-calendar"></i>
              Evenementen
            </router-link>
            <router-link to="/create-event" class="sitemap-link">
              <i class="fas fa-plus"></i>
              Evenement Aanmaken
            </router-link>
          </div>
        </div>

        <!-- User Pages -->
        <div class="sitemap-section">
          <h2>Gebruikersaccount</h2>
          <div class="links-grid">
            <router-link to="/login" class="sitemap-link">
              <i class="fas fa-sign-in-alt"></i>
              Inloggen
            </router-link>
            <router-link to="/register" class="sitemap-link">
              <i class="fas fa-user-plus"></i>
              Registreren
            </router-link>
            <router-link to="/profile" class="sitemap-link">
              <i class="fas fa-user"></i>
              Mijn Profiel
            </router-link>
            <router-link to="/password-reset" class="sitemap-link">
              <i class="fas fa-key"></i>
              Wachtwoord Resetten
            </router-link>
          </div>
        </div>

        <!-- Information Pages -->
        <div class="sitemap-section">
          <h2>Informatie</h2>
          <div class="links-grid">
            <router-link to="/help" class="sitemap-link">
              <i class="fas fa-question-circle"></i>
              Help Center
            </router-link>
            <router-link to="/faq" class="sitemap-link">
              <i class="fas fa-comments"></i>
              Veelgestelde Vragen
            </router-link>
            <router-link to="/contact" class="sitemap-link">
              <i class="fas fa-envelope"></i>
              Contact
            </router-link>
          </div>
        </div>

        <!-- Legal Pages -->
        <div class="sitemap-section">
          <h2>Juridisch</h2>
          <div class="links-grid">
            <router-link to="/privacy" class="sitemap-link">
              <i class="fas fa-shield-alt"></i>
              Privacybeleid
            </router-link>
            <router-link to="/terms" class="sitemap-link">
              <i class="fas fa-gavel"></i>
              Algemene Voorwaarden
            </router-link>
            <router-link to="/cookies" class="sitemap-link">
              <i class="fas fa-cookie"></i>
              Cookiebeleid
            </router-link>
          </div>
        </div>

        <!-- Business Pages -->
        <div class="sitemap-section">
          <h2>Voor Organisatoren</h2>
          <div class="links-grid">
            <router-link to="/pricing" class="sitemap-link">
              <i class="fas fa-tags"></i>
              Prijzen
            </router-link>
            <router-link to="/resources" class="sitemap-link">
              <i class="fas fa-tools"></i>
              Bronnen
            </router-link>
            <router-link to="/success-stories" class="sitemap-link">
              <i class="fas fa-trophy"></i>
              Succesverhalen
            </router-link>
            <router-link to="/api" class="sitemap-link">
              <i class="fas fa-code"></i>
              API
            </router-link>
            <router-link to="/partners" class="sitemap-link">
              <i class="fas fa-handshake"></i>
              Partners
            </router-link>
          </div>
        </div>

        <!-- Additional Pages -->
        <div class="sitemap-section">
          <h2>Overige Pagina's</h2>
          <div class="links-grid">
            <router-link to="/sitemap" class="sitemap-link">
              <i class="fas fa-sitemap"></i>
              Sitemap
            </router-link>
            <router-link to="/accessibility" class="sitemap-link">
              <i class="fas fa-universal-access"></i>
              Toegankelijkheid
            </router-link>
            <router-link to="/security" class="sitemap-link">
              <i class="fas fa-lock"></i>
              Beveiliging
            </router-link>
          </div>
        </div>
      </div>

      <!-- Quick Search -->
      <div class="search-section">
        <h3>Vind wat je zoekt</h3>
        <div class="search-container">
          <input
              v-model="searchQuery"
              type="text"
              placeholder="Typ om pagina's te zoeken..."
              class="search-input"
          >
          <i class="fas fa-search"></i>
        </div>

        <div v-if="filteredLinks.length > 0" class="search-results">
          <h4>Gevonden pagina's:</h4>
          <div class="results-grid">
            <router-link
                v-for="link in filteredLinks"
                :key="link.to"
                :to="link.to"
                class="result-link"
            >
              <i :class="link.icon"></i>
              {{ link.text }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sitemap',
  data() {
    return {
      searchQuery: '',
      allLinks: [
        { to: '/', text: 'Home', icon: 'fas fa-home' },
        { to: '/events', text: 'Evenementen', icon: 'fas fa-calendar' },
        { to: '/create-event', text: 'Evenement Aanmaken', icon: 'fas fa-plus' },
        { to: '/login', text: 'Inloggen', icon: 'fas fa-sign-in-alt' },
        { to: '/register', text: 'Registreren', icon: 'fas fa-user-plus' },
        { to: '/profile', text: 'Mijn Profiel', icon: 'fas fa-user' },
        { to: '/password-reset', text: 'Wachtwoord Resetten', icon: 'fas fa-key' },
        { to: '/help', text: 'Help Center', icon: 'fas fa-question-circle' },
        { to: '/faq', text: 'Veelgestelde Vragen', icon: 'fas fa-comments' },
        { to: '/contact', text: 'Contact', icon: 'fas fa-envelope' },
        { to: '/privacy', text: 'Privacybeleid', icon: 'fas fa-shield-alt' },
        { to: '/terms', text: 'Algemene Voorwaarden', icon: 'fas fa-gavel' },
        { to: '/cookies', text: 'Cookiebeleid', icon: 'fas fa-cookie' },
        { to: '/pricing', text: 'Prijzen', icon: 'fas fa-tags' },
        { to: '/resources', text: 'Bronnen', icon: 'fas fa-tools' },
        { to: '/success-stories', text: 'Succesverhalen', icon: 'fas fa-trophy' },
        { to: '/api', text: 'API', icon: 'fas fa-code' },
        { to: '/partners', text: 'Partners', icon: 'fas fa-handshake' },
        { to: '/sitemap', text: 'Sitemap', icon: 'fas fa-sitemap' },
        { to: '/accessibility', text: 'Toegankelijkheid', icon: 'fas fa-universal-access' },
        { to: '/security', text: 'Beveiliging', icon: 'fas fa-lock' }
      ]
    }
  },
  computed: {
    filteredLinks() {
      if (!this.searchQuery.trim()) return []

      const query = this.searchQuery.toLowerCase()
      return this.allLinks.filter(link =>
          link.text.toLowerCase().includes(query) ||
          link.to.toLowerCase().includes(query)
      )
    }
  },
  mounted() {
    document.title = 'Sitemap - EventPlan'
  }
}
</script>

<style scoped>
.sitemap-page {
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
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #7f8c8d;
  font-size: 1.2rem;
}

.sitemap-content {
  max-width: 1000px;
  margin: 0 auto 3rem;
  display: grid;
  gap: 2rem;
}

.sitemap-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.sitemap-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  border-bottom: 2px solid #f8f9fa;
  padding-bottom: 0.5rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.sitemap-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.sitemap-link:hover {
  background: #3498db;
  color: white;
  border-color: #3498db;
  transform: translateY(-2px);
}

.sitemap-link i {
  width: 20px;
  text-align: center;
}

.search-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  max-width: 800px;
  margin: 0 auto;
}

.search-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

.search-container {
  position: relative;
  max-width: 500px;
  margin: 0 auto 2rem;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1.5rem;
  border: 2px solid #e9ecef;
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.search-container i {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
}

.search-results h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.result-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.result-link:hover {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.result-link i {
  width: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .sitemap-content {
    margin: 0 1rem 3rem;
  }

  .sitemap-section {
    padding: 1.5rem;
  }

  .links-grid {
    grid-template-columns: 1fr;
  }

  .search-section {
    margin: 0 1rem;
    padding: 1.5rem;
  }

  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>