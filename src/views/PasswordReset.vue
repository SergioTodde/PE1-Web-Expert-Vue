<template>
  <div class="password-reset-view">
    <div class="container">
      <div class="password-reset-container">
        <div class="password-reset-card">
          <div class="password-reset-header">
            <router-link to="/login" class="back-link">
              <i class="fas fa-arrow-left"></i>
              Terug naar inloggen
            </router-link>
          </div>

          <PasswordResetForm @success="handleResetSuccess" />

          <div class="password-reset-footer">
            <p>
              Onthoud je wachtwoord weer?
              <router-link to="/login" class="link">Probeer in te loggen</router-link>
            </p>
          </div>
        </div>

        <div class="password-reset-hero">
          <div class="hero-content">
            <h2>Veiligheid Eerst</h2>
            <p>We helpen je veilig weer toegang te krijgen tot je account.</p>
            <div class="security-features">
              <div class="feature">
                <i class="fas fa-shield-alt"></i>
                <div>
                  <h4>Beveiligde Reset</h4>
                  <p>Versleutelde resetlink voor maximale veiligheid</p>
                </div>
              </div>
              <div class="feature">
                <i class="fas fa-clock"></i>
                <div>
                  <h4>Geldig 1 Uur</h4>
                  <p>Resetlink verloopt automatisch na 60 minuten</p>
                </div>
              </div>
              <div class="feature">
                <i class="fas fa-envelope"></i>
                <div>
                  <h4>Directe Levering</h4>
                  <p>Ontvang de resetlink direct in je mailbox</p>
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
import PasswordResetForm from '@/components/auth/PasswordResetForm.vue'

export default {
  name: 'PasswordResetView',
  components: {
    PasswordResetForm
  },
  methods: {
    handleResetSuccess() {
      this.$toast.success('Resetlink verzonden! Check je e-mail.')
    }
  }
}
</script>

<style scoped>
.password-reset-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
}

.password-reset-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.password-reset-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.password-reset-header {
  text-align: center;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.back-link:hover {
  color: #007bff;
}

.password-reset-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.password-reset-header p {
  color: #6c757d;
  margin: 0;
}

.password-reset-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.password-reset-footer p {
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

.password-reset-hero {
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

.security-features {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.feature i {
  font-size: 2rem;
  opacity: 0.8;
  margin-top: 0.25rem;
}

.feature h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.feature p {
  margin: 0;
  opacity: 0.8;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .password-reset-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .password-reset-card {
    padding: 2rem;
  }

  .password-reset-hero {
    text-align: center;
  }

  .hero-content h2 {
    font-size: 2rem;
  }

  .feature {
    text-align: left;
  }
}
</style>