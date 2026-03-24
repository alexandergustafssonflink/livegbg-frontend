<template>
  <div class="about-page">
    <div class="about-content">
      <h1 class="about-title">OM OSS</h1>
      <p class="about-text">
        Göteborg har en fantastisk livescene och vårt uppdrag är att göra den
        lite mer tillgänglig.
      </p>
      <p class="about-text">
        Jag som driver LiveGBG heter Alexander Gustafsson Flink och jag älskar
        Göteborgs livescen som jag tycker håller absolut världsklass. Jag har
        drivit denna sida sedan 2022 och har som mål att den ska få fler att
        upptäcka livemusik i Göteborg.
      </p>
      <p class="about-text">
        En annan sak jag älskar är kaffe. Utan kaffe – Ingen LiveGBG. Så om du
        vill stötta mig kan du köpa mig en kaffe genom att trycka på länken
        nedan.
      </p>
      <a
        href="https://buymeacoffee.com/livegbg"
        target="_blank"
        rel="noopener noreferrer"
        class="coffee-btn"
      >
        ☕ Köp mig en kaffe
      </a>
      <p class="about-contact">
        Kontakt:
        <a href="mailto:hello@livegbg.se" class="contact-link"
          >hello@livegbg.se</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  components: {},
  methods: {},
  data() {
    return {};
  },
  created() {},
};
</script>

<style scoped>
.about-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.about-content {
  max-width: 620px;
}

.about-title {
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-size: clamp(2.5rem, 6vw, 5rem);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.95;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.about-text {
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  max-width: 540px;
}

.about-contact {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}

.coffee-btn {
  display: inline-block;
  margin-bottom: 2rem;
  padding: 0.65rem 1.4rem;
  background-color: #ffdd00;
  color: #1a1a1a;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-decoration: none;
  border: 2px solid #ffdd00;
  transition: background-color 0.15s ease, border-color 0.15s ease,
    color 0.15s ease;
}

.coffee-btn:hover {
  background-color: transparent;
  border-color: #1a1a1a;
  color: #1a1a1a;
}

.coffee-btn:focus-visible {
  outline: 3px solid #1a1a1a;
  outline-offset: 3px;
}

.contact-link {
  color: var(--color-accent);
  text-decoration: none;
  border-bottom: 1px solid var(--color-accent);
  transition: opacity 0.15s ease;
}

.contact-link:hover {
  opacity: 0.7;
}
</style>

