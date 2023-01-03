<template>
  <div id="cesiumContainer" class="cesium-Container">
    <div class="legend_box">
      <div class="infomations">
        <p style="font-weight: bold;">概述：</p>
        <p>- 飞行轨迹信息</p>
        <p>- 从服务器请求的水面信息</p>
        <p>- 时间轴概念</p>
      </div>
    </div>
  </div>
</template>
  
<script>
import { defineComponent, onMounted, ref, reactive, toRaw } from "vue";
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "mars3d-cesium";


//导入mars3d主库
import "mars3d/dist/mars3d.css";
import * as mars3d from "mars3d";

// my cesium ion
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NGYyNWFmZC1iNDZhLTQwZDItYjMzYS1jNTU1ZDU0NGZjYTQiLCJpZCI6MTAwMzQxLCJpYXQiOjE2NTcxNTYxMDN9.P3TaIVrf-feIzOWv-NB34GX_8sU472w7_0KCQ3jz8_w";

export default defineComponent({
  name: "cesiumRealtimeroute",
  setup() {
    const loadMap = () => {
      let viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false,
        timeline: true,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        fullscreenButton: false,
        shouldAnimate: true,
        requestRenderMode: true, // 帧率
        maximumRenderTimeChange: Infinity, // 帧率
        // request Water
        terrainProvider: Cesium.createWorldTerrain({
          requestWaterMask: true,
          requestVertexNormals: true
        })
      });
      viewer.timeline.container.style.display = 'none';
      const scene = viewer.scene;
      // Hides the stars                帧率
      scene.skyBox.show = false;
      // Explicitly render a new frame  帧率
      scene.requestRender();
      // removelogo
      viewer.cesiumWidget.creditContainer.style.display = "none";
      viewer.scene.debugShowFramesPerSecond = true;


      let start = Cesium.JulianDate.fromDate(new Date());
      // BeiJingTime
      // start = Cesium.JulianDate.addHours(start, 8, new Cesium.JulianDate());
      // endTime
      let stop = Cesium.JulianDate.addSeconds(start, 400, new Cesium.JulianDate())
      viewer.clock.startTime = start.clone();
      viewer.clock.currentTime = start.clone();
      viewer.clock.stopTime = stop.clone();
      viewer.clock.multiplier = 1; // Time
      viewer.timeline.zoomTo(start, stop);
      viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;

      const computeFlight = (source) => {
        let property = new Cesium.SampledPositionProperty();
        for (let i = 0; i < source.length; i++) {
          let time = Cesium.JulianDate.addSeconds(start, source[i].time, new Cesium.JulianDate);
          let position = Cesium.Cartesian3.fromDegrees(source[i].longitude, source[i].dimension, source[i].height);
          // 添加位置，和时间对应
          property.addSample(time, position);
        }
        return property;
      }
      let data = [{ longitude: 120.998994, dimension: 32.66277, height: 1000, time: 0 }, { longitude: 122.507572, dimension: 31.570649, height: 1000, time: 600 }, { longitude: 122.158023, dimension: 30.493342, height: 1000, time: 1200 }]

      let property = computeFlight(data)

      let entity = viewer.entities.add({
        id: '实时轨迹飞机',
        availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
          start: start,
          stop: stop
        })]),
        position: property,
        orientation: new Cesium.VelocityOrientationProperty(property),
        model: {
          // url: "//data.mars3d.cn/gltf/imap/a35533afdd894d6385e1690749a27659/gltf/gltf2.gltf",
          uri: '/models/Cesium_Air.glb',
          scale: 10.0,
          // color: Cesium.Color.fromCssColorString('rgba(0,253,239,0.6)'),
          silhouetteColor: Cesium.Color.fromCssColorString('rgba(0,255,0,1)'),
          silhouetteSize: 1
        },
        path: {
          resolution: 1,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: Cesium.Color.fromCssColorString('rgba(0,253,239,0.5)')
          }),
          width: 2
        }
      });
      viewer.trackedEntity = entity;
      


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
  /* height: 921px; */
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
  