<template>
  <index />
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/cesiumMap">cesiumMap</router-link>
  </nav>
  <router-view/> -->
</template>
<script>
import index from "./views/index";

export default {
  name: "App",
  components: {
    index,
  },
};
</script>
