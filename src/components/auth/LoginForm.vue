<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="form-group">
      <label for="email" class="form-label">E-mailadres</label>
      <input
          id="email"
          v-model="form.email"
          type="email"
          class="form-control"
          :class="{ error: errors.email }"
          placeholder="jouw@email.com"
          required
      >
      <div v-if="errors.email" class="form-error">{{ errors.email }}</div>
    </div>

    <div class="form-group">
      <label for="password" class="form-label">Wachtwoord</label>
      <input
          id="password"
          v-model="form.password"
          type="password"
          class="form-control"
          :class="{ error: errors.password }"
          placeholder="Je wachtwoord"
          required
      >
      <div v-if="errors.password" class="form-error">{{ errors.password }}</div>
    </div>

    <div class="form-options">
      <label class="checkbox-label">
        <input type="checkbox" v-model="form.remember">
        <span class="checkmark"></span>
        Onthoud mij
      </label>
      <router-link to="/password-reset" class="forgot-password">
        Wachtwoord vergeten?
      </router-link>
    </div>

    <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
      <LoadingSpinner v-if="loading" small inline />
      <span v-else>Inloggen</span>
    </button>

    <div class="divider">
      <span>of</span>
    </div>

    <div class="social-login">
      <button type="button" class="btn btn-social btn-google" @click="socialLogin('google')">
        <i class="fab fa-google"></i>
        Doorgaan met Google
      </button>
      <button type="button" class="btn btn-social btn-facebook" @click="socialLogin('facebook')">
        <i class="fab fa-facebook-f"></i>
        Doorgaan met Facebook
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

export default {
  name: 'LoginForm',
  components: {
    LoadingSpinner
  },
  props: {
    redirect: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      form: {
        email: '',
        password: '',
        remember: false
      },
      errors: {}
    }
  },
  methods: {
    ...mapActions('auth', ['login']),

    async handleSubmit() {
      // Reset errors
      this.errors = {}

      // Validate form
      if (!this.validateForm()) {
        return
      }

      this.loading = true

      try {
        await this.login(this.form)
        this.$emit('success')
      } catch (error) {
        this.handleError(error)
      } finally {
        this.loading = false
      }
    },

    validateForm() {
      let isValid = true

      if (!this.form.email.trim()) {
        this.errors.email = 'E-mailadres is verplicht'
        isValid = false
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Voer een geldig e-mailadres in'
        isValid = false
      }

      if (!this.form.password) {
        this.errors.password = 'Wachtwoord is verplicht'
        isValid = false
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Wachtwoord moet minimaal 6 karakters bevatten'
        isValid = false
      }

      return isValid
    },

    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    },

    handleError(error) {
      if (error.response?.status === 401) {
        this.errors.password = 'Ongeldige inloggegevens'
      } else if (error.response?.status === 422) {
        // Validation errors from backend
        const backendErrors = error.response.data.errors
        Object.keys(backendErrors).forEach(key => {
          this.errors[key] = backendErrors[key][0]
        })
      } else {
        this.errors.general = 'Er is een fout opgetreden. Probeer het opnieuw.'
      }
    },

    socialLogin(provider) {
      // Implement social login
      this.$toast.info(`${provider} login komt binnenkort beschikbaar`)
    }
  }
}
</script>

<style scoped>
.login-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.form-control {
  box-sizing: border-box;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-control.error {
  border-color: #dc3545;
}

.form-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #6b7280;
}

.checkbox-label input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-label input:checked + .checkmark {
  background: #007bff;
  border-color: #007bff;
}

.checkbox-label input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.7rem;
}

.forgot-password {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.btn-block {
  width: 100%;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
}

.divider {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

.divider span {
  padding: 0 1rem;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-social {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #e5e7eb;
  background: white;
  color: #374151;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-social:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.btn-google:hover {
  border-color: #db4437;
  color: #db4437;
}

.btn-facebook:hover {
  border-color: #4267b2;
  color: #4267b2;
}

@media (max-width: 480px) {
  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>