<template>
  <form @submit.prevent="handleSubmit" class="register-form">
    <div class="form-grid">
      <div class="form-group">
        <label for="firstName" class="form-label">Voornaam</label>
        <input
            id="firstName"
            v-model="form.first_name"
            type="text"
            class="form-control"
            :class="{ error: errors.first_name }"
            placeholder="John"
            required
        >
        <div v-if="errors.first_name" class="form-error">{{ errors.first_name }}</div>
      </div>

      <div class="form-group">
        <label for="lastName" class="form-label">Achternaam</label>
        <input
            id="lastName"
            v-model="form.last_name"
            type="text"
            class="form-control"
            :class="{ error: errors.last_name }"
            placeholder="Doe"
            required
        >
        <div v-if="errors.last_name" class="form-error">{{ errors.last_name }}</div>
      </div>
    </div>

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
      <label for="phone" class="form-label">Telefoonnummer (optioneel)</label>
      <input
          id="phone"
          v-model="form.phone"
          type="tel"
          class="form-control"
          :class="{ error: errors.phone }"
          placeholder="+32 123 45 67 89"
      >
      <div v-if="errors.phone" class="form-error">{{ errors.phone }}</div>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label for="password" class="form-label">Wachtwoord</label>
        <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-control"
            :class="{ error: errors.password }"
            placeholder="Minimaal 8 karakters"
            required
        >
        <div v-if="errors.password" class="form-error">{{ errors.password }}</div>
      </div>

      <div class="form-group">
        <label for="passwordConfirmation" class="form-label">Bevestig Wachtwoord</label>
        <input
            id="passwordConfirmation"
            v-model="form.password_confirmation"
            type="password"
            class="form-control"
            :class="{ error: errors.password_confirmation }"
            placeholder="Herhaal wachtwoord"
            required
        >
        <div v-if="errors.password_confirmation" class="form-error">
          {{ errors.password_confirmation }}
        </div>
      </div>
    </div>

    <!-- Password Strength Indicator -->
    <div v-if="form.password" class="password-strength">
      <div class="strength-bar">
        <div
            class="strength-fill"
            :class="passwordStrength.class"
        ></div>
      </div>
      <div class="strength-text">{{ passwordStrength.text }}</div>
    </div>

    <div class="form-group">
      <label class="checkbox-label">
        <input type="checkbox" v-model="form.agree_terms" required>
        <span class="checkmark"></span>
        Ik ga akkoord met de
        <router-link to="/terms" class="link">Algemene Voorwaarden</router-link>
        en
        <router-link to="/privacy" class="link">Privacybeleid</router-link>
      </label>
      <div v-if="errors.agree_terms" class="form-error">{{ errors.agree_terms }}</div>
    </div>

    <div class="form-group">
      <label class="checkbox-label">
        <input type="checkbox" v-model="form.newsletter">
        <span class="checkmark"></span>
        Ik wil graag updates en aanbiedingen ontvangen per e-mail
      </label>
    </div>

    <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
      <LoadingSpinner v-if="loading" small inline />
      <span v-else>Account Aanmaken</span>
    </button>

    <div class="divider">
      <span>of</span>
    </div>

    <div class="social-login">
      <button type="button" class="btn btn-social btn-google" @click="socialRegister('google')">
        <i class="fab fa-google"></i>
        Registreren met Google
      </button>
      <button type="button" class="btn btn-social btn-facebook" @click="socialRegister('facebook')">
        <i class="fab fa-facebook-f"></i>
        Registreren met Facebook
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

export default {
  name: 'RegisterForm',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      loading: false,
      form: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        agree_terms: false,
        newsletter: false
      },
      errors: {}
    }
  },
  computed: {
    passwordStrength() {
      if (!this.form.password) {
        return { class: 'weak', text: '' }
      }

      const strength = this.calculatePasswordStrength(this.form.password)

      switch (strength.level) {
        case 0:
        case 1:
          return { class: 'weak', text: 'Zwak wachtwoord' }
        case 2:
          return { class: 'medium', text: 'Matig wachtwoord' }
        case 3:
          return { class: 'strong', text: 'Sterk wachtwoord' }
        case 4:
          return { class: 'very-strong', text: 'Zeer sterk wachtwoord' }
        default:
          return { class: 'weak', text: 'Zwak wachtwoord' }
      }
    }
  },
  methods: {
    ...mapActions('auth', ['register']),

    async handleSubmit() {
      this.errors = {}

      if (!this.validateForm()) {
        return
      }

      this.loading = true

      try {
        await this.register(this.form)
        this.$emit('success')
      } catch (error) {
        this.handleError(error)
      } finally {
        this.loading = false
      }
    },

    validateForm() {
      let isValid = true

      if (!this.form.first_name.trim()) {
        this.errors.first_name = 'Voornaam is verplicht'
        isValid = false
      }

      if (!this.form.last_name.trim()) {
        this.errors.last_name = 'Achternaam is verplicht'
        isValid = false
      }

      if (!this.form.email.trim()) {
        this.errors.email = 'E-mailadres is verplicht'
        isValid = false
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Voer een geldig e-mailadres in'
        isValid = false
      }

      if (this.form.phone && !this.isValidPhone(this.form.phone)) {
        this.errors.phone = 'Voer een geldig telefoonnummer in'
        isValid = false
      }

      if (!this.form.password) {
        this.errors.password = 'Wachtwoord is verplicht'
        isValid = false
      } else if (this.form.password.length < 8) {
        this.errors.password = 'Wachtwoord moet minimaal 8 karakters bevatten'
        isValid = false
      } else if (this.calculatePasswordStrength(this.form.password).level < 2) {
        this.errors.password = 'Kies een sterker wachtwoord'
        isValid = false
      }

      if (!this.form.password_confirmation) {
        this.errors.password_confirmation = 'Bevestig je wachtwoord'
        isValid = false
      } else if (this.form.password !== this.form.password_confirmation) {
        this.errors.password_confirmation = 'Wachtwoorden komen niet overeen'
        isValid = false
      }

      if (!this.form.agree_terms) {
        this.errors.agree_terms = 'Je moet akkoord gaan met de voorwaarden'
        isValid = false
      }

      return isValid
    },

    calculatePasswordStrength(password) {
      let score = 0

      // Length check
      if (password.length >= 8) score++
      if (password.length >= 12) score++

      // Character variety
      if (/[a-z]/.test(password)) score++
      if (/[A-Z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^a-zA-Z0-9]/.test(password)) score++

      return {
        score,
        level: Math.min(4, Math.floor(score / 2))
      }
    },

    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    },

    isValidPhone(phone) {
      const re = /^[\+]?[1-9][\d]{0,15}$/
      return re.test(phone.replace(/\s/g, ''))
    },

    handleError(error) {
      if (error.response?.status === 422) {
        const backendErrors = error.response.data.errors
        Object.keys(backendErrors).forEach(key => {
          this.errors[key] = backendErrors[key][0]
        })
      } else {
        this.errors.general = 'Er is een fout opgetreden. Probeer het opnieuw.'
      }
    },

    socialRegister(provider) {
      this.$toast.info(`${provider} registratie komt binnenkort beschikbaar`)
    }
  }
}
</script>

<style scoped>
.register-form {
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

.password-strength {
  margin: 0.5rem 0 1.5rem;
}

.strength-bar {
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.strength-fill {
  height: 100%;
  width: 0%;
  transition: all 0.3s ease;
}

.strength-fill.weak {
  width: 25%;
  background: #dc3545;
}

.strength-fill.medium {
  width: 50%;
  background: #ffc107;
}

.strength-fill.strong {
  width: 75%;
  background: #28a745;
}

.strength-fill.very-strong {
  width: 100%;
  background: #20c997;
}

.strength-text {
  font-size: 0.75rem;
  color: #6b7280;
  text-align: right;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.4;
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
  flex-shrink: 0;
  margin-top: 0.1rem;
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

.link {
  color: #007bff;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.btn-block {
  width: 100%;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
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

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>