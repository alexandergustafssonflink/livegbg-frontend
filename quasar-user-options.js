import "quasar/dist/quasar.css";
import "@quasar/extras/material-icons/material-icons.css";
import { Notify, Dialog } from "quasar";

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    brand: {
      primary: "#8b0000",
      secondary: "#2c1a08",
      red: "#8b0000",
      blue: "#2c3e50",
      purple: "#8b0000",
      pink: "#8b0000",
      hej: "#8b0000",
      black: "#1a1208",
    },
    extras: [
      "material-icons",
      "mdi-v6",
      "ionicons-v4", // last webfont was available in v4.6.3
      "eva-icons",
      "fontawesome-v6",
      "themify",
      "line-awesome",
      "bootstrap-icons",
    ],
  },
  plugins: {
    Notify,
    Dialog,
  },
};
