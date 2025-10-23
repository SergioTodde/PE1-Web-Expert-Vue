<template>
  <div class="contact-page">
    <div class="container">
      <div class="page-header">
        <h1>Contact Opnemen</h1>
        <p>We helpen je graag verder</p>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-method">
            <i class="fas fa-envelope"></i>
            <h3>E-mail</h3>
            <p>info@eventplan.nl</p>
            <span>Antwoord binnen 24 uur</span>
          </div>

          <div class="contact-method">
            <i class="fas fa-phone"></i>
            <h3>Telefoon</h3>
            <p>+31 20 123 4567</p>
            <span>Ma-Vr 9:00-17:00</span>
          </div>

          <div class="contact-method">
            <i class="fas fa-comments"></i>
            <h3>Live Chat</h3>
            <p>Direct contact</p>
            <span>24/7 beschikbaar</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact'
}
</script>

<style scoped>
.contact-page {
  padding: 2rem 0;
  min-height: 60vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.contact-method {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
}

.contact-method i {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.contact-method h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.contact-method p {
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.contact-method span {
  color: #7f8c8d;
  font-size: 0.9rem;
}
</style>