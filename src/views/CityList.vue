<template>
  <v-container>
    <h1 class="text-center text-h4 py-8">City list</h1>

    <v-card flat class="d-flex justify-center">
      <v-card flat max-width="400">
        <v-text-field
          outlined
          dense
          v-model="cityName"
          placeholder="enter the name of the city"
          @keypress.enter="addCity"
          append-icon="mdi-magnify"
          @click:append="addCity"
        />
      </v-card>
    </v-card>
    <div v-if="list.length" class="d-flex justify-center flex-wrap">
      <CityCard
        v-for="city in list"
        :key="city.id"
        :city="city"
        @goTo="goTo"
        @getWeather="getWeather"
        @removeCity="removeCity"
      />
    </div>
    <div v-else><h2 class="text-center px-8">No selected cities</h2></div>
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
