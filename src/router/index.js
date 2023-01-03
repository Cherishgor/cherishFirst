import { createRouter, createWebHistory } from "vue-router";

import homepage from '../views/home/homepage.vue'

import cesiumMap from "../views/ces/cesiumMap.vue";
import cesiumMapbox from "../views/ces/cesiumMapbox.vue";
import cesiumRealtimeroute from "../views/ces/cesiumRealtimeroute.vue";
import cesiumShowmodel from "../views/ces/cesiumShowmodel.vue";

import mars2dMap from "../views/mars/mars2dMap.vue";
import marsMap from "../views/mars/marsMap.vue";
import marsMapbox from "../views/mars/marsMapbox.vue";
import marsRealtimeroute from "../views/mars/marsRealtimeroute.vue";

import threeA from "../views/three/threeA.vue";


const routes = [
  // 首页路由
  {
    path: "/",
    name: "homepage",
    component: homepage,
  },
  // Cesium路由
  {
    path: "/cesiumMap",
    name: "cesiumMap",
    component: cesiumMap,
  },
  {
    path: "/cesiumMapbox",
    name: "cesiumMapbox",
    component: cesiumMapbox,
  },
  {
    path: "/cesiumRealtimeroute",
    name: "cesiumRealtimeroute",
    component: cesiumRealtimeroute,
  },
  {
    path: "/cesiumShowmodel",
    name: "cesiumShowmodel",
    component: cesiumShowmodel,
  },

  // Mars路由
  {
    path: "/mars2dMap",
    name: "mars2dMap",
    component: mars2dMap,
  },
  {
    path: "/marsMap",
    name: "marsMap",
    component: marsMap,
  },
  {
    path: "/marsMapbox",
    name: "marsMapbox",
    component: marsMapbox,
  },
  {
    path: "/marsRealtimeroute",
    name: "marsRealtimeroute",
    component: marsRealtimeroute,
  },

  // three路由
  {
    path: "/threeA",
    name: "threeA",
    component: threeA,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
