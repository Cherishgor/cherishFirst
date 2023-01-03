<template>
  <div id="cesiumContainer" class="cesium-Container">
    <div class="legend_box">
      <div class="infomations">
        <p style="font-weight: bold;">概述：</p>
        <p>- Cesium初始化地球</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, toRaw } from "vue";
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "mars3d-cesium";

// cesium ion
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NGYyNWFmZC1iNDZhLTQwZDItYjMzYS1jNTU1ZDU0NGZjYTQiLCJpZCI6MTAwMzQxLCJpYXQiOjE2NTcxNTYxMDN9.P3TaIVrf-feIzOWv-NB34GX_8sU472w7_0KCQ3jz8_w";

export default defineComponent({
  name: "cesiumMap",
  setup() {
    const loadMap = () => {
      let viewer = new Cesium.Viewer("cesiumContainer", {
        // terrainProvider: new Cesium.CesiumTerrainProvider({
        //   // url: "http://192.168.10.191:8083/%E5%9C%B0%E5%BD%A2/terrain",
        //   requestVertexNormals: true,
        // }),
        animation: false,
        timeline: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        fullscreenButton: false,
        requestRenderMode: true, // 提高帧率
        maximumRenderTimeChange: Infinity, // 提高帧率
      });
      const scene = viewer.scene;
      // Hides the stars                提高帧率
      scene.skyBox.show = false;
      // Explicitly render a new frame  提高帧率
      scene.requestRender();
      // 去除logo
      viewer.cesiumWidget.creditContainer.style.display = "none";
      viewer.scene.debugShowFramesPerSecond = true;
    };
    onMounted(async () => {
      loadMap();
    });
    return {
      loadMap,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cesium-Container {
  position: relative;
  width: 100%;
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
