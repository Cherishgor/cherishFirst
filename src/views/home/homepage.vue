<template>
  <el-row style="margin-left: 0%; margin-right: 0%" :gutter="40">
    <el-col :span="8">
      <p class="p">简介</p>
      <el-card style="background-color: #4789ff" :body-style="{ padding: '0px' }">
        <div class="infomations">
          <h class="atext">Cesium：</h>
          <h class="smalltext">基于JavaScript编写的使用WebGL的地图引擎</h><br />
          <br />
          <h class="atext">Mars3d：</h>
          <h class="smalltext">三维可视化平台</h><br />
          <br />
          <h class="atext">Three ：</h>
          <h class="smalltext">WebGL的JavaScript 3D库</h><br />
        </div>
        <div style="
            display: flex;
            justify-content: space-between;
            margin-right: 5%;
          ">
          <div></div>
          <div id="SmallEarth" style="width: 100px; height: 100px; background-color: #cfcfcf"></div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <p class="p" >作者</p>
      <el-card style="background-color: #828282" :body-style="{ padding: '0px' }">
        <div class="infomations">
          <h class="btext">姓 名：</h>
          <h class="smalltext">Cherishgor</h><br />
          <br />
          <h class="btext">属 地：</h>
          <h class="smalltext">陕西·西安</h><br />
          <br />
          <h class="btext">时 间：</h>
          <h class="smalltext">2022 - 12</h><br />
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <p class="p">页面</p>
      <el-card :body-style="{ padding: '0px' }">
        <div id="HistogramChart" style="
            width: 100%;
            height: 280px;
            /* background-color: #cfcfcf; */
            margin-top: 10px;
          "></div>
      </el-card>
    </el-col>
  </el-row>
  <el-row style="margin-left: 0%; margin-right: 0%" :gutter="30">
    <el-col :span="16">
      <p class="p">学校</p>
      <el-card :body-style="{ padding: '0px' }">
        <div id="mars2dContainer" class="mars2d-container"></div>

      </el-card>
    </el-col>
    <el-col :span="8">
      <p class="p">技术</p>
      <el-card :body-style="{ padding: '0px' }">
        <div id="PieChart" style="
            width: 100%;
            height: 280px;
            /* background-color: #cfcfcf; */
            margin-top: 10px;
          "></div>
      </el-card>
    </el-col>
  </el-row>
  <el-row style="margin-left: 0%; margin-right: 0%" :gutter="30">
    <el-col :span="8">
      <p class="p"></p>
      <el-card :body-style="{ padding: '0px' }">
        <div id="SmallFlower" style="width: 100%; height: 302px; background-color: #cfcfcf"></div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <p class="p"></p>
      <el-card :body-style="{ padding: '0px' }">
        <div id="LineChart" style="
            width: 100%;
            height: 280px;
            /* background-color: #cfcfcf; */
            margin-top: 10px;
          "></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, toRaw } from "vue";

import * as echarts from "echarts";
import "echarts-gl";
// mars2d
import "mars2d/dist/mars2d.css";
import * as mars2d from "mars2d";

export default defineComponent({
  name: "homepage",
  setup() {
    // 1-1 构建小地球
    const SmallEarth = () => {
      let chartDom = document.getElementById("SmallEarth");
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        backgroundColor: "#4789ff",
        globe: {
          baseTexture: "/img/earth.jpg",
          shading: "lambert",
          environment: "/img/basemap.png",
          atmosphere: {
            show: true,
          },
          light: {
            ambient: {
              intensity: 0.4,
            },
            main: {
              intensity: 1.5,
            },
          },
        },
        series: [],
      };

      option && myChart.setOption(option);
    };
    // 1-3 柱状图
    const HistogramChart = () => {
      let chartDom = document.getElementById("HistogramChart");
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        textStyle: {
          // 字体的样式
          // fontSize: 15,
          // color: "white",
          fontFamily: "黑体",
        },
        xAxis: {
          // show: false,
          type: "category",
          data: ["Cesium", "Mars", "ThreeJS"],
          axisLine: {
            //---坐标轴 轴线
            show: false,
          },
          axisTick: { show: false },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },

        series: [
          {
            data: [4, 3, 0],
            type: "bar",
            color: "#9C9C9C",
            itemStyle: {
              // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [12],
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    };
    // 3-2 折线图
    const LineChart = () => {
      let chartDom = document.getElementById("LineChart");
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        textStyle: {
          // 字体的样式
          // fontSize: 15,
          // color: "white",
          fontFamily: "黑体",
        },
        tooltip: {
          trigger: "axis",
        },
        // legend: {
        //   data: ["cesium", "three"],
        // }
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisTick: { show: false },
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
            // axisLine: { show: true },
            splitLine: {
              lineStyle: {
                color: "#4c4d4f",
                width: 0,
                type: "solid",
              },
            },
          },
        ],
        series: [
          {
            name: "cesium",
            type: "line",
            // stack: "Total",
            smooth: true,
            lineStyle: {
              width: 2,
              color: "#4789ff",
            },
            symbol: "circle", //设定为实心点
            symbolSize: 7, //设定实心点的大小
            showSymbol: false,
            // areaStyle: {
            //   opacity: 0.8,
            //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //     {
            //       offset: 0,
            //       color: "#4789ff",
            //     },
            //     {
            //       offset: 1,
            //       color: "#ffffff",
            //     },
            //   ]),
            // },
            emphasis: {
              focus: "series",
            },
            data: [200, 500, 400, 600, 700, 550, 900],
          },
        ],
      };

      option && myChart.setOption(option);
    };
    // 2-2 饼图
    const PieChart = () => {
      let chartDom = document.getElementById("PieChart");
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        textStyle: {
          // 字体的样式
          // fontSize: 15,
          // color: "white",
          fontFamily: "黑体",
        },
        tooltip: {
          trigger: "item",
        },

        series: [
          {
            name: "skill",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "DirectX" },
              { value: 735, name: "WebGL" },
              { value: 580, name: "Cesium" },
              { value: 484, name: "ThreeJS" },
              { value: 300, name: "Unity" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    };
    // 3-1 three
    const SmallFlower = () => {
      var chartDom = document.getElementById("SmallFlower");
      var myChart = echarts.init(chartDom);
      var option;

      var sin = Math.sin;
      var cos = Math.cos;
      var pow = Math.pow;
      var sqrt = Math.sqrt;
      var cosh = Math.cosh;
      var sinh = Math.sinh;
      var exp = Math.exp;
      var PI = Math.PI;
      var square = function (x) {
        return x * x;
      };
      var mod2 = function (a, b) {
        var c = a % b;
        return c > 0 ? c : c + b;
      };
      var theta1 = -(20 / 9) * PI;
      var theta2 = 15 * PI;
      function getParametricEquation() {
        return {
          u: {
            min: 0,
            max: 1,
            step: 1 / 24,
          },
          v: {
            min: theta1,
            max: theta2,
            step: (theta2 - theta1) / 575,
          },
          x: function (x1, theta) {
            var phi = (PI / 2) * exp(-theta / (8 * PI));
            var y1 =
              1.9565284531299512 *
              square(x1) *
              square(1.2768869870150188 * x1 - 1) *
              sin(phi);
            var X =
              1 -
              square(1.25 * square(1 - mod2(3.6 * theta, 2 * PI) / PI) - 0.25) /
              2;
            var r = X * (x1 * sin(phi) + y1 * cos(phi));
            return r * sin(theta);
          },
          y: function (x1, theta) {
            var phi = (PI / 2) * exp(-theta / (8 * PI));
            var y1 =
              1.9565284531299512 *
              square(x1) *
              square(1.2768869870150188 * x1 - 1) *
              sin(phi);
            var X =
              1 -
              square(1.25 * square(1 - mod2(3.6 * theta, 2 * PI) / PI) - 0.25) /
              2;
            var r = X * (x1 * sin(phi) + y1 * cos(phi));
            return r * cos(theta);
          },
          z: function (x1, theta) {
            var phi = (PI / 2) * exp(-theta / (8 * PI));
            var y1 =
              1.9565284531299512 *
              square(x1) *
              square(1.2768869870150188 * x1 - 1) *
              sin(phi);
            var X =
              1 -
              square(1.25 * square(1 - mod2(3.6 * theta, 2 * PI) / PI) - 0.25) /
              2;
            var r = X * (x1 * sin(phi) + y1 * cos(phi));
            return X * (x1 * cos(phi) - y1 * sin(phi));
          },
        };
      }
      option = {
        toolbox: {
          iconStyle: {
            normal: {
              borderColor: "#fff",
            },
          },
          left: 0,
        },
        xAxis3D: {
          type: "value",
        },
        yAxis3D: {
          type: "value",
        },
        zAxis3D: {
          type: "value",
        },
        grid3D: {
          show: false,
          // environment: "/img/basemap_.png",
          axisPointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          postEffect: {
            enable: true,
            SSAO: {
              enable: true,
              radius: 10,
              intensity: 2,
            },
            edge: {
              enable: true,
            },
          },
          temporalSuperSampling: {
            enable: true,
          },
          light: {
            main: {
              intensity: 3,
              shadow: true,
            },
            ambient: {
              intensity: 0,
            },
            ambientCubemap: {
              texture: "/img/canyon.hdr",
              // exposure: 0,
              // diffuseIntensity: 1,
              // specularIntensity: 0.5,
            },
          },
          viewControl: {
            // projection: 'orthographic'
          },
        },
        series: [
          {
            type: "surface",
            parametric: true,
            shading: "realistic",
            silent: true,
            wireframe: {
              show: false,
            },
            realisticMaterial: {
              baseTexture: "/img/basemap_.png",
              roughness: 0.7,
              metalness: 0,
              textureTiling: [200, 20],
            },
            itemStyle: {
              color: "#fff",
            },
            parametricEquation: getParametricEquation(),
          },
        ],
      };

      option && myChart.setOption(option);
    };
    // 2-1 mars2d
    const loadmars2d = () => {
      let map = new mars2d.Map("mars2dContainer", {
        zoom: 14,
        center: { lng: 115.823498, lat: 28.654306 },
        copyright: false,
        // basemaps: [
        //   { name: "高德地图", type: "gaode", layer: "vec", show: true },
        //   {
        //     name: "高德卫星",
        //     type: "group",
        //     layers: [
        //       { name: "底图", type: "gaode", layer: "img_d" },
        //       { name: "注记", type: "gaode", layer: "img_z" },
        //     ],
        //   },
        // ],
      });
      let tileLayer = new mars2d.layer.MapboxLayer({
        type: "mapbox",
        username: "marsgis",
        styleId: "cki0a92b123qo1aluk0e5v7sb",
        token: mars2d.Token.mapbox,
        zIndex: 999,
      });
      map.addLayer(tileLayer);
      // 
      const NCHU = new mars2d.layer.GraphicLayer()
      map.addLayer(NCHU)
      //
      const nchu = new mars2d.graphic.Marker({
        latlng: L.latLng(28.654306, 115.823498),
        style: {
          width: 12,
          pulse: true,
          pulseColor: "#4789FF",
          pulseShadowColor: "#87CEFF",
          pulseDuration: 2
        }
      })
      NCHU.addGraphic(nchu)
    };
    onMounted(() => {
      SmallEarth();
      LineChart();
      PieChart();
      HistogramChart();
      SmallFlower();
      loadmars2d();
    });

    return {
      SmallEarth,
      LineChart,
      PieChart,
      HistogramChart,
      SmallFlower,
      loadmars2d,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mars2d-container {
  width: 100%;
  height: 302px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.ep-bg-purple {
  background-color: rgb(207, 177, 177);
}

.p {
  font-size: 20px;
  /* margin-left: 20%; */
  margin-top: 0%;
  font-weight: bold;
  /* margin-bottom: 2%; */
  color: #343c6a;
  text-align: left;
}

.image {
  width: 100%;
  display: block;
}

.el-card {
  border-radius: 30px;
  background-color: #ffffff;
  width: 100%;
  height: 300px;
}

.infomations {
  margin: 7%;
  text-align: left;
}

.atext {
  font-size: larger;
  color: #c2d3ff;
  font-family: "黑体";
}

.btext {
  font-size: larger;
  color: #c2c8d4;
  font-family: "黑体";
}

.smalltext {
  font-size: large;
  color: #ffffff;
  font-family: "黑体";
}
</style>
