<template>
  <div id="threejs" class="threejs-container">
    <div class="legend_box">
      <div class="infomations">
        <p style="font-weight: bolder;">操作提示：</p>
        <p>鼠标左键：获取模型</p>
        <p>鼠标中键：缩放场景</p>
        <p>鼠标右键：旋转场景</p>
        <p>Q/W/E: 变换控制器</p>
      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, toRaw } from "vue";

import * as THREE from "three";
// 轨道控制器/鼠标操作
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 变换控制器/模型变换 TransformControls
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

export default defineComponent({
  name: "threeA",
  setup() {
    /*** 场景***/

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor("rgb(245, 247, 250)");

    /***  光照 ***/

    // 环境光
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.8);

    // 点光
    const pointLight = new THREE.PointLight("#ffffff", 0.5, 600, 0.2);
    pointLight.position.set(0, 100, 200);

    scene.add(ambientLight, pointLight);

    /*** 相机 ***/

    let camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );

    camera.position.set(50, 50, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.up = new THREE.Vector3(0, 1, 0);

    /*** WebGL渲染器 scene, camera在此处渲染 ***/

    renderer.setSize(window.innerWidth - 280, window.innerHeight - 100);
    renderer.render(scene, camera);

    /*** 模型 ***/

    // mCube模型
    const mCube = new THREE.Mesh(
      new THREE.BoxGeometry(20, 20, 20),
      new THREE.MeshStandardMaterial({
        color: "#00B2EE",
        metalness: 0,
        roughness: 0,
      })
    );
    mCube.position.set(5, 5, 5);
    mCube.name = "尼采";

    // 线 (未添加 12151513)
    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [];
    points.push(new THREE.Vector3(- 10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);

    // 鼠标移入事件
    mCube.addEventListener("mouseenter", () => {
      mCube.material.color = new THREE.Color("#00BFFF");
    });

    // 鼠标移出事件
    mCube.addEventListener("mouseleave", () => {
      mCube.material.color = new THREE.Color("#00B2EE");
    });

    // 辅助线网格线本质上也是模型
    const axesHelper = new THREE.AxesHelper(500);
    const gridHelper = new THREE.GridHelper(100, 10, "#B5B5B5", "#B5B5B5");
    scene.add(mCube, axesHelper, gridHelper);

    /*** 变换控制器 ***/

    let transformControls = new TransformControls(camera, renderer.domElement);
    scene.add(transformControls);

    /*** 射线发射器 ***/

    let raycaster = new THREE.Raycaster();

    /*** 鼠标移动事件 ***/

    let cacheObject = null; // 鼠标移入缓存效果
    // 初始化鼠标位置
    let mouse = new THREE.Vector2();
    //  屏幕鼠标x，屏幕鼠标y  视图宽度，视图高度
    let x = 0;
    let y = 0;
    let width = 0;
    let height = 0;
    renderer.domElement.addEventListener("mousemove", (event) => {
      x = event.offsetX;
      y = event.offsetY;
      width = renderer.domElement.offsetWidth;
      height = renderer.domElement.offsetHeight;
      mouse.x = (x / width) * 2 - 1;
      mouse.y = (-y * 2) / height + 1;

      raycaster.setFromCamera(mouse, camera); // 配置射线发射器
      // scene.remove(transformControls); // 移除变换控制器
      const intersection = raycaster.intersectObjects(scene.children);
      if (intersection.length) {
        const object = intersection[0].object;
        if (object !== cacheObject) {
          // 如果当前物体不等于缓存的物体
          if (cacheObject) {
            // 如果有缓存物体先执行之前物体的离开事件
            cacheObject.dispatchEvent({
              type: "mouseleave",
            });
          }
          object.dispatchEvent({
            // 添加当前物体进入事件
            type: "mouseenter",
          });
        } else if (object === cacheObject) {
          // 如果当前物体等于缓存的物体
          object.dispatchEvent({
            // 执行移动事件
            type: "mousemove",
          });
        }
        cacheObject = object;
      } else {
        if (cacheObject) {
          // 如果有缓存物体就先执行离开事件
          cacheObject.dispatchEvent({
            type: "mouseleave",
          });
        }
        cacheObject = null;
      }
    });

    // 鼠标点击模型添加变换控制器
    let transing = false;
    transformControls.addEventListener("mouseDown", (event) => {
      transing = true;
    });
    renderer.domElement.addEventListener("click", (event) => {
      if (transing) {
        transing = false;
        return;
      }
      scene.remove(transformControls); // 移除变换控制器
      transformControls.enabled = false; // 停用变换控制器
      raycaster.setFromCamera(mouse, camera); // 配置射线发射器，传递鼠标和相机对象
      const intersection = raycaster.intersectObjects(scene.children); // 获取射线发射器捕获的模型列表，传进去场景中所以模型
      if (intersection.length) {
        const object = intersection[0].object; // 获取第一个模型
        scene.add(transformControls); // 添加变换控制器
        transformControls.enabled = true; // 启用变换控制器
        transformControls.attach(object);
      }
    });
    // 监听变换控制器模式更改
    document.addEventListener("keyup", (event) => {
      if (transformControls.enabled) {
        // 变换控制器为启用状态执行
        if (event.key === "q") {
          // 鼠标按下q键，模式改为缩放
          transformControls.mode = "scale";
          return false;
        }
        if (event.key === "e") {
          // 鼠标按下e键，模式改为旋转
          transformControls.mode = "rotate";
          return false;
        }
        if (event.key === "w") {
          // 鼠标按下w键，模式改为平移
          transformControls.mode = "translate";
          return false;
        }
      }
    });

    let animate = () => {
      requestAnimationFrame(animate);

      mCube.rotation.x += 0.01;
      mCube.rotation.y += 0.01;
      renderer.render(scene, camera); // 渲染器渲染场景和相机

    };

    // 轨道控制器
    let orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.mouseButtons = {
      // LEFT: THREE.MOUSE.ROTATE, //
      LEFT: null, // 左键无功能
      MIDDLE: THREE.MOUSE.DOLLY, // 中键缩放
      // RIGHT: THREE.MOUSE.PAN,
      RIGHT: THREE.MOUSE.ROTATE, // 右键旋转
    };

    onMounted(async () => {
      document.getElementById("threejs")?.appendChild(renderer.domElement);
      animate();
    });

    return {};
  },
});
</script>

<style scoped>
.threejs-container {
  width: 100%;
  /* height: 735px; */
  height: calc(100vh - 120px);
  position: relative;
  /* background-color: burlywood; */
}

.legend_box {
  width: 15%;
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10001;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  font-size: 15px;
  color: rgb(0, 0, 0);
}

.infomations {
  margin: 7%;
  font-family: "黑体";
  text-align: left;
}
</style>
