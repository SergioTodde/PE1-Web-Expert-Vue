<template>
  <form @submit.prevent="handleSubmit" class="event-form">
    <div class="form-section">
      <h3>{{ isEdit ? 'Evenement Bewerken' : 'Nieuw Evenement' }}</h3>

      <div class="form-group">
        <label for="title" class="form-label">Titel *</label>
        <input
            id="title"
            v-model="form.title"
            type="text"
            class="form-control"
            :class="{ error: errors.title }"
            placeholder="Geef je evenement een pakkende titel"
            required
        >
        <div v-if="errors.title" class="form-error">{{ errors.title }}</div>
      </div>

      <div class="form-group">
        <label for="description" class="form-label">Beschrijving *</label>
        <textarea
            id="description"
            v-model="form.description"
            rows="5"
            class="form-control"
            :class="{ error: errors.description }"
            placeholder="Beschrijf je evenement in detail..."
            required
        ></textarea>
        <div class="char-count">{{ form.description.length }}/2000</div>
        <div v-if="errors.description" class="form-error">{{ errors.description }}</div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label for="category" class="form-label">Categorie *</label>
          <select
              id="category"
              v-model="form.category"
              class="form-control"
              :class="{ error: errors.category }"
              required
          >
            <option value="">Selecteer een categorie</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
          <div v-if="errors.category" class="form-error">{{ errors.category }}</div>
        </div>

        <div class="form-group">
          <label for="capacity" class="form-label">Maximale Capaciteit</label>
          <input
              id="capacity"
              v-model="form.capacity"
              type="number"
              class="form-control"
              min="1"
              placeholder="Aantal deelnemers"
          >
        </div>
      </div>
    </div>

    <div class="form-section">
      <h4>Datum & Tijd</h4>

      <div class="form-grid">
        <div class="form-group">
          <label for="start_date" class="form-label">Startdatum *</label>
          <input
              id="start_date"
              v-model="form.start_date"
              type="datetime-local"
              class="form-control"
              :class="{ error: errors.start_date }"
              required
          >
          <div v-if="errors.start_date" class="form-error">{{ errors.start_date }}</div>
        </div>

        <div class="form-group">
          <label for="end_date" class="form-label">Einddatum *</label>
          <input
              id="end_date"
              v-model="form.end_date"
              type="datetime-local"
              class="form-control"
              :class="{ error: errors.end_date }"
              required
          >
          <div v-if="errors.end_date" class="form-error">{{ errors.end_date }}</div>
        </div>
      </div>
    </div>

    <div class="form-section">
      <h4>Locatie</h4>

      <div class="form-group">
        <label for="location" class="form-label">Locatie *</label>
        <input
            id="location"
            v-model="form.location"
            type="text"
            class="form-control"
            :class="{ error: errors.location }"
            placeholder="Bijv. Stadhuisplein, Amsterdam"
            required
        >
        <div v-if="errors.location" class="form-error">{{ errors.location }}</div>
      </div>

      <div class="form-group">
        <label for="full_address" class="form-label">Volledig Adres</label>
        <textarea
            id="full_address"
            v-model="form.full_address"
            rows="3"
            class="form-control"
            placeholder="Straatnaam, huisnummer, postcode, stad"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="venue_info" class="form-label">Locatie Details</label>
        <input
            id="venue_info"
            v-model="form.venue_info"
            type="text"
            class="form-control"
            placeholder="Bijv. Zaal 1, Hoofdingang"
        >
      </div>
    </div>

    <div class="form-section">
      <h4>Afbeelding</h4>

      <div class="form-group">
        <label class="form-label">Evenement Afbeelding</label>
        <div class="image-upload">
          <div v-if="!form.image && !form.image_url" class="upload-placeholder" @click="triggerFileInput">
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Klik om een afbeelding te uploaden</p>
            <span>PNG, JPG tot 5MB</span>
          </div>

          <div v-else class="image-preview">
            <img :src="form.image_url || imagePreview" alt="Event preview" class="preview-image">
            <button type="button" @click="removeImage" class="remove-image-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="file-input"
          >
        </div>
        <div v-if="errors.image" class="form-error">{{ errors.image }}</div>
      </div>
    </div>

    <div class="form-section">
      <h4>Instellingen</h4>

      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" v-model="form.is_public">
          <span class="checkmark"></span>
          Evenement openbaar maken
        </label>
      </div>

      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" v-model="form.allow_registrations">
          <span class="checkmark"></span>
          Registraties toestaan
        </label>
      </div>

      <div class="form-group" v-if="form.allow_registrations">
        <label class="checkbox-label">
          <input type="checkbox" v-model="form.requires_approval">
          <span class="checkmark"></span>
          Goedkeuring vereist voor registraties
        </label>
      </div>
    </div>

    <div class="form-actions">
      <button type="button" @click="handleCancel" class="btn btn-outline">
        Annuleren
      </button>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        <LoadingSpinner v-if="loading" small inline />
        <span v-else>{{ isEdit ? 'Bijwerken' : 'Evenement Aanmaken' }}</span>
      </button>
    </div>
  </form>
</template>

<script>
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

export default {
  name: 'EventForm',
  components: {
    LoadingSpinner
  },
  props: {
    event: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      imagePreview: null,
      form: {
        title: '',
        description: '',
        category: '',
        start_date: '',
        end_date: '',
        location: '',
        full_address: '',
        venue_info: '',
        capacity: null,
        image: null,
        image_url: null,
        is_public: true,
        allow_registrations: true,
        requires_approval: false
      },
      errors: {},
      categories: [
        'Muziek',
        'Sport',
        'Kunst',
        'Technologie',
        'Educatie',
        'Food & Drink',
        'Wellness',
        'Business',
        'Anders'
      ]
    }
  },
  computed: {
    isEdit() {
      return !!this.event
    }
  },
  watch: {
    event: {
      immediate: true,
      handler(newEvent) {
        if (newEvent) {
          this.populateForm(newEvent)
        }
      }
    }
  },
  methods: {
    populateForm(event) {
      this.form = {
        title: event.title || '',
        description: event.description || '',
        category: event.category || '',
        start_date: this.formatDateTimeForInput(event.start_date),
        end_date: this.formatDateTimeForInput(event.end_date),
        location: event.location || '',
        full_address: event.full_address || '',
        venue_info: event.venue_info || '',
        capacity: event.capacity || null,
        image: null,
        image_url: event.image_url || null,
        is_public: event.is_public !== false,
        allow_registrations: event.allow_registrations !== false,
        requires_approval: event.requires_approval || false
      }
    },

    formatDateTimeForInput(dateTimeString) {
      if (!dateTimeString) return ''
      const date = new Date(dateTimeString)
      return date.toISOString().slice(0, 16)
    },

    async handleSubmit() {
      this.errors = {}

      if (!this.validateForm()) {
        return
      }

      this.loading = true

      try {
        const formData = new FormData()

        // Append form data
        Object.keys(this.form).forEach(key => {
          if (key === 'image' && this.form.image) {
            formData.append('image', this.form.image)
          } else if (this.form[key] !== null && this.form[key] !== undefined) {
            formData.append(key, this.form[key])
          }
        })

        if (this.isEdit) {
          await this.$store.dispatch('events/updateEvent', {
            eventId: this.event.id,
            eventData: formData
          })
          this.$emit('success', 'Evenement succesvol bijgewerkt!')
        } else {
          await this.$store.dispatch('events/createEvent', formData)
          this.$emit('success', 'Evenement succesvol aangemaakt!')
        }
      } catch (error) {
        this.handleError(error)
      } finally {
        this.loading = false
      }
    },

    validateForm() {
      let isValid = true

      if (!this.form.title.trim()) {
        this.errors.title = 'Titel is verplicht'
        isValid = false
      }

      if (!this.form.description.trim()) {
        this.errors.description = 'Beschrijving is verplicht'
        isValid = false
      } else if (this.form.description.length > 2000) {
        this.errors.description = 'Beschrijving mag maximaal 2000 karakters bevatten'
        isValid = false
      }

      if (!this.form.category) {
        this.errors.category = 'Categorie is verplicht'
        isValid = false
      }

      if (!this.form.start_date) {
        this.errors.start_date = 'Startdatum is verplicht'
        isValid = false
      } else if (new Date(this.form.start_date) <= new Date()) {
        this.errors.start_date = 'Startdatum moet in de toekomst liggen'
        isValid = false
      }

      if (!this.form.end_date) {
        this.errors.end_date = 'Einddatum is verplicht'
        isValid = false
      } else if (new Date(this.form.end_date) <= new Date(this.form.start_date)) {
        this.errors.end_date = 'Einddatum moet na startdatum liggen'
        isValid = false
      }

      if (!this.form.location.trim()) {
        this.errors.location = 'Locatie is verplicht'
        isValid = false
      }

      return isValid
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

    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          this.errors.image = 'Alleen afbeeldingen zijn toegestaan'
          return
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          this.errors.image = 'Afbeelding mag maximaal 5MB groot zijn'
          return
        }

        this.form.image = file
        this.form.image_url = null

        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imagePreview = e.target.result
        }
        reader.readAsDataURL(file)

        this.errors.image = null
      }
    },

    removeImage() {
      this.form.image = null
      this.form.image_url = null
      this.imagePreview = null
      this.$refs.fileInput.value = ''
    },

    handleCancel() {
      if (confirm('Weet je zeker dat je wilt annuleren? Niet-opgeslagen wijzigingen gaan verloren.')) {
        this.$emit('cancel')
      }
    }
  }
}
</script>

<style scoped>
.event-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-section h3,
.form-section h4 {
  margin: 0 0 1.5rem 0;
  color: #333;
  border-bottom: 2px solid #f8f9fa;
  padding-bottom: 0.5rem;
}

.form-section h3 {
  font-size: 1.5rem;
}

.form-section h4 {
  font-size: 1.2rem;
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

.char-count {
  text-align: right;
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.image-upload {
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.image-upload:hover {
  border-color: #007bff;
}

.upload-placeholder {
  color: #6c757d;
}

.upload-placeholder i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #007bff;
}

.upload-placeholder p {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.upload-placeholder span {
  font-size: 0.9rem;
}

.image-preview {
  position: relative;
  display: inline-block;
}

.preview-image {
  max-width: 300px;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #dc3545;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-input {
  display: none;
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

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

@media (max-width: 768px) {
  .form-section {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .preview-image {
    max-width: 100%;
  }
}
</style>