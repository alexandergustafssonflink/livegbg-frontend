<template>
  <div class="about-page">
    <div class="about-content">
      <h1 class="about-title">OM OSS</h1>
      <p class="about-text">
        Göteborg har en fantastisk livescene och vårt uppdrag är att göra den
        lite mer tillgänglig.
      </p>
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
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.about-text {
  font-size: 1.125rem;
  line-height: 1.75;
  color: #444;
  margin-bottom: 1.5rem;
  max-width: 540px;
}

.about-contact {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: #666;
}

.contact-link {
  color: #cc1100;
  text-decoration: none;
  border-bottom: 1px solid #cc1100;
  transition: opacity 0.15s ease;
}

.contact-link:hover {
  opacity: 0.7;
}
</style>

