<template>
  <div class="help-page">
    <div class="container">
      <div class="page-header">
        <h1>Help Center</h1>
        <p>Vind antwoorden op je vragen</p>
      </div>

      <div class="help-content">
        <div class="search-section">
          <input
              v-model="searchQuery"
              placeholder="Waar kunnen we je mee helpen?"
              class="search-input"
          >
        </div>

        <div class="categories-grid">
          <div class="category-card">
            <i class="fas fa-ticket-alt"></i>
            <h3>Tickets & Boekingen</h3>
            <p>Vragen over ticket aankoop, betalingen en annuleringen</p>
          </div>

          <div class="category-card">
            <i class="fas fa-calendar"></i>
            <h3>Evenementen</h3>
            <p>Informatie over evenementen en deelname</p>
          </div>

          <div class="category-card">
            <i class="fas fa-user"></i>
            <h3>Account</h3>
            <p>Profielbeheer en account instellingen</p>
          </div>

          <div class="category-card">
            <i class="fas fa-shield-alt"></i>
            <h3>Veiligheid</h3>
            <p>Privacy, beveiliging en voorwaarden</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Help',
  data() {
    return {
      searchQuery: ''
    }
  }
}
</script>

<style scoped>
.help-page {
  padding: 2rem 0;
  min-height: 60vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #7f8c8d;
  font-size: 1.2rem;
}

.search-section {
  max-width: 600px;
  margin: 0 auto 3rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.category-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-5px);
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
  line-height: 1.5;
}
</style>