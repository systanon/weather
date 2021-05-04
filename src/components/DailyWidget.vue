<template>
  <!-- :width="width" -->
  <v-card
    :width="width"
    :height="height"
    outlined
    flat
    tile
    class="relative d-flex flex-row"
    style="overflow: hidden"
  >
    <!-- :width="width" -->
    <v-card
      :width="width"
      :height="height"
      flat
      tile
      class="overflow-y-auto daily-list"
      :class="{ 'daily-list-active': !active }"
    >
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr
              v-for="item in daily"
              :key="item.dt"
              @click="localDt = item.dt"
              class="daily-hover"
            >
              <td>
                <p class="ma-0">
                  {{ item.dt | formatDate }}
                </p>
              </td>
              <td>
                <WeatherIcon :icon="item.weather[0].icon" />
              </td>
              <td>
                <p class="ma-0">
                  {{ item.temp.max | round }}
                  &ensp; / &ensp;

                  {{ item.temp.min | round }}&ensp;<span>&#8451;</span>
                </p>
              </td>
              <td>
                <p class="text-subtitle-2 ma-0">
                  {{ item.weather[0].description }}
                </p>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <!-- :width="width" -->
    <v-card
      :width="width"
      :height="height"
      flat
      tile
      class="ma-0 pa-1 daily-current"
      :class="{ 'daily-current-active': active }"
    >
      <v-card v-if="current" flat tile>
        <v-card-actions>
          <v-btn @click="localDt = null" icon>
            <v-icon> mdi-arrow-left</v-icon>
          </v-btn>
        </v-card-actions>

        <v-card-title>{{ current.dt | formatDate }}</v-card-title>

        <!-- <v-card-text>
          <p class="">влажность: {{ current.humidity }}%</p>
          <p class="">давление: {{ current.pressure }}mm</p>
          <p class="">дождь: {{ current.rain }}%</p>
          <p class="">ветер: {{ current.wind_speed }}m/sec.</p>
        </v-card-text> -->
        <Detail
          :rain="current.rain"
          :wind_deg="current.wind_deg"
          :wind_speed="current.wind_speed"
          :pressure="current.pressure"
          :humidity="current.humidity"
          :uvi="current.uvi"
          :dew_point="current.dew_point"
          :wind_gust="current.wind_gust"
        />
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
// import { data } from "@/mock_data/response";
// import { formatDate } from "@/helpers/formatDate";
import WeatherIcon from "./WeatherIcon.vue";
import Detail from "@/components/Detail.vue";

export default {
  name: "DailyWidget",
  props: {
    daily: {
      type: Array,
      default: new Array(),
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: Number,
      default: 400,
    },
  },
  components: {
    WeatherIcon,
    Detail,
  },
  data() {
    return {
      dt: null,
      active: false,
    };
  },
  computed: {
    current() {
      return this.daily.find((item) => item.dt === this.dt);
    },
    localDt: {
      set: function (dt) {
        if (dt) {
          this.active = true;
          this.dt = dt;
        } else {
          this.active = false;
          setTimeout(() => (this.dt = dt), 500);
        }
      },
      get: function () {
        return this.dt;
      },
    },
  },
  methods: {
    // formatDate,
  },
};
</script>

<style>
.daily-list {
  position: absolute;
  top: 0px;
  left: -100%;
  transition-property: left;
  transition-duration: 0.5s;
}
.daily-list-active {
  left: 0%;
}
.daily-current {
  position: absolute;
  top: 0px;
  left: 100%;
  transition-property: left;
  transition-duration: 0.5s;
}
.daily-current-active {
  left: 0%;
}
.daily-hover:hover {
  background-color: #dfaa9d;
}
</style>
