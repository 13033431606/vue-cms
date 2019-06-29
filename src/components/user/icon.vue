<template>
    <div class="user_icon">
        <el-dropdown size="small">
            <div class="icon"></div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <span @click="login_out">安全退出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
            <div class="user_name">{{ user_name }}</div>
        </el-dropdown>

    </div>
</template>

<script>
    export default {
        methods:{
            //退出登录
            login_out(){
                //清除cookie
                this.$cookie.remove("theory_user");
                //清除user_state状态
                this.$store.commit("clear_state");
                //提示信息
                this.$notify({
                    type:"success",
                    message:"退出成功!",
                });
                //转至login页面
                this.$router.push({name: "login"});
            },
        },
        computed: {
            user_name(){
                return this.$store.state.user.username
            }
        }
    }
</script>

<style scoped lang="scss">
    .user_icon{

        .icon{
            float: right;
            width: 40px;
            height: 40px;
            @include linear_gradient(120deg,$color,$color2,10%);
            background: url("../../assets/img/icon.jpg");
            background-size: cover;
            border-radius: 5px;
            box-shadow: 0 5px 10px 0px rgba(0,0,0,0.1);
            text-align: center;
            cursor: pointer;
        }
        .user_name{
            float: right;
            height: 40px;
            line-height: 40px;
            padding-right: 10px;
        }
    }
</style>