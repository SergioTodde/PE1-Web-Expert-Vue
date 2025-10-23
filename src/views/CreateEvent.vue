<template>
  <div class="create-event-view">
    <!-- Hero Section -->
    <section class="create-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Evenement Aanmaken</h1>
          <p class="hero-subtitle">Deel je evenement met duizenden potentiële bezoekers</p>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="create-event-content">
        <!-- Progress Steps -->
        <div class="progress-section">
          <div class="progress-steps">
            <div
                v-for="(step, index) in steps"
                :key="step.id"
                class="step"
                :class="{
                active: currentStep === index,
                completed: currentStep > index
              }"
            >
              <div class="step-indicator">
                <div class="step-number">
                  <i v-if="currentStep > index" class="fas fa-check"></i>
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <div class="step-content">
                  <div class="step-label">{{ step.label }}</div>
                  <div class="step-description">{{ step.description }}</div>
                </div>
              </div>
              <div v-if="index < steps.length - 1" class="step-connector"></div>
            </div>
          </div>
        </div>

        <!-- Step 1: Basic Information -->
        <form v-if="currentStep === 0" @submit.prevent="validateStep1" class="event-form">
          <div class="form-section">
            <div class="section-header">
              <h2 class="section-title">
                <i class="fas fa-info-circle"></i>
                Basis Informatie
              </h2>
              <p class="section-subtitle">Vertel ons meer over je evenement</p>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label for="title" class="form-label">
                  <i class="fas fa-heading"></i>
                  Titel *
                </label>
                <input
                    id="title"
                    v-model="eventForm.title"
                    type="text"
                    class="form-control"
                    :class="{ error: errors.title }"
                    placeholder="Geef je evenement een pakkende titel"
                >
                <div v-if="errors.title" class="form-error">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.title }}
                </div>
              </div>

              <div class="form-group">
                <label for="category" class="form-label">
                  <i class="fas fa-tag"></i>
                  Categorie *
                </label>
                <select
                    id="category"
                    v-model="eventForm.category"
                    class="form-control"
                    :class="{ error: errors.category }"
                >
                  <option value="">Selecteer een categorie</option>
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
                <div v-if="errors.category" class="form-error">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.category }}
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="description" class="form-label">
                <i class="fas fa-align-left"></i>
                Beschrijving *
              </label>
              <textarea
                  id="description"
                  v-model="eventForm.description"
                  rows="6"
                  class="form-control"
                  :class="{ error: errors.description }"
                  placeholder="Beschrijf je evenement in detail..."
              ></textarea>
              <div class="input-footer">
                <div class="char-count">{{ eventForm.description.length }}/2000</div>
                <div v-if="errors.description" class="form-error">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.description }}
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">
                <i class="fas fa-image"></i>
                Hoofdafbeelding *
              </label>
              <FileUpload
                  :file="eventForm.image"
                  @file-selected="handleImageSelect"
                  accept="image/*"
                  :max-size="5"
              />
              <div v-if="errors.image" class="form-error">
                <i class="fas fa-exclamation-circle"></i>
                {{ errors.image }}
              </div>
              <p class="help-text">Upload een aantrekkelijke afbeelding voor je evenement (max. 5MB)</p>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" @click="cancel" class="btn-secondary">
              <i class="fas fa-times"></i>
              Annuleren
            </button>
            <button type="submit" class="btn-primary">
              Volgende Stap
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </form>

        <!-- Step 2: Date & Location -->
        <form v-if="currentStep === 1" @submit.prevent="validateStep2" class="event-form">
          <div class="form-section">
            <div class="section-header">
              <h2 class="section-title">
                <i class="fas fa-calendar-alt"></i>
                Datum & Locatie
              </h2>
              <p class="section-subtitle">Wanneer en waar vindt je evenement plaats?</p>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label for="start_date" class="form-label">
                  <i class="fas fa-play"></i>
                  Startdatum *
                </label>
                <input
                    id="start_date"
                    v-model="eventForm.start_date"
                    type="datetime-local"
                    class="form-control"
                    :class="{ error: errors.start_date }"
                >
                <div v-if="errors.start_date" class="form-error">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.start_date }}
                </div>
              </div>

              <div class="form-group">
                <label for="end_date" class="form-label">
                  <i class="fas fa-stop"></i>
                  Einddatum *
                </label>
                <input
                    id="end_date"
                    v-model="eventForm.end_date"
                    type="datetime-local"
                    class="form-control"
                    :class="{ error: errors.end_date }"
                >
                <div v-if="errors.end_date" class="form-error">
                  <i class="fas fa-exclamation-circle"></i>
                  {{ errors.end_date }}
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="location" class="form-label">
                <i class="fas fa-map-marker-alt"></i>
                Locatie *
              </label>
              <input
                  id="location"
                  v-model="eventForm.location"
                  type="text"
                  class="form-control"
                  :class="{ error: errors.location }"
                  placeholder="Bijv. Stadhuisplein, Amsterdam"
              >
              <div v-if="errors.location" class="form-error">
                <i class="fas fa-exclamation-circle"></i>
                {{ errors.location }}
              </div>
            </div>

            <div class="form-group">
              <label for="full_address" class="form-label">
                <i class="fas fa-home"></i>
                Volledig Adres
              </label>
              <textarea
                  id="full_address"
                  v-model="eventForm.full_address"
                  rows="3"
                  class="form-control"
                  placeholder="Straatnaam, huisnummer, postcode, stad"
              ></textarea>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label for="venue_info" class="form-label">
                  <i class="fas fa-building"></i>
                  Locatie Details
                </label>
                <input
                    id="venue_info"
                    v-model="eventForm.venue_info"
                    type="text"
                    class="form-control"
                    placeholder="Bijv. Zaal 1, Hoofdingang"
                >
              </div>

              <div class="form-group">
                <label for="capacity" class="form-label">
                  <i class="fas fa-users"></i>
                  Maximale Capaciteit
                </label>
                <input
                    id="capacity"
                    v-model="eventForm.capacity"
                    type="number"
                    class="form-control"
                    min="1"
                    placeholder="Aantal deelnemers"
                >
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" @click="previousStep" class="btn-secondary">
              <i class="fas fa-arrow-left"></i>
              Vorige
            </button>
            <button type="submit" class="btn-primary">
              Volgende Stap
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </form>

        <!-- Step 3: Tickets -->
        <form v-if="currentStep === 2" @submit.prevent="validateStep3" class="event-form">
          <div class="form-section">
            <div class="section-header">
              <h2 class="section-title">
                <i class="fas fa-ticket-alt"></i>
                Tickets
              </h2>
              <p class="section-subtitle">Configureer de ticketopties voor je evenement</p>
            </div>

            <div class="form-group">
              <label for="ticket_sale_start" class="form-label">
                <i class="fas fa-shopping-cart"></i>
                Ticketverkoop Start *
              </label>
              <input
                  id="ticket_sale_start"
                  v-model="eventForm.ticket_sale_start"
                  type="datetime-local"
                  class="form-control"
                  :class="{ error: errors.ticket_sale_start }"
              >
              <div v-if="errors.ticket_sale_start" class="form-error">
                <i class="fas fa-exclamation-circle"></i>
                {{ errors.ticket_sale_start }}
              </div>
              <p class="help-text">Wanneer mogen bezoekers tickets kopen?</p>
            </div>

            <div class="ticket-types">
              <div class="ticket-types-header">
                <h3>Ticket Types</h3>
                <button type="button" @click="addTicket" class="btn-add-ticket">
                  <i class="fas fa-plus"></i>
                  Ticket Type Toevoegen
                </button>
              </div>

              <div
                  v-for="(ticket, index) in eventForm.tickets"
                  :key="index"
                  class="ticket-form"
              >
                <div class="ticket-header">
                  <h4>Ticket Type {{ index + 1 }}</h4>
                  <button
                      v-if="eventForm.tickets.length > 1"
                      type="button"
                      @click="removeTicket(index)"
                      class="btn-remove-ticket"
                  >
                    <i class="fas fa-trash"></i>
                    Verwijderen
                  </button>
                </div>

                <div class="form-grid">
                  <div class="form-group">
                    <label :for="`ticket-name-${index}`" class="form-label">Naam *</label>
                    <input
                        :id="`ticket-name-${index}`"
                        v-model="ticket.name"
                        type="text"
                        class="form-control"
                        :class="{ error: ticketErrors[index]?.name }"
                        placeholder="Bijv. Early Bird, VIP, Regular"
                    >
                    <div v-if="ticketErrors[index]?.name" class="form-error">
                      <i class="fas fa-exclamation-circle"></i>
                      {{ ticketErrors[index].name }}
                    </div>
                  </div>

                  <div class="form-group">
                    <label :for="`ticket-price-${index}`" class="form-label">Prijs (€) *</label>
                    <input
                        :id="`ticket-price-${index}`"
                        v-model="ticket.price"
                        type="number"
                        step="0.01"
                        min="0"
                        class="form-control"
                        :class="{ error: ticketErrors[index]?.price }"
                        placeholder="0.00"
                    >
                    <div v-if="ticketErrors[index]?.price" class="form-error">
                      <i class="fas fa-exclamation-circle"></i>
                      {{ ticketErrors[index].price }}
                    </div>
                  </div>
                </div>

                <div class="form-grid">
                  <div class="form-group">
                    <label :for="`ticket-quantity-${index}`" class="form-label">Aantal *</label>
                    <input
                        :id="`ticket-quantity-${index}`"
                        v-model="ticket.quantity"
                        type="number"
                        min="1"
                        class="form-control"
                        :class="{ error: ticketErrors[index]?.quantity }"
                        placeholder="100"
                    >
                    <div v-if="ticketErrors[index]?.quantity" class="form-error">
                      <i class="fas fa-exclamation-circle"></i>
                      {{ ticketErrors[index].quantity }}
                    </div>
                  </div>

                  <div class="form-group">
                    <label :for="`ticket-max-${index}`" class="form-label">Max per bestelling</label>
                    <input
                        :id="`ticket-max-${index}`"
                        v-model="ticket.max_per_order"
                        type="number"
                        min="1"
                        class="form-control"
                        placeholder="10"
                    >
                  </div>
                </div>

                <div class="form-group">
                  <label :for="`ticket-description-${index}`" class="form-label">Beschrijving</label>
                  <textarea
                      :id="`ticket-description-${index}`"
                      v-model="ticket.description"
                      rows="3"
                      class="form-control"
                      placeholder="Beschrijf wat dit tickettype inhoudt..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" @click="previousStep" class="btn-secondary">
              <i class="fas fa-arrow-left"></i>
              Vorige
            </button>
            <button type="submit" class="btn-primary">
              Volgende Stap
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </form>

        <!-- Step 4: Co-Hosts & Settings -->
        <form v-if="currentStep === 3" @submit.prevent="validateStep4" class="event-form">
          <div class="form-section">
            <div class="section-header">
              <h2 class="section-title">
                <i class="fas fa-cogs"></i>
                Samenwerking & Instellingen
              </h2>
              <p class="section-subtitle">Stel je evenement verder in</p>
            </div>

            <div class="form-group">
              <label class="form-label">
                <i class="fas fa-user-friends"></i>
                Co-Hosts Uitnodigen
              </label>
              <div class="co-hosts-section">
                <div class="co-hosts-list">
                  <div
                      v-for="coHost in eventForm.co_hosts"
                      :key="coHost.id"
                      class="co-host-item"
                  >
                    <div class="co-host-info">
                      <div class="co-host-avatar">
                        <i class="fas fa-user"></i>
                      </div>
                      <span>{{ coHost.name }}</span>
                    </div>
                    <button
                        type="button"
                        @click="removeCoHost(coHost.id)"
                        class="co-host-remove"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>

                <div class="add-co-host">
                  <div class="input-with-icon">
                    <i class="fas fa-search"></i>
                    <input
                        v-model="coHostSearch"
                        type="text"
                        class="form-control"
                        placeholder="Zoek gebruikers om uit te nodigen..."
                        @input="searchCoHosts"
                    >
                  </div>

                  <div v-if="coHostSearchResults.length > 0" class="search-results">
                    <div
                        v-for="user in coHostSearchResults"
                        :key="user.id"
                        class="search-result-item"
                        @click="addCoHost(user)"
                    >
                      <div class="user-avatar">
                        <i class="fas fa-user"></i>
                      </div>
                      <div class="user-info">
                        <strong>{{ user.name }}</strong>
                        <span>{{ user.email }}</span>
                      </div>
                      <i class="fas fa-plus add-icon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">
                <i class="fas fa-sliders-h"></i>
                Evenement Instellingen
              </label>
              <div class="settings-options">
                <label class="checkbox-card">
                  <input type="checkbox" v-model="eventForm.is_public">
                  <div class="checkbox-content">
                    <div class="checkbox-header">
                      <i class="fas fa-globe"></i>
                      <h4>Evenement openbaar maken</h4>
                    </div>
                    <p>Maak je evenement zichtbaar voor alle gebruikers</p>
                  </div>
                  <span class="checkmark"></span>
                </label>

                <label class="checkbox-card">
                  <input type="checkbox" v-model="eventForm.allow_registrations">
                  <div class="checkbox-content">
                    <div class="checkbox-header">
                      <i class="fas fa-user-plus"></i>
                      <h4>Registraties toestaan</h4>
                    </div>
                    <p>Sta gebruikers toe zich te registreren voor het evenement</p>
                  </div>
                  <span class="checkmark"></span>
                </label>

                <label class="checkbox-card">
                  <input type="checkbox" v-model="eventForm.requires_approval">
                  <div class="checkbox-content">
                    <div class="checkbox-header">
                      <i class="fas fa-shield-alt"></i>
                      <h4>Goedkeuring vereist</h4>
                    </div>
                    <p>Elke registratie moet handmatig worden goedgekeurd</p>
                  </div>
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label for="tags" class="form-label">
                <i class="fas fa-tags"></i>
                Tags
              </label>
              <div class="input-with-icon">
                <i class="fas fa-tag"></i>
                <input
                    id="tags"
                    v-model="tagInput"
                    type="text"
                    class="form-control"
                    placeholder="Voeg tags toe (gescheiden door komma's)"
                    @keydown.enter.prevent="addTag"
                >
              </div>
              <div class="tags-list">
                <span
                    v-for="(tag, index) in eventForm.tags"
                    :key="index"
                    class="tag"
                >
                  {{ tag }}
                  <button type="button" @click="removeTag(index)" class="tag-remove">
                    <i class="fas fa-times"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" @click="previousStep" class="btn-secondary">
              <i class="fas fa-arrow-left"></i>
              Vorige
            </button>
            <button type="submit" :disabled="loading" class="btn-primary">
              <LoadingSpinner v-if="loading" small />
              <span v-else>
                <i class="fas fa-check"></i>
                Evenement Aanmaken
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FileUpload from '@/components/shared/FileUpload.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

export default {
  name: 'CreateEventView',
  components: {
    FileUpload,
    LoadingSpinner
  },
  data() {
    return {
      currentStep: 0,
      loading: false,
      coHostSearch: '',
      coHostSearchResults: [],
      tagInput: '',
      steps: [
        {
          id: 'basic',
          label: 'Basis Info',
          description: 'Evenement details'
        },
        {
          id: 'details',
          label: 'Datum & Locatie',
          description: 'Tijd en plaats'
        },
        {
          id: 'tickets',
          label: 'Tickets',
          description: 'Ticket configuratie'
        },
        {
          id: 'settings',
          label: 'Instellingen',
          description: 'Extra opties'
        }
      ],
      eventForm: {
        title: '',
        description: '',
        category: '',
        image: null,
        start_date: '',
        end_date: '',
        location: '',
        full_address: '',
        venue_info: '',
        capacity: null,
        ticket_sale_start: '',
        tickets: [
          {
            name: 'Standaard Ticket',
            price: 0,
            quantity: 100,
            description: '',
            max_per_order: 10
          }
        ],
        co_hosts: [],
        tags: [],
        is_public: true,
        allow_registrations: true,
        requires_approval: false
      },
      errors: {},
      ticketErrors: [],
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
    minEndDate() {
      return this.eventForm.start_date
    },
    minSaleStart() {
      return new Date().toISOString().slice(0, 16)
    }
  },
  methods: {
    ...mapActions('events', ['createEvent']),

    validateStep1() {
      this.errors = {}

      if (!this.eventForm.title.trim()) {
        this.errors.title = 'Titel is verplicht'
      }

      if (!this.eventForm.category) {
        this.errors.category = 'Categorie is verplicht'
      }

      if (!this.eventForm.description.trim()) {
        this.errors.description = 'Beschrijving is verplicht'
      } else if (this.eventForm.description.length > 2000) {
        this.errors.description = 'Beschrijving mag maximaal 2000 karakters bevatten'
      }

      if (!this.eventForm.image) {
        this.errors.image = 'Afbeelding is verplicht'
      }

      if (Object.keys(this.errors).length === 0) {
        this.nextStep()
      }
    },

    validateStep2() {
      this.errors = {}

      if (!this.eventForm.start_date) {
        this.errors.start_date = 'Startdatum is verplicht'
      } else if (new Date(this.eventForm.start_date) <= new Date()) {
        this.errors.start_date = 'Startdatum moet in de toekomst liggen'
      }

      if (!this.eventForm.end_date) {
        this.errors.end_date = 'Einddatum is verplicht'
      } else if (new Date(this.eventForm.end_date) <= new Date(this.eventForm.start_date)) {
        this.errors.end_date = 'Einddatum moet na startdatum liggen'
      }

      if (!this.eventForm.location.trim()) {
        this.errors.location = 'Locatie is verplicht'
      }

      if (Object.keys(this.errors).length === 0) {
        this.nextStep()
      }
    },

    validateStep3() {
      this.ticketErrors = []
      let hasErrors = false

      this.eventForm.tickets.forEach((ticket, index) => {
        const errors = {}

        if (!ticket.name.trim()) {
          errors.name = 'Ticketnaam is verplicht'
          hasErrors = true
        }

        if (!ticket.price && ticket.price !== 0) {
          errors.price = 'Prijs is verplicht'
          hasErrors = true
        } else if (ticket.price < 0) {
          errors.price = 'Prijs mag niet negatief zijn'
          hasErrors = true
        }

        if (!ticket.quantity) {
          errors.quantity = 'Aantal is verplicht'
          hasErrors = true
        } else if (ticket.quantity < 1) {
          errors.quantity = 'Aantal moet minimaal 1 zijn'
          hasErrors = true
        }

        if (Object.keys(errors).length > 0) {
          this.ticketErrors[index] = errors
        }
      })

      if (!this.eventForm.ticket_sale_start) {
        this.errors.ticket_sale_start = 'Startdatum ticketverkoop is verplicht'
        hasErrors = true
      }

      if (!hasErrors && Object.keys(this.errors).length === 0) {
        this.nextStep()
      }
    },

    validateStep4() {
      this.submitEvent()
    },

    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++
      }
    },

    previousStep() {
      if (this.currentStep > 0) {
        this.currentStep--
      }
    },

    async submitEvent() {
      this.loading = true

      try {
        const formData = new FormData()

        // Append basic fields
        Object.keys(this.eventForm).forEach(key => {
          if (key === 'image') {
            if (this.eventForm.image) {
              formData.append('image', this.eventForm.image)
            }
          } else if (key === 'tickets') {
            formData.append('tickets', JSON.stringify(this.eventForm.tickets))
          } else if (key === 'co_hosts') {
            formData.append('co_hosts', JSON.stringify(this.eventForm.co_hosts.map(h => h.id)))
          } else if (key === 'tags') {
            formData.append('tags', JSON.stringify(this.eventForm.tags))
          } else {
            formData.append(key, this.eventForm[key])
          }
        })

        await this.createEvent(formData)
        this.$toast.success('Evenement succesvol aangemaakt!')
        this.$router.push('/events')
      } catch (error) {
        this.$toast.error('Fout bij aanmaken evenement')
        console.error('Error creating event:', error)
      } finally {
        this.loading = false
      }
    },

    handleImageSelect(file) {
      this.eventForm.image = file
    },

    addTicket() {
      this.eventForm.tickets.push({
        name: '',
        price: 0,
        quantity: 100,
        description: '',
        max_per_order: 10
      })
    },

    removeTicket(index) {
      this.eventForm.tickets.splice(index, 1)
    },

    searchCoHosts() {
      // Simulate API search
      if (this.coHostSearch.trim()) {
        this.coHostSearchResults = [
          {
            id: 1,
            name: 'Jan Jansen',
            email: 'jan@example.com',
            avatar: '/images/avatar-placeholder.png'
          },
          {
            id: 2,
            name: 'Marie Pieters',
            email: 'marie@example.com',
            avatar: '/images/avatar-placeholder.png'
          }
        ]
      } else {
        this.coHostSearchResults = []
      }
    },

    addCoHost(user) {
      if (!this.eventForm.co_hosts.find(h => h.id === user.id)) {
        this.eventForm.co_hosts.push(user)
        this.coHostSearch = ''
        this.coHostSearchResults = []
      }
    },

    removeCoHost(userId) {
      this.eventForm.co_hosts = this.eventForm.co_hosts.filter(h => h.id !== userId)
    },

    addTag() {
      if (this.tagInput.trim()) {
        const tags = this.tagInput.split(',').map(tag => tag.trim()).filter(tag => tag)
        tags.forEach(tag => {
          if (!this.eventForm.tags.includes(tag)) {
            this.eventForm.tags.push(tag)
          }
        })
        this.tagInput = ''
      }
    },

    removeTag(index) {
      this.eventForm.tags.splice(index, 1)
    },

    cancel() {
      if (confirm('Weet je zeker dat je wilt annuleren? Alle ingevoerde gegevens gaan verloren.')) {
        this.$router.push('/events')
      }
    }
  }
}
</script>

<style scoped>
.create-event-view {
  min-height: 100vh;
  background: #f8fafc;
}

/* Hero Section */
.create-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
  margin: 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Progress Section */
.progress-section {
  margin: 2rem 0;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}

.step-indicator {
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 2;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.step-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.step.active .step-number {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.step.completed .step-number {
  background: #10b981;
  color: white;
}

.step-content {
  text-align: left;
}

.step-label {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.step-description {
  font-size: 0.9rem;
  color: #6b7280;
}

.step-connector {
  flex: 1;
  height: 3px;
  background: #e2e8f0;
  margin: 0 1rem;
  align-self: center;
}

.step.active .step-connector,
.step.completed .step-connector {
  background: #667eea;
}

/* Event Form */
.event-form {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.section-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f1f5f9;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.8rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.section-title i {
  color: #667eea;
}

.section-subtitle {
  color: #6b7280;
  font-size: 1.1rem;
  margin: 0;
}

/* Form Elements */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.form-label i {
  color: #667eea;
  width: 16px;
}

.form-control {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #374151;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-control.error {
  border-color: #ef4444;
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.char-count {
  font-size: 0.8rem;
  color: #6b7280;
}

.form-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.help-text {
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.5rem;
}

/* Input with Icon */
.input-with-icon {
  position: relative;
}

.input-with-icon i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.input-with-icon .form-control {
  padding-left: 2.5rem;
}

/* Ticket Types */
.ticket-types {
  margin-top: 2rem;
}

.ticket-types-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.ticket-types-header h3 {
  color: #1f2937;
  margin: 0;
}

.btn-add-ticket {
  background: #f0f4ff;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-add-ticket:hover {
  background: #667eea;
  color: white;
}

.ticket-form {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.ticket-header h4 {
  margin: 0;
  color: #374151;
}

.btn-remove-ticket {
  background: #fef2f2;
  color: #ef4444;
  border: 1px solid #fecaca;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-remove-ticket:hover {
  background: #ef4444;
  color: white;
}

/* Co-Hosts Section */
.co-hosts-section {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
}

.co-hosts-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.co-host-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f0f4ff;
  padding: 0.75rem 1rem;
  border-radius: 25px;
  border: 1px solid #667eea;
}

.co-host-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.co-host-remove {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.co-host-remove:hover {
  background: #ef4444;
  color: white;
}

.search-results {
  margin-top: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f1f5f9;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background: #f8fafc;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.user-info strong {
  font-size: 0.9rem;
  color: #1f2937;
}

.user-info span {
  font-size: 0.8rem;
  color: #6b7280;
}

.add-icon {
  color: #667eea;
}

/* Settings Options */
.settings-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checkbox-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.checkbox-card:hover {
  border-color: #cbd5e1;
}

.checkbox-card input {
  display: none;
}

.checkbox-card input:checked + .checkbox-content {
  border-color: #667eea;
  background: #f0f4ff;
}

.checkbox-content {
  flex: 1;
}

.checkbox-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.checkbox-header i {
  color: #667eea;
  font-size: 1.1rem;
}

.checkbox-header h4 {
  margin: 0;
  color: #1f2937;
  font-size: 1rem;
}

.checkbox-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.4;
}

.checkmark {
  width: 24px;
  height: 24px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.checkbox-card input:checked ~ .checkmark {
  background: #667eea;
  border-color: #667eea;
}

.checkbox-card input:checked ~ .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
}

/* Tags */
.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.tag-remove {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  transition: all 0.3s ease;
}

.tag-remove:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #f1f5f9;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: #f8fafc;
  color: #64748b;
  border: 2px solid #e2e8f0;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-secondary:hover {
  background: #e2e8f0;
  color: #374151;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .progress-steps {
    flex-direction: column;
    gap: 1rem;
  }

  .step-connector {
    display: none;
  }

  .step-indicator {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .event-form {
    padding: 2rem 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }

  .ticket-types-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .step-indicator {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }

  .step-content {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .event-form {
    padding: 1.5rem 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .ticket-form {
    padding: 1.5rem;
  }

  .checkbox-card {
    padding: 1rem;
  }

  .checkbox-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>