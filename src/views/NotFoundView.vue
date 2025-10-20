<script>
export default {
  name: 'NotFound',
  data() {
    return {
      text: '404 Pagina niet gevonden!'
    }
  }
}
</script>

<template>
  <main class="notFound">
    <h1 class="notFoundTitle">{{ text }}</h1>
  </main>
</template>

<style lang="scss" scoped>
.notFound {
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  opacity: .9;
  display: flex;
  justify-content: center;
  align-items: center;
  .notFoundTitle {
    font-size: 3rem;
    text-align: center;
    color: #000000;
    opacity: unset;
  }
}
</style>
