<template>
<main style="margin:auto;">
    <n-card title="登录" hoverable style="">
        <n-space vertical>
            <n-input
            v-model:value="usr"
            type="text"
            placeholder="账户"
            :maxlength="8"
            />
            <n-input
            v-model:value="pwd"
            type="password"
            show-password-on="mousedown"
            placeholder="密码"
            :maxlength="12"
            />
            <n-button type="primary" @click="login">登录</n-button>
            <!-- {{ {usr,pwd} }} -->
        </n-space>
    </n-card>
</main>
</template>

<script>

export default defineComponent({
    data: () => ({
        usr: '',
        pwd:''
    }),
    methods:{
        login(){
            window.$axios.post("login",{name:this.usr,password:this.pwd})
            .then( (res) =>{
                if(res.data.error){
                    this.pwd=""
                    window.$message.error(res.data.message)
                }else{
                    localStorage.setItem("token",res.data.token)
                    window.$message.success("登录成功")
                    let to = sessionStorage.getItem("login_for") || "/";
                    sessionStorage.removeItem("login_for");
                    window.routeTo(to);
                }
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
});
</script>
