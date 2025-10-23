<template>
  <div class="pricing-page">
    <div class="container">
      <div class="page-header">
        <h1>Prijzen</h1>
        <p>Eenvoudige, transparante prijzen voor elke organisator</p>
      </div>

      <!-- Toggle -->
      <div class="pricing-toggle">
        <span>Maandelijks</span>
        <ToggleSwitch v-model="annualBilling" />
        <span>Jaarlijks <strong>(-20%)</strong></span>
      </div>

      <!-- Pricing Cards -->
      <div class="pricing-cards">
        <div class="pricing-card" :class="{ featured: plan.featured }" v-for="plan in pricingPlans" :key="plan.id">
          <div class="plan-header">
            <h3>{{ plan.name }}</h3>
            <p>{{ plan.description }}</p>
          </div>

          <div class="plan-price">
            <div class="price-amount">
              <span class="currency">€</span>
              <span class="amount">{{ getPrice(plan) }}</span>
              <span class="period">/{{ annualBilling ? 'jaar' : 'maand' }}</span>
            </div>
            <p class="price-note" v-if="plan.note">{{ plan.note }}</p>
          </div>

          <ul class="plan-features">
            <li v-for="feature in plan.features" :key="feature">
              <i class="fas fa-check"></i>
              {{ feature }}
            </li>
          </ul>

          <div class="plan-actions">
            <button
                @click="selectPlan(plan)"
                class="btn"
                :class="plan.featured ? 'btn-primary' : 'btn-outline'"
            >
              {{ plan.buttonText }}
            </button>
          </div>
        </div>
      </div>

      <!-- Comparison Table -->
      <div class="comparison-section">
        <h2>Vergelijk alle features</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div class="feature-column">Feature</div>
            <div class="plan-column" v-for="plan in pricingPlans" :key="plan.id">
              {{ plan.name }}
            </div>
          </div>

          <div class="table-row" v-for="feature in comparisonFeatures" :key="feature.name">
            <div class="feature-column">
              <span class="feature-name">{{ feature.name }}</span>
              <span class="feature-desc" v-if="feature.description">{{ feature.description }}</span>
            </div>
            <div class="plan-column" v-for="plan in pricingPlans" :key="plan.id">
              <i v-if="feature[plan.id]" class="fas fa-check text-success"></i>
              <i v-else class="fas fa-times text-muted"></i>
              <span v-if="feature[plan.id] && typeof feature[plan.id] === 'string'">
                {{ feature[plan.id] }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="pricing-faq">
        <h2>Veelgestelde vragen over prijzen</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <h4>Zijn er verborgen kosten?</h4>
            <p>Nee, alle prijzen zijn transparant en inclusief BTW. De enige extra kosten zijn eventuele payment processor fees.</p>
          </div>
          <div class="faq-item">
            <h4>Kan ik van plan wisselen?</h4>
            <p>Ja, je kunt op elk moment upgraden of downgraden. Bij downgraden ontvang je een pro-rata restitutie.</p>
          </div>
          <div class="faq-item">
            <h4>Is er een gratis proefperiode?</h4>
            <p>Ja, alle plannen hebben een 14-dagen gratis proefperiode. Geen creditcard vereist.</p>
          </div>
          <div class="faq-item">
            <h4>Welke betaalmethoden worden geaccepteerd?</h4>
            <p>We accepteren iDEAL, creditcard, PayPal en bankoverschrijving.</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="pricing-cta">
        <div class="cta-content">
          <h2>Klaar om te beginnen?</h2>
          <p>Kies het plan dat bij jouw evenementen past</p>
          <div class="cta-buttons">
            <router-link to="/register" class="btn btn-primary btn-large">
              Gratis Account Aanmaken
            </router-link>
            <router-link to="/contact" class="btn btn-outline btn-large">
              Contact Opnemen
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleSwitch from '@/components/shared/ToggleSwitch.vue'

export default {
  name: 'Pricing',
  components: {
    ToggleSwitch
  },
  data() {
    return {
      annualBilling: false,
      pricingPlans: [
        {
          id: 'starter',
          name: 'Starter',
          description: 'Perfect voor kleine evenementen',
          monthly: 0,
          yearly: 0,
          note: 'Altijd gratis',
          features: [
            'Maximaal 100 tickets per evenement',
            'Basis ticketing features',
            'Email support',
            '1 evenement tegelijk',
            'Basis analytics'
          ],
          buttonText: 'Gratis beginnen',
          featured: false
        },
        {
          id: 'professional',
          name: 'Professional',
          description: 'Ideaal voor grotere evenementen',
          monthly: 29,
          yearly: 279,
          note: 'Meest populair',
          features: [
            'Onbeperkt tickets per evenement',
            'Geavanceerde ticketing',
            'Priority support',
            '5 evenementen tegelijk',
            'Geavanceerde analytics',
            'Custom branding',
            'QR code scanning'
          ],
          buttonText: '14 dagen gratis',
          featured: true
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          description: 'Voor professionele organisatoren',
          monthly: 79,
          yearly: 759,
          note: '',
          features: [
            'Alles in Professional',
            'Onbeperkt evenementen',
            '24/7 telefoon support',
            'White-label oplossing',
            'API toegang',
            'Aangepaste integraties',
            'Dedicated account manager'
          ],
          buttonText: 'Neem contact op',
          featured: false
        }
      ],
      comparisonFeatures: [
        {
          name: 'Tickets per evenement',
          description: 'Maximaal aantal tickets',
          starter: '100',
          professional: 'Onbeperkt',
          enterprise: 'Onbeperkt'
        },
        {
          name: 'Gelijktijdige evenementen',
          starter: 1,
          professional: 5,
          enterprise: 'Onbeperkt'
        },
        {
          name: 'Custom branding',
          starter: false,
          professional: true,
          enterprise: true
        },
        {
          name: 'QR code scanning',
          starter: false,
          professional: true,
          enterprise: true
        },
        {
          name: 'Geavanceerde analytics',
          starter: false,
          professional: true,
          enterprise: true
        },
        {
          name: 'API toegang',
          starter: false,
          professional: false,
          enterprise: true
        },
        {
          name: 'Priority support',
          starter: false,
          professional: true,
          enterprise: true
        },
        {
          name: 'Dedicated account manager',
          starter: false,
          professional: false,
          enterprise: true
        }
      ]
    }
  },
  methods: {
    getPrice(plan) {
      return this.annualBilling ? plan.yearly : plan.monthly
    },
    selectPlan(plan) {
      if (plan.id === 'enterprise') {
        this.$router.push('/contact')
      } else {
        this.$router.push('/register')
      }
    }
  },
  mounted() {
    document.title = 'Prijzen - EventPlan'
  }
}
</script>

<style scoped>
.pricing-page {
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
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #7f8c8d;
  font-size: 1.2rem;
}

.pricing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  font-weight: 500;
  color: #2c3e50;
}

.pricing-toggle strong {
  color: #27ae60;
}

.pricing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.pricing-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid transparent;
}

.pricing-card.featured {
  border-color: #3498db;
  transform: scale(1.05);
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.pricing-card.featured:hover {
  transform: scale(1.05) translateY(-5px);
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-header h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.plan-header p {
  color: #7f8c8d;
  margin: 0;
}

.plan-price {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.price-amount {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.currency {
  font-size: 1.5rem;
  color: #3498db;
  font-weight: 600;
}

.amount {
  font-size: 3rem;
  color: #2c3e50;
  font-weight: 700;
  line-height: 1;
}

.period {
  color: #7f8c8d;
  font-size: 1rem;
}

.price-note {
  color: #27ae60;
  font-weight: 500;
  margin: 0;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.plan-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: #5d6d7e;
}

.plan-features li i {
  color: #27ae60;
}

.plan-actions {
  text-align: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.comparison-section {
  margin-bottom: 4rem;
}

.comparison-section h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.comparison-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.table-header {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  background: #2c3e50;
  color: white;
  font-weight: 600;
}

.feature-column {
  padding: 1.5rem;
}

.plan-column {
  padding: 1.5rem;
  text-align: center;
  border-left: 1px solid #34495e;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  border-bottom: 1px solid #e9ecef;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:nth-child(even) {
  background: #f8f9fa;
}

.feature-name {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.feature-desc {
  display: block;
  font-size: 0.875rem;
  color: #7f8c8d;
}

.text-success {
  color: #27ae60;
}

.text-muted {
  color: #bdc3c7;
}

.pricing-faq {
  margin-bottom: 4rem;
}

.pricing-faq h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.faq-item {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.faq-item h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.faq-item p {
  color: #5d6d7e;
  margin: 0;
  line-height: 1.5;
}

.pricing-cta {
  text-align: center;
  background: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.cta-content h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2rem;
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

@media (max-width: 768px) {
  .pricing-cards {
    grid-template-columns: 1fr;
  }

  .pricing-card.featured {
    transform: none;
  }

  .pricing-card.featured:hover {
    transform: translateY(-5px);
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
  }

  .plan-column {
    border-left: none;
    border-top: 1px solid #34495e;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    max-width: 250px;
  }
}
</style>