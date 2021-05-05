<template>
  <v-container>
    <v-btn to="/" text color="accent">
      <v-icon class="pr-2">mdi-arrow-left</v-icon>
      <span>City list</span>
    </v-btn>

    <v-row>
      <v-col cols="12" md="6">
        <v-card flat v-if="forecast && additionally">
          <h2 class="text-center py-4">
            {{ forecast.city.name }}
          </h2>
          <v-card
            flat
            class="d-flex justify-center justify-md-start align-center"
          >
            <div>
              <p class="ma-0">
                Sunset: {{ forecast.city.sunset | formatTime }}
              </p>
              <p class="ma-0">
                Sunrise: {{ forecast.city.sunrise | formatTime }}
              </p>
            </div>

            <div class="d-flex justify-start align-center pr-4">
              <WeatherIcon
                :icon="additionally.current.weather[0].icon"
                :big="true"
                :width="computedWidth"
                :height="computedWidth"
              />
              <p class="ma-0 text-h5 text-md-h3">
                {{ additionally.current.temp | round }}&ensp;<span
                  >&#8451;</span
                >
              </p>
            </div>

            <p class="text-subtitle-2 ma-0">
              {{ additionally.current.weather[0].description }}
            </p>
          </v-card>
        </v-card>
        <Detail
          v-if="additionally"
          class="mt-4"
          :rain="additionally.current.rain"
          :wind_deg="additionally.current.wind_deg"
          :wind_speed="additionally.current.wind_speed"
          :pressure="additionally.current.pressure"
          :humidity="additionally.current.humidity"
          :uvi="additionally.current.uvi"
          :dew_point="additionally.current.dew_point"
          :wind_gust="additionally.current.wind_gust"
        />
      </v-col>
      <v-col cols="12" md="6" v-if="additionally">
        <h3>8-day forecast (daily forecast)</h3>
        <DailyWidget
          v-if="additionally"
          :daily="additionally.daily"
          :height="408"
        />
      </v-col>
    </v-row>

    <h3>Hourly forecast</h3>
    <HourlyGraph v-if="additionally" :hourlyData="hourlyData" />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import HourlyGraph from "@/components/HourlyGraph.vue";
import Detail from "@/components/Detail.vue";
import WeatherIcon from "@/components/WeatherIcon.vue";

export default {
  name: "City",

  components: {
    HourlyGraph,
    Detail,
    WeatherIcon,
    DailyWidget: () => import("./../components/DailyWidget.vue"),
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["forecast", "additionally"]),
    hourlyData() {
      if (!this.additionally) return [];
      return this.additionally.hourly.map((item) => ({
        temp: Math.round(item.temp),
        date: item.dt,
      }));
    },
    computedWidth() {
      return this.$vuetify.breakpoint.name === "xs" ||
        this.$vuetify.breakpoint.name === "sm"
        ? "70px"
        : "100px";
    },
  },
  methods: {},
  created() {
    this.$store.dispatch("FORECAST", { id: this.$route.params.cityId });
  },
  destroyed() {
    this.$store.commit("CLEAR");
  },
};
</script>
