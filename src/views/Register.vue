<template>
  <div class="register-view">
    <div class="container">
      <div class="register-container">
        <div class="register-card">
          <div class="register-header">
            <h1>Account Aanmaken</h1>
            <p>Maak een account aan om evenementen te ontdekken en tickets te boeken.</p>
          </div>

          <RegisterForm @success="handleRegisterSuccess" />

          <div class="register-footer">
            <p>
              Al een account?
              <router-link to="/login" class="link">Log hier in</router-link>
            </p>
          </div>
        </div>

        <div class="register-hero">
          <div class="hero-content">
            <h2>Word Onderdeel van Onze Community</h2>
            <p>Sluit je aan bij duizenden gebruikers die de beste evenementen ontdekken en bijwonen.</p>
            <div class="hero-benefits">
              <div class="benefit">
                <i class="fas fa-star"></i>
                <div>
                  <h4>Exclusieve Toegang</h4>
                  <p>Krijg early access tot populaire evenementen</p>
                </div>
              </div>
              <div class="benefit">
                <i class="fas fa-gift"></i>
                <div>
                  <h4>Special Aanbiedingen</h4>
                  <p>Ontvang persoonlijke kortingen en aanbiedingen</p>
                </div>
              </div>
              <div class="benefit">
                <i class="fas fa-calendar-check"></i>
                <div>
                  <h4>Makkelijk Beheren</h4>
                  <p>Beheer al je evenementen en tickets op één plek</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/auth/RegisterForm.vue'

export default {
  name: 'RegisterView',
  components: {
    RegisterForm
  },
  methods: {
    handleRegisterSuccess() {
      this.$toast.success('Account succesvol aangemaakt!')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.register-view {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
}

.register-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.register-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.register-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.register-header p {
  color: #6c757d;
  margin: 0;
}

.register-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.register-footer p {
  margin: 0;
  color: #6c757d;
}

.link {
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
}

.link:hover {
  text-decoration: underline;
}

.register-hero {
  color: white;
}

.hero-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-benefits {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.benefit {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.benefit i {
  font-size: 2rem;
  opacity: 0.8;
  margin-top: 0.25rem;
}

.benefit h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.benefit p {
  margin: 0;
  opacity: 0.8;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .register-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .register-card {
    padding: 2rem;
  }

  .register-hero {
    text-align: center;
  }

  .hero-content h2 {
    font-size: 2rem;
  }

  .benefit {
    text-align: left;
  }
}
</style>