<!--
 * @Author: chenwenda316
 * @Date: 2022-12-02 21:34:45
 * @LastEditTime: 2022-12-03 08:50:42
 * @FilePath: \app\class_app_dev\src\App.vue
-->

<template>
<n-layout>
    <!-- <n-layout-header>颐和园路</n-layout-header> -->
    <n-layout has-sider>
        <n-layout-sider ref="containerRef" bordered collapse-mode="width" :collapsed-width="64" :width="200" :collapsed="collapsed" show-trigger @collapse="collapsed = true" @expand="collapsed = false">
            <n-affix :trigger-top="35" position="absolute" :listen-to="() => containerRef">
                <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" @click="mCallBack(activeKey)" />
            </n-affix>
        </n-layout-sider>
        <n-layout-content content-style="padding: 24px;">
            <RouterView />
            <n-back-top :right="100" />
        </n-layout-content>
    </n-layout>
    <n-layout-footer></n-layout-footer>

</n-layout>
</template>

<script>
import {
    RouterLink,
    RouterView
} from 'vue-router'

import {
    defineComponent,
    h,
    ref
} from "vue";
import {
    NIcon
} from "naive-ui";
import {
    HomeOutline as HomeIcon,
    AppsOutline as AppIcon,
    ShuffleOutline as ShuffleIcon,
    NewspaperOutline as BlogIcon,
    BarChartOutline as BarChartIcon,
    GridOutline as GridIcon,
    HelpOutline as InfoIcon
} from "@vicons/ionicons5";

function renderIcon(icon) {
    return () => h(NIcon, null, {
        default: () => h(icon)
    });
}

const menuOptions = [{
    label: "主页",
    key: "home",
    icon: renderIcon(HomeIcon)
}, {
    label: "博客",
    key: "blog",
    icon: renderIcon(BlogIcon)
}, {
    label: "应用",
    key: "apps",
    icon: renderIcon(AppIcon),
    children: [{
        label: "座位排列",
        key: "seat",
        icon: renderIcon(GridIcon),
    }, {
        label: "抽学号",
        key: "random",
        icon: renderIcon(ShuffleIcon),
    }, {
        label: "班费明细",
        key: "fee",
        icon: renderIcon(BarChartIcon),
    }]
}, {
    label: "关于",
    key: "about",
    icon: renderIcon(InfoIcon)
}, ];

export default defineComponent({
    setup() {
        const containerRef = ref(void 0);
        return {
            containerRef,
            inverted: ref(false),
            menuOptions,
            mCallBack(e) {
                this.$router.push({
                    name: e,
                })
                console.info(e);
            }
        };
    },
    mounted() {
        console.clear();
        console.log("Main page mounted!");
    }
});
</script>
