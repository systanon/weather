<template>
  <v-img
    :src="link"
    :width="width"
    :height="height"
    contain
    class="pa-0 ma-0"
  />
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
    width: {
      type: String,
      default: "50",
    },
    height: {
      type: String,
      default: "50",
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
