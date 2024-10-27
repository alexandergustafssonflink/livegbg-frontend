<template>
  <div class="q-pa-md">
    <div class="text-h5 q-mb-md">Admin - Lägg till nytt event</div>

    <q-form @submit="submitForm">
      <q-input
        v-model="name"
        label="Namn"
        outlined
        class="q-mb-md input"
        :rules="[(val) => !!val || 'Namn är obligatoriskt']"
      />

      <q-input
        v-model="date"
        label="Datum"
        type="date"
        outlined
        class="q-mb-md input"
        :rules="[(val) => !!val || 'Datum är obligatoriskt']"
      />

      <q-input
        v-model="imageUrl"
        label="Bild URL"
        outlined
        class="q-mb-md input"
        :rules="[(val) => !!val || 'Bild URL är obligatoriskt']"
      />
      <q-input
        v-model="link"
        label="Länk till eventet"
        outlined
        class="q-mb-md input"
        :rules="[(val) => !!val || 'Länk till event är obligatoriskt']"
      />

      <q-btn label="Skicka" type="submit" color="primary" class="full-width" />
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

export default {
  name: "AdminPage",
  setup() {
    const name = ref("");
    const date = ref("");
    const imageUrl = ref("");
    const link = ref("");
    const $q = useQuasar();

    const submitForm = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const data = {
          name: name.value,
          date: date.value,
          image: imageUrl.value,
          link: link.value,
        };

        await axios.post(
          "http://localhost:3000/api/events/external",
          data,
          config
        );

        $q.notify({ type: "positive", message: "Eventet har skapats!" });
        // Rensa formuläret
        name.value = "";
        date.value = "";
        imageUrl.value = "";
        link.value = "";
      } catch (error) {
        $q.notify({
          type: "negative",
          message: "Misslyckades med att skapa event",
        });
      }
    };

    return {
      name,
      date,
      imageUrl,
      link,
      submitForm,
    };
  },
};
</script>

<style>
.input * {
  color: whitesmoke;
}
</style>
