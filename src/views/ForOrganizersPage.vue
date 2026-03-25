<template>
  <div class="organizers-page">
    <div class="organizers-content">
      <h1 class="organizers-title">FÖR ARRANGÖRER</h1>
      <p class="organizers-text">
        Arrangerar du livespelningar i Göteborg och vill att de ska synas på LiveGBG? Eller har du idéer på hur LiveGBG kan bli bättre? Tveka inte att höra av dig!
      </p>
      <p class="organizers-contact">
        Email:
        <a href="mailto:hello@livegbg.se" class="contact-link">hello@livegbg.se</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForOrganizersPage",
};
</script>

<style scoped>
.organizers-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.organizers-content {
  max-width: 620px;
}

.organizers-title {
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-size: clamp(2.5rem, 6vw, 5rem);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.95;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.organizers-text {
  font-size: 1.125rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  max-width: 540px;
}

.organizers-contact {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
}

.organizers-btn {
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

.organizers-btn:hover {
  background-color: transparent;
  border-color: #1a1a1a;
  color: #1a1a1a;
}

.organizers-btn:focus-visible {
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
  .organizers-page {
    padding: 3rem 1.25rem;
    align-items: flex-start;
  }
}
</style>
