<template>
  <div class="partners-page">
    <div class="container">
      <h1>Onze Partners</h1>
      <p class="subtitle">Samenwerkingen die ons sterker maken</p>

      <div class="partners-grid">
        <div class="partner-card" v-for="partner in partners" :key="partner.id">
          <div class="partner-icon">
            {{ partner.name.charAt(0) }}
          </div>
          <h3>{{ partner.name }}</h3>
          <p>{{ partner.description }}</p>
          <div class="partner-category">
            {{ partner.category }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Partners',
  data() {
    return {
      partners: [
        {
          id: 1,
          name: 'Tech Solutions Inc.',
          description: 'Vooraanstaand in technologische innovatie en digitale transformatie.',
          category: 'Technologie'
        },
        {
          id: 2,
          name: 'Global Business Partners',
          description: 'Expert in internationale zakelijke samenwerkingen en netwerken.',
          category: 'Zakelijke Diensten'
        },
        {
          id: 3,
          name: 'Innovate Together',
          description: 'Richt zich op creatieve oplossingen en gezamenlijke projecten.',
          category: 'Innovatie'
        },
        {
          id: 4,
          name: 'Future Vision Group',
          description: 'Specialist in strategische planning en toekomstgerichte ontwikkelingen.',
          category: 'Consulting'
        },
        {
          id: 5,
          name: 'Quality First Corp',
          description: 'Gedreven door excellente service en kwaliteitsgarantie.',
          category: 'Kwaliteit'
        },
        {
          id: 6,
          name: 'Eco Sustainable Partners',
          description: 'Toegewijd aan duurzame oplossingen en milieubewust ondernemen.',
          category: 'Duurzaamheid'
        }
      ]
    }
  }
}
</script>

<style scoped>
.partners-page {
  padding: 60px 20px;
  min-height: 80vh;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2.5rem;
}

.subtitle {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 50px;
  font-size: 1.2rem;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.partner-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.partner-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.partner-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 20px;
}

.partner-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.4rem;
}

.partner-card p {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 15px;
}

.partner-category {
  display: inline-block;
  background: #e3f2fd;
  color: #1976d2;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .partners-grid {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 2rem;
  }
}
</style>