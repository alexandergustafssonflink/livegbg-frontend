import { createApp } from "vue";
import App from "./App.vue";
import quasarUserOptions from "../quasar-user-options";
import {
  Quasar,
  QBtn,
  QSelect,
  QInput,
  QSpinnerAudio,
  QIcon,
  QDate,
  QPopupProxy,
  ClosePopup,
  QSpinner,
  QForm,
  QCard,
  QCardSection,
  QImg,
  QTd,
  QTable,
  QFile,
  QCheckbox,
  QCardActions,
  QDialog,
} from "quasar";
import router from "./router/index.js";
import VueGtag from "vue-gtag";

createApp(App)
  .use(router)
  .use(VueGtag, {
    bootstrap: false,
    config: { id: "G-W4SH1ZH8QD" },
    pageTrackerScreenviewEnabled: true,
    appName: "LiveGBG",
  }, router)
  .use(Quasar, {
    ...quasarUserOptions,
    directives: {
      ClosePopup,
    },
    components: {
      QBtn,
      QSelect,
      QInput,
      QSpinnerAudio,
      QIcon,
      QDate,
      QPopupProxy,
      ClosePopup,
      QSpinner,
      QForm,
      QCardSection,
      QCard,
      QImg,
      QTd,
      QTable,
      QFile,
      QCheckbox,
      QCardActions,
      QDialog,
    }, // Lägg till fler komponenter vid behov
  })
  .mount("#app");
