<template>
  <div class="q-pa-xl">
    <div class="flex justify-between items-center q-mb-lg">
      <h3>Dina evenemang</h3>
      <q-btn
        label="Skapa event"
        color="purple"
        @click="openDialog"
        class="q-mb-md"
      />
    </div>
    <q-table :rows="events" :columns="columns" row-key="_id" class="q-mb-md">
      <template v-slot:body-cell="props">
        <q-td :props="props">
          <!-- Bildkolumn -->
          <q-img
            v-if="props.col.name === 'imageUrl'"
            :src="props.row.imageUrl"
            alt="Event image"
            style="max-width: 100px; height: auto"
          />

          <!-- Titelkolumn -->
          <div v-else-if="props.col.name === 'title'" class="text-h5 text-left">
            {{ props.row.title }}
          </div>

          <!-- Datumkolumn -->
          <div v-else-if="props.col.name === 'date'" class="text-subtitle1">
            {{ props.row.date.split("T")[0] }}
          </div>

          <!-- Länkkolumn -->
          <q-btn
            v-else-if="props.col.name === 'link'"
            :label="props.row.link"
            :href="props.row.link"
            target="_blank"
            color="purple"
            flat
          />

          <!-- Radera-knapp -->
          <q-btn
            v-else-if="props.col.name === 'delete'"
            icon="delete"
            color="negative"
            flat
            @click="deleteEvent(props.row._id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Dialog/modal för formuläret -->
    <q-dialog v-model="isDialogOpen" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Lägg till nytt event</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="submitForm">
            <q-input
              v-model="title"
              label="Namn"
              outlined
              class="q-mb-md input"
              :rules="[(val) => !!val || 'Namn är obligatoriskt']"
            />
            <q-input
              v-model="date"
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

            <q-btn
              label="Skicka"
              type="submit"
              color="purple"
              class="full-width"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Avbryt" color="purple" @click="closeDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "AdminPage",
  setup() {
    const title = ref("");
    const date = ref("");
    const imageUrl = ref("");
    const link = ref("");
    const isDialogOpen = ref(false); // Endast i setup
    const $q = useQuasar();
    const events = ref([]);
    const router = useRouter();

    const columns = [
      {
        name: "title",
        label: "Namn",
        align: "center",
      },
      {
        name: "date",
        label: "Datum",
        align: "center",
      },
      {
        name: "link",
        label: "Länk",
        align: "center",
      },
      {
        name: "delete",
        label: "Radera",
        align: "center",
      },
    ];

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          process.env.VUE_APP_API_URL + "events/external/my-events",
          config
        );
        events.value = response.data;
      } catch (error) {
        if (error.response.status === 403) {
          $q.notify({
            type: "negative",
            message: "Du är inte inloggad",
          });
          router.push("/login");
          localStorage.removeItem("token");
        }
        $q.notify({
          type: "negative",
          message: "Misslyckades med att hämta data",
        });
      }
    };

    const submitForm = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const data = {
          title: title.value,
          date: date.value,
          imageUrl: imageUrl.value,
          link: link.value,
        };

        await axios.post(
          process.env.VUE_APP_API_URL + "events/external",
          data,
          config
        );

        $q.notify({ type: "positive", message: "Eventet har skapats!" });
        // Rensa formuläret
        title.value = "";
        date.value = "";
        imageUrl.value = "";
        link.value = "";
        closeDialog();
      } catch (error) {
        $q.notify({
          type: "negative",
          message: "Misslyckades med att skapa event",
        });
      } finally {
        closeDialog();
        fetchData();
      }
    };

    const openDialog = () => {
      isDialogOpen.value = true;
    };

    const closeDialog = () => {
      isDialogOpen.value = false;
      title.value = "";
      date.value = "";
      imageUrl.value = "";
      link.value = "";
    };

    const deleteEvent = async (id) => {
      $q.dialog({
        title: "Bekräfta",
        message: "Är du säker på att du vill radera detta event?",
        ok: "Ja",
        cancel: "Nej",
        color: "green",
      }).onOk(async () => {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(
          process.env.VUE_APP_API_URL + "events/external/" + id,
          config
        );

        events.value = events.value.filter((event) => event._id !== id);
        $q.notify({ type: "positive", message: "Eventet har raderats!" });
      });
    };

    onMounted(async () => {
      fetchData();
    });

    return {
      title,
      date,
      imageUrl,
      link,
      isDialogOpen,
      events,
      columns,
      openDialog,
      closeDialog,
      submitForm,
      deleteEvent,
    };
  },
};
</script>

<style>
.input * {
}
</style>
