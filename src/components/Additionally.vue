<template>
  <v-card>
    <div v-if="forecast">
      <v-card class="">
        <v-card-text class="">
          <p class="">Страна: {{ forecast.city.country }}</p>
          <p class="">Город: {{ forecast.city.name }}</p>
          <p class="">Рассвет: {{ forecast.city.sunrise | formatDate }}</p>
          <p class="">Закат: {{ forecast.city.sunset | formatDate }}</p>
        </v-card-text>

        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header> forecast </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card
                outlined
                v-for="item in forecast.list"
                :key="item.dt"
                class="ma-2 pa-1"
              >
                <v-card-title>
                  <p class="">{{ item.dt_txt }}</p>
                </v-card-title>

                <v-card-text class="">
                  <p class="">Видимость: {{ item.visibility }}meters</p>
                  <p class="">Температура: {{ item.main.temp }}grad</p>
                  <p class="">Ощущаеться: {{ item.main.feels_like }}grad</p>
                </v-card-text>

                <v-card-text class="">
                  <p class="">Облачность: {{ item.clouds.all }}%</p>
                  <p class="">Скорость ветра: {{ item.wind.speed }}</p>
                  <p class="">направление: {{ item.deg }}</p>
                  <p class="">Запылённость: {{ item.wind.dust }}</p>
                  <p class="">Видимость: {{ item.visibility }}meters</p>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </div>
    <div v-if="additionally">
      <v-card outlined class="">
        <v-card-title>
          <p class="">alerts</p>
        </v-card-title>

        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header> alerts </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card-text
                v-for="item in additionally.alerts"
                :key="item.start"
                class=""
              >
                <p class="">start: {{ item.start }}</p>
                <p class="">end: {{ item.end }}</p>
                <p class="">description: {{ item.description }}</p>
              </v-card-text>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>

      <v-card outlined class="">
        <v-card-title>
          <p class="">Current</p>
        </v-card-title>

        <v-card-text class="">
          <p class="">Восход: {{ additionally.current.sunrise }}</p>
          <p class="">Закат: {{ additionally.current.sunset }}</p>
        </v-card-text>
      </v-card>

      <v-card outlined class="">
        <v-card-title>
          <p class="">daily</p>
        </v-card-title>

        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header> daily </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card-text
                v-for="item in additionally.daily"
                :key="item.dt"
                class=""
              >
                <p class="">влажность: {{ item.humidity }}%</p>
                <p class="">давление: {{ item.pressure }}mm</p>
                <p class="">дождь: {{ item.rain }}%</p>
                <p class="">ветер: {{ item.wind_speed }}m/sec.</p>
              </v-card-text>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>

      <v-card outlined class="">
        <v-card-title>
          <p class="">hourlys graf</p>
        </v-card-title>

        <HourlyGraph :hourlyData="additionally.hourly" />
      </v-card>
    </div>
  </v-card>
</template>

<script>
import HourlyGraph from "@/components/HourlyGraph.vue";

export default {
  name: "CityCardDetail",
  props: {
    forecast: {
      type: Object,
      required: false,
    },
    additionally: {
      type: Object,
      required: false,
    },
  },
  components: { HourlyGraph },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
