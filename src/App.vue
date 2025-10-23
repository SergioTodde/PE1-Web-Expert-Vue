<template>
  <div id="app">
    <AppHeader />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue'
import AppFooter from './components/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    AppHeader: Navbar,
    AppFooter
  },
  data() {
    return {
      isLoading: false
    }
  },
  mounted() {
    // Initialize app
    this.initializeApp()
  },
  methods: {
    initializeApp() {
      // Check if user is logged in
      const token = localStorage.getItem('auth_token')
      if (token) {
        this.$store.dispatch('auth/checkAuth')
      }
    }
  }
}
</script>

<style>
/* Global styles will be in main.css */
</style>