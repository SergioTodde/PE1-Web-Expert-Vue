<script>
export default {
  name: "FooterComponent"
}
</script>

<template>
<div class="footer">
  <h2>AllEvents</h2>
  <p>&copy; 2025 Sergio Todde & Alperen Özçelik</p>
  <div class="socials-container">
    <h3>Volg ons</h3>
    <ul class="socials">
      <li><i class="fa-brands fa-facebook"></i></li>
      <li><i class="fa-brands fa-instagram"></i></li>
      <li><i class="fa-brands fa-youtube"></i></li>
    </ul>
  </div>

</div>
</template>

<style lang="scss" scoped>
.footer{
  padding: 1.5rem 1rem 1.5rem 1rem;
  border-top: 2px solid #000000;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  & ul{
    display: flex;
    justify-content: center;
    gap:1.5rem;
    margin-top: .5rem;
    & li{
      list-style-type: none;
      & i{
        font-size: 1.2rem;
      }
      .fa-facebook{
        color: #0a53be;
      }
      .fa-instagram{
        color: #ff003b;
      }
      .fa-youtube{
        color: #FF0000FF;
      }
    }
  }
  .socials-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    & .socials{
    }
  }
  p{
    text-align: center;
  }
}
</style>