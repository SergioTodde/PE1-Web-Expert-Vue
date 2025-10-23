<template>
  <div class="cookies-page">
    <div class="container">
      <div class="page-header">
        <h1>Cookiebeleid</h1>
        <p>Laatst bijgewerkt: {{ currentDate }}</p>
      </div>

      <div class="cookies-content">
        <!-- Introduction -->
        <section class="cookies-section">
          <h2>Wat zijn cookies?</h2>
          <p>
            Cookies zijn kleine tekstbestanden die op uw computer, tablet of smartphone worden
            opgeslagen wanneer u onze website bezoekt. Ze helpen ons om uw bezoek aan onze
            website aangenamer en persoonlijker te maken.
          </p>
        </section>

        <!-- Cookie Types -->
        <section class="cookies-section">
          <h2>Soorten cookies die wij gebruiken</h2>
          <div class="cookie-types">
            <div class="cookie-type">
              <div class="cookie-header">
                <i class="fas fa-cog"></i>
                <h3>Noodzakelijke cookies</h3>
                <span class="cookie-required">Verplicht</span>
              </div>
              <p>Deze cookies zijn essentieel voor de basisfunctionaliteit van de website, zoals beveiliging en netwerkbeheer.</p>
              <ul>
                <li>Session management</li>
                <li>Beveiligingsfuncties</li>
                <li>Winkelmand functionaliteit</li>
              </ul>
            </div>

            <div class="cookie-type">
              <div class="cookie-header">
                <i class="fas fa-chart-line"></i>
                <h3>Analysecookies</h3>
                <span class="cookie-optional">Optioneel</span>
              </div>
              <p>Helpen ons te begrijpen hoe bezoekers met de website omgaan door anonieme gegevens te verzamelen.</p>
              <ul>
                <li>Google Analytics</li>
                <li>Hotjar</li>
                <li>Gebruiksstatistieken</li>
              </ul>
            </div>

            <div class="cookie-type">
              <div class="cookie-header">
                <i class="fas fa-bullhorn"></i>
                <h3>Marketingcookies</h3>
                <span class="cookie-optional">Optioneel</span>
              </div>
              <p>Gebruikt om bezoekers te volgen over websites heen om relevante advertenties te tonen.</p>
              <ul>
                <li>Facebook Pixel</li>
                <li>Google Ads</li>
                <li>Retargeting</li>
              </ul>
            </div>

            <div class="cookie-type">
              <div class="cookie-header">
                <i class="fas fa-user-cog"></i>
                <h3>Voorkeurcookies</h3>
                <span class="cookie-optional">Optioneel</span>
              </div>
              <p>Staan de website in staat herinnerde informatie op te slaan die het gedrag of de weergave beïnvloedt.</p>
              <ul>
                <li>Taalvoorkeuren</li>
                <li>Regiovoorkeuren</li>
                <li>Layout voorkeuren</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Cookie Table -->
        <section class="cookies-section">
          <h2>Gedetailleerde cookie-informatie</h2>
          <div class="cookie-table">
            <div class="table-header">
              <span>Cookie naam</span>
              <span>Type</span>
              <span>Doel</span>
              <span>Bewaartermijn</span>
            </div>
            <div class="table-row">
              <span>session_id</span>
              <span>Noodzakelijk</span>
              <span>Session management</span>
              <span>Session</span>
            </div>
            <div class="table-row">
              <span>_ga</span>
              <span>Analyse</span>
              <span>Google Analytics</span>
              <span>2 jaar</span>
            </div>
            <div class="table-row">
              <span>_fbp</span>
              <span>Marketing</span>
              <span>Facebook Pixel</span>
              <span>3 maanden</span>
            </div>
            <div class="table-row">
              <span>language</span>
              <span>Voorkeur</span>
              <span>Taalvoorkeur</span>
              <span>1 jaar</span>
            </div>
          </div>
        </section>

        <!-- Cookie Management -->
        <section class="cookies-section">
          <h2>Cookievoorkeuren beheren</h2>
          <div class="cookie-controls">
            <div class="control-item">
              <div class="control-info">
                <h4>Noodzakelijke cookies</h4>
                <p>Deze cookies kunnen niet worden uitgeschakeld</p>
              </div>
              <div class="control-switch disabled">
                <span>Aan</span>
              </div>
            </div>

            <div class="control-item">
              <div class="control-info">
                <h4>Analysecookies</h4>
                <p>Helpen ons de website te verbeteren</p>
              </div>
              <div class="control-switch">
                <ToggleSwitch v-model="analyticsEnabled" />
              </div>
            </div>

            <div class="control-item">
              <div class="control-info">
                <h4>Marketingcookies</h4>
                <p>Voor gepersonaliseerde advertenties</p>
              </div>
              <div class="control-switch">
                <ToggleSwitch v-model="marketingEnabled" />
              </div>
            </div>

            <div class="control-item">
              <div class="control-info">
                <h4>Voorkeurcookies</h4>
                <p>Voor een betere gebruikerservaring</p>
              </div>
              <div class="control-switch">
                <ToggleSwitch v-model="preferenceEnabled" />
              </div>
            </div>
          </div>

          <div class="cookie-actions">
            <button @click="savePreferences" class="btn btn-primary">
              Voorkeuren opslaan
            </button>
            <button @click="acceptAll" class="btn btn-outline">
              Alles accepteren
            </button>
            <button @click="rejectAll" class="btn btn-outline">
              Alles weigeren
            </button>
          </div>
        </section>

        <!-- Browser Settings -->
        <section class="cookies-section">
          <h2>Cookies beheren in uw browser</h2>
          <p>
            U kunt cookies ook beheren via de instellingen van uw browser. Hieronder vindt u
            links naar de handleidingen van populaire browsers:
          </p>
          <div class="browser-links">
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" class="browser-link">
              <i class="fab fa-chrome"></i>
              Google Chrome
            </a>
            <a href="https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-website" target="_blank" class="browser-link">
              <i class="fab fa-firefox"></i>
              Mozilla Firefox
            </a>
            <a href="https://support.apple.com/nl-nl/guide/safari/sfri11471/mac" target="_blank" class="browser-link">
              <i class="fab fa-safari"></i>
              Apple Safari
            </a>
            <a href="https://support.microsoft.com/nl-nl/microsoft-edge/cookies-verwijderen-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" class="browser-link">
              <i class="fab fa-edge"></i>
              Microsoft Edge
            </a>
          </div>
        </section>

        <!-- Contact -->
        <section class="cookies-section contact-section">
          <h2>Vragen?</h2>
          <p>
            Heeft u vragen over ons cookiebeleid? Neem dan contact met ons op:
          </p>
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <a href="mailto:privacy@eventplan.nl">privacy@eventplan.nl</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleSwitch from '@/components/shared/ToggleSwitch.vue'

export default {
  name: 'Cookies',
  components: {
    ToggleSwitch
  },
  data() {
    return {
      analyticsEnabled: false,
      marketingEnabled: false,
      preferenceEnabled: true
    }
  },
  computed: {
    currentDate() {
      return new Date().toLocaleDateString('nl-NL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  mounted() {
    document.title = 'Cookiebeleid - EventPlan'
    this.loadPreferences()
  },
  methods: {
    loadPreferences() {
      // Laad opgeslagen voorkeuren
      const preferences = JSON.parse(localStorage.getItem('cookiePreferences') || '{}')
      this.analyticsEnabled = preferences.analytics || false
      this.marketingEnabled = preferences.marketing || false
      this.preferenceEnabled = preferences.preference !== false
    },
    savePreferences() {
      const preferences = {
        analytics: this.analyticsEnabled,
        marketing: this.marketingEnabled,
        preference: this.preferenceEnabled
      }
      localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
      this.$toast.success('Cookievoorkeuren opgeslagen')
    },
    acceptAll() {
      this.analyticsEnabled = true
      this.marketingEnabled = true
      this.preferenceEnabled = true
      this.savePreferences()
    },
    rejectAll() {
      this.analyticsEnabled = false
      this.marketingEnabled = false
      this.preferenceEnabled = false
      this.savePreferences()
    }
  }
}
</script>

<style scoped>
.cookies-page {
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
  font-size: 1.1rem;
}

.cookies-content {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 3rem;
}

.cookies-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.cookies-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.cookies-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.cookies-section p {
  color: #5d6d7e;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.cookie-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.cookie-type {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.cookie-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.cookie-header i {
  font-size: 1.5rem;
  color: #3498db;
}

.cookie-header h3 {
  color: #2c3e50;
  margin: 0;
  flex: 1;
}

.cookie-required {
  background: #27ae60;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.cookie-optional {
  background: #f39c12;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.cookie-type ul {
  color: #5d6d7e;
  padding-left: 1rem;
  margin: 0;
}

.cookie-type li {
  margin-bottom: 0.25rem;
}

.cookie-table {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1.5rem;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr;
  background: #2c3e50;
  color: white;
  font-weight: 600;
  padding: 1rem;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  background: white;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:nth-child(even) {
  background: #f8f9fa;
}

.cookie-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}

.control-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.control-info h4 {
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.control-info p {
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
}

.control-switch.disabled {
  opacity: 0.6;
}

.control-switch.disabled span {
  color: #7f8c8d;
  font-weight: 500;
}

.cookie-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
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
  border-color: #6c757d;
  color: #6c757d;
}

.btn-outline:hover {
  background: #6c757d;
  color: white;
}

.browser-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.browser-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.3s ease;
}

.browser-link:hover {
  background: #3498db;
  color: white;
}

.browser-link i {
  font-size: 1.5rem;
}

.contact-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.contact-info {
  margin-top: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-item i {
  color: #3498db;
}

.contact-item a {
  color: #3498db;
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .cookies-content {
    padding: 1.5rem;
    margin: 0 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .cookie-types {
    grid-template-columns: 1fr;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .control-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .cookie-actions {
    flex-direction: column;
  }

  .browser-links {
    grid-template-columns: 1fr;
  }
}
</style>