<template>
  <div class="q-pa-md flex flex-center">
    <q-card style="max-width: 400px; width: 100%">
      <q-card-section>
        <q-form @submit="login">
          <q-input
            v-model="email"
            label="E-post"
            outlined
            type="email"
            :rules="[(val) => !!val || 'E-post är obligatoriskt']"
          />

          <q-input
            v-model="password"
            label="Lösenord"
            outlined
            type="password"
            class="q-mt-md"
            :rules="[(val) => !!val || 'Lösenord är obligatoriskt']"
          />

          <q-btn
            label="Logga in"
            type="submit"
            color="primary"
            class="q-mt-md full-width"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import { useRouter } from "vue-router";
import { checkLoginStatus } from "@/utils/auth";

export default {
  name: "LoginPage",
  setup() {
    const email = ref("");
    const password = ref("");
    const $q = useQuasar();
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.post(
          process.env.VUE_APP_API_URL + "auth/login",
          {
            email: email.value,
            password: password.value,
          }
        );

        // Spara token om login lyckas
        const token = response.data.token;
        localStorage.setItem("token", token);
        checkLoginStatus();

        router.push("/admin");

        $q.notify({ type: "positive", message: "Inloggning lyckades!" });
      } catch (error) {
        $q.notify({ type: "negative", message: "Inloggning misslyckades" });
      }
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>

<style scoped>
.q-page {
  height: 100vh;
}
</style>
