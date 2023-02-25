<!--
 * @Author: chenwenda316
 * @Date: 2022-12-03 17:57:22
 * @LastEditTime: 2023-02-25 20:41:42
 * @FilePath: \class_app_dev\src\views\SeatView.vue
-->
<template>
  <div class="about">
    <svg ref="SVGref"
      viewBox="0 0 200 173.2051"
      height="100%"
      width="min(calc(100vh * 1.1546 - 60px * 1.1546), calc(100vw - 124px))"
      style="
        display: block;
        margin: auto;
        transform-origin: 50% 70%;
        font-size: 7px;
      "
      :style="{
        scale: scaleValue / 100 + 1,
        rotate: rotated ? '180deg' : '',
        'transform-origin': '50% ' + yValue + '%',
      }"
    >
      <!-- <svg viewBox="0 0 200 173.2051" height="100%" width="min(calc(100vh * 1.1546 - 60px * 1.1546), calc(100vw - 124px))" style="display:block;margin: auto;transform-origin: 50% 70%;" :style="{ scale: scaleValue/100 + 1 ,font-color : 'red'}"> -->
      <polygon
        points="50,0 150,0 200,86.6025 150,173.2051 50,173.2051 0,86.6025"
        style="fill: white"
      />
      <polyline
        points="50,0 150,0 200,86.6025 150,173.2051 50,173.2051 0,86.6025 50,0"
        style="fill: none; stroke: black; stroke-width: 0.3"
      />
      <polygon
        points="35.6423,24.8682 38.6423,26.3682 10.289,75.4976 14.289,77.4976 14.289,95.7075 10.289,97.7075  38.6423,146.8369   35.6423,148.3369  0,86.6025"
        style="fill: grey"
      />
      <polygon
        style="fill: grey"
        points="175,43.3012 200,86.6025 175,129.9038 171,127.2371 195.892,84.6025 173,44.6345"
      ></polygon>
      <polyline
        points="40.2813,16.8332 58.6393,26.3682 141.3607,26.3682 159.7186,16.8332"
        style="fill: none; stroke: black; stroke-width: 0.3"
      />
      <polygon
        points="85,26.3682 115,26.3682 115,13.3682 85,13.3682 "
        style="fill: white"
        stroke="black"
        stroke-width="0.3"
      />
      <!-- <text x="55" y="90" fill="black" transform="rotate(-15 80,80)">Coming soon.</text> -->
      <text
        x="100"
        y="23.3682"
        style="font-size: 10px; text-anchor: middle"
        :transform="rotated ? 'rotate(' + 180 + ' ' + 100 + ',' + 20 + ')' : ''"
      >
        讲台
      </text>
      <text
        v-for="desk in studentPositions"
        :x="desk.x"
        :y="desk.y"
        class="desk"
        :style="{ fontSize: (desk.name.length == 4 ? 3.9 : 4.9) + 'px' }"
        :transform="
          rotated
            ? 'rotate(' + 180 + ' ' + desk.x + ',' + (desk.y - 1.9) + ')'
            : ''
        "
      >
        {{ desk.name || "null" }}
      </text>
      <rect
        v-for="rect in studentPositions"
        :x="rect.x - deskWidth / 2"
        :y="rect.y - deskHeight / 2 - 2"
        :width="deskWidth"
        :height="deskHeight"
        stroke="black"
        stroke-width="0.3"
        fill="none"
      ></rect>
      <!-- for class 13(ntr) -->
      <rect
        :x="128"
        :y="33"
        :width="16"
        :height="10"
        fill="none"
        stroke="black"
        stroke-width="0.3"
      ></rect>
      <rect
        :x="144"
        :y="33"
        :width="16"
        :height="10"
        fill="none"
        stroke="black"
        stroke-width="0.3"
      ></rect>
      <rect
        :x="160"
        :y="53"
        :width="16"
        :height="10"
        fill="none"
        stroke="black"
        stroke-width="0.3"
      ></rect>
      <rect
        :x="160"
        :y="73"
        :width="16"
        :height="10"
        fill="none"
        stroke="black"
        stroke-width="0.3"
      ></rect>
      <text
        x="100"
        y="4"
        style="font-size: 3px; text-anchor: middle"
        :transform="rotated ? 'rotate(' + 180 + ' ' + 100 + ',' + 4 + ')' : ''"
      >
        Changed {{changeValue}} times. Developed by {{developer.join(', ')}}. based on Vue3.
      </text>
    </svg>
    <n-input-number
      v-model:value="changeValue"
      style="position: absolute; top: 30px"
    >
      <template #prefix> 变换 </template>
      <template #suffix>
        <!-- 次 -->
      </template>
    </n-input-number>
    <n-slider
      v-model:value="scaleValue"
      step="1"
      :default-value="0"
      :format-tooltip="formatTooltip"
      vertical
      style="
        height: calc(100vh - 200px);
        position: absolute;
        margin-top: 60px;
        top: 30px;
      "
    />
    <n-slider
      v-model:value="yValue"
      step="1"
      :default-value="70"
      :format-tooltip="formatTooltip_y"
      vertical
      style="
        height: calc(100vh - 200px);
        position: absolute;
        left: 60px;
        margin-top: 60px;
        top: 30px;
      "
    />
    <n-switch
      v-model:value="rotated"
      style="position: absolute; bottom: 75px; background-color: #ffffffaa"
    />
    <n-button type="success"
      style="position: absolute; bottom: 30px;"
      @click="print"
    >
      打印
    </n-button>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import md5 from "md5";

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
  { x: 116, y: 40 },
  { x: 116, y: 60 },
  { x: 116, y: 80 },
  { x: 116, y: 100 },
  { x: 116, y: 120 },
  { x: 116, y: 140 },
  { x: 116, y: 160 },
  //6
  { x: 136, y: 60 },
  { x: 136, y: 80 },
  { x: 136, y: 100 },
  { x: 136, y: 120 },
  { x: 136, y: 140 },
  //7
  { x: 152, y: 60 },
  { x: 152, y: 80 },
  { x: 152, y: 100 },
  { x: 152, y: 120 },
  { x: 152, y: 140 },
];
// const stuPositions = JSON.parse(JSON.stringify(deskPositions));
// stuPositions[0].name = "王艺"
const studentMap = [
  ["徐梓宸", "高天鹤", "魏雅萱", "严绍恒", "梁义", "胡紫雯"],
  ["周成豫", "洪玮骏", "郜韵然", "钟亚北", "魏嘉禾"],
  ["王艺", "吕宬恺", "马诗博", "徐子轩", "沈奕帆", "上官许铨", "陈文达"],
  ["王梓一", "许畋", "郭玥彤", "肖雅迪", "李桐瑶", "吴咏烜", "赵文婕"],
  ["周姜祎", "马子润", "李知恒", "单绎宁", "过德麟", "王梓淇"],
  ["王健祺", "张家睿", "孙妍", "何亦白", "许景宁", "鲁临翾"],
  ["许琳章", "李谨硕", "周鼎宸", "张瀞匀", "孔祥晨", "郑宇轩"],
];

export default defineComponent({
  setup() {
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
      SVGref :ref(void 0),
      developer:["for_each",'Chison']
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
      let deleteCount = [1, 1, 2, 2, 2, 0, 0];
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
  methods:{
      print(){
        window.$print(this.SVGref)
      }
  }
  ,
  mounted() {
    // window.$controller = new AbortController();
    // window.addEventListener(
    //   "beforeprint",
    //   () => {
    //     console.log("beforeprint");
    //     this.$emit("changeCollapsedWidth", 0);
    //   },
    //   { signal: window.$controller.signal }
    // );
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
    // window.$controller.abort()
    // window.$controller = undefined;
  },
});
</script>



<style>
.desk {
  text-anchor: middle;
  /*font-size: 4.9px;*/
}
</style>