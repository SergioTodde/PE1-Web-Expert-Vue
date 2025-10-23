<template>
  <div class="edit-profile-form">
    <div class="form-header">
      <h2>Profiel Bewerken</h2>
      <p>Werk je persoonlijke gegevens bij</p>
    </div>

    <form @submit.prevent="handleSubmit" class="profile-form">
      <!-- Persoonlijke Informatie -->
      <div class="form-section">
        <h3 class="section-title">
          <i class="fas fa-user"></i>
          Persoonlijke Informatie
        </h3>

        <div class="form-grid">
          <div class="form-group">
            <label for="firstName">Voornaam *</label>
            <input
                id="firstName"
                v-model="formData.firstName"
                type="text"
                :class="{ 'error': errors.firstName }"
                placeholder="Jouw voornaam"
            >
            <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
          </div>

          <div class="form-group">
            <label for="lastName">Achternaam *</label>
            <input
                id="lastName"
                v-model="formData.lastName"
                type="text"
                :class="{ 'error': errors.lastName }"
                placeholder="Jouw achternaam"
            >
            <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
          </div>

          <div class="form-group">
            <label for="email">E-mailadres *</label>
            <input
                id="email"
                v-model="formData.email"
                type="email"
                :class="{ 'error': errors.email }"
                placeholder="jouw@email.com"
            >
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="phone">Telefoonnummer</label>
            <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                :class="{ 'error': errors.phone }"
                placeholder="+31 6 12345678"
            >
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>
        </div>
      </div>

      <!-- Adresgegevens -->
      <div class="form-section">
        <h3 class="section-title">
          <i class="fas fa-home"></i>
          Adresgegevens
        </h3>

        <div class="form-grid">
          <div class="form-group full-width">
            <label for="street">Straat en huisnummer</label>
            <input
                id="street"
                v-model="formData.street"
                type="text"
                placeholder="Straatnaam en huisnummer"
            >
          </div>

          <div class="form-group">
            <label for="postalCode">Postcode</label>
            <input
                id="postalCode"
                v-model="formData.postalCode"
                type="text"
                placeholder="1234 AB"
            >
          </div>

          <div class="form-group">
            <label for="city">Plaats</label>
            <input
                id="city"
                v-model="formData.city"
                type="text"
                placeholder="Stad"
            >
          </div>

          <div class="form-group">
            <label for="country">Land</label>
            <select id="country" v-model="formData.country">
              <option value="nl">Nederland</option>
              <option value="be">België</option>
              <option value="de">Duitsland</option>
              <option value="other">Anders</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Voorkeuren -->
      <div class="form-section">
        <h3 class="section-title">
          <i class="fas fa-cog"></i>
          Voorkeuren
        </h3>

        <div class="preferences-grid">
          <div class="preference-item">
            <div class="preference-info">
              <h4>E-mail notificaties</h4>
              <p>Ontvang e-mails over nieuwe evenementen en aanbiedingen</p>
            </div>
            <ToggleSwitch
                v-model="formData.preferences.emailNotifications"
                @change="updatePreference('emailNotifications', $event)"
            />
          </div>

          <div class="preference-item">
            <div class="preference-info">
              <h4>SMS notificaties</h4>
              <p>Ontvang SMS herinneringen voor aankomende evenementen</p>
            </div>
            <ToggleSwitch
                v-model="formData.preferences.smsNotifications"
                @change="updatePreference('smsNotifications', $event)"
            />
          </div>

          <div class="preference-item">
            <div class="preference-info">
              <h4>Nieuwsbrief</h4>
              <p>Abonneer je op onze maandelijkse nieuwsbrief</p>
            </div>
            <ToggleSwitch
                v-model="formData.preferences.newsletter"
                @change="updatePreference('newsletter', $event)"
            />
          </div>

          <div class="preference-item">
            <div class="preference-info">
              <h4>Evenement aanbevelingen</h4>
              <p>Ontvang persoonlijke evenement aanbevelingen</p>
            </div>
            <ToggleSwitch
                v-model="formData.preferences.eventRecommendations"
                @change="updatePreference('eventRecommendations', $event)"
            />
          </div>
        </div>
      </div>

      <!-- Profielfoto -->
      <div class="form-section">
        <h3 class="section-title">
          <i class="fas fa-camera"></i>
          Profielfoto
        </h3>

        <div class="avatar-upload">
          <div class="avatar-preview">
            <img
                :src="avatarPreview"
                alt="Profielfoto"
                class="avatar-image"
            >
            <div v-if="!formData.avatar" class="avatar-placeholder">
              <i class="fas fa-user"></i>
            </div>
          </div>

          <div class="avatar-actions">
            <input
                type="file"
                ref="fileInput"
                @change="handleFileUpload"
                accept="image/*"
                class="file-input"
                id="avatarUpload"
            >
            <label for="avatarUpload" class="btn btn-outline">
              <i class="fas fa-upload"></i>
              Kies Foto
            </label>

            <button
                v-if="formData.avatar"
                type="button"
                @click="removeAvatar"
                class="btn btn-danger"
            >
              <i class="fas fa-trash"></i>
              Verwijderen
            </button>

            <div class="upload-hint">
              <p>JPG, PNG of GIF. Maximaal 2MB.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button
            type="button"
            @click="handleCancel"
            class="btn btn-outline"
            :disabled="loading"
        >
          <i class="fas fa-times"></i>
          Annuleren
        </button>

        <button
            type="submit"
            class="btn btn-primary"
            :disabled="loading || !hasChanges"
        >
          <i class="fas fa-save"></i>
          {{ loading ? 'Bezig...' : 'Opslaan' }}
        </button>
      </div>
    </form>

    <!-- Success Modal -->
    <Modal
        v-if="showSuccessModal"
        title="Succes"
        @close="showSuccessModal = false"
    >
      <div class="success-content">
        <i class="fas fa-check-circle"></i>
        <h3>Profiel bijgewerkt!</h3>
        <p>Je profielgegevens zijn succesvol bijgewerkt.</p>
        <button @click="showSuccessModal = false" class="btn btn-primary">
          OK
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/shared/Modal.vue'
import ToggleSwitch from '@/components/shared/ToggleSwitch.vue'

export default {
  name: 'EditProfileForm',
  components: {
    Modal,
    ToggleSwitch
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      showSuccessModal: false,
      originalData: {},
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        postalCode: '',
        city: '',
        country: 'nl',
        avatar: null,
        preferences: {
          emailNotifications: true,
          smsNotifications: false,
          newsletter: true,
          eventRecommendations: true
        }
      },
      errors: {},
      avatarFile: null
    }
  },
  computed: {
    hasChanges() {
      return JSON.stringify(this.formData) !== JSON.stringify(this.originalData)
    },
    avatarPreview() {
      if (this.avatarFile) {
        return URL.createObjectURL(this.avatarFile)
      }
      return this.formData.avatar || ''
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        if (newUser) {
          this.loadUserData(newUser)
        }
      }
    }
  },
  methods: {
    loadUserData(user) {
      this.formData = {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        street: user.street || '',
        postalCode: user.postalCode || '',
        city: user.city || '',
        country: user.country || 'nl',
        avatar: user.avatar || null,
        preferences: {
          emailNotifications: user.preferences?.emailNotifications ?? true,
          smsNotifications: user.preferences?.smsNotifications ?? false,
          newsletter: user.preferences?.newsletter ?? true,
          eventRecommendations: user.preferences?.eventRecommendations ?? true
        }
      }
      this.originalData = JSON.parse(JSON.stringify(this.formData))
    },

    async handleSubmit() {
      if (!this.validateForm()) return

      this.loading = true
      this.errors = {}

      try {
        const formData = new FormData()

        // Append form data
        Object.keys(this.formData).forEach(key => {
          if (key === 'preferences') {
            formData.append(key, JSON.stringify(this.formData[key]))
          } else if (key !== 'avatar') {
            formData.append(key, this.formData[key])
          }
        })

        // Append avatar file if changed
        if (this.avatarFile) {
          formData.append('avatar', this.avatarFile)
        }

        await this.$api.put('/user/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        this.originalData = JSON.parse(JSON.stringify(this.formData))
        this.showSuccessModal = true
        this.$emit('updated', this.formData)

      } catch (error) {
        console.error('Fout bij bijwerken profiel:', error)
        this.handleApiErrors(error)
      } finally {
        this.loading = false
      }
    },

    validateForm() {
      const errors = {}

      if (!this.formData.firstName?.trim()) {
        errors.firstName = 'Voornaam is verplicht'
      }

      if (!this.formData.lastName?.trim()) {
        errors.lastName = 'Achternaam is verplicht'
      }

      if (!this.formData.email?.trim()) {
        errors.email = 'E-mailadres is verplicht'
      } else if (!this.isValidEmail(this.formData.email)) {
        errors.email = 'Ongeldig e-mailadres'
      }

      if (this.formData.phone && !this.isValidPhone(this.formData.phone)) {
        errors.phone = 'Ongeldig telefoonnummer'
      }

      this.errors = errors
      return Object.keys(errors).length === 0
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },

    isValidPhone(phone) {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/
      return phoneRegex.test(phone.replace(/\s/g, ''))
    },

    handleApiErrors(error) {
      if (error.response?.data?.errors) {
        this.errors = error.response.data.errors
      } else {
        this.$toast.error('Kon profiel niet bijwerken. Probeer het opnieuw.')
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.$toast.error('Alleen afbeeldingen zijn toegestaan')
        return
      }

      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        this.$toast.error('Afbeelding mag niet groter zijn dan 2MB')
        return
      }

      this.avatarFile = file
      this.formData.avatar = URL.createObjectURL(file)
    },

    removeAvatar() {
      this.avatarFile = null
      this.formData.avatar = null
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },

    updatePreference(key, value) {
      this.formData.preferences[key] = value
    },

    handleCancel() {
      if (this.hasChanges) {
        if (confirm('Weet je zeker dat je wilt annuleren? Wijzigingen worden niet opgeslagen.')) {
          this.loadUserData(this.user)
          this.$emit('cancel')
        }
      } else {
        this.$emit('cancel')
      }
    }
  }
}
</script>

<style scoped>
.edit-profile-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-header h2 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 32px;
}

.form-header p {
  margin: 0;
  color: #7f8c8d;
  font-size: 16px;
}

.form-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 25px 0;
  color: #2c3e50;
  font-size: 20px;
  border-bottom: 2px solid #f8f9fa;
  padding-bottom: 15px;
}

.section-title i {
  color: #3498db;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

input, select {
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: white;
}

input:focus, select:focus {
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
}

.preferences-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.preference-item:hover {
  background: #e9ecef;
}

.preference-info h4 {
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 16px;
}

.preference-info p {
  margin: 0;
  color: #7f8c8d;
  font-size: 14px;
}

.avatar-upload {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.avatar-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 3px solid #e9ecef;
  background: #f8f9fa;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #bdc3c7;
  color: white;
  font-size: 40px;
}

.avatar-actions {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 200px;
}

.file-input {
  display: none;
}

.upload-hint p {
  margin: 0;
  color: #7f8c8d;
  font-size: 12px;
  font-style: italic;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding-top: 30px;
  border-top: 2px solid #f8f9fa;
  margin-top: 20px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
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

.btn-outline {
  background: transparent;
  border-color: #6c757d;
  color: #6c757d;
}

.btn-outline:hover:not(:disabled) {
  background: #6c757d;
  color: white;
}

.btn-danger {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.btn-danger:hover:not(:disabled) {
  background: #c0392b;
  border-color: #c0392b;
}

.success-content {
  text-align: center;
  padding: 20px;
}

.success-content i {
  font-size: 64px;
  color: #27ae60;
  margin-bottom: 20px;
}

.success-content h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.success-content p {
  margin: 0 0 20px 0;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .edit-profile-form {
    padding: 15px;
  }

  .form-section {
    padding: 20px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .avatar-upload {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .avatar-actions {
    align-items: center;
  }

  .form-actions {
    flex-direction: column;
  }

  .preference-item {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>