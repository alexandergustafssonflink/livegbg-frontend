<template>
  <div class="about">
    <h3>
      Göteborg har en fantastisk livescene och vårt uppdrag är att göra den lite
      mer tillgänglig.
    </h3>
    <h3 class="q-mt-xl">
      Kontakt: <a href="mailto:hello@livegbg.se">hello@livegbg.se</a>
    </h3>
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
.about {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 1em;
}
h3 {
  color: #1a1208;
  max-width: 640px;
  font-family: "Playfair Display", Georgia, serif;
  font-weight: 700;
  line-height: 1.4;
}

a {
  transition: 0.3s ease;
  color: #8b0000;
}

a:hover {
  color: #5a0000;
  text-decoration: underline;
}

h4 {
  color: #1a1208;
}
</style>
