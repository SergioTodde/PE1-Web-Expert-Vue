<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Main Footer -->
        <div class="footer-main">
          <div class="footer-section">
            <div class="footer-logo">
              <i class="fas fa-calendar-alt"></i>
              <span>EventPlan</span>
            </div>
            <p class="footer-description">
              Ontdek en plan de beste evenementen in jouw buurt.
              Van muziekfestivals tot zakelijke conferenties, wij hebben het allemaal.
            </p>
            <div class="social-links">
              <a href="#" class="social-link">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-link">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div class="footer-section">
            <h3>Evenementen</h3>
            <ul class="footer-links">
              <li><router-link to="/events">Alle Evenementen</router-link></li>
              <li><router-link to="/events?category=Muziek">Muziek</router-link></li>
              <li><router-link to="/events?category=Sport">Sport</router-link></li>
              <li><router-link to="/events?category=Kunst">Kunst & Cultuur</router-link></li>
              <li><router-link to="/events?category=Technologie">Technologie</router-link></li>
              <li><router-link to="/events?category=Business">Business</router-link></li>
            </ul>
          </div>

          <div class="footer-section">
            <h3>Ondersteuning</h3>
            <ul class="footer-links">
              <li><router-link to="/help">Help Center</router-link></li>
              <li><router-link to="/contact">Contact Opnemen</router-link></li>
              <li><router-link to="/faq">Veelgestelde Vragen</router-link></li>
              <li><router-link to="/privacy">Privacybeleid</router-link></li>
              <li><router-link to="/terms">Algemene Voorwaarden</router-link></li>
              <li><router-link to="/cookies">Cookiebeleid</router-link></li>
            </ul>
          </div>

          <div class="footer-section">
            <h3>Voor Organisatoren</h3>
            <ul class="footer-links">
              <li><router-link to="/create-event">Evenement Aanmaken</router-link></li>
              <li><router-link to="/pricing">Prijzen</router-link></li>
              <li><router-link to="/resources">Bronnen</router-link></li>
              <li><router-link to="/success-stories">Succesverhalen</router-link></li>
              <li><router-link to="/api">API</router-link></li>
              <li><router-link to="/partners">Partners</router-link></li>
            </ul>
          </div>

          <div class="footer-section">
            <h3>Nieuwsbrief</h3>
            <p>Blijf op de hoogte van de nieuwste evenementen en aanbiedingen.</p>
            <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
              <input
                  v-model="newsletterEmail"
                  type="email"
                  placeholder="Jouw e-mailadres"
                  class="newsletter-input"
                  required
              >
              <button type="submit" class="btn btn-primary">
                <i class="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <div class="copyright">
              &copy; 2024 EventPlan. Alle rechten voorbehouden.
            </div>
            <div class="footer-bottom-links">
              <router-link to="/sitemap">Sitemap</router-link>
              <router-link to="/accessibility">Toegankelijkheid</router-link>
              <router-link to="/security">Beveiliging</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      newsletterEmail: ''
    }
  },
  methods: {
    subscribeNewsletter() {
      if (this.newsletterEmail) {
        this.$toast.success('Bedankt voor je inschrijving!')
        this.newsletterEmail = ''
      }
    }
  }
}
</script>

<style scoped>
.footer {
  background: #2c3e50;
  color: white;
  margin-top: auto;
}

.footer-content {
  padding: 3rem 0 0;
}

.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  gap: 2rem;
  padding: 0 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.footer-logo i {
  color: #3498db;
}

.footer-description {
  color: #bdc3c7;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.1);
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #3498db;
  transform: translateY(-2px);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #3498db;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #34495e;
  border-radius: 6px;
  background: #34495e;
  color: white;
  font-size: 0.9rem;
}

.newsletter-input::placeholder {
  color: #95a5a6;
}

.newsletter-input:focus {
  outline: none;
  border-color: #3498db;
}

.newsletter-form .btn {
  padding: 0.75rem;
  min-width: auto;
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding: 1.5rem 0;
}

.footer-bottom-content {
  display: flex;
  padding: 0 2rem;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  color: #bdc3c7;
  font-size: 0.9rem;
}

.footer-bottom-links {
  display: flex;
  gap: 2rem;
}

.footer-bottom-links a {
  color: #bdc3c7;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-bottom-links a:hover {
  color: #3498db;
}

@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .footer-bottom-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .footer-bottom-links {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .newsletter-form {
    flex-direction: column;
  }
}
</style>