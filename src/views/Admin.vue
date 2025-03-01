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
          <q-form @submit.prevent="submitForm">
            <q-input
              v-model="title"
              label="Namn"
              outlined
              class="q-mb-md"
              :rules="[(val) => !!val || 'Namn är obligatoriskt']"
            />
            <q-input
              v-model="date"
              type="date"
              outlined
              class="q-mb-md"
              :rules="[(val) => !!val || 'Datum är obligatoriskt']"
            />

            <!-- Filuppladdning med Q‑File -->
            <q-file
              filled
              label="Välj bild"
              accept="image/*"
              v-model="selectedFiles"
              class="q-mb-md"
            />
            <!-- Förhandsvisning av vald bild -->
            <q-img
              v-if="imagePreview"
              :src="imagePreview"
              alt="Bild förhandsvisning"
              style="max-width: 100px; height: auto"
              class="q-mb-md"
            />

            <q-input
              v-model="link"
              label="Länk till eventet"
              outlined
              class="q-mb-md"
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
import { onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "AdminPage",
  setup() {
    const title = ref("");
    const date = ref("");
    const imageFile = ref(null);
    const imagePreview = ref("");
    const link = ref("");
    const isDialogOpen = ref(false);
    // V-model för Q‑File: kan vara en array eller ett enskilt File‑objekt
    const selectedFiles = ref(null);
    const $q = useQuasar();
    const events = ref([]);
    const router = useRouter();

    const columns = [
      { name: "title", label: "Namn", align: "center" },
      { name: "date", label: "Datum", align: "center" },
      { name: "link", label: "Länk", align: "center" },
      { name: "delete", label: "Radera", align: "center" },
    ];

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(
          process.env.VUE_APP_API_URL + "events/external/my-events",
          config
        );
        events.value = response.data;
      } catch (error) {
        if (error.response && error.response.status === 403) {
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

    // Watch för att hantera filvalet
    watch(selectedFiles, (newVal) => {
      let file = null;
      if (!newVal) {
        file = null;
      } else if (Array.isArray(newVal)) {
        file = newVal[0];
      } else {
        file = newVal;
      }

      if (file && file instanceof Blob) {
        imageFile.value = file;
        imagePreview.value = URL.createObjectURL(file);
        console.log("Vald fil:", file);
      } else {
        imageFile.value = null;
        imagePreview.value = "";
        console.warn("Ingen giltig fil vald.");
      }
    });

    const submitForm = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };

        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("date", date.value);
        formData.append("link", link.value);
        if (imageFile.value) {
          formData.append("image", imageFile.value);
        }

        await axios.post(
          process.env.VUE_APP_API_URL + "events/external",
          formData,
          config
        );

        $q.notify({ type: "positive", message: "Eventet har skapats!" });
        title.value = "";
        date.value = "";
        imageFile.value = null;
        imagePreview.value = "";
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
      imageFile.value = null;
      imagePreview.value = "";
      link.value = "";
      selectedFiles.value = null;
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
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(
          process.env.VUE_APP_API_URL + "events/external/" + id,
          config
        );
        events.value = events.value.filter((event) => event._id !== id);
        $q.notify({ type: "positive", message: "Eventet har raderats!" });
      });
    };

    onMounted(() => {
      fetchData();
    });

    return {
      title,
      date,
      imagePreview,
      link,
      isDialogOpen,
      events,
      columns,
      openDialog,
      closeDialog,
      submitForm,
      deleteEvent,
      selectedFiles,
    };
  },
};
</script>
