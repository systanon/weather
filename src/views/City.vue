<template>
  <v-container>
    <v-btn to="/" text color="accent">
      <v-icon class="pr-2">mdi-arrow-left</v-icon>
      <span>City list</span>
    </v-btn>
    <h2 class="text-center py-4">{{ forecast.city.name }}</h2>

    <v-row>
      <v-col cols="12" md="6">
        <v-card-text v-if="forecast" class="">
          <!-- <p class="">Город: {{ forecast.city.name }}</p> -->
          <p class="">Восход: {{ forecast.city.sunrise | formatTime }}</p>
          <p class="">Закат: {{ forecast.city.sunset | formatTime }}</p>
        </v-card-text>
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr>
                <td style="width: 40%">
                  <p class="ma-0">
                    {{ additionally.current.dt | formatDate }}
                  </p>
                </td>
                <td style="width: 30%" class="">
                  <WeatherIcon
                    :icon="additionally.current.weather[0].icon"
                    :big="true"
                    class="position:absolute;"
                  />
                </td>
                <td style="width: 20%">
                  <p class="ma-0">
                    {{ additionally.current.temp | round }}&ensp;<span
                      >&#8451;</span
                    >
                  </p>
                </td>
                <td style="width: 30%">
                  <p class="text-subtitle-2 ma-0">
                    {{ additionally.current.weather[0].description }}
                  </p>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <Detail
          v-if="additionally"
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
        <!-- :width="600" -->
      </v-col>
    </v-row>

    <h3>1 hours forecast: 2 days</h3>
    <HourlyGraph v-if="additionally" :hourlyData="hourlyData" />

    <h3>3 hours forecast: 5 days (Chart)</h3>
    <ForecastChart v-if="forecast" :data="forecast.list" />

    <!-- <h3>Alerts</h3> -->
    <!-- <Alerts v-if="additionally" :alerts="additionally.alerts" /> -->
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import HourlyGraph from "@/components/HourlyGraph.vue";
import ForecastChart from "@/components/ForecastChart.vue";
import Detail from "@/components/Detail.vue";
import WeatherIcon from "@/components/WeatherIcon.vue";
// import Alerts from "@/components/Alerts.vue";

export default {
  name: "City",

  components: {
    HourlyGraph,
    ForecastChart,
    Detail,
    // Alerts,
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
      return this.additionally.hourly.map((item) => Math.round(item.temp));
    },
  },
  created() {
    this.$store.dispatch("FORECAST", { id: this.$route.params.cityId });
  },
  destroyed() {
    this.$store.commit("CLEAR");
  },
};
</script>
