<template>
  <div class="accessibility-page">
    <div class="container">
      <div class="page-header">
        <h1>Toegankelijkheid</h1>
        <p>Iedereen moet onze evenementen kunnen beleven</p>
      </div>

      <div class="accessibility-content">
        <!-- Commitment -->
        <section class="accessibility-section">
          <h2>Onze Inzet voor Toegankelijkheid</h2>
          <p>
            Bij EventPlan geloven we dat evenementen voor iedereen toegankelijk moeten zijn.
            We werken continu aan het verbeteren van de toegankelijkheid van ons platform
            en de evenementen die erop worden georganiseerd.
          </p>
        </section>

        <!-- Features -->
        <section class="accessibility-section">
          <h2>Toegankelijkheidsfuncties</h2>
          <div class="features-grid">
            <div class="feature-card">
              <i class="fas fa-desktop"></i>
              <h4>Web Toegankelijkheid</h4>
              <p>Onze website voldoet aan WCAG 2.1 AA richtlijnen</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-mobile-alt"></i>
              <h4>Mobile Friendly</h4>
              <p>Volledig responsive design voor alle apparaten</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-keyboard"></i>
              <h4>Keyboard Navigation</h4>
              <p>Volledige bediening via toetsenbord mogelijk</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-eye"></i>
              <h4>Screen Reader Compatible</h4>
              <p>Optimale ondersteuning voor screen readers</p>
            </div>
          </div>
        </section>

        <!-- For Organizers -->
        <section class="accessibility-section">
          <h2>Tips voor Organisatoren</h2>
          <div class="tips-list">
            <div class="tip-item">
              <i class="fas fa-wheelchair"></i>
              <div>
                <h4>Rolstoeltoegankelijkheid</h4>
                <p>Zorg voor voldoende ruimte en toegankelijke routes</p>
              </div>
            </div>
            <div class="tip-item">
              <i class="fas fa-assistive-listening-systems"></i>
              <div>
                <h4>Auditieve Ondersteuning</h4>
                <p>Voorzie ringleidingen en visuele alerts</p>
              </div>
            </div>
            <div class="tip-item">
              <i class="fas fa-blind"></i>
              <div>
                <h4>Visuele Ondersteuning</h4>
                <p>Gebruik hoog contrast en grote lettertypes</p>
              </div>
            </div>
            <div class="tip-item">
              <i class="fas fa-brain"></i>
              <div>
                <h4>Cognitieve Toegankelijkheid</h4>
                <p>Houd informatie eenvoudig en duidelijk</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Compliance -->
        <section class="accessibility-section">
          <h2>Conformiteit</h2>
          <div class="compliance-info">
            <div class="compliance-card">
              <h4>WCAG 2.1 AA</h4>
              <p>Onze website voldoet aan de Web Content Accessibility Guidelines niveau AA</p>
            </div>
            <div class="compliance-card">
              <h4>Doorlopende Verbetering</h4>
              <p>We voeren regelmatig audits uit en werken continu aan verbeteringen</p>
            </div>
          </div>
        </section>

        <!-- Feedback -->
        <section class="accessibility-section feedback-section">
          <h2>Feedback en Ondersteuning</h2>
          <p>
            Heeft u problemen met de toegankelijkheid van ons platform?
            Laat het ons weten, we helpen u graag.
          </p>
          <div class="feedback-options">
            <div class="feedback-option">
              <i class="fas fa-envelope"></i>
              <h4>E-mail</h4>
              <a href="mailto:accessibility@eventplan.nl">accessibility@eventplan.nl</a>
            </div>
            <div class="feedback-option">
              <i class="fas fa-phone"></i>
              <h4>Telefoon</h4>
              <a href="tel:+31201234567">+31 20 123 4567</a>
            </div>
            <div class="feedback-option">
              <i class="fas fa-comments"></i>
              <h4>Live Chat</h4>
              <span>Beschikbaar tijdens kantooruren</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accessibility',
  mounted() {
    document.title = 'Toegankelijkheid - EventPlan'
  }
}
</script>

<style scoped>
.accessibility-page {
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

.accessibility-content {
  max-width: 900px;
  margin: 0 auto;
}

.accessibility-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.accessibility-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.accessibility-section p {
  color: #5d6d7e;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  text-align: center;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: #3498db;
  transform: translateY(-2px);
}

.feature-card i {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.feature-card h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #7f8c8d;
  margin: 0;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.tip-item i {
  font-size: 1.5rem;
  color: #27ae60;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.tip-item h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.tip-item p {
  color: #5d6d7e;
  margin: 0;
}

.compliance-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.compliance-card {
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: #f8f9fa;
}

.compliance-card h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.compliance-card p {
  color: #5d6d7e;
  margin: 0;
}

.feedback-section {
  text-align: center;
}

.feedback-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.feedback-option {
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.feedback-option:hover {
  border-color: #3498db;
  transform: translateY(-2px);
}

.feedback-option i {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.feedback-option h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feedback-option a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.feedback-option a:hover {
  text-decoration: underline;
}

.feedback-option span {
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .accessibility-section {
    padding: 1.5rem;
    margin: 0 1rem 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .compliance-info {
    grid-template-columns: 1fr;
  }

  .feedback-options {
    grid-template-columns: 1fr;
  }

  .tip-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>