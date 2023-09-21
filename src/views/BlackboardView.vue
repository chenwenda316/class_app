<!--
 * @Author: chenwenda316
 * @Date: 2023-09-21 22:31:37
 * @LastEditTime: 2023-09-21 23:30:48
 * @FilePath: \class_app_dev\src\views\blackboardView.vue
-->
<template>
    <n-card ref="cardRef" :bordered="false" style="text-align: center">
        <n-time :time="t" format="HH:mm:ss" style="color: white;font-size:5rem" /><br />
        <n-time :time="t" format="yyyy 年 MM 月 dd 日" style="color: white;font-size:1rem" />
        <br />
        <br />
        <br />
        <br />
        <n-button strong secondary @click="fullscreen">
            全屏
        </n-button>
        <n-button strong secondary @click="defullscreen">
            还原
        </n-button>
    </n-card>
</template>

<script setup>
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

setInterval(() => {
    let n_t = new Date();
    t.value = n_t.getTime();
    window.close();
    if (n_t.getHours() == 18 && n_t.getMinutes() == 59) {
        window.close();
    }
    // console.log(f(n_t.getHours()) + ':' + f(n_t.getMinutes()) + ':' + f(n_t.getSeconds()));
}, 1000);

onMounted(() => {
    fullscreen()
})

</script>

<style scoped>
.n-card {
    background-color: rgba(0, 0, 0, 1);
    height: 100vh;
}

.div {
    text-align: center;
    width: 100%;
    color: white;
}
</style>

