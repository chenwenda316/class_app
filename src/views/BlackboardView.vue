<!--
 * @Author: chenwenda316
 * @Date: 2023-09-21 22:31:37
 * @LastEditTime: 2023-10-05 22:26:20
 * @FilePath: \class_app_dev\src\views\blackboardView.vue
-->
<template>
    <n-card ref="cardRef" :bordered="false" style="text-align: center">
        <br>
        <br>
        <n-time :time="t" format="HH:mm:ss" style="color: whitesmoke;font-size: 18vh;font-family:'Harmony'" /><br />
        <n-time :time="t" format="yyyy / MM / dd" style="color: whitesmoke;font-size:3vh;font-family:'Harmony'" />
        <br>
        <br>
        <span style="color: rgb(80,80,80);font-size: 6vh;font-weight: 100;font-family:'Harmony'"><span
                @click="fullscreen">「</span>習時,請靜。<span @click="defullscreen">」</span></span>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <n-button class="closeClass" quaternary @click="close">
            关
        </n-button>
    </n-card>
</template>

<script setup>
import {
    CloseOutline as Close,
    RemoveOutline as Remove,
    StopOutline as Square,
} from "@vicons/ionicons5";
import { ref } from "vue"

const cardRef = ref(0)
const t = ref(0)

function f(p) {
    return (p.length - 1 ? '' : '0') + p;
}

function fullscreen() {
    console.log(cardRef.value.$el);
    if (cardRef.value.$el.requestFullscreen) {
        cardRef.value.$el.requestFullscreen();
    }
}
function defullscreen() {
    console.log(document);
    document.exitFullscreen()
}

function close() {
    window.close();
}
setInterval(() => {
    let n_t = new Date();
    t.value = n_t.getTime();
    if (n_t.getHours() == 18 && n_t.getMinutes() == 59) {
        document.exitFullscreen()
        window.close();
    }
    // console.log(f(n_t.getHours()) + ':' + f(n_t.getMinutes()) + ':' + f(n_t.getSeconds()));
}, 999);

onMounted(() => {
    let n_t = new Date();
    t.value = n_t.getTime();
    fullscreen()
})

</script>

<style scoped>
@font-face {
    font-family: Harmony;
    src: url("/HarmonyOS_Sans_SC_Light.ttf");
}

.n-card {
    background-color: rgba(0, 0, 0, 1);
    height: 100vh;
}

.closeClass {
    font-size: 4vh;
    font-family:Harmony;
    color: #FFFFFF00;
}

.div {
    text-align: center;
    width: 100%;
    color: white;
}

.n-space {
    gap: 10px;
    position: absolute;
    bottom: 1rem;
    left: 1rem;
}
</style>
