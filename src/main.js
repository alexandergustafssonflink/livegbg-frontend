import { createApp } from 'vue'
import App from './App.vue'
import quasarUserOptions from '../quasar-user-options'
import { Quasar } from "quasar"
import router from "./router/index.js";

createApp(App).use(router).use(Quasar, quasarUserOptions).mount('#app')
