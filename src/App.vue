<template>
  <div class="app-wrapper">
    <nav-bar />
    <div class="page-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap");

html,
body {
  background-color: #f4f0e8;
}

a {
  text-decoration: none;
  color: inherit;
}

#app {
  display: flex;
  justify-content: center;
  font-family: "EB Garamond", Georgia, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1a1208;
}

.page-wrapper {
  display: flex;
  justify-content: center;
}

h5 {
  font-weight: 700 !important;
  opacity: 0.9;
  color: #1a1208;
  font-family: "EB Garamond", Georgia, serif;
}

h3 {
  margin: 0;
  font-family: "Playfair Display", Georgia, serif;
  font-weight: 900;
  color: #1a1208;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.box {
  padding: 1.5em;
  background-color: #f4f0e8;
  box-shadow: 4px 4px 0 #1a1208;
  border: 2px solid #1a1208;
  transition: 0.3s ease;
}

.container {
  min-width: 900px;
  max-width: 1400px;
  margin-bottom: 3em;
}
</style>
