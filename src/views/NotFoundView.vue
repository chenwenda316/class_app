<template>
<main style="margin:auto;">
    <n-card title="" hoverable style="">
        <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
        <template #footer>
            <n-button @click="routeTo('home')">返回首页</n-button>
        </template>
    </n-result>
    </n-card>
</main>
</template>

<script>
export default defineComponent({
    setup() {
        const message = useMessage()
        return {
            message,
            routeTo(e) {
                this.$router.push({
                    name: e,
                })
                console.info(e);
            }
        };
    }
});
</script>