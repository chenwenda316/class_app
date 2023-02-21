<!--
 * @Author: chenwenda316
 * @Date: 2022-12-02 21:34:45
 * @LastEditTime: 2023-02-20 23:16:43
 * @FilePath: \app\class_app_dev\src\App.vue
-->

<template>
<n-message-provider>
    <n-layout>
        <!-- <n-layout-header>颐和园路</n-layout-header> -->
        <n-layout has-sider>
            <n-layout-sider bordered collapse-mode="width" :collapsed-width="collapsedWidth" :width="200" :collapsed="collapsed" show-trigger="bar" @collapse="collapsed = true" @expand="collapsed = false">
                <!-- <n-affix :trigger-top="35" position="absolute"> -->
                <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="collapsedWidth" :collapsed-icon-size="22" :options="menuOptions" />
                <!-- </n-affix> -->
            </n-layout-sider>
            <n-layout-content ref="containerRef" content-style="padding:0px;height:100vh;background: center/cover url('https://s1.ax1x.com/2023/02/16/pS7vvT0.jpg');">
                <n-scrollbar ref = "mscrollbar" style="max-height: 100vh;" >
                    <RouterView style="padding:30px" @change-collapsed-width="changeCollapsedWidth"/>
                    <n-back-top :bottom="100">
                    </n-back-top>
                </n-scrollbar>
                <!-- <n-back-top :right="100" /> -->
            </n-layout-content>
        </n-layout>
        <n-layout-footer></n-layout-footer>

    </n-layout>
</n-message-provider>
</template>

<script>
import {
    RouterLink,
    RouterView,
    useRouter
} from 'vue-router'
import {
    defineComponent,
    h,
    ref
} from "vue";

import axios from '@/axios'

import {
    NIcon
} from "naive-ui";
import {
    useMessage
} from 'naive-ui'

import {
    HomeOutline as HomeIcon,
    AppsOutline as AppIcon,
    ShuffleOutline as ShuffleIcon,
    NewspaperOutline as BlogIcon,
    BarChartOutline as BarChartIcon,
    GridOutline as GridIcon,
    HelpOutline as InfoIcon,
    LogInOutline as LoginIcon
} from "@vicons/ionicons5";
function renderIcon(icon) {
    return () => h(NIcon, null, {
        default: () => h(icon)
    });
}

import {
    createDiscreteApi,
} from "naive-ui";

const {
    message,
    notification,
    dialog,
    loadingBar
} = createDiscreteApi(
    ["message", "dialog", "notification", "loadingBar"],
);

export default defineComponent({
    setup() {
        window.$axios = axios;

        const router = useRouter();
        window.$router = router;

        window.$message = message;
        window.routeTo = async (e) => {
            loadingBar.start();
            const navigationResult = await window.$router.push(e);
            if (navigationResult) {
                loadingBar.error();
            } else {
                if (router.currentRoute.value.redirectedFrom) {
                    if (router.currentRoute.value.name == "login") {
                        loadingBar.error();
                        message.error("请登录");
                    }
                }
                loadingBar.finish();
                // window.$router.push("login")
            }
        }
        const collapsedWidth= ref(64);
        const containerRef = ref(void 0);
        const activeKey = ref(void 0);
        const menuOptions = [{
            label: () =>
                h('a', {
                    onClick: async () => {
                        window.routeTo("/");
                    }
                }, "主页"),
            key: "home",
            icon: renderIcon(HomeIcon)
        }, {
            label: () =>
                h('a', {
                    onClick: async () => {
                        window.routeTo("blog");
                    }
                }, "博客"),
            key: "blog",
            icon: renderIcon(BlogIcon)
        }, {
            label: "应用",
            key: "apps",
            icon: renderIcon(AppIcon),
            children: [{
                label: () =>
                    h(
                        RouterLink, {
                            to: {
                                name: 'seat',
                            }
                        }, {
                            default: () => '座位排列'
                        }
                    ),
                key: "seat",
                icon: renderIcon(GridIcon),
            }, {
                label: () =>
                    h(
                        RouterLink, {
                            to: {
                                name: 'random',
                            }
                        }, {
                            default: () => '抽学号'
                        }
                    ),
                key: "random",
                icon: renderIcon(ShuffleIcon),
            }, {
                label: () =>
                    h('a', {
                        onClick: async () => {
                            window.routeTo("fee");
                        }
                    }, "班费明细"),
                key: "fee",
                icon: renderIcon(BarChartIcon),
            }]
        }, {
            label: () =>
                h('a', {
                    onClick: async () => {
                        window.routeTo("login");
                    }
                }, "登录"),
            key: "login",
            icon: renderIcon(LoginIcon)
        }, {
            label: () =>
                h('a', {
                    onClick: async () => {
                        window.routeTo("about");
                    }
                }, "关于"),
            key: "about",
            icon: renderIcon(InfoIcon)
        }, ];
        return {
            activeKey,
            containerRef,
            inverted: ref(true),
            collapsed: ref(true),
            mscrollbar:ref(),
            menuOptions,
            routeTo,
            mCallBack(e) {
                this.$router.push({
                    name: e,
                })
                console.info(e);
            },
            collapsedWidth
        };
    },
    methods:{
        mscrollTo(e){
            // console.log(this);
            this.mscrollbar.scrollTo({top:e,behavior: "smooth"})
        },
        changeCollapsedWidth(e){
            this.collapsedWidth = e;
        }
    },
    mounted() {
        console.clear();
        console.log("Main page mounted!");
        window.$scrollTo=this.mscrollTo;
    }
});
</script>
