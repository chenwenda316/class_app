<!--
 * @Author: chenwenda316
 * @Date: 2023-01-12 21:44:39
 * @LastEditTime: 2023-09-22 22:30:18
 * @FilePath: \class_app_dev\src\views\ToolsView.vue
-->
<template>
  <n-card :bordered="false" title="欢迎！" style="backdrop-filter: blur(10px);background-color:rgba(255,255,255,0.8)">
    <template #header-extra>
      V2.92
    </template>
    <!-- {{ title }}<br/>{{ author }}<br/><span v-for="(item) in content"> {{item}}<br/></span> -->
    {{ main }}
  </n-card>
</template>

<script>
import { ref } from "vue";
import {
  defineComponent,
} from "vue";

import { load } from "jinrishici";
export default defineComponent({
  data() {
    return {
      title: "",
      author: "",
      content: "",
      main:""
    }
  },
  methods: {
    loadSentence: function () {
      load(result => {
        this.main = result.data.content
        this.title = result.data.origin.title
        this.author = "[" + result.data.origin.dynasty +'] ' + result.data.origin.author
        this.content = result.data.origin.content
      }, err => {
        console.log("test");
      })
    }
  },
  mounted: function () {
    console.log(111);
    this.loadSentence();
  }
})
</script>
