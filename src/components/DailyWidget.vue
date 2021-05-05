<template>
  <v-card
    :width="width"
    :height="height"
    outlined
    flat
    tile
    class="relative d-flex flex-row"
    style="overflow: hidden"
  >
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
        <v-simple-table dense class="table-detail">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left"></th>
                <th class="text-left">Morning</th>
                <th class="text-left">Afternoon</th>
                <th class="text-left">Evening</th>
                <th class="text-left">Night</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p class="ma-0 text-caption text--disabled">TEMPERATURE</p>
                </td>
                <td>
                  <p class="ma-0">
                    {{ current.temp.morn | round }}&ensp;<span>&#8451;</span>
                  </p>
                </td>
                <td>
                  <p class="ma-0">
                    {{ current.temp.day | round }}&ensp;<span>&#8451;</span>
                  </p>
                </td>
                <td>
                  <p class="ma-0">
                    {{ current.temp.eve | round }}&ensp;<span>&#8451;</span>
                  </p>
                </td>
                <td>
                  <p class="ma-0">
                    {{ current.temp.night | round }}&ensp;<span>&#8451;</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="ma-0 text-caption text--disabled">FEELS LIKE</p>
                </td>
                <td>
                  <p class="ma-0">
                    {{ current.feels_like.morn | round }}&ensp;<span
                      >&#8451;</span
                    >
                  </p>
                </td>
                <td>
                  <p class="ma-0">
                    {{ current.feels_like.day | round }}&ensp;<span
                      >&#8451;</span
                    >
                  </p>
                </td>
                <td>
                  <p class="ma-0">
                    {{ current.feels_like.eve | round }}&ensp;<span
                      >&#8451;</span
                    >
                  </p>
                </td>
                <td>
                  <p class="ma-0">
                    {{ current.feels_like.night | round }}&ensp;<span
                      >&#8451;</span
                    >
                  </p>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-card flat :width="computedWidth">
          <v-simple-table dense class="table-detail">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left text-caption" style="border: none">
                    SUNRISE
                  </th>
                  <th class="text-left text-caption" style="border: none">
                    SUNSET
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>
                      {{ current.sunrise | formatTime }}&ensp;<span
                        >&#8451;</span
                      >
                    </p>
                  </td>
                  <td>
                    <p>
                      {{ current.sunset | formatTime }}&ensp;<span
                        >&#8451;</span
                      >
                    </p>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
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
    computedWidth() {
      return this.$vuetify.breakpoint.name === "xs" ||
        this.$vuetify.breakpoint.name === "sm"
        ? "100%"
        : "50%";
    },
  },
  methods: {},
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
<style lang="scss">
.table-detail {
  & th {
    padding: 0 8px !important;
  }
  & td {
    padding: 0 8px !important;
    & p {
      margin: 0;
    }
  }
}
</style>
