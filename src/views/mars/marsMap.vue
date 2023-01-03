<template>
  <div id="mars3dContainer" class="mars3d-container">
    <div class="legend_box">
      <div class="infomations">
        <p style="font-weight: bold;">概述：</p>
        <p>- Mars3d初始化</p>
      </div>
    </div>
  </div>
</template>
  
<script>
import { defineComponent, onMounted, ref, reactive, toRaw } from "vue";

//引入cesium基础库
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "mars3d-cesium";
//导入mars3d主库
import "mars3d/dist/mars3d.css";
import * as mars3d from "mars3d";

export default defineComponent({
  name: "marsMap",
  setup() {

    const loadMap = () => {
      const map = new mars3d.Map("mars3dContainer", {
        //   scene: {
        //     center: {
        //       lat: 31.77,
        //       lng: 120.995023,
        //       alt: 20000,
        //       heading: 0,
        //       pitch: -90,
        //     },
        //   },
        terrain: {
          show: true,
          requestWaterMask: true,
          requestVertexNormals: true
        },
        control: {
          locationBar: {
            fps: false,
            template: "<div>经度:{lng}</div><div>纬度:{lat}</div> ",
            cacheTime: 0,
          },
          zoom: {
            zoomInIcon: "",
            zoomOutIcon: "",
            relativeAmount: 2,
          },
          homeButton: true, // 视角复位按钮
          sceneModePicker: false, // 二三维切换按钮
          navigationHelpButton: false, // 帮助按钮
          fullscreenButton: false,
          contextmenu: { hasDefault: false },
          geocoder: true, // 是否显示 地名查找控件按钮，是Cesium原生控件
          clockAnimate: true, // 时钟动画控制(左下角)
          timeline: true, // 是否显示时间线控件
        },
        basemaps: [
          {
            name: "mapbox影像图",
            type: "mapbox",
            username: "marsgis",
            styleId: "cki0a2mtc2vyo1bqu76p8ks8m",
            token: mars3d.Token.mapbox,
            show: true,
          },
        ],
      });
    };

    onMounted(async () => {
      loadMap();
    });

    return {

    };
  },
});
</script>
  
<style scoped>
.mars3d-container {
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
  