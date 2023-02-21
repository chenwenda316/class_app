<!--
 * @Author: chenwenda316
 * @Date: 2022-12-02 21:34:45
 * @LastEditTime: 2022-12-02 22:04:48
 * @FilePath: \app\class_app_dev\src\App.vue
-->

<script>
import {
    RouterLink,
    RouterView
} from 'vue-router'

import { defineComponent, h, ref } from "vue";
import { NIcon } from "naive-ui";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from "@vicons/ionicons5";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label:  () =>
      h(
        RouterLink,
        {
          to: {
            name: 'home',
          }
        },
        { default: () => '回家' }
      ),
    key: "hear-the-wind-sing",
    icon: renderIcon(BookIcon)
  },
];


export default defineComponent({
  setup() {
    return {
      inverted: ref(false),
      menuOptions
    };
  }
});

</script>

<template>
<n-layout>
    <!-- <n-layout-header>颐和园路</n-layout-header> -->
    <n-layout has-sider>
        <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed" show-trigger @collapse="collapsed = true" @expand="collapsed = false">
            <n-menu v-model:value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
        </n-layout-sider>
        <n-layout-content content-style="padding: 24px;">

            <RouterView />
        </n-layout-content>
    </n-layout>
    <n-layout-footer>成府路</n-layout-footer>
</n-layout>
</template>
