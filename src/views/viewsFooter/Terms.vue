<template>
  <div class="terms-page">
    <div class="container">
      <div class="page-header">
        <h1>Algemene Voorwaarden</h1>
        <p>Laatst bijgewerkt: {{ currentDate }}</p>
      </div>

      <div class="terms-content">
        <!-- Introduction -->
        <section class="terms-section">
          <h2>1. Algemeen</h2>
          <p>
            Welkom bij EventPlan. Deze algemene voorwaarden zijn van toepassing op alle diensten
            die worden aangeboden via eventplan.nl en bijbehorende applicaties. Door gebruik te
            maken van onze diensten gaat u akkoord met deze voorwaarden.
          </p>
        </section>

        <!-- Definitions -->
        <section class="terms-section">
          <h2>2. Definities</h2>
          <div class="definitions-grid">
            <div class="definition-item">
              <h4>EventPlan</h4>
              <p>De aanbieder van het ticketplatform en bijbehorende diensten</p>
            </div>
            <div class="definition-item">
              <h4>Gebruiker</h4>
              <p>Iedere natuurlijke of rechtspersoon die gebruik maakt van onze diensten</p>
            </div>
            <div class="definition-item">
              <h4>Organisator</h4>
              <p>De partij die evenementen aanbiedt via ons platform</p>
            </div>
            <div class="definition-item">
              <h4>Bezoeker</h4>
              <p>De persoon die een evenement bezoekt met een gekocht ticket</p>
            </div>
          </div>
        </section>

        <!-- Account -->
        <section class="terms-section">
          <h2>3. Account en Registratie</h2>
          <div class="clause-list">
            <div class="clause">
              <h4>3.1 Account aanmaken</h4>
              <p>
                Voor het kopen van tickets of organiseren van evenementen is een account vereist.
                U bent verantwoordelijk voor de juistheid van de opgegeven gegevens en de
                vertrouwelijkheid van uw inloggegevens.
              </p>
            </div>
            <div class="clause">
              <h4>3.2 Leeftijdsvereiste</h4>
              <p>
                U dient minimaal 16 jaar oud te zijn om een account aan te maken. Voor bepaalde
                evenementen kunnen aanvullende leeftijdsrestricties gelden.
              </p>
            </div>
            <div class="clause">
              <h4>3.3 Verantwoordelijkheid</h4>
              <p>
                Alle activiteiten die plaatsvinden onder uw account zijn uw verantwoordelijkheid.
                Meld direct ongeautoriseerd gebruik van uw account.
              </p>
            </div>
          </div>
        </section>

        <!-- Ticket Sales -->
        <section class="terms-section">
          <h2>4. Ticketverkoop</h2>
          <div class="clause-list">
            <div class="clause">
              <h4>4.1 Prijzen en beschikbaarheid</h4>
              <p>
                Alle prijzen zijn inclusief BTW en eventuele servicekosten. Ticketprijzen kunnen
                per evenement verschillen en zijn onderhevig aan wijzigingen. Beschikbaarheid is
                onder voorbehoud.
              </p>
            </div>
            <div class="clause">
              <h4>4.2 Betaling</h4>
              <p>
                Betalingen dienen direct te worden voldaan via de beschikbare betaalmethoden.
                Na succesvolle betaling ontvangt u een bevestiging en uw ticket(s).
              </p>
            </div>
            <div class="clause">
              <h4>4.3 Annulering en restitutie</h4>
              <p>
                Annuleringen zijn mogelijk volgens ons restitutiebeleid. Evenement-specifieke
                voorwaarden kunnen afwijken en staan vermeld bij het evenement.
              </p>
            </div>
          </div>
        </section>

        <!-- Organizers -->
        <section class="terms-section">
          <h2>5. Voor Organisatoren</h2>
          <div class="clause-list">
            <div class="clause">
              <h4>5.1 Verantwoordelijkheden</h4>
              <p>
                Organisatoren zijn verantwoordelijk voor de juistheid van evenementinformatie,
                het naleven van wet- en regelgeving en de kwaliteit van het evenement.
              </p>
            </div>
            <div class="clause">
              <h4>5.2 Uitbetalingen</h4>
              <p>
                Opbrengsten worden binnen 14 werkdagen na het evenement uitbetaald, minus de
                overeengekomen servicekosten.
              </p>
            </div>
            <div class="clause">
              <h4>5.3 Aansprakelijkheid</h4>
              <p>
                Organisatoren zijn aansprakelijk voor schade veroorzaakt tijdens hun evenementen.
                EventPlan is niet aansprakelijk voor handelingen van organisatoren.
              </p>
            </div>
          </div>
        </section>

        <!-- Prohibited -->
        <section class="terms-section">
          <h2>6. Verboden Handelingen</h2>
          <div class="prohibited-list">
            <div class="prohibited-item">
              <i class="fas fa-ban"></i>
              <span>Het doorverkopen van tickets tegen hogere prijzen (ticket-scalping)</span>
            </div>
            <div class="prohibited-item">
              <i class="fas fa-ban"></i>
              <span>Het aanbieden van nep-evenementen of frauduleuze activiteiten</span>
            </div>
            <div class="prohibited-item">
              <i class="fas fa-ban"></i>
              <span>Misbruik maken van het platform voor illegale doeleinden</span>
            </div>
            <div class="prohibited-item">
              <i class="fas fa-ban"></i>
              <span>Het verstoren van de werking van het platform</span>
            </div>
          </div>
        </section>

        <!-- Liability -->
        <section class="terms-section">
          <h2>7. Aansprakelijkheid</h2>
          <p>
            EventPlan is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst.
            Onze aansprakelijkheid is in ieder geval beperkt tot het bedrag dat door uw verzekeraar
            wordt uitbetaald.
          </p>
          <div class="liability-note">
            <i class="fas fa-exclamation-triangle"></i>
            <p>
              Wij zijn niet aansprakelijk voor annuleringen, wijzigingen of problemen met
              evenementen georganiseerd door derden.
            </p>
          </div>
        </section>

        <!-- Intellectual Property -->
        <section class="terms-section">
          <h2>8. Intellectueel Eigendom</h2>
          <p>
            Alle intellectuele eigendomsrechten op het platform, inclusief software, design en
            content, berusten bij EventPlan. Gebruikers behouden de rechten op door hen geüploade
            content, maar verlenen EventPlan een licentie voor het gebruik op het platform.
          </p>
        </section>

        <!-- Changes -->
        <section class="terms-section">
          <h2>9. Wijzigingen</h2>
          <p>
            Wij behouden ons het recht voor deze voorwaarden te wijzigen. Grote wijzigingen
            worden 30 dagen van tevoren gecommuniceerd. Door voortgezet gebruik gaat u akkoord
            met de gewijzigde voorwaarden.
          </p>
        </section>

        <!-- Governing Law -->
        <section class="terms-section">
          <h2>10. Toepasselijk Recht en Geschillen</h2>
          <p>
            Op deze voorwaarden is Nederlands recht van toepassing. Geschillen zullen in eerste
            instantie worden voorgelegd aan de bevoegde rechter in Amsterdam.
          </p>
        </section>

        <!-- Contact -->
        <section class="terms-section contact-section">
          <h2>11. Contact</h2>
          <p>
            Voor vragen over deze voorwaarden kunt u contact opnemen via:
          </p>
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <a href="mailto:legal@eventplan.nl">legal@eventplan.nl</a>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <a href="tel:+31201234567">+31 20 123 4567</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Terms',
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
    document.title = 'Algemene Voorwaarden - EventPlan'
  }
}
</script>

<style scoped>
.terms-page {
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

.terms-content {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 3rem;
}

.terms-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.terms-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.terms-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.terms-section p {
  color: #5d6d7e;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.definitions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.definition-item {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.definition-item h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.definition-item p {
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
}

.clause-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.clause {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.clause h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.clause p {
  color: #5d6d7e;
  margin: 0;
  line-height: 1.6;
}

.prohibited-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.prohibited-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8d7da;
  border-radius: 8px;
  color: #721c24;
}

.prohibited-item i {
  color: #e74c3c;
  flex-shrink: 0;
}

.liability-note {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #fff3cd;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.liability-note i {
  color: #f39c12;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.liability-note p {
  margin: 0;
  color: #856404;
}

.contact-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.contact-info {
  display: flex;
  gap: 2rem;
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
  .terms-content {
    padding: 1.5rem;
    margin: 0 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .definitions-grid {
    grid-template-columns: 1fr;
  }

  .contact-info {
    flex-direction: column;
    gap: 1rem;
  }

  .prohibited-item {
    align-items: flex-start;
  }
}
</style>