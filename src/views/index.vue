<template>
  <div class="common-layout">
    <el-container class="layout-container-demo" style="height: 935px;">
      <el-aside style="background-color: white" width="12%">
        <el-col>
          <p
            style="
              font-size: 25px;
              /* margin-left: 20%; */
              margin-top: 5%;
              margin-bottom: 7%;
              font-weight: bolder;
              color: #343c6a;
              /* font-family: '宋体' */
            "
          >
            Web3D
          </p>
          <el-menu
            :router="true"
            default-active="/"
            class="el-menu-vertical-demo"
          >
            <el-menu-item index="/">
              <el-icon><HomeFilled /></el-icon>
              <span
                style="
                  font-size: 20px;
                  font-weight: bold;
                  text-align: center;
                  color: #5b73a0;
                "
                >首页</span
              >
            </el-menu-item>

            <el-sub-menu index="1">
              <template #title>
                <el-icon></el-icon>
                <span
                  style="
                    font-size: 20px;
                    font-weight: bold;
                    text-align: center;
                    color: #5b73a0;
                  "
                  >Cesium</span
                >
              </template>
              <el-menu-item-group
                title="欲买桂花同载酒，终不似少年游"
                style="font-family: '黑体'; text-align: left;"
              >
                <el-menu-item index="/cesiumMap">cesiumMap</el-menu-item>
                <el-menu-item index="/cesiumMapbox">cesiumMapbox</el-menu-item>
                <el-menu-item index="/cesiumRealtimeroute"
                  >cesiumRealtimeroute</el-menu-item
                >
                <el-menu-item index="/cesiumShowmodel"
                  >cesiumShowmodel</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <el-icon></el-icon>
                <span
                  style="
                    font-size: 20px;
                    font-weight: bold;
                    text-align: center;
                    color: #5b73a0;
                  "
                  >Mars</span
                >
              </template>
              <el-menu-item-group
                title="秋风生渭水，落叶满长安"
                style="font-family: '黑体'; text-align: left;"
              >
                <el-menu-item index="/mars2dMap">mars2dMap</el-menu-item>
                <el-menu-item index="/marsMap">marsMap</el-menu-item>
                <el-menu-item index="/marsMapbox">marsMapbox</el-menu-item>
                <el-menu-item index="/marsRealtimeroute"
                  >marsRealtimeroute</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="3">
              <template #title>
                <el-icon></el-icon>
                <span
                  style="
                    font-size: 20px;
                    font-weight: bold;
                    text-align: center;
                    color: #5b73a0;
                  "
                  >WebGL</span
                >
              </template>
              <el-menu-item-group
                title="海内存知己，天涯若比邻"
                style="font-family: '黑体'; text-align: left;"
              >
                <el-menu-item index="/threeA">three</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon></el-icon>
                <span
                  style="
                    font-size: 20px;
                    font-weight: bold;
                    text-align: center;
                    color: #5b73a0;
                  "
                  >WebGPU</span
                >
              </template>
              <el-menu-item-group
                title="朱门酒肉臭，路有冻死骨"
                style="font-family: '黑体'; text-align: left;"
              >
                <el-menu-item index="">WebGPU`待开发`</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-menu-item index="5">
              <el-icon><Setting /></el-icon>
              <span
                style="
                  font-size: 20px;
                  font-weight: bold;
                  text-align: center;
                  color: #5b73a0;
                "
                >设置</span
              >
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header
          style="
            /* text-align: right; */
            background-color: white;
            border-left: 1px solid #e6eff5;
          "
        >
          <el-row :gutter="0">
            <el-col
              :span="21"
              style="background-color: #ffffff; height: 60px"
            ></el-col>
            <el-col :span="1">
              <div style="margin-top: 17px; text-align: right;">
                <el-icon :size="26" style="color: #5b73a0"><Setting /></el-icon>
              </div>
            </el-col>
            <!-- <el-col :span="1">
              <div style="margin-top: 17px; text-align: center">
                <el-icon :size="26" style="color:#4789ff"><Position /></el-icon>
              </div>
            </el-col> -->
            <el-col :span="1">
              <div style="margin-top: 17px; text-align: center">
                <el-icon :size="26" style="color:#5b73a0"><ChatLineRound /></el-icon>
              </div>
            </el-col>
            <el-col :span="1">
              <div style="margin-top: 5px; text-align: center">
                <el-avatar
                  :size="50"
                  src="https://www.z4a.net/images/2022/10/19/IMG_965220221019-002213.jpg"
                />
              </div>
            </el-col>
          </el-row>
          <!-- <div style="margin-top: 8px; background-color: #5b73a0;">
            <el-avatar
              src="https://www.z4a.net/images/2022/10/19/IMG_965220221019-002213.jpg"
            />
          </div> -->
        </el-header>
        <el-main
          style="
            border-left: 1px solid #e6eff5;
            border-top: 1px solid #e6eff5;
            background-color: #f5f7fa;
          "
        >
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  Tools,
  HomeFilled,
  Share,
  Setting,
  BellFilled,
  ChatLineRound,
  Position
} from "@element-plus/icons-vue";
export default {
  name: "index",
  components: {
    Tools,
    HomeFilled,
    Share,
    Setting,
    BellFilled,
    ChatLineRound,
    Position
  },
  setup() {
    const data = reactive({});
    const state = reactive({
      showMenu: true,
      currentPath: "",
    });
    onMounted(() => {
      const router = useRouter();
      state.currentPath = router.options.routes[0].path;
    });
    return {
      state,
    };
  },
};
</script>

<style>
.el-menu {
  border-right: none !important;
}
.el-menu-item {
  font-size: 15px;
  text-align: center;
  color: #5b73a0;
}

#app,
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5fc;
  overflow-y: hidden;
}
</style>
