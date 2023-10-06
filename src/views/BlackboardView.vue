<!--
 * @Author: chenwenda316
 * @Date: 2023-09-21 22:31:37
 * @LastEditTime: 2023-10-05 22:26:20
 * @FilePath: \class_app_dev\src\views\blackboardView.vue
-->
<template>
    <n-card ref="cardRef" :bordered="false" style="text-align: center">
        <n-time :time="t" format="HH:mm:ss" style="color: whitesmoke;font-size:15vh" /><br />
        <n-time :time="t" format="yyyy 年 MM 月 dd 日" style="color: whitesmoke;font-size:3vh" />
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
        <br />
        <n-space>
            <n-button circle type="error" @click="close">
                <template #icon>
                    <n-icon>
                        <Close />
                    </n-icon>
                </template>
            </n-button>
            <n-button circle type="warning" @click="defullscreen">
                <template #icon>
                    <n-icon>
                        <Remove />
                    </n-icon>
                </template>
            </n-button>
            <n-button circle type="success" @click="fullscreen">
                <template #icon>
                    <n-icon>
                        <Square />
                    </n-icon>
                </template>
            </n-button>
        </n-space>
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
}, 1000);

onMounted(() => {
    let n_t = new Date();
    t.value = n_t.getTime();
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

.n-space{
    position:absolute;
    top:1rem;
    left: 1rem;
}
</style>

