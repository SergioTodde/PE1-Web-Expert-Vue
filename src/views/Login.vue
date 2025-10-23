<template>
  <div class="login-view">
    <div class="container">
      <div class="login-container">
        <div class="login-card">
          <div class="login-header">
            <h1>Inloggen</h1>
            <p>Welkom terug! Log in op je account.</p>
          </div>

          <LoginForm @success="handleLoginSuccess" />

          <div class="login-footer">
            <p>
              Nog geen account?
              <router-link to="/register" class="link">Registreer hier</router-link>
            </p>
            <router-link to="/password-reset" class="link">
              Wachtwoord vergeten?
            </router-link>
          </div>
        </div>

        <div class="login-hero">
          <div class="hero-content">
            <h2>Ontdek Onvergetelijke Evenementen</h2>
            <p>Log in om toegang te krijgen tot duizenden evenementen en speciale aanbiedingen.</p>
            <div class="hero-features">
              <div class="feature">
                <i class="fas fa-ticket-alt"></i>
                <span>Exclusieve tickets</span>
              </div>
              <div class="feature">
                <i class="fas fa-heart"></i>
                <span>Persoonlijke favorieten</span>
              </div>
              <div class="feature">
                <i class="fas fa-bell"></i>
                <span>Personal notifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue'

export default {
  name: 'LoginView',
  components: {
    LoginForm
  },
  methods: {
    handleLoginSuccess() {
      this.$toast.success('Succesvol ingelogd!')

      // Redirect to intended page or home
      const intendedRoute = this.$route.query.redirect || '/'
      this.$router.push(intendedRoute)
    }
  }
}
</script>

<style scoped>
.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
}

.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.login-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #6c757d;
  margin: 0;
}

.login-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e9ecef;
}

.login-footer p {
  margin-bottom: 1rem;
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

.login-hero {
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

.hero-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
}

.feature i {
  font-size: 1.5rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .login-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .login-card {
    padding: 2rem;
  }

  .login-hero {
    text-align: center;
  }

  .hero-content h2 {
    font-size: 2rem;
  }
}
</style>