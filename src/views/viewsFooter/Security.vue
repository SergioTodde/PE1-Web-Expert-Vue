<template>
  <div class="security-page">
    <div class="container">
      <div class="page-header">
        <h1>Beveiliging</h1>
        <p>Uw veiligheid is onze prioriteit</p>
      </div>

      <div class="security-content">
        <!-- Security Features -->
        <section class="security-section">
          <h2>Onze Beveiligingsmaatregelen</h2>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-lock"></i>
              </div>
              <h3>SSL Versleuteling</h3>
              <p>Alle data wordt versleuteld met 256-bit SSL encryptie voor maximale beveiliging tijdens gegevensoverdracht.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3>Payment Security</h3>
              <p>Betalingen worden verwerkt via gecertificeerde PCI-DSS compliant payment providers. Wij slaan geen creditcardgegevens op.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-database"></i>
              </div>
              <h3>Beveiligde Servers</h3>
              <p>Gegevens worden opgeslagen in beveiligde EU datacenters met 24/7 monitoring en regelmatige security audits.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-user-shield"></i>
              </div>
              <h3>Privacy by Design</h3>
              <p>Beveiliging is geïntegreerd in ons ontwikkelproces volgens het 'privacy by design' principe.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-sync-alt"></i>
              </div>
              <h3>Regelmatige Back-ups</h3>
              <p>Automatische dagelijkse back-ups van alle data met meerdere redundante opslagsystemen.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <i class="fas fa-bug"></i>
              </div>
              <h3>Penetratie Testen</h3>
              <p>Regelmatige security audits en penetratie testen door externe beveiligingsexperts.</p>
            </div>
          </div>
        </section>

        <!-- Data Protection -->
        <section class="security-section">
          <h2>Gegevensbescherming</h2>
          <div class="protection-info">
            <div class="protection-card">
              <i class="fas fa-user-lock"></i>
              <div>
                <h4>Strenge Toegangscontrole</h4>
                <p>Multi-factor authenticatie voor medewerkers en role-based toegangsbeperkingen.</p>
              </div>
            </div>
            <div class="protection-card">
              <i class="fas fa-mask"></i>
              <div>
                <h4>Data Anonimisering</h4>
                <p>Persoonsgegevens worden geanonimiseerd waar mogelijk voor analytics en testdoeleinden.</p>
              </div>
            </div>
            <div class="protection-card">
              <i class="fas fa-hourglass-half"></i>
              <div>
                <h4>Data Retentie Beleid</h4>
                <p>Gegevens worden alleen bewaard zolang noodzakelijk volgens ons data retentie beleid.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Security Tips -->
        <section class="security-section">
          <h2>Veiligheidstips voor Gebruikers</h2>
          <div class="tips-grid">
            <div class="tip-item">
              <i class="fas fa-key"></i>
              <div>
                <h4>Sterke Wachtwoorden</h4>
                <p>Gebruik unieke, complexe wachtwoorden voor uw account en activeer twee-factor authenticatie.</p>
              </div>
            </div>
            <div class="tip-item">
              <i class="fas fa-envelope"></i>
              <div>
                <h4>Phishing Alert</h4>
                <p>Let op verdachte e-mails die om persoonlijke gegevens vragen. EventPlan zal nooit om uw wachtwoord vragen via e-mail.</p>
              </div>
            </div>
            <div class="tip-item">
              <i class="fas fa-wifi"></i>
              <div>
                <h4>Veilige Verbinding</h4>
                <p>Vermijd het gebruik van openbare wifi-netwerken voor gevoelige transacties. Gebruik een VPN indien nodig.</p>
              </div>
            </div>
            <div class="tip-item">
              <i class="fas fa-sync-alt"></i>
              <div>
                <h4>Regelmatig Updaten</h4>
                <p>Houd uw browser, besturingssysteem en antivirussoftware up-to-date met de laatste beveiligingsupdates.</p>
              </div>
            </div>
            <div class="tip-item">
              <i class="fas fa-eye"></i>
              <div>
                <h4>Account Monitoring</h4>
                <p>Controleer regelmatig uw accountactiviteit en meld verdachte activiteiten direct aan ons.</p>
              </div>
            </div>
            <div class="tip-item">
              <i class="fas fa-share-alt"></i>
              <div>
                <h4>Beperk Informatie</h4>
                <p>Deel alleen noodzakelijke informatie en wees voorzichtig met het publiceren van persoonlijke gegevens.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Compliance -->
        <section class="security-section">
          <h2>Compliance en Certificeringen</h2>
          <div class="compliance-grid">
            <div class="compliance-item">
              <div class="compliance-logo">
                <i class="fas fa-gavel"></i>
              </div>
              <h4>GDPR Compliant</h4>
              <p>Volledige naleving van de Algemene Verordening Gegevensbescherming</p>
            </div>
            <div class="compliance-item">
              <div class="compliance-logo">
                <i class="fas fa-shield-check"></i>
              </div>
              <h4>ISO 27001</h4>
              <p>Gecertificeerd informatiebeveiligingsmanagementsysteem</p>
            </div>
            <div class="compliance-item">
              <div class="compliance-logo">
                <i class="fas fa-credit-card"></i>
              </div>
              <h4>PCI DSS</h4>
              <p>Naleving van Payment Card Industry Data Security Standard</p>
            </div>
            <div class="compliance-item">
              <div class="compliance-logo">
                <i class="fas fa-cloud"></i>
              </div>
              <h4>SOC 2 Type II</h4>
              <p>Onafhankelijke audit van security, beschikbaarheid en vertrouwelijkheid</p>
            </div>
          </div>
        </section>

        <!-- Incident Response -->
        <section class="security-section">
          <h2>Incident Response</h2>
          <div class="incident-response">
            <div class="response-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Directe Detectie</h4>
                <p>Geautomatiseerde monitoring systemen detecteren verdachte activiteiten direct</p>
              </div>
            </div>
            <div class="response-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Snelle Respons</h4>
                <p>Ons security team reageert binnen 1 uur op gemelde incidenten</p>
              </div>
            </div>
            <div class="response-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Containment</h4>
                <p>Directe maatregelen om verdere schade te voorkomen</p>
              </div>
            </div>
            <div class="response-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>Communicatie</h4>
                <p>Transparante communicatie met betrokken gebruikers en autoriteiten</p>
              </div>
            </div>
            <div class="response-step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h4>Onderzoek en Preventie</h4>
                <p>Grondig onderzoek en implementatie van preventieve maatregelen</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Reporting -->
        <section class="security-section reporting-section">
          <h2>Beveiligingsincident Melden</h2>
          <div class="reporting-info">
            <div class="report-card">
              <i class="fas fa-bug"></i>
              <h4>Kwetsbaarheid Melden</h4>
              <p>Heeft u een beveiligingslek gevonden? Laat het ons weten via ons responsible disclosure programma.</p>
              <a href="mailto:security@eventplan.nl" class="btn btn-outline">
                <i class="fas fa-envelope"></i>
                security@eventplan.nl
              </a>
            </div>
            <div class="report-card">
              <i class="fas fa-flag"></i>
              <h4>Verdachte Activiteit</h4>
              <p>Ziet u verdachte activiteit op uw account? Neem direct contact met ons op voor ondersteuning.</p>
              <a href="mailto:support@eventplan.nl" class="btn btn-outline">
                <i class="fas fa-life-ring"></i>
                support@eventplan.nl
              </a>
            </div>
            <div class="report-card">
              <i class="fas fa-phone-alt"></i>
              <h4>Noodcontact</h4>
              <p>Voor urgente beveiligingsincidenten buiten kantooruren.</p>
              <a href="tel:+31201234567" class="btn btn-outline">
                <i class="fas fa-phone"></i>
                +31 20 123 4567
              </a>
            </div>
          </div>

          <div class="responsible-disclosure">
            <h4>Responsible Disclosure Policy</h4>
            <p>
              Wij waarderen de inspanningen van security researchers en moedigen responsible disclosure aan.
              Wij beloven geen juridische stappen te nemen tegen onderzoekers die:
            </p>
            <ul>
              <li>Kwetsbaarheden discreet melden via security@eventplan.nl</li>
              <li>Geen schade toebrengen aan gebruikers of systemen</li>
              <li>Geen gevoelige gegevens openbaar maken</li>
              <li>Ons voldoende tijd geven om het probleem op te lossen</li>
            </ul>
          </div>
        </section>

        <!-- Security Updates -->
        <section class="security-section">
          <h2>Beveiligingsupdates</h2>
          <div class="updates-info">
            <p>
              We publiceren regelmatig security advisories over belangrijke updates en kwetsbaarheden.
              Abonneer je op onze security mailing list om op de hoogte te blijven.
            </p>
            <div class="subscribe-form">
              <input type="email" placeholder="Jouw e-mailadres" class="email-input">
              <button class="btn btn-primary">
                <i class="fas fa-bell"></i>
                Inschrijven
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Security',
  mounted() {
    document.title = 'Beveiliging - EventPlan'
  }
}
</script>

<style scoped>
.security-page {
  padding: 2rem 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #625476 100%);
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.page-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.security-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.security-section {
  margin-bottom: 4rem;
}

.security-section:last-child {
  margin-bottom: 0;
}

.security-section h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.feature-item {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #3498db;
}

.feature-item h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.feature-item p {
  opacity: 0.9;
  line-height: 1.6;
}

.protection-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.protection-card {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.protection-card i {
  font-size: 2rem;
  color: #27ae60;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.protection-card h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.protection-card p {
  opacity: 0.9;
  margin: 0;
  line-height: 1.5;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tip-item i {
  font-size: 1.5rem;
  color: #f39c12;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.tip-item h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.tip-item p {
  opacity: 0.9;
  margin: 0;
  line-height: 1.5;
}

.compliance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.compliance-item {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.compliance-logo {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #3498db;
}

.compliance-item h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.compliance-item p {
  opacity: 0.9;
  margin: 0;
}

.incident-response {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.response-step {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.step-number {
  background: #e74c3c;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.step-content p {
  opacity: 0.9;
  margin: 0;
  line-height: 1.5;
}

.reporting-section {
  text-align: center;
}

.reporting-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.report-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.report-card i {
  font-size: 3rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.report-card h4 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.report-card p {
  opacity: 0.9;
  margin-bottom: 1.5rem;
  line-height: 1.5;
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
  border-color: white;
  color: white;
}

.btn-outline:hover {
  background: white;
  color: #2c3e50;
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

.responsible-disclosure {
  text-align: left;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.responsible-disclosure h4 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.responsible-disclosure p {
  opacity: 0.9;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.responsible-disclosure ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.responsible-disclosure li {
  padding: 0.5rem 0;
  opacity: 0.9;
  position: relative;
  padding-left: 1.5rem;
}

.responsible-disclosure li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #27ae60;
  font-weight: 600;
}

.updates-info {
  text-align: center;
}

.updates-info p {
  opacity: 0.9;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.subscribe-form {
  display: flex;
  gap: 1rem;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
}

.email-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
}

.email-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.email-input:focus {
  outline: none;
  border-color: #3498db;
}

@media (max-width: 768px) {
  .security-content {
    padding: 2rem;
    margin: 0 1rem;
  }

  .page-header h1 {
    font-size: 2.5rem;
  }

  .security-section h2 {
    font-size: 1.75rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .protection-card {
    flex-direction: column;
    text-align: center;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .compliance-grid {
    grid-template-columns: 1fr;
  }

  .response-step {
    flex-direction: column;
    text-align: center;
  }

  .reporting-info {
    grid-template-columns: 1fr;
  }

  .subscribe-form {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .security-content {
    padding: 1.5rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .feature-item,
  .tip-item,
  .compliance-item,
  .report-card {
    padding: 1.5rem;
  }
}
</style>