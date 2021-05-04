import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
    values: {},
  },
  theme: {
    themes: {
      light: {
        primary: "#ea6d4f", // #ea6d4f #eb6d50
        accent: "#eb522f",
        secondary: "#7acbbf",
        info: "#888888",
        warning: "#888888",
        error: "#888888",
        success: "#888888",
      },
    },
  },
});
