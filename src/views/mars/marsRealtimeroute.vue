<template>
  <div id="mars3dContainer" class="mars3d-container">
    <div class="legend_box">
      <div class="infomations">
        <p style="font-weight: bold;">概述：</p>
        <p>- 船只实时轨迹</p>
        <div>- 实时轨迹`白` <span>------</span></div>
        <br />
        <div>- 预测轨迹`黄` <span style="color: #ffff00">------</span></div>
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
  name: "marsRealtimeroute",
  setup() {
    const loadMap = () => {
      const map = new mars3d.Map("mars3dContainer", {
        scene: {
          center: {
            lat: 29.9014,
            lng: 121.600748,
            alt: 7000,
            heading: 0,
            pitch: -90,
          },
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
          geocoder: true, // 地名查找控件按钮
          clockAnimate: false, // 时钟动画控制
          timeline: false, // 是否显示时间线控件
        },
        terrain: {
          show: false,
        },
        basemaps: [
          {
            name: "mapbox影像图",
            type: "mapbox",
            username: "marsgis",
            styleId: "cki0adkar2b0e19mv9tpiewld",
            token: mars3d.Token.mapbox,
            show: true,
          },
        ],
      });

      /////  当前地图内加载完成事件
      // map.on(mars3d.EventType.tileLoadProgress, (e) => {
      //   console.log(e, 1111)
      // })

      const mapboxLayer = new mars3d.layer.MapboxLayer({
        url: "https://api.mapbox.com/styles/v1",
        username: "cherishgor",
        styleId: "clba5ck9x002014t4snp3muyv",
        accessToken:
          "pk.eyJ1IjoiY2hlcmlzaGdvciIsImEiOiJjbGJhNTF0dXQwNTJ6M3JsbWdlNHhjeHVuIn0.2dRkBesQItAtvrBA2xDNng",
        scaleFactor: true,
      });
      // map.addLayer(mapboxLayer);

      // 水域面图层
      const waterLayer = new mars3d.layer.GeoJsonLayer({
        name: "水面",
        url: "//data.mars3d.cn/file/geojson/hedao-wai.json", // mars3d的水面数据、可自制
        symbol: {
          type: "waterC",
          styleOptions: {
            height: 0,
            normalMap: "/img/waterNormals.jpg", // 路径问题
            // normalMap: "/src/assets/imgs/waterNormals.jpg", // 路径问题
            frequency: 8000.0,
            animationSpeed: 0.02,
            amplitude: 5.0,
            specularIntensity: 0.8,
            baseWaterColor: "#006ab4", // #00ffff,#00baff,#006ab4
            blendColor: "#006ab4", // 混合到非水域时
            opacity: 0.4,
            clampToGround: false,
          },
        },
      });
      map.addLayer(waterLayer);

      // 通用图层
      const commonLayer = new mars3d.layer.GraphicLayer();
      map.addLayer(commonLayer);

      // 警戒线-实线
      const warnLine1 = new mars3d.graphic.PolylinePrimitive({
        positions: [
          [121.595722, 29.902512],
          [121.596698, 29.898174],
        ],
        style: {
          color: "#ffff00",
          width: 2,
          zIndex: 1,
          label: {
            text: "警戒线",
            font: "20px 楷体",
            color: "#ffffff",
            outline: true,
          },
        },
      });
      commonLayer.addGraphic(warnLine1);
      // 警戒线-虚线
      const warnLine2 = new mars3d.graphic.PolylinePrimitive({
        positions: [
          [121.604186, 29.904517],
          [121.605453, 29.901206],
        ],
        style: {
          width: 2,
          materialType: mars3d.MaterialType.PolylineDash,
          materialOptions: {
            dashLength: 20.0,
            color: "#00ff00",
          },
        },
      });
      commonLayer.addGraphic(warnLine2);
      // 模拟桥线
      const bridgeLine = new mars3d.graphic.PolylinePrimitive({
        positions: [
          [121.600228, 29.903151],
          [121.601374, 29.899914],
        ],
        style: {
          color: "#ffffff",
          width: 10,
          zIndex: 5,
        },
      });
      commonLayer.addGraphic(bridgeLine);

      /**
       * author: cherishgor
       * function: 实时船只轨迹
       * date: 2022-12-02
       */

      // 船只数据 & 轨迹数据
      const ships = [
        {
          id: "001",
          name: "055",
          shipDirection: "西",
          type: 0,
        },
        {
          id: "002",
          name: "052D",
          type: 1,
        },
        {
          id: "003",
          name: "053H1G",
          type: 2,
        },
        {
          id: "004",
          name: "095N",
          type: 3,
        },
        {
          id: "005",
          name: "259X",
          type: 3,
        },
        {
          id: "006",
          name: "911A",
          type: 2,
        },
        {
          id: "007",
          name: "718M",
          type: 1,
        },
      ];
      const shipPath = [
        {
          id: "001",
          lon: 121.596858,
          lat: 29.901863,
          time: "2022-11-25 10:00:00",
        },
        {
          id: "001",
          lon: 121.603111,
          lat: 29.903646,
          time: "2022-11-25 10:01:00",
        },
        {
          id: "002",
          lon: 121.594962,
          lat: 29.900457,
          time: "2022-11-25 10:00:25",
        },
        {
          id: "002",
          lon: 121.606405,
          lat: 29.904148,
          time: "2022-11-25 10:01:00",
        },
        {
          id: "003",
          lon: 121.605872,
          lat: 29.903189,
          time: "2022-11-25 10:00:15",
        },
        {
          id: "003",
          lon: 121.595587,
          lat: 29.899295,
          time: "2022-11-25 10:01:00",
        },
        {
          id: "004",
          lon: 121.605486,
          lat: 29.901835,
          time: "2022-11-25 10:00:30",
        },
        {
          id: "004",
          lon: 121.597457,
          lat: 29.89931,
          time: "2022-11-25 10:01:00",
        },
        {
          id: "005",
          lon: 121.591539,
          lat: 29.899989,
          time: "2022-11-25 10:00:30",
        },
        {
          id: "006",
          lon: 121.59385,
          lat: 29.898979,
          time: "2022-11-25 10:00:30",
        },
        {
          id: "007",
          lon: 121.609213,
          lat: 29.905147,
          time: "2022-11-25 10:00:30",
        },
      ];

      // 设置时间
      map.clock.currentTime = Cesium.JulianDate.fromDate(
        new Date("2022-11-25 09:59:55")
      );

      // 创建动态（船只）图层
      const shipLayer = new mars3d.layer.GraphicLayer();
      map.addLayer(shipLayer);

      // 提示窗
      shipLayer.bindTooltip(function (event) {
        const attr = event.graphic?.attr;
        if (!attr) {
          return;
        }
        return `船只:${attr.id}`;
      });


      // 遍历ships数据加载船只
      const forShips = () => {
        console.log("加载了" + ships.length + "条船");
        console.log(ships, "船只列表");

        for (let i = 0; i < ships.length; i++) {
          const item = ships[i];
          // 不同tpye下的船只样式
          let modelParam;
          let silh;
          let labels;
          switch (item.type) {
            case 0:
              modelParam = {
                materialOptions: {
                  color: "#ffff00",
                  opacity: 1.0,
                  speed: 20,
                  count: 3,
                },
                show: false,
              };
              silh = {
                silhouette: false,
              };
              labels = {
                text: item.name,
                font_size: 19,
                font_family: "楷体",
                color: Cesium.Color.AZURE,
                outline: true,
                visibleDepth: false,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(10, -25), // 偏移量
              };
              break;
            case 1:
              modelParam = {
                materialOptions: {
                  color: "#ffff00",
                  opacity: 1.0,
                  speed: 20,
                  count: 3,
                },
                show: false,
              };
              silh = {
                silhouette: true,
                silhouetteColor: "#ff0000",
                silhouetteSize: 3,
              };
              labels = {
                text: `${item.name} 超高`,
                font_size: 19,
                font_family: "楷体",
                color: Cesium.Color.AZURE,
                outline: true,
                visibleDepth: false,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(10, -25), // 偏移量
              };
              break;
            case 2:
              modelParam = {
                materialOptions: {
                  color: "#ffff00",
                  opacity: 1.0,
                  speed: 20,
                  count: 3,
                },
                show: true,
              };
              silh = {
                silhouette: true,
                silhouetteColor: "#ffff00",
                silhouetteSize: 3,
              };
              labels = {
                text: `${item.name} 偏航`,
                font_size: 19,
                font_family: "楷体",
                color: Cesium.Color.AZURE,
                outline: true,
                visibleDepth: false,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(10, -25), // 偏移量
              };
              break;
            case 3:
              modelParam = {
                materialOptions: {
                  color: "#ffff00",
                  opacity: 1.0,
                  speed: 20,
                  count: 3,
                },
                show: false,
              };
              silh = {
                silhouette: true,
                silhouetteColor: "#2d8671",
                silhouetteSize: 3,
              };
              labels = {
                text: `${item.name} 超速`,
                font_size: 19,
                font_family: "楷体",
                color: Cesium.Color.AZURE,
                outline: true,
                visibleDepth: false,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(10, -25), // 偏移量
              };
              break;
            default:
          }
          const ship = new mars3d.graphic.Route({
            id: item.id,
            name: item.name,
            model: {
              url: "//data.mars3d.cn/gltf/imap/a35533afdd894d6385e1690749a27659/gltf/gltf2.gltf",
              clampToGround: false,
              ...silh,
            },
            circle: {
              radius: 50,
              materialType: mars3d.MaterialType.CircleWave,
              ...modelParam,
              clampToGround: false,
            },
            label: {
              ...labels,
            },
            polyline: {
              // color: "#ffffff",
              width: 2,
              clampToGround: false,
              // maxDistance: 1000,
              materialType: mars3d.MaterialType.PolylineDash,
              materialOptions: {
                dashLength: 10.0,
                color: "#ffffff",
              },
              leadTime: 0,
            },
            attr: item,
          });
          shipLayer.addGraphic(ship);
        }
      };

      let forecastInfos = [
        [121.607094, 29.904165],
        [121.609896, 29.904422],
        [121.612397, 29.905746],
      ];

      // 遍历shipPath数据添加动态点
      const forshipPath = () => {
        console.log(shipPath, "轨迹列表");

        shipLayer.eachGraphic((ship) => {
          const path = shipPath.filter((item) => {
            return item.id === ship.id;
          });

          // 将船轨迹的最后一个点设置为预测轨迹的第一个点
          // forecastInfos.unshift([
          //   path[path.length - 1].lon,
          //   path[path.length - 1].lat,
          // ]);

          // 循环添加预测轨迹
          const forecastRoute = new mars3d.graphic.PolylinePrimitive({
            positions: forecastInfos,
            style: {
              width: 2,
              materialType: mars3d.MaterialType.PolylineDash,
              materialOptions: {
                dashLength: 10.0,
                color: "#ffff00",
              },
              clampToGround: false,
            },
          });
          commonLayer.addGraphic(forecastRoute);

          path.forEach((item) => {
            const point = new mars3d.LngLatPoint(item.lon, item.lat, 0);
            ship.addDynamicPosition(point, item.time);
          });
        });
      };

      forShips();
      forshipPath();

      // 实际项目中使用存在的问题： a.使用websocket实时传入数据 监听数据变化 重复执行函数 会重复添加模型     b.移出模型问题
      /**
       * author: cherishgor
       * function: 实时船只轨迹
       * date: 2022-12-02
       */
    };

    onMounted(async () => {
      loadMap();
    });

    // return {}  : 返回一个对象，返回可在模板中使用   返回一个渲染函数 (h) 都存在以渲染函数为主
    return {};
  },
});
</script>

<style scoped>
.mars3d-container {
  width: 100%;
  height: calc(100vh - 120px);
}

.legend_box {
  position: absolute;
  width: 200px;
  left: 20px;
  top: 20px;
  z-index: 10001;
  background: rgb(0, 0, 0);
  border-radius: 5px;
  font-size: 15px;
  color: rgb(255, 255, 255);
}
.infomations {
  margin: 7%;
  font-family: "黑体";
  text-align: left;
}
</style>
