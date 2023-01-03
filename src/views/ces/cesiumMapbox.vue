<template>
  <div id="cesiumContainer" class="cesium-Container">
    <div class="legend_box">
      <div class="infomations">
        <p style="font-weight: bold;">概述：</p>
        <p>- 个人账户制作的Mapbox底图</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, toRaw } from "vue";
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "mars3d-cesium";

// my cesium ion
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NGYyNWFmZC1iNDZhLTQwZDItYjMzYS1jNTU1ZDU0NGZjYTQiLCJpZCI6MTAwMzQxLCJpYXQiOjE2NTcxNTYxMDN9.P3TaIVrf-feIzOWv-NB34GX_8sU472w7_0KCQ3jz8_w";

export default defineComponent({
  name: "cesiumMapbox",
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
      console.log(Cesium.Cartesian3.fromDegrees(108.941617,34.271474, 40000), "经纬度")
      
      // set camera
      // 设置相机位置
      viewer.camera.setView({
        // 设置相机位置
        // 两种方式： a.笛卡尔坐标系 b.转换笛卡尔坐标系
        // destination: {
        //   x: -1723460.236483586,
        //   y: 5021909.572891135,
        //   z: 3593896.14759591
        // },
        destination:Cesium.Cartesian3.fromDegrees(108.96,34.26, 40000),
        orientation: {
          // 初始视角
          heading: 0,
          pitch: Cesium.Math.toRadians(-90),
          roll: 0,
        },
      });

      const scene = viewer.scene;
      // Hides the stars                提高帧率
      scene.skyBox.show = false;
      // Explicitly render a new frame  提高帧率
      scene.requestRender();
      // 去除logo
    //   viewer.cesiumWidget.creditContainer.style.display = "none";
      viewer.scene.debugShowFramesPerSecond = true;

      // mapbox测试
      var mapboxLayer = new Cesium.MapboxStyleImageryProvider({
        url: "https://api.mapbox.com/styles/v1",
        username: "cherishgor",
        styleId: "clba5ck9x002014t4snp3muyv",
        accessToken:
          "pk.eyJ1IjoiY2hlcmlzaGdvciIsImEiOiJjbGJhNTF0dXQwNTJ6M3JsbWdlNHhjeHVuIn0.2dRkBesQItAtvrBA2xDNng",
        scaleFactor: true,
      });
      viewer.imageryLayers.addImageryProvider(mapboxLayer);
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
  /* height: 100%; */
  /* border: none; */
  /* background-color: black; */
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
