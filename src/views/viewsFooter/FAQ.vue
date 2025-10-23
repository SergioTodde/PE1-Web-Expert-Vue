<template>
  <div class="faq-page">
    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <h1>Veelgestelde Vragen</h1>
        <p>Vind snel antwoord op je vragen over EventPlan</p>

        <!-- Search -->
        <div class="search-section">
          <div class="search-container">
            <i class="fas fa-search"></i>
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Waar kunnen we je mee helpen?"
                class="search-input"
                @input="filterFAQs"
            >
          </div>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="quick-links">
        <div class="quick-link" @click="scrollToCategory('tickets')">
          <i class="fas fa-ticket-alt"></i>
          <span>Tickets & Boekingen</span>
        </div>
        <div class="quick-link" @click="scrollToCategory('events')">
          <i class="fas fa-calendar"></i>
          <span>Evenementen</span>
        </div>
        <div class="quick-link" @click="scrollToCategory('account')">
          <i class="fas fa-user"></i>
          <span>Account</span>
        </div>
        <div class="quick-link" @click="scrollToCategory('payments')">
          <i class="fas fa-credit-card"></i>
          <span>Betalingen</span>
        </div>
        <div class="quick-link" @click="scrollToCategory('technical')">
          <i class="fas fa-cog"></i>
          <span>Technisch</span>
        </div>
      </div>

      <!-- FAQ Content -->
      <div class="faq-content">
        <!-- Tickets & Bookings -->
        <section class="faq-category" id="tickets" ref="tickets">
          <div class="category-header">
            <i class="fas fa-ticket-alt"></i>
            <h2>Tickets & Boekingen</h2>
          </div>
          <div class="faq-list">
            <FAQItem
                v-for="faq in filteredFAQs.tickets"
                :key="faq.id"
                :question="faq.question"
                :answer="faq.answer"
            />
          </div>
        </section>

        <!-- Events -->
        <section class="faq-category" id="events" ref="events">
          <div class="category-header">
            <i class="fas fa-calendar"></i>
            <h2>Evenementen</h2>
          </div>
          <div class="faq-list">
            <FAQItem
                v-for="faq in filteredFAQs.events"
                :key="faq.id"
                :question="faq.question"
                :answer="faq.answer"
            />
          </div>
        </section>

        <!-- Account -->
        <section class="faq-category" id="account" ref="account">
          <div class="category-header">
            <i class="fas fa-user"></i>
            <h2>Account & Profiel</h2>
          </div>
          <div class="faq-list">
            <FAQItem
                v-for="faq in filteredFAQs.account"
                :key="faq.id"
                :question="faq.question"
                :answer="faq.answer"
            />
          </div>
        </section>

        <!-- Payments -->
        <section class="faq-category" id="payments" ref="payments">
          <div class="category-header">
            <i class="fas fa-credit-card"></i>
            <h2>Betalingen & Facturatie</h2>
          </div>
          <div class="faq-list">
            <FAQItem
                v-for="faq in filteredFAQs.payments"
                :key="faq.id"
                :question="faq.question"
                :answer="faq.answer"
            />
          </div>
        </section>

        <!-- Technical -->
        <section class="faq-category" id="technical" ref="technical">
          <div class="category-header">
            <i class="fas fa-cog"></i>
            <h2>Technische Vragen</h2>
          </div>
          <div class="faq-list">
            <FAQItem
                v-for="faq in filteredFAQs.technical"
                :key="faq.id"
                :question="faq.question"
                :answer="faq.answer"
            />
          </div>
        </section>
      </div>

      <!-- Contact CTA -->
      <div class="contact-cta">
        <div class="cta-content">
          <i class="fas fa-comments"></i>
          <h3>Niet gevonden wat je zocht?</h3>
          <p>Ons support team staat voor je klaar</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="btn btn-primary">
              <i class="fas fa-envelope"></i>
              Contact Opnemen
            </router-link>
            <a href="mailto:support@eventplan.nl" class="btn btn-outline">
              <i class="fas fa-paper-plane"></i>
              E-mail Sturen
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FAQItem from '@/components/faq/FAQItem.vue'

export default {
  name: 'FAQ',
  components: {
    FAQItem
  },
  data() {
    return {
      searchQuery: '',
      allFAQs: {
        tickets: [
          {
            id: 1,
            question: 'Hoe koop ik tickets voor een evenement?',
            answer: 'Ga naar de evenementenpagina, selecteer het gewenste evenement, kies het aantal tickets en volg de stappen om te betalen. Je ontvangt direct een bevestiging per e-mail.'
          },
          {
            id: 2,
            question: 'Kan ik mijn ticket annuleren of teruggeven?',
            answer: 'Annuleringen zijn mogelijk tot 48 uur voor het evenement. VIP-tickets en speciale evenementen kunnen andere voorwaarden hebben. Bekijk de specifieke voorwaarden per evenement.'
          },
          {
            id: 3,
            question: 'Hoe download ik mijn ticket?',
            answer: 'Na aankoop vind je je tickets in "Mijn Tickets" in je profiel. Je kunt ze daar downloaden als PDF of direct op je smartphone bekijken.'
          },
          {
            id: 4,
            question: 'Wat als ik mijn ticket ben verloren?',
            answer: 'Geen probleem! Log in op je account en ga naar "Mijn Tickets". Je kunt je ticket daar opnieuw downloaden of de QR-code laten scannen vanaf je telefoon.'
          },
          {
            id: 5,
            question: 'Kan ik mijn ticket doorverkopen aan iemand anders?',
            answer: 'Ja, via onze officiële doorverkoopfunctie. Ga naar "Mijn Tickets", selecteer het ticket en kies "Doorverkopen". Dit garandeert een veilige transactie voor beide partijen.'
          }
        ],
        events: [
          {
            id: 6,
            question: 'Hoe vind ik evenementen in mijn buurt?',
            answer: 'Gebruik de zoekfunctie op de evenementenpagina en filter op locatie. Je kunt ook je postcode invoeren om evenementen in de omgeving te vinden.'
          },
          {
            id: 7,
            question: 'Kan ik evenementen aan mijn favorieten toevoegen?',
            answer: 'Ja! Klik op het hartje bij elk evenement om het toe te voegen aan je favorieten. Je vindt ze later terug in je profiel onder "Mijn Favorieten".'
          },
          {
            id: 8,
            question: 'Hoe organiseer ik zelf een evenement?',
            answer: 'Klik op "Evenement Aanmaken" in het menu (vereist een organisator account). Volg de stappen om je evenement in te stellen, tickets te configureren en te publiceren.'
          },
          {
            id: 9,
            question: 'Wat gebeurt er als een evenement wordt geannuleerd?',
            answer: 'Bij annulering ontvang je automatisch een e-mail en wordt het ticketbedrag binnen 5-10 werkdagen teruggestort op je originele betaalmethode.'
          }
        ],
        account: [
          {
            id: 10,
            question: 'Hoe maak ik een account aan?',
            answer: 'Klik op "Registreren" in de navigatiebalk. Vul je gegevens in en bevestig je e-mailadres via de link die we sturen. Daarna kun je direct evenementen bezoeken en tickets kopen.'
          },
          {
            id: 11,
            question: 'Hoe wijzig ik mijn wachtwoord?',
            answer: 'Ga naar "Mijn Profiel" → "Accountinstellingen" → "Wachtwoord wijzigen". Je ontvangt een e-mail om de wijziging te bevestigen.'
          },
          {
            id: 12,
            question: 'Kan ik mijn account verwijderen?',
            answer: 'Ja, in "Accountinstellingen" vind je de optie om je account te verwijderen. Let op: dit verwijdert al je gegevens permanent en kan niet ongedaan worden gemaakt.'
          },
          {
            id: 13,
            question: 'Hoe wijzig ik mijn e-mailadres?',
            answer: 'Ga naar "Mijn Profiel" → "Accountinstellingen" → "E-mailadres wijzigen". Je moet je huidige e-mailadres bevestigen en het nieuwe adres verifiëren.'
          }
        ],
        payments: [
          {
            id: 14,
            question: 'Welke betaalmethoden worden geaccepteerd?',
            answer: 'We accepteren iDEAL, creditcard (Visa, MasterCard), PayPal, Bancontact en in sommige gevallen Apple Pay en Google Pay.'
          },
          {
            id: 15,
            question: 'Is mijn betaling veilig?',
            answer: 'Ja, alle betalingen worden versleuteld verwerkt via gecertificeerde payment providers. Wij slaan geen creditcardgegevens op ons eigen systeem op.'
          },
          {
            id: 16,
            question: 'Wanneer ontvang ik mijn factuur?',
            answer: 'Je ontvangt direct na betaling een factuur per e-mail. Alle facturen zijn ook terug te vinden in je account onder "Mijn Bestellingen".'
          },
          {
            id: 17,
            question: 'Hoe lang duurt een terugbetaling?',
            answer: 'Terugbetalingen worden binnen 5-10 werkdagen verwerkt. De exacte tijd hangt af van je bank of payment provider.'
          }
        ],
        technical: [
          {
            id: 18,
            question: 'De website laadt niet goed, wat kan ik doen?',
            answer: 'Probeer de pagina te vernieuwen, je browser cache te legen of een andere browser te gebruiken. Werkt het nog steeds niet? Neem contact met ons op.'
          },
          {
            id: 19,
            question: 'Mijn QR-code wordt niet gescand, wat nu?',
            answer: 'Zorg voor voldoende schermhelderheid en een stabiele internetverbinding. Als het probleem aanhoudt, toon dan je ID-bewijs samen met de ticketbevestiging.'
          },
          {
            id: 20,
            question: 'Kan ik de app offline gebruiken?',
            answer: 'Je kunt gekochte tickets offline bekijken, maar voor het kopen van nieuwe tickets en zoeken is een internetverbinding vereist.'
          }
        ]
      },
      filteredFAQs: {}
    }
  },
  computed: {
    hasSearchResults() {
      return Object.values(this.filteredFAQs).some(category => category.length > 0)
    }
  },
  mounted() {
    this.filteredFAQs = { ...this.allFAQs }
    document.title = 'Veelgestelde Vragen - EventPlan'
  },
  methods: {
    filterFAQs() {
      if (!this.searchQuery.trim()) {
        this.filteredFAQs = { ...this.allFAQs }
        return
      }

      const query = this.searchQuery.toLowerCase()
      const filtered = {}

      Object.keys(this.allFAQs).forEach(category => {
        filtered[category] = this.allFAQs[category].filter(faq =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        )
      })

      this.filteredFAQs = filtered
    },

    scrollToCategory(category) {
      const element = this.$refs[category]
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>

<style scoped>
.faq-page {
  padding: 2rem 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  color: white;
}

.page-header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.page-header p {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.search-section {
  max-width: 600px;
  margin: 0 auto;
}

.search-container {
  position: relative;
  background: white;
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.search-container i {
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
}

.search-input {
  width: 100%;
  border: none;
  outline: none;
  padding-left: 2rem;
  font-size: 1rem;
  background: transparent;
}

.search-input::placeholder {
  color: #bdc3c7;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
}

.quick-link {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.quick-link i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
}

.quick-link span {
  font-weight: 500;
}

.faq-content {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  margin-bottom: 3rem;
}

.faq-category {
  margin-bottom: 3rem;
}

.faq-category:last-child {
  margin-bottom: 0;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
}

.category-header i {
  font-size: 2rem;
  color: #3498db;
}

.category-header h2 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.75rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
}

.no-results i {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #bdc3c7;
}

.contact-cta {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
}

.cta-content i {
  font-size: 4rem;
  color: #3498db;
  margin-bottom: 1.5rem;
}

.cta-content h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
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

/* Responsive Design */
@media (max-width: 768px) {
  .faq-page {
    padding: 1rem 0;
  }

  .page-header h1 {
    font-size: 2.5rem;
  }

  .faq-content {
    padding: 2rem;
    margin: 0 1rem 2rem;
  }

  .contact-cta {
    padding: 2rem;
    margin: 0 1rem;
  }

  .quick-links {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.75rem;
    margin: 0 1rem 2rem;
  }

  .quick-link {
    padding: 1rem;
  }

  .quick-link i {
    font-size: 1.5rem;
  }

  .category-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
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

@media (max-width: 480px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .page-header p {
    font-size: 1rem;
  }

  .faq-content {
    padding: 1.5rem;
  }

  .contact-cta {
    padding: 1.5rem;
  }

  .category-header h2 {
    font-size: 1.5rem;
  }
}
</style>