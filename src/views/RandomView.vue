<template>
<main style="margin:auto;">
    <!-- <n-card title="抽学号" hoverable style="height:calc(100vh - 48px)"> -->
    <n-card title="抽学号" hoverable >
        <n-text>{{getValue()}}</n-text>
        <br>
        <n-button size="large" @click="changeState">{{stateString()}}</n-button>
    </n-card>
</main>
</template>

<script>
export default defineComponent({
    setup() {
        const message = useMessage();
        const number = ref(0);
        const state = ref(0);
        setInterval(() => {
            if (!state.value) {
                return;
            }
            number.value = Math.round(Math.random() * 44);
        }, 100);
        return {
            message,
            stateString : () => {
                return (state.value ? "暂停" : "开始");
            },
            getValue: () => {
                return number;
            },
            changeState: () => {
                state.value^=1;
            }
        };
    }
});
</script>
