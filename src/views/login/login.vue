<template>
    <div class="login">
        <div class="login_header">
            <logo :style="{fontSize:46+'px',textAlign:'right'}"></logo>
        </div>
        <div class="login_form">
            <div class="login_sigin">
                LOGIN
            </div>
            <el-form ref="login_form" :rules="rules" :model="form" label-width="0px">
                <el-form-item label-width="0" prop="username">
                    <input class="login_input" type="text"  v-model="form.username" placeholder="输入用户名">
                </el-form-item>
                <el-form-item label-width="0" prop="password">
                    <input class="login_input"  type="password" v-model="form.password" placeholder="输入密码">
                </el-form-item>
                <button class="login_button" type="button" @click="on_submit">登录</button>
            </el-form>
        </div>
        <div class="taps">
            KEEP<br>MOV<span>ING</span>
        </div>
    </div>
</template>

<script>
    import qs from "qs";
    import api from "@/components/api"
    const user_login=api.user_login;

    export default {
        components:{
            "logo": () => import("@/components/logo")
        },
        data(){
            var validate_str = (rule, value, callback) => {
                if (!/^[a-zA-Z0-9]{3,12}$/.test(value)) {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return{
                form: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名'},
                        { min:3, max:12, message: '请输入3-12位的用户名'},
                        { validator:validate_str, message: '用户名不能含有非法字符'},
                    ],
                    password: [
                        { required: true, message: '请输入密码'},
                        { validator: validate_str, message: '用户名不能含有非法字符'},
                    ],
                }
            }
        },
        methods: {
            on_submit() {
                this.$refs["login_form"].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            url:user_login,
                            data:qs.stringify({data:this.form}),
                            method:"post"
                        }).then((res) => {
                            if(res.data.code == 200){
                                this.$notify({
                                    type:"success",
                                    message:"登录成功!",
                                });
                                //设置用户登录的cookie
                                this.$cookie.set("theory_user",res.data.data);
                                //更新store
                                this.$store.commit("update_user");
                                //跳转至后台首页
                                this.$router.push({name: "index"});
                            }else{
                                this.$message({
                                    type:"error",
                                    message:res.data.message
                                });
                            }
                        })
                    } else {
                        this.$message({
                            type:"error",
                            message:"验证失败!",
                        });
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    @keyframes opa {
        0%{
            background: rgba(0,0,0,0.45);
        }
        50%{
            background: rgba(0,0,0,0.0);
        }
        100%{
            background: rgba(0,0,0,0.45);
        }
    }
    .login{
        width: 100%;
        height: 100vh;
        background: url("../../assets/img/banner.jpg") no-repeat center;
        background-size: cover;
        position: relative;
        overflow: hidden;
        &:before{
            content: '';
            @include a;
            position: absolute;
            left: 0;
            top: 0;
            /*background: rgba(0,0,0,0.4);*/
            animation: opa 13s ease infinite;
        }
        .login_header{
            width: 96%;
            padding-right: 50px;
            padding-top: 35px;
            position: relative;
            z-index: 5;
        }
        .login_form{
            width: 450px;
            height: 450px;
            background: rgba(255,255,255,0.7);
            position: absolute;
            left: 50px;
            bottom: 50px;
            border-radius: 5px;
            @include input(15px,#CDCDCD);
            @include box-sizing();
            padding: 30px 20px;
            z-index: 5;
            .login_sigin{
                width: 100%;
                @include font(23px,#555);
                font-weight: bold;
                padding-bottom: 50px;
            }
            @include input(15px,#333,300);
            .login_input{
                width: 100%;
                height: 60px;
                line-height: 60px;
                @include box-sizing();
                padding: 0 8px;
                @include font(15px,#333);
                font-weight: 300;
                @include transition(0.5s);
                border: none;
                border-bottom: 1px solid #999;
                background: none;
                &:focus{
                    border-color: $logo_color;
                }
            }
            .login_button{
                width: 100%;
                height: 42px;
                background: #666;
                outline: none;
                border: none;
                @include font(13px,#fff);
                margin-top: 30px;
                @include transition(0.5s);
                cursor: pointer;
                &:hover{
                    background: $logo_color;
                }
            }
        }
        .taps{
            width: calc(100% - 650px);
            position: absolute;
            bottom: 50px;
            right: 50px;
            height: 450px;
            @include font(190px,#fff);
            font-weight: bold;
            span{
                color: $logo_color;
            }

        }
    }
</style>