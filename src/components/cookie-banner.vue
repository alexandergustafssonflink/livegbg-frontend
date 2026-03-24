<template>
  <div v-if="visible" class="cookie-banner" role="dialog" aria-modal="false" aria-live="polite" aria-label="Cookie-meddelande">
    <div class="cookie-banner__inner">
      <p class="cookie-banner__text">
        Vi använder cookies för att förbättra din upplevelse och analysera trafik på webbplatsen.
        <a href="/about" class="cookie-banner__link">Läs mer</a>
      </p>
      <button class="cookie-banner__btn" @click="accept">Acceptera</button>
    </div>
  </div>
</template>

<script>
const STORAGE_KEY = "cookieConsent";

export default {
  name: "CookieBanner",
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    try {
      this.visible = localStorage.getItem(STORAGE_KEY) !== "accepted";
    } catch {
      this.visible = false;
    }
  },
  methods: {
    accept() {
      try {
        localStorage.setItem(STORAGE_KEY, "accepted");
      } catch {
        // Storage unavailable; hide banner anyway
      }
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 500;
  background-color: #f5f0e8;
  border-top: 1px solid #e0d9d0;
  padding: 1rem 2rem;
}

.cookie-banner__inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.cookie-banner__text {
  font-size: 0.85rem;
  color: #555;
  line-height: 1.5;
}

.cookie-banner__link {
  color: #cc1100;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.cookie-banner__link:hover {
  opacity: 0.8;
}

.cookie-banner__btn {
  flex-shrink: 0;
  background: none;
  border: 1px solid #1a1a1a;
  padding: 0.4rem 1.1rem;
  font-size: 0.75rem;
  font-family: inherit;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  color: #1a1a1a;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.cookie-banner__btn:hover {
  border-color: #cc1100;
  color: #cc1100;
}

.cookie-banner__btn:focus-visible {
  outline: 2px solid #cc1100;
  outline-offset: 2px;
}

@media (max-width: 700px) {
  .cookie-banner {
    padding: 1rem;
  }

  .cookie-banner__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>
