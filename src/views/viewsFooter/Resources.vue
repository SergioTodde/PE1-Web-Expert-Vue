<template>
  <div class="resources-page">
    <div class="container">
      <div class="page-header">
        <h1>Bronnen voor Organisatoren</h1>
        <p>Tools, templates en tips om je evenementen naar het volgende niveau te tillen</p>
      </div>

      <!-- Quick Stats -->
      <div class="resources-stats">
        <div class="stat-card">
          <i class="fas fa-download"></i>
          <div class="stat-content">
            <div class="stat-number">50+</div>
            <div class="stat-label">Gratis Templates</div>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-play-circle"></i>
          <div class="stat-content">
            <div class="stat-number">25+</div>
            <div class="stat-label">Video Guides</div>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-file-pdf"></i>
          <div class="stat-content">
            <div class="stat-number">15+</div>
            <div class="stat-label">Checklists</div>
          </div>
        </div>
        <div class="stat-card">
          <i class="fas fa-tools"></i>
          <div class="stat-content">
            <div class="stat-number">10+</div>
            <div class="stat-label">Tools</div>
          </div>
        </div>
      </div>

      <!-- Resource Categories -->
      <div class="resource-categories">
        <div class="category-card" @click="scrollToSection('templates')">
          <i class="fas fa-file-alt"></i>
          <h3>Templates</h3>
          <p>Professionele templates voor planning en promotie</p>
        </div>
        <div class="category-card" @click="scrollToSection('guides')">
          <i class="fas fa-graduation-cap"></i>
          <h3>Gidsen</h3>
          <p>Stap-voor-stap handleidingen en tutorials</p>
        </div>
        <div class="category-card" @click="scrollToSection('tools')">
          <i class="fas fa-calculator"></i>
          <h3>Tools</h3>
          <p>Handige calculators en planning tools</p>
        </div>
        <div class="category-card" @click="scrollToSection('checklists')">
          <i class="fas fa-tasks"></i>
          <h3>Checklists</h3>
          <p>Essentiële checklists voor elk evenement</p>
        </div>
      </div>

      <!-- Templates Section -->
      <section class="resource-section" id="templates" ref="templates">
        <h2>📋 Templates</h2>
        <div class="resources-grid">
          <div class="resource-card">
            <div class="resource-icon">
              <i class="fas fa-calendar"></i>
            </div>
            <h4>Evenement Planning Template</h4>
            <p>Complete planning template met tijdlijn en taken</p>
            <div class="resource-actions">
              <button class="btn btn-outline">
                <i class="fas fa-eye"></i>
                Preview
              </button>
              <button class="btn btn-primary">
                <i class="fas fa-download"></i>
                Download
              </button>
            </div>
          </div>

          <div class="resource-card">
            <div class="resource-icon">
              <i class="fas fa-euro-sign"></i>
            </div>
            <h4>Budget Template</h4>
            <p>Uitgebreide budget planning en tracking</p>
            <div class="resource-actions">
              <button class="btn btn-outline">
                <i class="fas fa-eye"></i>
                Preview
              </button>
              <button class="btn btn-primary">
                <i class="fas fa-download"></i>
                Download
              </button>
            </div>
          </div>

          <div class="resource-card">
            <div class="resource-icon">
              <i class="fas fa-bullhorn"></i>
            </div>
            <h4>Marketing Plan Template</h4>
            <p>Social media en email marketing planning</p>
            <div class="resource-actions">
              <button class="btn btn-outline">
                <i class="fas fa-eye"></i>
                Preview
              </button>
              <button class="btn btn-primary">
                <i class="fas fa-download"></i>
                Download
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Guides Section -->
      <section class="resource-section" id="guides" ref="guides">
        <h2>🎓 Gidsen & Tutorials</h2>
        <div class="guides-grid">
          <div class="guide-card">
            <div class="guide-thumbnail">
              <i class="fas fa-play-circle"></i>
            </div>
            <div class="guide-content">
              <h4>Evenement Promotie Masterclass</h4>
              <p>Leer hoe je je evenement succesvol promoot</p>
              <div class="guide-meta">
                <span class="duration"><i class="fas fa-clock"></i> 45 min</span>
                <span class="level"><i class="fas fa-signal"></i> Beginner</span>
              </div>
            </div>
          </div>

          <div class="guide-card">
            <div class="guide-thumbnail">
              <i class="fas fa-play-circle"></i>
            </div>
            <div class="guide-content">
              <h4>Ticket Pricing Strategie</h4>
              <p>Optimale ticketprijzen bepalen voor maximale opbrengst</p>
              <div class="guide-meta">
                <span class="duration"><i class="fas fa-clock"></i> 30 min</span>
                <span class="level"><i class="fas fa-signal"></i> Gevorderd</span>
              </div>
            </div>
          </div>

          <div class="guide-card">
            <div class="guide-thumbnail">
              <i class="fas fa-play-circle"></i>
            </div>
            <div class="guide-content">
              <h4>Post-Event Analyse</h4>
              <p>Leer van je evenement data voor toekomstige successen</p>
              <div class="guide-meta">
                <span class="duration"><i class="fas fa-clock"></i> 25 min</span>
                <span class="level"><i class="fas fa-signal"></i> Intermediate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tools Section -->
      <section class="resource-section" id="tools" ref="tools">
        <h2>🛠️ Tools</h2>
        <div class="tools-grid">
          <div class="tool-card">
            <i class="fas fa-calculator"></i>
            <h4>ROI Calculator</h4>
            <p>Bereken de return on investment van je evenement</p>
            <button class="btn btn-primary">
              <i class="fas fa-external-link-alt"></i>
              Gebruik Tool
            </button>
          </div>

          <div class="tool-card">
            <i class="fas fa-chart-line"></i>
            <h4>Attendance Predictor</h4>
            <p>Voorspel opkomst op basis van historische data</p>
            <button class="btn btn-primary">
              <i class="fas fa-external-link-alt"></i>
              Gebruik Tool
            </button>
          </div>

          <div class="tool-card">
            <i class="fas fa-calendar-check"></i>
            <h4>Date Optimizer</h4>
            <p>Vind de perfecte datum voor je evenement</p>
            <button class="btn btn-primary">
              <i class="fas fa-external-link-alt"></i>
              Gebruik Tool
            </button>
          </div>
        </div>
      </section>

      <!-- Checklists Section -->
      <section class="resource-section" id="checklists" ref="checklists">
        <h2>✅ Checklists</h2>
        <div class="checklists-grid">
          <div class="checklist-card">
            <h4>Pre-Event Checklist</h4>
            <ul>
              <li>✅ Locatie bevestiging</li>
              <li>✅ Vergunningen aangevraagd</li>
              <li>✅ Ticketverkoop gestart</li>
              <li>✅ Marketing campagne live</li>
              <li>✅ Personeel getrained</li>
            </ul>
            <button class="btn btn-outline">
              <i class="fas fa-download"></i>
              Download Checklist
            </button>
          </div>

          <div class="checklist-card">
            <h4>Event Day Checklist</h4>
            <ul>
              <li>✅ Setup voltooid</li>
              <li>✅ Techniek getest</li>
              <li>✅ Personeel gebriefed</li>
              <li>✅ Veiligheidscheck</li>
              <li>✅ Guest list gereed</li>
            </ul>
            <button class="btn btn-outline">
              <i class="fas fa-download"></i>
              Download Checklist
            </button>
          </div>

          <div class="checklist-card">
            <h4>Post-Event Checklist</h4>
            <ul>
              <li>✅ Data geëxporteerd</li>
              <li>✅ Feedback verzameld</li>
              <li>✅ Financiën afgerond</li>
              <li>✅ Team debrief</li>
              <li>✅ Follow-up emails</li>
            </ul>
            <button class="btn btn-outline">
              <i class="fas fa-download"></i>
              Download Checklist
            </button>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <div class="resources-cta">
        <div class="cta-content">
          <h2>Klaar om te groeien?</h2>
          <p>Gebruik deze bronnen om je volgende evenement tot een succes te maken</p>
          <div class="cta-buttons">
            <router-link to="/create-event" class="btn btn-primary">
              <i class="fas fa-plus"></i>
              Start Nieuw Evenement
            </router-link>
            <router-link to="/contact" class="btn btn-outline">
              <i class="fas fa-question-circle"></i>
              Vraag Persoonlijk Advies
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Resources',
  methods: {
    scrollToSection(section) {
      const element = this.$refs[section]
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  },
  mounted() {
    document.title = 'Bronnen - EventPlan'
  }
}
</script>

<style scoped>
.resources-page {
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

.resources-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-card i {
  font-size: 2rem;
  color: #3498db;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1;
}

.stat-label {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.resource-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.category-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.15);
}

.category-card i {
  font-size: 3rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.category-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.category-card p {
  color: #7f8c8d;
  margin: 0;
}

.resource-section {
  margin-bottom: 4rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.resource-section h2 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 1.75rem;
}

.resources-grid,
.tools-grid,
.checklists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.guides-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.resource-card {
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  text-align: center;
}

.resource-icon {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.resource-card h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.resource-card p {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.resource-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.guide-card {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.guide-card:hover {
  border-color: #3498db;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.15);
}

.guide-thumbnail {
  width: 80px;
  height: 80px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.guide-thumbnail i {
  font-size: 2rem;
  color: #3498db;
}

.guide-content {
  flex: 1;
}

.guide-content h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.guide-content p {
  color: #7f8c8d;
  margin-bottom: 1rem;
}

.guide-meta {
  display: flex;
  gap: 1rem;
}

.guide-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #7f8c8d;
}

.tool-card {
  text-align: center;
  padding: 2rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.tool-card:hover {
  border-color: #3498db;
  transform: translateY(-2px);
}

.tool-card i {
  font-size: 3rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.tool-card h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.tool-card p {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.checklist-card {
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.checklist-card h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.checklist-card ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.checklist-card li {
  padding: 0.5rem 0;
  color: #5d6d7e;
}

.resources-cta {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.cta-content h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.cta-content p {
  color: #7f8c8d;
  margin-bottom: 2rem;
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
  border-radius: 6px;
  font-size: 0.9rem;
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

@media (max-width: 768px) {
  .resources-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .resource-categories {
    grid-template-columns: 1fr;
  }

  .resources-grid,
  .tools-grid,
  .checklists-grid {
    grid-template-columns: 1fr;
  }

  .guide-card {
    flex-direction: column;
    text-align: center;
  }

  .guide-thumbnail {
    align-self: center;
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
}
</style>