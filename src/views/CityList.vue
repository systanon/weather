<template>
  <v-container>
    <!-- <CountryCard /> -->
    <h1 class="text-center text-h4">City list</h1>

    <v-card flat class="d-flex" max-width="400">
      <!-- <v-card-title>
        <p class="">Add city</p>
      </v-card-title> -->
      <!-- <v-card-title>

      </v-card-title> -->
      <!-- <> -->
      <v-text-field
        outlined
        dense
        v-model="cityName"
        placeholder="input city name"
        @keypress.enter="addCity"
        append-icon="mdi-magnify"
        @click:append="addCity"
      />
      <!-- <v-spacer /> -->
      <!-- <v-btn text @click="addCity">
        <span>Send</span>
      </v-btn> -->
      <!-- </> -->
    </v-card>
    <div class="d-flex justify-center flex-wrap">
      <!-- <v-card
        v-for="item in list"
        :key="item.id"
        class="justify-center align-items-center ma-4 pa-2 flex-column d-flex"
        justify="center"
        @click="$router.push({ name: 'City', params: { cityId: item.id } })"
      >
        <v-card-actions>
          <v-btn text @click="getWeather({ id: item.id })">
            <span class="mr-2">Refrash</span>
          </v-btn>
          <v-spacer />
          <v-btn text @click="removeCity(item.id)">
            <span class="mr-2">Remove</span>
          </v-btn>
        </v-card-actions>

        <v-card-text class="">
          <p class="text-center">{{ item.name }}</p>
        </v-card-text>

        <div v-if="item.weather" class="pa-2">
          <p class="">visibility: {{ item.weather.visibility }}meters</p>
          <p class="">wind speed: {{ item.weather.wind.speed }}meters / sec</p>
        </div>

        <div v-else>
          <h4 class="text-center">No data</h4>
        </div>
      </v-card> -->
      <CityCard
        v-for="city in list"
        :key="city.id"
        :city="city"
        @goTo="goTo"
        @getWeather="getWeather"
        @removeCity="removeCity"
      />
    </div>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import CityCard from "../components/CityCard.vue";

export default {
  name: "CityList",

  components: {
    CityCard,
  },
  data() {
    return {
      cityName: "",
    };
  },
  computed: {
    ...mapState([
      "_weather",
      "_forecast",
      "_additionally",
      "cityList",
      "weather",
    ]),
    ...mapGetters({ list: "cityList" }),
  },
  methods: {
    ...mapActions({ getWeather: "WEATHER", removeCity: "REMOVE_CITY" }),
    addCity() {
      if (!this.cityName) return;
      this.getWeather({ q: this.cityName });
      this.cityName = "";
    },
    goTo(id) {
      this.$router.push({ name: "City", params: { cityId: id } });
    },
  },
  created() {
    // this.$store.dispatch("");
  },
};
</script>
