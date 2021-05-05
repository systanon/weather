<template>
  <v-card
    width="200"
    min-height="250"
    class="ma-4"
    @click="$emit('goTo', city.id)"
  >
    <v-card-title class="justify-center">{{ city.name }}</v-card-title>
    <div v-if="city.weather">
      <div class="d-flex">
        <WeatherIcon :icon="city.weather.weather[0].icon" />
        <v-card-title class="pa-2"
          >{{ city.weather.main.temp | degrees }}
          <span>&#8451;</span></v-card-title
        >
      </div>

      <v-card-text
        >Feels like {{ city.weather.main.feels_like | degrees
        }}<span>&#8451;</span>.{{
          city.weather.weather[0].description | upperCase
        }}</v-card-text
      >
    </div>
    <div v-else>
      <v-card-title class="justify-center">
        <h2>no data</h2>
      </v-card-title>
    </div>
    <v-footer absolute class="transparent">
      <v-card flat width="100%" class="transparent">
        <v-card-actions>
          <v-btn @click.stop="$emit('getWeather', { id: city.id })" icon
            ><v-icon> mdi-autorenew</v-icon></v-btn
          >
          <v-spacer />
          <v-btn icon @click.stop="$emit('removeCity', city.id)"
            ><v-icon> mdi-delete</v-icon></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
import WeatherIcon from "./WeatherIcon.vue";
export default {
  name: "CityCard",
  props: {
    city: {
      type: Object,
      required: true,
    },
  },
  components: { WeatherIcon },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
