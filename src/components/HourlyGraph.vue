<template>
  <v-card
    v-mutate="updateWidth"
    :height="height + heightItem"
    class="d-flex pa-0 ma-0"
    outlined
    tile
  >
    <div
      v-for="(item, index) in items"
      :key="index"
      :style="`width: ${width}px`"
    >
      <div
        :style="`height: ${height * (1 - item.normalize)}px; width: auto;`"
      ></div>
      <div
        :style="`height:${heightItem}px; width: auto; background-color: ${item.color}`"
        class="d-flex justify-center align-center"
      >
        {{ item.text }}
      </div>
    </div>
  </v-card>
</template>

<script>
import { normalize } from "./../helpers/normalize";
export default {
  props: {
    hourlyData: {
      type: Array,
      default: new Array(),
    },
  },
  components: {},
  name: "HourlyGraph",
  data() {
    return {
      height: 150,
      heightItem: 30,
      clientWidth: 600,
    };
  },
  computed: {
    items() {
      return normalize(this.hourlyData, {
        hotColor: "#ff0000",
        hotLimit: 30,
        coldColor: "#e0de79",
        coldLimit: 10,
      }).slice(0, this.count);
    },
    width() {
      return this.clientWidth / this.count;
    },
    count() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 6;
        case "sm":
          return 8;
        case "md":
          return 12;
        case "lg":
          return 16;
        case "xl":
          return 22;
        default:
          return 30;
      }
    },
  },
  methods: {
    updateWidth() {
      this.clientWidth = this.$el?.clientWidth;
    },
  },
  mounted() {
    this.updateWidth();
  },
  updated() {
    this.updateWidth();
  },
};
</script>

<style></style>
