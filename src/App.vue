<template>
  <div id="app">
    <nav-bar />
    <router-view />
    <cookie-banner />
  </div>
</template>

<script>
import NavBar from "@/components/navbar.vue";
import CookieBanner from "@/components/cookie-banner.vue";

export default {
  name: "App",
  components: {
    NavBar,
    CookieBanner,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  background-color: #f5f0e8;
  color: #1a1a1a;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
