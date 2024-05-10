<!--
 * @Author: chenwenda316
 * @Date: 2022-12-03 17:57:22
 * @LastEditTime: 2023-09-08 21:35:01
 * @FilePath: \class_app_dev\src\views\SeatView.vue
-->
<template >
  <div class="about" @touchend="onCtrlpointerUp" @pointerup="onCtrlpointerUp">
    <svg ref="SVGref" viewBox="0 0 200 173.2051" height="100%"
      width="min(calc(100vh * 1.1546 - 60px * 1.1546), calc(100vw - 124px))" style="
        display: block;
        margin: auto;
        transform-origin: 50% 70%;
        font-size: 7px;
      " :style="{
        scale: scaleValue / 100 + 1,
        rotate: rotated ? '180deg' : '',
        'transform-origin': '50% ' + yValue + '%',
      }">
      <!-- <svg viewBox="0 0 200 173.2051" height="100%" width="min(calc(100vh * 1.1546 - 60px * 1.1546), calc(100vw - 124px))" style="display:block;margin: auto;transform-origin: 50% 70%;" :style="{ scale: scaleValue/100 + 1 ,font-color : 'red'}"> -->
      <polygon points="50,0 150,0 200,86.6025 150,173.2051 50,173.2051 0,86.6025" style="fill: white" />
      <polyline points="50,0 150,0 200,86.6025 150,173.2051 50,173.2051 0,86.6025 50,0"
        style="fill: none; stroke: black; stroke-width: 0.3" />
      <polygon 
          points="35.6423,24.8682 38.6423,26.3682 10.289,75.4976 14.289,77.4976 14.289,95.7075 10.289,97.7075  38.6423,146.8369   35.6423,148.3369  0,86.6025"
          style="fill:grey"
      />
      <polygon 
          points="174.3577,42.1887 171.3577,44.1887 189.711,75.4976 185.711,77.4976 185.711,95.7075 189.711,97.7075  171.3577,129.5164   174.3577,131.5164  200,86.6025"
          style="fill:grey"
      />
      <polyline points="40.2813,16.8332 58.6393,26.3682 141.3607,26.3682 159.7186,16.8332"
        style="fill: none; stroke: black; stroke-width: 0.3" />
      <polygon points="85,26.3682 115,26.3682 115,13.3682 85,13.3682 " style="fill: white" stroke="black"
        stroke-width="0.3" />
      <path d="M168.8,32.57c-3.99,2.3-9.06,1.01-11.47-2.88-.05-.08-.09-.16-.14-.23l7.36-4.25"
        style="fill: none; stroke: black; stroke-width: 0.3" />
      <path d="M164.6,148l-7.4-4.2c0.1-0.1,0.1-0.1,0.1-0.2c2.4-3.9,7.5-5.2,11.5-2.9"
        style="fill: none; stroke: black; stroke-width: 0.3" />
      <!-- <text x="55" y="90" fill="black" transform="rotate(-15 80,80)">Coming soon.</text> -->
      <text x="100" y="23.3682" style="font-size: 10px; text-anchor: middle"
        :transform="rotated ? 'rotate(' + 180 + ' ' + 100 + ',' + 20 + ')' : ''">
        讲台
      </text>
      <text v-for="desk in studentPositions" :key="desk" :x="desk.x" :y="desk.y" class="desk"
        :style="{ fontSize: (desk.name.length == 4 ? 3.9 : 4.9) + 'px' }" :transform="rotated
          ? 'rotate(' + 180 + ' ' + desk.x + ',' + (desk.y - 1.9) + ')'
          : ''
          ">
        {{ desk.name || "null" }}
      </text>
      <rect v-for="rect in studentPositions" :key="rect" :x="rect.x - deskWidth / 2" :y="rect.y - deskHeight / 2 - 2"
        :width="deskWidth" :height="deskHeight" stroke="black" stroke-width="0.3" fill="none"></rect>
      <!-- for class 13(ntr) -->
      <rect :x="48" :y="153" :width="16" :height="10" fill="none" stroke="black" stroke-width="0.3"></rect>
      <rect :x="112" :y="153" :width="16" :height="10" fill="none" stroke="black" stroke-width="0.3"></rect>
      <rect :x="128" :y="153" :width="16" :height="10" fill="none" stroke="black" stroke-width="0.3"></rect>
      <text x="100" y="4" style="font-size: 3px; text-anchor: middle"
        :transform="rotated ? 'rotate(' + 180 + ' ' + 100 + ',' + 4 + ')' : ''">
        Changed {{ changeValue }} times. Developed by
        {{ developer.join(", ") }}. based on Vue3.
      </text>
    </svg>
    <n-card :bordered="false" title="控制台" header-style="font-size: 3vh" header-extra-style="font-size: 2vh" :style="{
      top: ctrlY / devicePixelRatio + 'px',
      left: ctrlX / devicePixelRatio + 'px',
    }" class="ctrl" @pointerdown="onCtrlpointerDown" @touchstart="onCtrlpointerDown">
      <template #header-extra> Console </template>
      <n-input-number v-model:value="changeValue" style="position: absolute; bottom: 16vh; right: 2.5vh; width: 20.5vh"
        @pointerdown.stop="() => { }" @touchstart.stop="() => { }">
        <template #prefix>变换</template>
      </n-input-number>
      <n-slider v-model:value="scaleValue" step="1" :default-value="0" :format-tooltip="formatTooltip" style="
          width: 20vh;
          position: absolute;
          --n-rail-color: rgba(180, 180, 180, 1);
          --n-rail-height: 0.8vh;
          margin-top: 60px;
          bottom: 11vh;
          right: 3vh;
        " @pointerdown.stop="() => { }" @touchstart.stop="() => { }" />
      <template #footer>
        <n-switch v-model:value="rotated" style="
            position: absolute;
            bottom: 4.5vh;
            left: 3vh;
            --n-rail-color: rgba(180, 180, 180, 1);
            background-color: transparent;
          " @pointerdown.stop="() => { }" @touchstart.stop="() => { }" />
        <n-button type="success" style="
            position: absolute;
            right: 3vh;
            bottom: 3.7vh;
            width: 8vh;
            height: 5vh;
            border-radius: 0.8vh;
            align-items: center;
            font-size: 2vh;
          " @click.stop="print" @pointerdown.stop="() => { }" @touchstart.stop="() => { }">
          打印
        </n-button>
      </template>
    </n-card>
    <!--<n-slider
      v-model:value="yValue"
      step="1"
      :default-value="70"
      :format-tooltip="formatTooltip_y"
      vertical
      style="
        height: calc(100vh - 200px);
        position: absolute;
        --n-rail-color: rgba(180, 180, 180, 1);
        left: 60px;
        margin-top: 60px;
        top: 30px;                                                                                                                                
      "
    />-->
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import md5 from "md5";
import { debounce } from "lodash-es";

const deskPositions = [
  //1
  { x: 48, y: 40 },
  { x: 48, y: 60 },
  { x: 48, y: 80 },
  { x: 48, y: 100 },
  { x: 48, y: 120 },
  { x: 48, y: 140 },
  //2
  { x: 64, y: 40 },
  { x: 64, y: 60 },
  { x: 64, y: 80 },
  { x: 64, y: 100 },
  { x: 64, y: 120 },
  { x: 64, y: 140 },
  //3
  { x: 84, y: 40 },
  { x: 84, y: 60 },
  { x: 84, y: 80 },
  { x: 84, y: 100 },
  { x: 84, y: 120 },
  { x: 84, y: 140 },
  { x: 84, y: 160 },
  //4
  { x: 100, y: 40 },
  { x: 100, y: 60 },
  { x: 100, y: 80 },
  { x: 100, y: 100 },
  { x: 100, y: 120 },
  { x: 100, y: 140 },
  { x: 100, y: 160 },
  //5
  { x: 120, y: 40 },
  { x: 120, y: 60 },
  { x: 120, y: 80 },
  { x: 120, y: 100 },
  { x: 120, y: 120 },
  { x: 120, y: 140 },
  //6
  { x: 136, y: 140 },
  { x: 136, y: 40 },
  { x: 136, y: 60 },
  { x: 136, y: 80 },
  { x: 136, y: 100 },
  { x: 136, y: 120 },
  //7
  { x: 28, y: 70 },
  { x: 28, y: 90 },
  { x: 28, y: 110 },
  { x: 156, y: 70 },
  { x: 156, y: 90 },
  { x: 156, y: 110}
];
// const stuPositions = JSON.parse(JSON.stringify(deskPositions));
// stuPositions[0].name = "王艺"
const studentMap = [
  ["张家睿", "周姜祎", "李谨硕", "魏雅萱", "高天鹤", "孙妍"],
  ["洪玮骏", "李桐瑶", "许琳章", "吴咏烜", "上官许铨", "陈艾鹏"],
  ["何亦白", "鲁临翾", "张瀞匀", "肖雅迪", "孔祥晨", "严绍恒", "周成豫"],
  ["郑宇轩", "王梓淇", "郭玥彤", "胡紫雯", "许景宁", "周鼎宸", "陈文达"],
  ["徐梓宸", "梁义", "钟亚北", "马子润", "过德麟", "魏嘉禾"],
  ["王梓一", "许畋", "单绎宁", "郜韵然", "王健祺", "赵文婕"],
  ["李知恒", "王艺", "吕宬恺", "马诗博", "徐子轩", "沈奕帆"],];


export default defineComponent({
  setup() {
    const devicePixelRatio = 1 || window.devicePixelRatio;

    return {
      formatTooltip: (value) => `${value + 100}%`,
      formatTooltip_y: (value) => `${value}%`,
      scaleValue: ref(0),
      yValue: ref(50),
      deskPositions,
      deskWidth: 16,
      deskHeight: 10,
      changeValue: ref(0),
      rotated: ref(0),
      SVGref: ref(void 0),
      developer: ["for_each", "Chison"],
      ctrlX: ref(64 * devicePixelRatio),
      ctrlY: ref(0),
      onDrop: ref(0),
      offsetX: ref(0),
      offsetY: ref(0),
      devicePixelRatio,
    };
  },
  computed: {
    studentPositions() {
      let studentFlat = studentMap.flat();
      let changedStudentMap = studentMap.slice();
      let res = deskPositions.slice();

      let changeValue = this.changeValue;

      let changeValueX = changeValue % 7;
      changedStudentMap = changedStudentMap
        .slice(-changeValueX)
        .concat(changedStudentMap.slice(0, -changeValueX));

      changedStudentMap.forEach((array, index) => {
        let changeValueY = changeValue % array.length;
        // console.log(changeValueY);
        changedStudentMap[index] = array
          .slice(changeValueY)
          .concat(array.slice(0, changeValueY));
        // console.log(element, index);
      });

      let randomStudent = [];
      //let deleteCount = [1, 1, 2, 2, 2, 0, 0];
      let deleteCount = [];
      changedStudentMap.forEach((array, index) => {
        randomStudent.push(...array.slice(5));
        changedStudentMap[index] = array.slice(0, 5);
        deleteCount.push(array.length - 5);
      });

      // console.log("csm",changedStudentMap);

      let newRandomStudent = [];
      let randomSeed = md5(randomStudent) || [...md5(randomStudent)];
      randomStudent.forEach((element, index) => {
        let num =
          (Number(randomSeed[index])
            ? Number(randomSeed[index])
            : 9 + randomSeed.charCodeAt(index) - 97) %
          (newRandomStudent.length + 1);
        newRandomStudent.splice(num, 0, element);
      });

      changedStudentMap.forEach((array, index) => {
        changedStudentMap[index].push(
          ...newRandomStudent.slice(0, deleteCount[index])
        );
        newRandomStudent.splice(0, deleteCount[index]);
      });

      // console.log(randomStudent,newRandomStudent);

      // console.log(randomSeed, changedStudentMap);

      res.forEach((element, index) => {
        element.name =
          changedStudentMap.flat()[index] || 1 || studentFlat[index];
        // console.log(element, index);
      });
      return res;
    },
  },
  methods: {
    print() {
      window.$print(this.SVGref);
    },
    onCtrlpointerDown(e) {
      console.log("eventd", e, devicePixelRatio, e.x, e.y);
      this.onDrop = 1;
      this.offsetX = e.x || e.touches[0].clientX;
      this.offsetY = e.y || e.touches[0].clientY;
    },
    onCtrlpointerUp(e) {
      // console.info(this)
      // console.log("eventu", e, devicePixelRatio, e.x, e.y);
      // console.log("eventu", devicePixelRatio, this.offsetX, this.offsetY);
      if (!this.onDrop) {
        return;
      }
      this.onDrop = 0;
      this.ctrlX =
        this.ctrlX + (e.x || e.changedTouches[0].clientX) - this.offsetX;
      this.ctrlY =
        this.ctrlY + (e.y || e.changedTouches[0].clientY) - this.offsetY;
      this.offsetX = 0;
      this.offsetY = 0;
    },
    // onCtrlpointerMove,
  },
  mounted() {
    window.$pcontroller = new AbortController();
    window.addEventListener(
      "pointermove",
      debounce((e) => {
        // console.info(this)
        // console.log("shabimove",  e.x, e.y,this.offsetX,this.offsetY,this.ctrlX,this.ctrlY);
        // console.log("eventu", devicePixelRatio, this.offsetX, this.offsetY);
        if (!this.onDrop) {
          return;
        }
        this.onDrop = 1;
        this.ctrlX =
          this.ctrlX + (e.x || e.changedTouches[0].clientX) - this.offsetX;
        this.ctrlY =
          this.ctrlY + (e.y || e.changedTouches[0].clientY) - this.offsetY;
        this.offsetX = (e.x || e.changedTouches[0].clientX);
        this.offsetY = (e.y || e.changedTouches[0].clientY);
      }, 10),
      { signal: window.$pcontroller.signal }
    );
    // window.addEventListener(
    //   "afterprint",
    //   () => {
    //     console.log("afterprint");
    //     this.$emit("changeCollapsedWidth", 64);
    //   },
    //   { signal: window.$controller.signal }
    // );
  },
  unmounted() {
    window.$pcontroller.abort()
    delete window.$pcontroller;
  },
});
</script>



<style scoped>
.n-card {
  width: 25.5vh;
  height: 30vh;
  border-radius: 2vh;
  background: rgba(255, 255, 255, 0.8);


}

.desk {
  text-anchor: middle;
  /*font-size: 4.9px;*/
}

.ctrl {
  position: fixed;
  user-select: none;
}
</style>