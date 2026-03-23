<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="logo">LIVEGBG</router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }"
          >Event</router-link
        >
        <router-link to="/about" class="nav-link" :class="{ active: $route.path === '/about' }"
          >Om oss</router-link
        >
        <router-link
          v-if="isLoggedIn"
          to="/admin"
          class="nav-link"
          :class="{ active: $route.path === '/admin' }"
          >Admin</router-link
        >
      </div>
      <button v-if="isLoggedIn" class="logout-btn" @click="logout">Logga ut</button>
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
    </div>
  </nav>
</template>

<script>
import { isLoggedIn, checkLoginStatus } from "@/utils/auth";

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
  },
  methods: {
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
  background-color: #f5f0e8;
  border-bottom: 1px solid #e0d9d0;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
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
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1a1a1a;
  text-decoration: none;
  flex-shrink: 0;
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
  color: #555;
  text-decoration: none;
  transition: color 0.15s ease;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
}

.nav-link:hover,
.nav-link.active {
  color: #cc1100;
  border-bottom-color: #cc1100;
}

.logout-btn {
  background: none;
  border: 1px solid #ccc;
  padding: 0.3rem 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  color: #555;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.logout-btn:hover {
  border-color: #cc1100;
  color: #cc1100;
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
  background: #1a1a1a;
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
  background-color: #f5f0e8;
  border-bottom: 1px solid #e0d9d0;
  flex-direction: column;
  padding: 1.5rem 2rem;
  gap: 1.25rem;
  z-index: 99;
}

.mobile-menu.show {
  display: flex;
}

.mobile-link {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #1a1a1a;
  text-decoration: none;
}

.mobile-link:hover {
  color: #cc1100;
}

@media (max-width: 700px) {
  .nav-links,
  .logout-btn {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}
</style>

