import "quasar/dist/quasar.css";
import "@quasar/extras/material-icons/material-icons.css";
import { Notify } from "quasar";

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    brand: {
      primary: "#FFC23C",
      secondary: "#ffedcd",
      red: "#E36565",
      blue: "#3E5669",
      purple: "#31087B",
      pink: "#FA2FB5",
      hej: "#FFC23C",
      black: "#100720",
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
  },
};
