<template>
  <v-img :src="link" width="50" height="50" contain class="pa-0 ma-0" />
</template>

<script>
import { weatherIconLink } from "@/helpers/weatherIconLink";
export default {
  name: "WeatherIcon",
  props: {
    icon: {
      type: String,
      default: "",
    },
    big: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    link() {
      return weatherIconLink(this.icon, this.big);
    },
  },
};
</script>

<style></style>
