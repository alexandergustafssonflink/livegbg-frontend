import { createApp } from 'vue'
import App from './App.vue'
import quasarUserOptions from '../quasar-user-options'
import { Quasar } from "quasar"
import router from "./router/index.js";
import VueAnalytics from 'vue-analytics';

createApp(App).use(router).use(VueAnalytics, {
    id: 'G-W4SH1ZH8QD',
    router
}).use(Quasar, quasarUserOptions).mount('#app');
