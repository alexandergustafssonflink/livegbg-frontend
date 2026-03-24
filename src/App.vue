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
import { applyDarkMode, isDarkMode } from "@/utils/darkMode";

export default {
  name: "App",
  components: {
    NavBar,
    CookieBanner,
  },
  mounted() {
    applyDarkMode(isDarkMode.value);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600&display=swap");

:root {
  --color-bg: #f5f0e8;
  --color-border: #e0d9d0;
  --color-border-light: #ccc;
  --color-text: #1a1a1a;
  --color-text-secondary: #555;
  --color-text-muted: #888;
  --color-text-faint: #aaa;
  --color-accent: #cc1100;
  --color-image-placeholder: #d0c9c0;
  --color-skeleton-base: #e8e2d9;
  --color-skeleton-highlight: #f0ece4;
  --color-input-text: #1a1a1a;
  --color-meta-value: #333;
}

html.dark {
  --color-bg: #181818;
  --color-border: #2e2e2e;
  --color-border-light: #444;
  --color-text: #f0ece4;
  --color-text-secondary: #bbb;
  --color-text-muted: #888;
  --color-text-faint: #555;
  --color-accent: #ff3311;
  --color-image-placeholder: #2a2a2a;
  --color-skeleton-base: #2a2a2a;
  --color-skeleton-highlight: #363636;
  --color-input-text: #f0ece4;
  --color-meta-value: #ccc;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 0.2s ease, color 0.2s ease;
}

#app {
  min-height: 100vh;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
