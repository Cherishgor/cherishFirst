<template>
  <div id="mars2dContainer" class="mars2d-container">
    <div class="legend_box">
      <div class="infomations">
        <p style="font-weight: bold;">概述：</p>
        <p>- Mars2d初始化</p>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, reactive, toRaw } from "vue";

// mars2d
import "mars2d/dist/mars2d.css";
import * as mars2d from "mars2d";

export default defineComponent({
  name: "mars2dMap",
  setup() {
    const loadMap = () => {
      let map = new mars2d.Map("mars2dContainer", {
        zoom: 12,
        center: { lng: 108.96, lat: 34.26 },
        copyright: false,
        basemaps: [
          { name: "高德地图", type: "gaode", layer: "vec", show: true },
          {
            name: "高德卫星",
            type: "group",
            layers: [
              { name: "底图", type: "gaode", layer: "img_d" },
              { name: "注记", type: "gaode", layer: "img_z" },
            ],
          },
        ],
      });
      let tileLayer = new mars2d.layer.MapboxLayer({
        type: "mapbox",
        username: "marsgis",
        styleId: "cki0a0ire3jvh19r92vwfau1e",
        token: mars2d.Token.mapbox,
      });
    //   map.addLayer(tileLayer);
    };

    onMounted(async () => {
      loadMap();
    });

    return {};
  },
});
</script>

<style scoped>
.mars2d-container {
  width: 100%;
  /* height: 735px; */
  height: calc(100vh - 120px);
}
.legend_box {
  width: 15%;
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10001;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  font-size: 15px;
  color: rgb(255, 255, 255);
}

.infomations {
  margin: 7%;
  font-family: "黑体";
  text-align: left;
}
</style>
