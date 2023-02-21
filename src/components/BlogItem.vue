<!--
 * @Author: chenwenda316
 * @Date: 2022-12-14 13:40:40
 * @LastEditTime: 2023-01-27 16:57:04
 * @FilePath: \app\class_app_dev\src\components\BlogItem.vue
-->
<template>
<n-card :bordered="false" style="backdrop-filter: blur(5px);background-color:rgba(255,255,255,0.8)">
    <template #header>
        <n-h3 prefix="bar" align-text>
        <n-text>
            {{title}}
        </n-text>
        </n-h3>
    </template>
        <template #header-extra>
        <n-space>
            <n-text >
                {{author}}
            </n-text>
            <n-text depth="3">
                发布于
            </n-text>
            <n-time :time="date" format="yyyy-MM-d HH:mm:ss"  />
        </n-space>
    </template>
    <div ref="outputdiv" style="background-color:rgba(255,255,255,0)" v-html = "output"></div>
</n-card>
</template>

<script>
import {
    marked
} from 'marked'
import "katex/dist/katex.min.css";
import renderMathInElement from "katex/contrib/auto-render";
import {
    ref
} from "vue"
const notmarked = ref(true);
export default {
    // this.$slots.default;
    props:["msg","title","date","author"],
    data() {
        return {
            output :this.msg ,
            outputdiv:ref(),
        }
    },
    mounted() {
        renderMathInElement(this.$refs.outputdiv, {
          delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false},
          ],
          throwOnError : false
        });
        
        this.output = marked(this.$refs.outputdiv.innerHTML);
    }
}
</script>
