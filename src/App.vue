<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h2 class="">open weather map</h2>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <error-message />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("INIT");
  },
};
</script>
