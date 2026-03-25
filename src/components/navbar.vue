<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="logo">
        <img src="@/assets/logo-2.png" alt="LIVEGBG" class="logo-image" />
      </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }"
          >Event</router-link
        >
        <router-link to="/about" class="nav-link" :class="{ active: $route.path === '/about' }"
          >Om LiveGBG</router-link
        >
        <router-link
          v-if="isLoggedIn"
          to="/admin"
          class="nav-link"
          :class="{ active: $route.path === '/admin' }"
          >Admin</router-link
        >
      </div>
      <div class="nav-actions">
        <button
          class="theme-toggle"
          @click="toggleDarkMode"
          :aria-label="isDarkMode ? 'Byt till ljust läge' : 'Byt till mörkt läge'"
          :title="isDarkMode ? 'Ljust läge' : 'Mörkt läge'"
        >
          <!-- Moon icon (shown in light mode) -->
          <svg v-if="!isDarkMode" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <!-- Sun icon (shown in dark mode) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </button>
        <button v-if="isLoggedIn" class="logout-btn" @click="logout">Logga ut</button>
      </div>
    </div>

    <!-- Mobile hamburger -->
    <button
      class="hamburger"
      :class="{ open: navActive }"
      @click="navActive = !navActive"
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Mobile menu overlay -->
    <div class="mobile-menu" :class="{ show: navActive }">
      <router-link class="mobile-link" to="/" @click="navActive = false">Event</router-link>
      <router-link class="mobile-link" to="/about" @click="navActive = false">Om oss</router-link>
      <button
        class="mobile-theme-toggle"
        @click="toggleDarkMode"
        :aria-label="isDarkMode ? 'Byt till ljust läge' : 'Byt till mörkt läge'"
      >
        <svg v-if="!isDarkMode" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        {{ isDarkMode ? "Ljust läge" : "Mörkt läge" }}
      </button>
    </div>
  </nav>
</template>

<script>
import { isLoggedIn, checkLoginStatus } from "@/utils/auth";
import { isDarkMode, toggleDarkMode } from "@/utils/darkMode";

export default {
  name: "NavBar",
  data() {
    return {
      navActive: false,
    };
  },
  computed: {
    isLoggedIn() {
      return isLoggedIn.value;
    },
    isDarkMode() {
      return isDarkMode.value;
    },
  },
  methods: {
    toggleDarkMode,
    logout() {
      localStorage.removeItem("token");
      checkLoginStatus();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  padding: 0 2rem;
  height: 84px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.navbar-inner {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.logo-image {
  height: 72px;
  width: auto;
  object-fit: contain;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-link {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.15s ease;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  padding: 0.3rem;
  transition: color 0.15s ease;
  line-height: 1;
}

.theme-toggle:hover {
  color: var(--color-text);
}

.logout-btn {
  background: none;
  border: 1px solid var(--color-border-light);
  padding: 0.3rem 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: border-color 0.15s ease, color 0.15s ease;
}

.logout-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  z-index: 200;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile menu */
.mobile-menu {
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  flex-direction: column;
  padding: 1.5rem 2rem;
  gap: 1.25rem;
  z-index: 99;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.mobile-menu.show {
  display: flex;
}

.mobile-link {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text);
  text-decoration: none;
}

.mobile-link:hover {
  color: var(--color-accent);
}

.mobile-theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  padding: 0;
  transition: color 0.15s ease;
}

.mobile-theme-toggle:hover {
  color: var(--color-text);
}

@media (max-width: 700px) {
  .nav-links,
  .logout-btn {
    display: none;
  }

  .theme-toggle {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .navbar {
    height: 60px;
  }

  .logo-image {
    height: 54px;
  }
}
</style>

