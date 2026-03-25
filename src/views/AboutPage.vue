<template>
  <div class="about-page">
    <div class="about-content">
      <h1 class="about-title">OM LIVEGBG</h1>
      <p class="about-text">
        Göteborg har en fantastisk livescene och LiveGBG:s uppdrag är att göra den
        lite mer tillgänglig.
      </p>
      <p class="about-text">
        Jag som driver LiveGBG heter Alexander och jag älskar
        Göteborgs livescen. Jag har
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
    <figure class="founder-card">
      <img
        :src="founderImage"
        alt="Alexander, grundare av LiveGBG"
        class="founder-image"
      />
    </figure>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  components: {},
  methods: {},
  data() {
    return {
      founderImage: require("@/assets/founder.jpg"),
    };
  },
  created() {},
};
</script>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 80vh;
  display: grid;
  grid-template-columns: minmax(0, 620px) minmax(260px, 360px);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}

.about-content {
  max-width: 620px;
}

.founder-card {
  position: relative;
  margin: 0;
  padding: 0;
  width: min(100%, 330px);
  aspect-ratio: 1 / 1;
  justify-self: end;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--color-text) 24%, transparent);
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--color-accent) 14%, transparent),
    color-mix(in srgb, var(--color-text) 8%, transparent)
  );
  overflow: hidden;
}

.founder-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(
    to top,
    color-mix(in srgb, #000 36%, transparent),
    transparent 50%
  );
  pointer-events: none;
}

.founder-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  filter: grayscale(12%) contrast(1.06) saturate(0.88) sepia(10%);
  transform: scale(1.03);
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

@media (max-width: 700px) {
  .about-page {
    padding: 3rem 1.25rem;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: flex-start;
  }

  .founder-card {
    width: min(72vw, 300px);
    justify-self: center;
  }
}
</style>

