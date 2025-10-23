<template>
  <div class="api-page">
    <div class="container">
      <div class="page-header">
        <h1>API Documentatie</h1>
        <p>Integreer EventPlan in je applicaties met onze krachtige API</p>
      </div>

      <div class="api-content">
        <!-- Quick Start -->
        <section class="api-section">
          <h2>🚀 Snel Starten</h2>
          <div class="quick-start">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>API Key Aanvragen</h4>
                <p>Registreer je applicatie en krijg je persoonlijke API key</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Authenticatie</h4>
                <p>Gebruik je API key in de Authorization header</p>
                <code class="code-block">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Eerste Request</h4>
                <p>Test de verbinding met een eenvoudige request</p>
                <code class="code-block">
                  GET /api/v1/events
                </code>
              </div>
            </div>
          </div>
        </section>

        <!-- Authentication -->
        <section class="api-section">
          <h2>🔐 Authenticatie</h2>
          <p>
            Alle API requests vereisen authenticatie via Bearer token. Je API key kan je vinden
            in je account dashboard onder "API Settings".
          </p>

          <div class="auth-example">
            <h4>Voorbeeld Request:</h4>
            <code class="code-block">
              curl -X GET \<br>
              -H "Authorization: Bearer sk_live_123456789" \<br>
              -H "Content-Type: application/json" \<br>
              "https://api.eventplan.nl/v1/events"
            </code>
          </div>
        </section>

        <!-- Endpoints -->
        <section class="api-section">
          <h2>📡 API Endpoints</h2>

          <div class="endpoint-group">
            <h3>Evenementen</h3>
            <div class="endpoint">
              <div class="endpoint-method get">GET</div>
              <div class="endpoint-path">/v1/events</div>
              <div class="endpoint-description">Haal evenementen lijst op</div>
            </div>
            <div class="endpoint">
              <div class="endpoint-method get">GET</div>
              <div class="endpoint-path">/v1/events/{id}</div>
              <div class="endpoint-description">Haal specifiek evenement op</div>
            </div>
            <div class="endpoint">
              <div class="endpoint-method post">POST</div>
              <div class="endpoint-path">/v1/events</div>
              <div class="endpoint-description">Maak nieuw evenement aan</div>
            </div>
          </div>

          <div class="endpoint-group">
            <h3>Tickets</h3>
            <div class="endpoint">
              <div class="endpoint-method get">GET</div>
              <div class="endpoint-path">/v1/tickets</div>
              <div class="endpoint-description">Haal tickets lijst op</div>
            </div>
            <div class="endpoint">
              <div class="endpoint-method post">POST</div>
              <div class="endpoint-path">/v1/tickets</div>
              <div class="endpoint-description">Koop nieuw ticket</div>
            </div>
          </div>

          <div class="endpoint-group">
            <h3>Gebruikers</h3>
            <div class="endpoint">
              <div class="endpoint-method get">GET</div>
              <div class="endpoint-path">/v1/users/me</div>
              <div class="endpoint-description">Haal huidige gebruiker op</div>
            </div>
          </div>
        </section>

        <!-- Code Examples -->
        <section class="api-section">
          <h2>💻 Code Voorbeelden</h2>

          <div class="code-examples">
            <div class="code-tabs">
              <button
                  v-for="tab in codeTabs"
                  :key="tab.language"
                  :class="['tab-btn', { active: activeTab === tab.language }]"
                  @click="activeTab = tab.language"
              >
                {{ tab.label }}
              </button>
            </div>

            <div class="code-content">
              <div v-if="activeTab === 'javascript'" class="code-example">
                <h4>JavaScript (Fetch)</h4>
                <pre><code>const response = await fetch('https://api.eventplan.nl/v1/events', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const events = await response.json();
console.log(events);</code></pre>
              </div>

              <div v-if="activeTab === 'python'" class="code-example">
                <h4>Python (Requests)</h4>
                <pre><code>import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.eventplan.nl/v1/events', headers=headers)
events = response.json()
print(events)</code></pre>
              </div>

              <div v-if="activeTab === 'php'" class="code-example">
                <h4>PHP (cURL)</h4>
                <pre><code>$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.eventplan.nl/v1/events');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$events = json_decode($response, true);
curl_close($ch);</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- Rate Limiting -->
        <section class="api-section">
          <h2>⚡ Rate Limiting</h2>
          <div class="rate-limits">
            <div class="limit-card">
              <h4>Starter Plan</h4>
              <div class="limit">1,000 requests/dag</div>
              <p>Perfect voor kleine applicaties</p>
            </div>
            <div class="limit-card">
              <h4>Professional Plan</h4>
              <div class="limit">10,000 requests/dag</div>
              <p>Ideaal voor middelgrote apps</p>
            </div>
            <div class="limit-card">
              <h4>Enterprise Plan</h4>
              <div class="limit">Onbeperkt</div>
              <p>Voor grote scale applicaties</p>
            </div>
          </div>
        </section>

        <!-- Support -->
        <section class="api-section support-section">
          <h2>❓ Ondersteuning</h2>
          <div class="support-options">
            <div class="support-card">
              <i class="fas fa-book"></i>
              <h4>Volledige Documentatie</h4>
              <p>Bekijk onze uitgebreide API documentatie</p>
              <a href="#" class="btn btn-outline">Bekijk Docs</a>
            </div>
            <div class="support-card">
              <i class="fas fa-comments"></i>
              <h4>Developer Community</h4>
              <p>Sluit je aan bij onze developer community</p>
              <a href="#" class="btn btn-outline">Join Community</a>
            </div>
            <div class="support-card">
              <i class="fas fa-envelope"></i>
              <h4>Technische Support</h4>
              <p>Neem contact op met ons technisch team</p>
              <a href="mailto:api@eventplan.nl" class="btn btn-outline">Email Support</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'API',
  data() {
    return {
      activeTab: 'javascript',
      codeTabs: [
        { language: 'javascript', label: 'JavaScript' },
        { language: 'python', label: 'Python' },
        { language: 'php', label: 'PHP' }
      ]
    }
  },
  mounted() {
    document.title = 'API Documentatie - EventPlan'
  }
}
</script>

<style scoped>
.api-page {
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

.api-content {
  max-width: 1000px;
  margin: 0 auto;
}

.api-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.api-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.quick-start {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-number {
  background: #3498db;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.step-content p {
  color: #5d6d7e;
  margin-bottom: 0.5rem;
}

.code-block {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  display: block;
  overflow-x: auto;
}

.auth-example {
  margin-top: 1.5rem;
}

.auth-example h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.endpoint-group {
  margin-bottom: 2rem;
}

.endpoint-group h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.endpoint {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.endpoint-method {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.endpoint-method.get {
  background: #d4edda;
  color: #155724;
}

.endpoint-method.post {
  background: #d1ecf1;
  color: #0c5460;
}

.endpoint-path {
  font-family: 'Courier New', monospace;
  color: #2c3e50;
  font-weight: 500;
}

.endpoint-description {
  color: #7f8c8d;
  flex: 1;
  text-align: right;
}

.code-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: #7f8c8d;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn.active {
  color: #3498db;
  border-bottom-color: #3498db;
}

.code-example h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.code-example pre {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 1.5rem;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.rate-limits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.limit-card {
  text-align: center;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.limit-card h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.limit {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.limit-card p {
  color: #7f8c8d;
  margin: 0;
}

.support-section {
  text-align: center;
}

.support-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.support-card {
  padding: 2rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.support-card:hover {
  border-color: #3498db;
  transform: translateY(-2px);
}

.support-card i {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.support-card h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.support-card p {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
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
  .api-section {
    padding: 1.5rem;
    margin: 0 1rem 2rem;
  }

  .endpoint {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .endpoint-description {
    text-align: left;
  }

  .code-tabs {
    flex-direction: column;
  }

  .rate-limits {
    grid-template-columns: 1fr;
  }

  .support-options {
    grid-template-columns: 1fr;
  }
}
</style>