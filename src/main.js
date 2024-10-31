import { createApp } from "vue";
import App from "./App.vue";
import quasarUserOptions from "../quasar-user-options";
import { Quasar } from "quasar";
import router from "./router/index.js";
import VueGtag from "vue-gtag";

createApp(App)
  .use(router)
  .use(VueGtag, {
    config: { id: "G-W4SH1ZH8QD" },
  })
  .use(Quasar, quasarUserOptions)
  .mount("#app");
