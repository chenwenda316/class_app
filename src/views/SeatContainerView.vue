<!--
 * @Author: chenwenda316
 * @Date: 2022-12-03 17:50:11
 * @LastEditTime: 2023-02-11 22:21:32
 * @FilePath: \app\class_app_dev\src\views\SeatContainerView.vue
-->
<template>
<main style="margin:auto;">
    <!-- <n-card title="座位排序" hoverable style="height:calc(100vh - 48px)"> -->
    <seat-view />
    <!-- </n-card> -->
</main>
</template>

<script>

import {
    useMessage,
    NIcon
} from 'naive-ui'

import SeatView from '../views/SeatView.vue'

export default defineComponent({
    components: {
        SeatView
    },
    setup() {
        const message = useMessage()
        return {
            message,
        };
    }
});
</script>
