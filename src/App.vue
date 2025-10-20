<script>
import NavComponent from "./components/NavComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
export default {
  name: "App",
  data(){
    return {

    }
  },
  components: {
    NavComponent,
    FooterComponent
  }
}
</script>

<template>
  <nav-component/>
  <router-view/>
  <footer-component/>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
body{
  background: #ffffff;
  color: #000000;
}

</style>