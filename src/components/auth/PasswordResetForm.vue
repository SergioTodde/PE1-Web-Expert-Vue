<template>
  <div class="password-reset-form">
    <div class="form-header">
      <h2>Wachtwoord Resetten</h2>
      <p v-if="!resetSuccess">
        Voer je e-mailadres in om een wachtwoord reset link te ontvangen
      </p>
      <p v-else class="success-message">
        <i class="fas fa-check-circle"></i>
        Reset link verzonden!
      </p>
    </div>

    <!-- Request Reset Form -->
    <form v-if="!resetSuccess && !showResetForm" @submit.prevent="handleResetRequest" class="reset-request-form">
      <div class="form-group">
        <label for="email">E-mailadres</label>
        <input
            id="email"
            v-model="email"
            type="email"
            :class="{ 'error': errors.email }"
            placeholder="jouw@email.com"
            required
        >
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="loading">
        <i class="fas fa-paper-plane"></i>
        {{ loading ? 'Versturen...' : 'Reset Link Versturen' }}
      </button>
    </form>

    <!-- Actual Reset Form -->
    <form v-else-if="showResetForm" @submit.prevent="handlePasswordReset" class="reset-password-form">
      <div class="form-group">
        <label for="newPassword">Nieuw Wachtwoord</label>
        <div class="password-input-wrapper">
          <input
              id="newPassword"
              v-model="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              :class="{ 'error': errors.newPassword }"
              placeholder="Nieuw wachtwoord"
              required
          >
          <button type="button" class="password-toggle" @click="showNewPassword = !showNewPassword">
            <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        <span v-if="errors.newPassword" class="error-message">{{ errors.newPassword }}</span>

        <div class="password-strength">
          <div class="strength-bar" :class="passwordStrengthClass"></div>
          <span class="strength-text">{{ passwordStrengthText }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Bevestig Wachtwoord</label>
        <div class="password-input-wrapper">
          <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              :class="{ 'error': errors.confirmPassword }"
              placeholder="Bevestig wachtwoord"
              required
          >
          <button type="button" class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
            <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </button>
        </div>
        <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
      </div>

      <div class="password-requirements">
        <h4>Wachtwoord vereisten:</h4>
        <ul>
          <li :class="{ 'met': passwordLength }">Minimaal 8 karakters</li>
          <li :class="{ 'met': hasUpperCase }">Minimaal 1 hoofdletter</li>
          <li :class="{ 'met': hasLowerCase }">Minimaal 1 kleine letter</li>
          <li :class="{ 'met': hasNumber }">Minimaal 1 cijfer</li>
          <li :class="{ 'met': hasSpecialChar }">Minimaal 1 speciaal teken</li>
        </ul>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="loading || !passwordsMatch">
        <i class="fas fa-key"></i>
        {{ loading ? 'Bezig...' : 'Wachtwoord Resetten' }}
      </button>
    </form>

    <!-- Success Message -->
    <div v-else-if="resetSuccess" class="success-section">
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3>Wachtwoord Successvol Gereset!</h3>
      <p>Je wachtwoord is succesvol gewijzigd. Je kunt nu inloggen met je nieuwe wachtwoord.</p>
      <router-link to="/login" class="btn btn-primary">
        <i class="fas fa-sign-in-alt"></i>
        Naar Inloggen
      </router-link>
    </div>

    <!-- Back to Login -->
    <div class="back-to-login">
      <router-link to="/login" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Terug naar inloggen
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordResetForm',
  props: {
    token: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      email: '',
      newPassword: '',
      confirmPassword: '',
      loading: false,
      resetSuccess: false,
      showResetForm: false,
      showNewPassword: false,
      showConfirmPassword: false,
      errors: {}
    }
  },
  computed: {
    passwordLength() {
      return this.newPassword.length >= 8
    },
    hasUpperCase() {
      return /[A-Z]/.test(this.newPassword)
    },
    hasLowerCase() {
      return /[a-z]/.test(this.newPassword)
    },
    hasNumber() {
      return /[0-9]/.test(this.newPassword)
    },
    hasSpecialChar() {
      return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.newPassword)
    },
    passwordsMatch() {
      return this.newPassword === this.confirmPassword && this.newPassword.length > 0
    },
    passwordStrength() {
      if (!this.newPassword) return 0

      let strength = 0
      if (this.passwordLength) strength++
      if (this.hasUpperCase) strength++
      if (this.hasLowerCase) strength++
      if (this.hasNumber) strength++
      if (this.hasSpecialChar) strength++

      return strength
    },
    passwordStrengthClass() {
      const strength = this.passwordStrength
      if (strength === 0) return 'strength-0'
      if (strength <= 2) return 'strength-1'
      if (strength <= 3) return 'strength-2'
      if (strength <= 4) return 'strength-3'
      return 'strength-4'
    },
    passwordStrengthText() {
      const strength = this.passwordStrength
      if (strength === 0) return 'Leeg'
      if (strength <= 2) return 'Zwak'
      if (strength <= 3) return 'Matig'
      if (strength <= 4) return 'Sterk'
      return 'Zeer sterk'
    }
  },
  mounted() {
    // Als er een token is, toon dan het reset formulier
    if (this.token) {
      this.showResetForm = true
      this.verifyToken()
    }
  },
  methods: {
    async handleResetRequest() {
      if (!this.validateEmail()) return

      this.loading = true
      this.errors = {}

      try {
        await this.$api.post('/auth/password/reset-request', {
          email: this.email
        })

        this.resetSuccess = true
        this.$toast.success('Reset link verzonden naar je e-mail')
      } catch (error) {
        this.handleApiError(error)
      } finally {
        this.loading = false
      }
    },

    async handlePasswordReset() {
      if (!this.validatePasswordReset()) return

      this.loading = true
      this.errors = {}

      try {
        await this.$api.post('/auth/password/reset', {
          token: this.token,
          password: this.newPassword,
          password_confirmation: this.confirmPassword
        })

        this.resetSuccess = true
        this.$toast.success('Wachtwoord succesvol gewijzigd')
      } catch (error) {
        this.handleApiError(error)
      } finally {
        this.loading = false
      }
    },

    async verifyToken() {
      try {
        await this.$api.post('/auth/password/verify-token', {
          token: this.token
        })
      } catch (error) {
        this.$toast.error('Ongeldige of verlopen reset link')
        this.$router.push('/forgot-password')
      }
    },

    validateEmail() {
      const errors = {}

      if (!this.email.trim()) {
        errors.email = 'E-mailadres is verplicht'
      } else if (!this.isValidEmail(this.email)) {
        errors.email = 'Ongeldig e-mailadres'
      }

      this.errors = errors
      return Object.keys(errors).length === 0
    },

    validatePasswordReset() {
      const errors = {}

      if (!this.newPassword) {
        errors.newPassword = 'Wachtwoord is verplicht'
      } else if (this.newPassword.length < 8) {
        errors.newPassword = 'Wachtwoord moet minimaal 8 karakters lang zijn'
      } else if (!this.hasUpperCase || !this.hasLowerCase || !this.hasNumber || !this.hasSpecialChar) {
        errors.newPassword = 'Wachtwoord voldoet niet aan alle vereisten'
      }

      if (!this.confirmPassword) {
        errors.confirmPassword = 'Bevestig wachtwoord is verplicht'
      } else if (this.newPassword !== this.confirmPassword) {
        errors.confirmPassword = 'Wachtwoorden komen niet overeen'
      }

      this.errors = errors
      return Object.keys(errors).length === 0
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },

    handleApiError(error) {
      if (error.response?.data?.errors) {
        this.errors = error.response.data.errors
      } else if (error.response?.data?.message) {
        this.$toast.error(error.response.data.message)
      } else {
        this.$toast.error('Er is een fout opgetreden. Probeer het opnieuw.')
      }
    }
  }
}
</script>

<style scoped>
.password-reset-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 20px;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h2 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 28px;
}

.form-header p {
  margin: 0;
  color: #7f8c8d;
  font-size: 16px;
}

.success-message {
  color: #27ae60 !important;
  font-weight: 500;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

input.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.password-input-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #7f8c8d;
  cursor: pointer;
  padding: 5px;
}

.password-strength {
  margin-top: 10px;
}

.strength-bar {
  height: 4px;
  border-radius: 2px;
  margin-bottom: 5px;
  transition: all 0.3s ease;
}

.strength-0 { background: #e9ecef; width: 0%; }
.strength-1 { background: #e74c3c; width: 25%; }
.strength-2 { background: #f39c12; width: 50%; }
.strength-3 { background: #3498db; width: 75%; }
.strength-4 { background: #27ae60; width: 100%; }

.strength-text {
  font-size: 12px;
  color: #7f8c8d;
}

.password-requirements {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.password-requirements h4 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 14px;
}

.password-requirements ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.password-requirements li {
  padding: 5px 0;
  font-size: 12px;
  color: #7f8c8d;
  display: flex;
  align-items: center;
}

.password-requirements li:before {
  content: '✗';
  margin-right: 8px;
  color: #e74c3c;
}

.password-requirements li.met:before {
  content: '✓';
  color: #27ae60;
}

.password-requirements li.met {
  color: #27ae60;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 20px;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  box-sizing: border-box;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
  border-color: #2980b9;
}

.success-section {
  text-align: center;
  padding: 20px 0;
}

.success-icon {
  font-size: 64px;
  color: #27ae60;
  margin-bottom: 20px;
}

.success-section h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.success-section p {
  margin: 0 0 20px 0;
  color: #7f8c8d;
}

.back-to-login {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.back-link {
  color: #3498db;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.back-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .password-reset-form {
    padding: 20px 15px;
  }

  .form-header h2 {
    font-size: 24px;
  }

  .success-icon {
    font-size: 48px;
  }
}
</style>