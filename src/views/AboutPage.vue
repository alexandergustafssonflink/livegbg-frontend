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
  color: whitesmoke;
  max-width: 640px;
}

a {
  transition: 0.3s ease;
}

a:hover {
  color: #ffc23c;
}

h4 {
  color: whitesmoke;
}
</style>
