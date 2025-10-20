<script>
export default {
  name: "NavComponent"
}
</script>

<template>
<div class="nav-container">
  <router-link class="nav-link" to="/"><h2>AllEvents</h2></router-link>
  <ul>
    <li><router-link class="nav-link" to="/">Home</router-link></li>
    <li><router-link class="nav-link" to="/over">Over</router-link></li>
    <li><router-link class="nav-link" to="/aanmelden">Aanmelden</router-link></li>
    <li><router-link class="nav-link" to="/login">Login</router-link></li>
  </ul>
</div>
</template>

<style lang="scss" scoped>
.nav-container{
  padding: 1.5rem 1rem 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #000000;
  & .nav-link{
    text-decoration: none;
    color: #000000;
  }
  & ul{
    display: flex;
    justify-content: center;
    gap:2rem;
    & li{
      list-style-type: none;
      .nav-link{
        text-decoration: none;
        color: #000000;
      }
    }
  }
}
</style>