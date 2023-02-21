<!--
 * @Author: chenwenda316
 * @Date: 2022-12-03 17:57:22
 * @LastEditTime: 2023-02-20 23:22:55
 * @FilePath: \app\class_app_dev\src\views\SeatView.vue
-->
<template>
<div class="about">
    <n-slider v-model:value="scaleValue" step="1" :default-value="0" :format-tooltip="formatTooltip" vertical style="height: calc(100vh - 60px);position: absolute;"/>
    <n-slider v-model:value="yValue" step="1" :default-value="70" :format-tooltip="formatTooltip_y" vertical style="height: calc(100vh - 60px);position: absolute;left:60px"/>
    <svg viewBox="0 0 200 173.2051" height="100%" width="min(calc(100vh * 1.1546 - 60px * 1.1546), calc(100vw - 124px))" style="display:block;margin: auto;transform-origin: 50% 70%;font-size:7px;" :style="{ 'scale': scaleValue/100 + 1, 'transform-origin':'50% ' + yValue + '%' }">
    <!-- <svg viewBox="0 0 200 173.2051" height="100%" width="min(calc(100vh * 1.1546 - 60px * 1.1546), calc(100vw - 124px))" style="display:block;margin: auto;transform-origin: 50% 70%;" :style="{ scale: scaleValue/100 + 1 ,font-color : 'red'}"> -->
        <polygon points="50,0 150,0 200,86.6025 150,173.2051 50,173.2051 0,86.6025"
          style="fill:white"/>
        <polygon points="35.6423,24.8682 38.6423,26.3682 10.289,75.4976 14.289,77.4976 14.289,95.7075 10.289,97.7075  38.6423,146.8369   35.6423,148.3369  0,86.6025"
          style="fill:grey"/>
        <polyline points="40.2813,16.8332 58.6393,26.3682 141.3607,26.3682 159.7186,16.8332"
        style="fill:none;stroke:black;stroke-width:0.3" />
        <polygon points="85,26.3682 115,26.3682 115,13.3682 85,13.3682 "
          style="fill:white" stroke="black" stroke-width="0.3" />
        <!-- <text x="55" y="90" fill="black" transform="rotate(-15 80,80)">Coming soon.</text> -->
        <text x="100" y="23.3682" style="font-size:10px;text-anchor:middle;">讲台</text>
    </svg>
    

 
</div>

</template>
<script>
import { defineComponent,ref } from "vue";

export default defineComponent({
  setup() {
    return {
      formatTooltip: (value) => `${value+100}%`,
      formatTooltip_y: (value) => `${value}%`,
      scaleValue:ref(0),
      yValue:ref(70)
    };
  }
});
</script>
