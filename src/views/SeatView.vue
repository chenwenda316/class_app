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
        <polygon style="fill: grey;" points="175,43.3012 200,86.6025 175,129.9038 171,127.2371 195.892,84.6025 173,44.6345"></polygon>
        <polyline points="40.2813,16.8332 58.6393,26.3682 141.3607,26.3682 159.7186,16.8332"
        style="fill:none;stroke:black;stroke-width:0.3" />
        <polygon points="85,26.3682 115,26.3682 115,13.3682 85,13.3682 "
          style="fill:white" stroke="black" stroke-width="0.3" />
        <!-- <text x="55" y="90" fill="black" transform="rotate(-15 80,80)">Coming soon.</text> -->
        <text x="100" y="23.3682" style="font-size:10px;text-anchor:middle;">讲台</text>
        <text v-for="desk in deskPositions" :x="desk.x" :y="desk.y" class="desk">{{ deskPositions.name||"null" }}</text>
        <rect v-for="rect in deskPositions" :x="rect.x-deskWidth/2" :y="rect.y-deskHeight/2 - 2 " :width="deskWidth" :height="deskHeight" stroke="black" stroke-width="0.3" fill="none"></rect>
        
        <rect :x="128" :y="33" :width="16" :height="10" fill="none" stroke="black" stroke-width="0.3"></rect>
        <rect :x="144" :y="33" :width="16" :height="10" fill="none" stroke="black" stroke-width="0.3"></rect>
        <rect :x="160" :y="53" :width="16" :height="10" fill="none" stroke="black" stroke-width="0.3"></rect>
        <rect :x="160" :y="73" :width="16" :height="10" fill="none" stroke="black" stroke-width="0.3"></rect>
      </svg>
  
    
    
  </div>
  
</template>
<script>
import { defineComponent,ref } from "vue";
const deskPositions=[
  //1
  {x:48,y:40},
  {x:48,y:60},
  {x:48,y:80},
  {x:48,y:100},
  {x:48,y:120},
  {x:48,y:140},
  //2
  {x:64,y:40},
  {x:64,y:60},
  {x:64,y:80},
  {x:64,y:100},
  {x:64,y:120},
  {x:64,y:140},
  //3
  {x:84,y:40},
  {x:84,y:60},
  {x:84,y:80},
  {x:84,y:100},
  {x:84,y:120},
  {x:84,y:140},
  {x:84,y:160},
  //4
  {x:100,y:40},
  {x:100,y:60},
  {x:100,y:80},
  {x:100,y:100},
  {x:100,y:120},
  {x:100,y:140},
  {x:100,y:160},
  //5
  {x:116,y:40},
  {x:116,y:60},
  {x:116,y:80},
  {x:116,y:100},
  {x:116,y:120},
  {x:116,y:140},
  {x:116,y:160},
  //6
  {x:136,y:60},
  {x:136,y:80},
  {x:136,y:100},
  {x:136,y:120},
  {x:136,y:140},
  //7
  {x:152,y:60},
  {x:152,y:80},
  {x:152,y:100},
  {x:152,y:120},
  {x:152,y:140},
]
const stu = [["郑宇轩", "孔祥晨", "张瀞匀", "周鼎宸", "李谨硕", "许琳章"],
        ["鲁临翾", "许景宁", "何亦白", "孙妍", "张家睿", "王健祺"],
        ["王梓淇", "过德麟", "单绎宁", "李知恒", "马子润", "周姜祎"],
        ["赵文婕", "吴咏烜", "李桐瑶", "肖雅迪", "郭玥彤", "许畋", "王梓一"],
        ["陈文达", "上官许铨", "沈奕帆", "徐子轩", "马诗博", "吕宬恺", "王艺"],
        ["魏嘉禾", "钟亚北", "郜韵然", "洪玮骏", "周成豫"],
        ["胡紫雯", "梁义", "严绍恒", "魏雅萱", "高天鹤", "徐梓宸"],];

export default defineComponent({
  setup() {
    return {
      formatTooltip: (value) => `${value+100}%`,
      formatTooltip_y: (value) => `${value}%`,
      scaleValue:ref(0),
      yValue:ref(70),
      deskPositions,
      deskWidth:16,
      deskHeight:10,
    };
  }
});
</script>



<style>
.desk{
  text-anchor:middle;
  font-size:5px;
}
</style>