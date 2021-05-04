import Vue from "vue";
import VueRouter from "vue-router";
import CityList from "@/views/CityList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "CityList",
    component: CityList,
  },
  {
    path: "/city/:cityId",
    name: "City",
    component: () => import(/* webpackChunkName: "city" */ "../views/City.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
