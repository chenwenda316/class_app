<!--
 * @Author: chenwenda316
 * @Date: 2023-01-13 21:48:24
 * @LastEditTime: 2023-02-16 00:08:26
 * @FilePath: \app\class_app_dev\src\views\PostView.vue
-->
<template>
<n-card :bordered="false" title = "文本编辑器" style="backdrop-filter: blur(10px);background-color:rgba(255,255,255,0.8)">
    <n-tabs type="line" animated>
      <n-tab-pane name="data" tab="文本">
        <n-space vertical style="padding:2px">
          <!-- <n-input-group>
          <n-input v-model:value="mtitle" placeholder="标题" autosize style="min-width: 75%" show-count :maxlength="30"/>
            <n-input-group-label>@</n-input-group-label>
            <n-input v-model:value="mauthor" placeholder="发布人" show-count :maxlength="15"/>
          </n-input-group> -->
          <n-input v-model:value="mtitle" placeholder="标题" autosize style="min-width: 100%" show-count :maxlength="30"/>
          <n-input
              placeholder="内容"
              type="textarea"
              size="small"
              :autosize="{
                  minRows: 4,
                  maxRows: 10
              }" v-model:value="input"  show-count :maxlength="999"
          />
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="render" tab="预览">
        <BlogItem :msg = "input" :title = "mtitle" :date = "(new Date()).getTime()" :author = "mauthor"/>
      </n-tab-pane>
    </n-tabs>
    <template #action>
      <n-space>
        <!-- <n-input v-model:value="password" style="width:8rem" placeholder="验证口令"/> -->
        <n-button type="primary" @click="submit">
        发布
        </n-button>
      </n-space>
        {{ (0?{ data : {title:mtitle,date:(new Date()).getTime(),author:mauthor,data:input},password}:"") }}
    </template>
</n-card>
</template>

<!-- <script>
import { marked } from 'marked'
import { debounce } from 'lodash-es'

export default {
  data: () => ({
    mtitle: '标题',
    input: '支持Markdown文本'
  }),
  computed: {
    output() {
      return marked(this.input)
    }
  },
  methods: {
    update: debounce(function (e) {
      this.input = e.target.value
    }, 100)
  }
}
</script> -->
<script>
import BlogItem from "../components/BlogItem.vue"

import {
    defineComponent,
} from "vue";
export default defineComponent({
  data: () => ({
    mtitle: '标题',
    mauthor:'',
    input: '支持`Markdown`, $\\KaTeX$',
    password:""
  }),
  components: {
    BlogItem
  },
  methods: {
    submit(){
      const submitReq = { data : {title:this.mtitle,date:(new Date()).getTime(),author:this.mauthor,data:this.input} , password :this.password }
      window.$axios({
        method: "post",
        url: "https://cwd316.com:7002/blogpost",
        data: submitReq
      }).then(function(res){
        console.log(res.data.status);
        if(res.data.status==200){
          window.$message.success(
            "提交成功"
          )
        }else{
          window.$message.error(
            "密码错误"
          )
        }
      })
      return;
    }
  },
  update(){

  }
})  
</script>
