<!--
 * @Author: chenwenda316
 * @Date: 2022-12-03 09:18:40
 * @LastEditTime: 2023-01-27 17:10:00
 * @FilePath: \app\class_app_dev\src\views\BlogView.vue
-->
<template >
<div style="margin:auto;">
    <n-space vertical>
        <!-- <n-button size="large" @click="updateBlog"></n-button> -->
        <Blog-Item v-for="item in list" :msg = "item.data" :title = "item.title" :date = "item.date" :author="item.author">
        </Blog-Item>
    </n-space>

    <n-alert v-if = "hasToken" :bordered="false" title="发布内容" type="info" style="position: sticky;bottom: 0px;width:max-content;margin-top:30px;margin-bottom:5px;backdrop-filter: blur(1px);background-color:rgba(255,255,255,0.8)" @click="scrollToBottom"/> 
    <n-alert v-if = "!hasToken" :bordered="false" title="登录后发布内容" type="info" style="position: sticky;bottom: 0px;width:max-content;margin-top:30px;margin-bottom:5px;backdrop-filter: blur(1px);background-color:rgba(255,255,255,0.8)" onclick="window.routeTo('/login')"/> 
    <PostView v-if = "hasToken"/>
</div>
</template>

<script>
import BlogItem from "../components/BlogItem.vue"
import PostView from "./PostView.vue"
import {ref} from "vue"
import {
    marked
} from 'marked'

import {
    defineComponent,
} from "vue";
export default defineComponent({
    components: {
        BlogItem,PostView
    },
    setup() {
        const list = ref([]);
        const hasToken=(localStorage.getItem("token")==null?false:true);
        return {
            list,hasToken
        }
    }, 
    methods :{
        updateBlog(e){
            this.list=e;
            this.$forceUpdate();
            // console.log(this.list);
        },
        scrollToBottom () {
            // console.log(window);
            window.$scrollTo(1e9);
        }
    },
    mounted() {
        const callUpdateBlog = (e)=>{
            this.updateBlog(e)
        }
        window.$axios.get("blog",{})
            .then( (res) =>{
                callUpdateBlog(res.data)
                // console.log(res.data);
            }).catch(function (error) {
                console.log(error);
            })
    }
})
</script>
