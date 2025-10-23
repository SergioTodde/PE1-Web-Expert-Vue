<template>
  <div class="privacy-page">
    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <h1>Privacybeleid</h1>
        <p>Laatst bijgewerkt: {{ currentDate }}</p>
      </div>

      <!-- Content -->
      <div class="privacy-content">
        <!-- Introduction -->
        <section class="privacy-section">
          <h2>1. Inleiding</h2>
          <p>
            Bij EventPlan hechten we veel waarde aan uw privacy. Dit privacybeleid legt uit hoe wij
            uw persoonlijke gegevens verzamelen, gebruiken, delen en beschermen wanneer u gebruik
            maakt van onze diensten via eventplan.nl en bijbehorende applicaties.
          </p>
          <p>
            Wij zijn verantwoordelijk voor de verwerking van uw persoonsgegevens zoals beschreven
            in dit privacybeleid. Als u vragen heeft over uw privacy of dit beleid, kunt u contact
            met ons opnemen via de gegevens onderaan deze pagina.
          </p>
        </section>

        <!-- Data Collection -->
        <section class="privacy-section">
          <h2>2. Welke gegevens verzamelen wij?</h2>

          <div class="data-category">
            <h3>2.1 Gegevens die u aan ons verstrekt</h3>
            <ul>
              <li><strong>Accountgegevens:</strong> Naam, e-mailadres, telefoonnummer, wachtwoord</li>
              <li><strong>Profielinformatie:</strong> Profielfoto, geboortedatum, adresgegevens</li>
              <li><strong>Betalinggegevens:</strong> Betaalinformatie (verwerkt door beveiligde payment providers)</li>
              <li><strong>Evenement informatie:</strong> Gegevens over georganiseerde of bezochte evenementen</li>
              <li><strong>Communicatie:</strong> Berichten die u naar ons stuurt</li>
            </ul>
          </div>

          <div class="data-category">
            <h3>2.2 Gegevens die automatisch worden verzameld</h3>
            <ul>
              <li><strong>Technische gegevens:</strong> IP-adres, browser type, apparaatinformatie</li>
              <li><strong>Gebruiksgegevens:</strong> Bezochte pagina's, klikgedrag, zoekopdrachten</li>
              <li><strong>Locatiegegevens:</strong> Algemene locatie (op basis van IP-adres)</li>
              <li><strong>Cookies:</strong> Zie ons <router-link to="/cookies">Cookiebeleid</router-link> voor meer informatie</li>
            </ul>
          </div>
        </section>

        <!-- Purpose of Data Processing -->
        <section class="privacy-section">
          <h2>3. Doeleinden van gegevensverwerking</h2>
          <div class="purposes-grid">
            <div class="purpose-item">
              <i class="fas fa-user-check"></i>
              <h4>Accountbeheer</h4>
              <p>Het aanmaken en beheren van uw account</p>
            </div>
            <div class="purpose-item">
              <i class="fas fa-ticket-alt"></i>
              <h4>Ticketverkoop</h4>
              <p>Verwerken van ticketaankopen en betalingen</p>
            </div>
            <div class="purpose-item">
              <i class="fas fa-calendar"></i>
              <h4>Evenementen</h4>
              <p>Organiseren en promoten van evenementen</p>
            </div>
            <div class="purpose-item">
              <i class="fas fa-comments"></i>
              <h4>Klantenservice</h4>
              <p>Verlenen van ondersteuning en beantwoorden van vragen</p>
            </div>
            <div class="purpose-item">
              <i class="fas fa-chart-line"></i>
              <h4>Analyse</h4>
              <p>Verbeteren van onze diensten en gebruikerservaring</p>
            </div>
            <div class="purpose-item">
              <i class="fas fa-shield-alt"></i>
              <h4>Beveiliging</h4>
              <p>Bescherming tegen fraude en misbruik</p>
            </div>
          </div>
        </section>

        <!-- Data Sharing -->
        <section class="privacy-section">
          <h2>4. Delen van gegevens</h2>
          <p>
            Wij delen uw gegevens alleen in de volgende gevallen:
          </p>
          <div class="sharing-list">
            <div class="sharing-item">
              <i class="fas fa-users"></i>
              <div>
                <h4>Evenement organisatoren</h4>
                <p>Basis ticket- en contactinformatie met organisatoren van evenementen die u bezoekt</p>
              </div>
            </div>
            <div class="sharing-item">
              <i class="fas fa-tools"></i>
              <div>
                <h4>Service providers</h4>
                <p>Betalingverwerkers, hostingpartners en analyse-diensten</p>
              </div>
            </div>
            <div class="sharing-item">
              <i class="fas fa-gavel"></i>
              <div>
                <h4>Wettelijke verplichtingen</h4>
                <p>Indien vereist door wet- of regelgeving</p>
              </div>
            </div>
            <div class="sharing-item">
              <i class="fas fa-building"></i>
              <div>
                <h4>Bedrijfsoverdracht</h4>
                <p>Bij fusie, overname of verkoop van onze onderneming</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Data Protection -->
        <section class="privacy-section">
          <h2>5. Gegevensbescherming</h2>
          <p>
            Wij nemen de bescherming van uw gegevens serieus en hebben passende technische en
            organisatorische maatregelen genomen om uw persoonsgegevens te beschermen tegen
            verlies of tegen enige vorm van onrechtmatige verwerking.
          </p>
          <div class="protection-features">
            <div class="protection-item">
              <i class="fas fa-lock"></i>
              <span>SSL-versleuteling</span>
            </div>
            <div class="protection-item">
              <i class="fas fa-shield-alt"></i>
              <span>Toegangsbeperkingen</span>
            </div>
            <div class="protection-item">
              <i class="fas fa-database"></i>
              <span>Beveiligde servers</span>
            </div>
            <div class="protection-item">
              <i class="fas fa-user-shield"></i>
              <span>Privacy by design</span>
            </div>
          </div>
        </section>

        <!-- Your Rights -->
        <section class="privacy-section">
          <h2>6. Uw rechten</h2>
          <p>
            U heeft de volgende rechten met betrekking tot uw persoonsgegevens:
          </p>
          <div class="rights-grid">
            <div class="right-item">
              <h4>Inzagerecht</h4>
              <p>U kunt inzage vragen in de gegevens die wij van u verwerken</p>
            </div>
            <div class="right-item">
              <h4>Correctierecht</h4>
              <p>U kunt onjuiste gegevens laten corrigeren</p>
            </div>
            <div class="right-item">
              <h4>Verwijderingsrecht</h4>
              <p>U kunt uw gegevens laten verwijderen ("recht op vergetelheid")</p>
            </div>
            <div class="right-item">
              <h4>Bezwaarrecht</h4>
              <p>U kunt bezwaar maken tegen bepaalde verwerkingen</p>
            </div>
            <div class="right-item">
              <h4>Dataportabiliteit</h4>
              <p>U kunt uw gegevens in machineleesbaar formaat opvragen</p>
            </div>
            <div class="right-item">
              <h4>Intrekking toestemming</h4>
              <p>U kunt uw toestemming voor marketing altijd intrekken</p>
            </div>
          </div>

          <div class="rights-action">
            <p>
              Om gebruik te maken van uw rechten kunt u contact met ons opnemen via
              <a href="mailto:privacy@eventplan.nl">privacy@eventplan.nl</a>.
            </p>
          </div>
        </section>

        <!-- Data Retention -->
        <section class="privacy-section">
          <h2>7. Bewaartermijnen</h2>
          <p>
            Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor de doeleinden
            waarvoor ze zijn verzameld, tenzij een langere bewaartermijn wettelijk verplicht is.
          </p>
          <div class="retention-list">
            <div class="retention-item">
              <span class="duration">7 jaar</span>
              <span class="description">Financiële gegevens (wettelijke verplichting)</span>
            </div>
            <div class="retention-item">
              <span class="duration">2 jaar</span>
              <span class="description">Accountgegevens na laatste activiteit</span>
            </div>
            <div class="retention-item">
              <span class="duration">1 jaar</span>
              <span class="description">Analyse- en marketinggegevens</span>
            </div>
            <div class="retention-item">
              <span class="duration">90 dagen</span>
              <span class="description">Server logs en back-ups</span>
            </div>
          </div>
        </section>

        <!-- Cookies -->
        <section class="privacy-section">
          <h2>8. Cookies en tracking</h2>
          <p>
            Wij gebruiken cookies en vergelijkbare technologieën. Voor gedetailleerde informatie
            over de cookies die wij gebruiken en hoe u deze kunt beheren, verwijzen wij u naar
            ons <router-link to="/cookies">Cookiebeleid</router-link>.
          </p>
        </section>

        <!-- Changes -->
        <section class="privacy-section">
          <h2>9. Wijzigingen in dit beleid</h2>
          <p>
            Wij kunnen dit privacybeleid van tijd tot tijd wijzigen. Bij significante wijzigingen
            zullen wij u hierover informeren via e-mail of een prominent bericht op onze website.
            De actuele versie is altijd beschikbaar op deze pagina.
          </p>
        </section>

        <!-- Contact -->
        <section class="privacy-section contact-section">
          <h2>10. Contact</h2>
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <div>
                <h4>E-mail</h4>
                <a href="mailto:privacy@eventplan.nl">privacy@eventplan.nl</a>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <div>
                <h4>Telefoon</h4>
                <a href="tel:+31201234567">+31 20 123 4567</a>
              </div>
            </div>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <h4>Adres</h4>
                <p>EventPlan B.V.<br>Keizersgracht 123<br>1015 CJ Amsterdam</p>
              </div>
            </div>
          </div>

          <div class="authority-info">
            <h4>Autoriteit Persoonsgegevens</h4>
            <p>
              Heeft u een klacht over de verwerking van uw persoonsgegevens? Dan kunt u contact
              opnemen met de Autoriteit Persoonsgegevens:
            </p>
            <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank">
              www.autoriteitpersoonsgegevens.nl
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Privacy',
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
    document.title = 'Privacybeleid - EventPlan'
  }
}
</script>

<style scoped>
.privacy-page {
  padding: 2rem 0;
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
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

.privacy-content {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 3rem;
}

.privacy-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.privacy-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.privacy-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.privacy-section h3 {
  color: #34495e;
  margin: 1.5rem 0 1rem 0;
  font-size: 1.2rem;
}

.privacy-section h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.privacy-section p {
  color: #5d6d7e;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.privacy-section ul {
  color: #5d6d7e;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.privacy-section li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.privacy-section strong {
  color: #2c3e50;
}

.privacy-section a {
  color: #3498db;
  text-decoration: none;
}

.privacy-section a:hover {
  text-decoration: underline;
}

/* Data Categories */
.data-category {
  margin-bottom: 2rem;
}

.data-category:last-child {
  margin-bottom: 0;
}

/* Purposes Grid */
.purposes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.purpose-item {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.purpose-item:hover {
  transform: translateY(-2px);
}

.purpose-item i {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.purpose-item h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.purpose-item p {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0;
}

/* Sharing List */
.sharing-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.sharing-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.sharing-item i {
  font-size: 1.5rem;
  color: #3498db;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.sharing-item h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.sharing-item p {
  margin: 0;
  color: #7f8c8d;
}

/* Protection Features */
.protection-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.protection-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
}

.protection-item i {
  font-size: 2rem;
  color: #27ae60;
}

.protection-item span {
  color: #2c3e50;
  font-weight: 500;
  text-align: center;
}

/* Rights Grid */
.rights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.right-item {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.right-item h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.right-item p {
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
}

.rights-action {
  background: #e8f4fd;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.rights-action p {
  margin: 0;
  color: #2c3e50;
}

/* Retention List */
.retention-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.retention-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.duration {
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  min-width: 80px;
  text-align: center;
}

.description {
  color: #2c3e50;
  font-weight: 500;
}

/* Contact Section */
.contact-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 2rem;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact-item i {
  font-size: 1.5rem;
  color: #3498db;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.contact-item h4 {
  margin: 0 0 0.25rem 0;
  color: #2c3e50;
}

.contact-item a, .contact-item p {
  color: #5d6d7e;
  margin: 0;
  text-decoration: none;
}

.contact-item a:hover {
  color: #3498db;
  text-decoration: underline;
}

.authority-info {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #e74c3c;
}

.authority-info h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.authority-info p {
  color: #5d6d7e;
  margin-bottom: 0.5rem;
}

.authority-info a {
  color: #3498db;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .privacy-content {
    padding: 1.5rem;
    margin: 0 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .purposes-grid,
  .rights-grid {
    grid-template-columns: 1fr;
  }

  .protection-features {
    gap: 1rem;
  }

  .contact-info {
    grid-template-columns: 1fr;
  }

  .sharing-item,
  .retention-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .duration {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .privacy-content {
    padding: 1rem;
  }

  .page-header {
    padding: 1rem 0;
  }

  .page-header h1 {
    font-size: 1.75rem;
  }

  .privacy-section {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
  }
}
</style>