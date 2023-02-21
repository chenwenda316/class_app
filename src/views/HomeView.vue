<!--
 * @Author: chenwenda316
 * @Date: 2022-12-02 21:34:45
 * @LastEditTime: 2022-12-03 17:47:38
 * @FilePath: \app\class_app_dev\src\views\HomeView.vue
-->
<template>
<div style="margin:auto;" >
        <n-card title="" hoverable style="backdrop-filter: blur(10px);background-color:rgba(255,255,255,0.85);margin-bottom:30px">
            <n-thing>
                <template #avatar>
                    <n-avatar round size="large" src="/avatar.png">
                    </n-avatar>
                </template>
                <template #header>
                    北京四中2024届11班
                </template>
                <template #header-extra>
                    <n-button circle size="small" color="red" dashed ghost @click="lovesPlusPlus">
                        <template #icon>
                            <n-icon color="red">
                                <heart-outline />
                            </n-icon>

                        </template>
                    </n-button>
                </template>
                <template #description>
                    自律 自信
                </template>
                <!-- <n-divider title-placement="left">
                导航
            </n-divider> -->
                <n-space>
                    <n-button size="large" strong secondary round type="info">
                        <template #icon>
                            <n-icon>
                                <file-icon />
                            </n-icon>
                        </template>
                        班级网盘
                    </n-button>
                    <n-button size="large" strong secondary round type="info" @click="routeTo('zuowei')">
                        <template #icon>
                            <n-icon>
                                <grid-icon />
                            </n-icon>
                        </template>
                        座位排序
                    </n-button>
                    <n-button size="large" strong secondary round type="info">
                        <template #icon>
                            <n-icon>
                                <shuffle-icon />
                            </n-icon>
                        </template>
                        抽学号
                    </n-button>
                </n-space>

            </n-thing>
        </n-card>
        <n-grid cols="11" item-responsive responsive="screen">
            <n-grid-item span="11 m:8 l:8">
                <Blog-View />
            </n-grid-item>
            <n-grid-item span="0 m:3 l:3" style="padding-left:30px">
                <tools-View style="position: sticky;top: 30px;"/>
            </n-grid-item>
        </n-grid>
</div>
</template>

<script>
import {
    defineComponent,
    ref,
    computed
} from "vue";
import {
    Heart as HeartOutline
} from "@vicons/ionicons5";
import {
    HomeOutline as HomeIcon,
    AppsOutline as AppIcon,
    ShuffleOutline as ShuffleIcon,
    NewspaperOutline as BlogIcon,
    BarChartOutline as BarChartIcon,
    GridOutline as GridIcon,
    FileTrayFullOutline as FileIcon,
    HelpOutline as InfoIcon
} from "@vicons/ionicons5";
import {
    useMessage,
    NIcon
} from 'naive-ui'
import BlogView from './BlogView.vue'
import ToolsView from './ToolsView.vue'

export default defineComponent({
    components: {
        HeartOutline,
        BlogIcon,
        FileIcon,
        ShuffleIcon,
        GridIcon,
        BlogView,
        ToolsView
    },
    setup() {
        const message = useMessage()
        const containerRef = ref(void 0);
        return {
            containerRef,
            message,
            lovesPlusPlus: () => {
                message.error("Loves++.", {
                    icon: () => h(NIcon, null, {
                        default: () => h(HeartOutline)
                    }),
                    duration: 1000
                })
            },
            sendMessage: (e) => {
                // useMessage
            },
            routeTo(e) {
                this.$router.push({
                    path: '/' + e,
                })
                console.info(e);
            }
        };
    }
});
</script>

<style scoped>
.carousel-img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
