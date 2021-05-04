<template>
  <v-card flat tile class="d-flex" style="border-left: 1px solid orange">
    <v-card-text>
      <p>
        <span v-if="rain !== undefined"> <RainIcon />&ensp;{{ rain }}mm</span>
        &emsp;
        <span v-if="wind_deg !== undefined && wind_speed !== undefined">
          <WindIcon :rotate="wind_deg" />&ensp;{{ wind_speed }}&ensp;{{
            wind_deg | windDegStr
          }}
        </span>
        &emsp;
        <span v-if="pressure !== undefined">
          <PressureIcon />&ensp;{{ pressure }}hPa
        </span>
        &emsp;

        <span v-if="humidity !== undefined">
          Humidity:&ensp;{{ humidity }}%
        </span>
        &emsp;
        <span v-if="uvi !== undefined"> UV:&ensp;{{ uvi }} </span>
        &emsp;
        <span v-if="dew_point !== undefined">
          Dew point:&ensp;{{ dew_point }}&ensp;<span>&#8451;</span>
        </span>
        <!-- &emsp;
        <span v-if="wind_gust !== undefined">
          {{ wind_gust }}
        </span> -->
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
// import WeatherIcon from "./WeatherIcon.vue";
import WindIcon from "./WindIcon.vue";
import RainIcon from "./RainIcon.vue";
import PressureIcon from "./PressureIcon.vue";
export default {
  name: "Detail",
  props: {
    rain: {
      type: Number,
    },
    wind_deg: {
      type: Number,
    },
    wind_speed: {
      type: Number,
    },
    pressure: {
      type: Number,
    },
    humidity: {
      type: Number,
    },
    uvi: {
      type: Number,
    },
    dew_point: {
      type: Number,
    },
    wind_gust: {
      type: Number,
    },
  },
  components: {
    WindIcon,
    RainIcon,
    PressureIcon,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style></style>
