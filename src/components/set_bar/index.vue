<template>
    <div class="set_bar">
        <div class="progress">
            <div class="progress_data">缓存 : {{temp_size}} / 100 (mb)</div>
            <el-progress :percentage="percentage" :show-text="false" :stroke-width="3" class="progress_bar"></el-progress>

        </div>
        <div class="buttons">
            <div class="set_ele">
                <el-tooltip class="item" effect="dark" content="刷新页面" placement="top">
                    <i class="el-icon-refresh" @click="handle_refresh"></i>
                </el-tooltip>
            </div>
            <div class="set_ele">
                <el-tooltip class="item" effect="dark" content="清空缓存" placement="top">
                    <i class="el-icon-delete" @click="handle_clear_temp"></i>
                </el-tooltip>
            </div>
            <div class="set_ele">
                <el-tooltip class="item" effect="dark" content="退出登录" placement="top">
                    <i class="el-icon-switch-button"></i>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
    import api from "@/components/api";
    const temp_clear= api.temp_clear;
    const get_temp_size= api.get_temp_size;


    export default {
        data(){
            return{
                temp_size:0,
                max_size:100
            }
        },
        created(){
            this.get_temp_size();
        },
        methods:{
            //获取缓存大小
            get_temp_size(){
                this.$axios({
                    url:get_temp_size
                }).then( (res) => {
                    this.temp_size=res.data;
                })
            },
            //清除缓存方法
            temp_clear(){
                this.$axios({
                    url:temp_clear,
                })
            },
            //点击清除执行的方法
            handle_clear_temp(){
                this.$confirm("确认清除缓存么?","提示",{
                    confirmButtonText:"确认",
                    cancelButtonText:"取消",
                    type: 'warning'
                }).then( () => {
                    this.$axios({
                        url:temp_clear,
                    }).then( () => {
                        this.$message({
                            type:"success",
                            message: '删除成功!'
                        })
                        this.get_temp_size();
                    }).catch( () => {
                        this.$message({
                            type:"error",
                            message: '删除失败!'
                        })
                    })

                }).catch( () => {
                    this.$message({
                        type:"info",
                        message: '已取消删除'
                    })
                })
            },
            //点击刷新
            handle_refresh(){
                location.reload();
            }
        },
        computed:{
            percentage:function () {
                return this.temp_size/this.max_size*100;

            }
        }
    }
</script>

<style scoped lang="scss">
    .set_bar{
        width: 100%;
        position: absolute;
        bottom: 0;
        z-index: 50;
        .progress{
            width:100%;
            @include box-sizing();
            padding-left: 3.5%;
            padding-right: 3.5%;
            .progress_bar{
                width: 100%;
                margin-bottom: 8px;
                margin-top: 8px;
            }
            .progress_data{
                width: 100%;
                @include font(12px,rgba(255,255,255,0.95));
                font-weight: 300;
            }
        }
        .buttons{
            height: 50px;
            background: #111;
            .set_ele{
                width: 33.33%;
                float: left;
                line-height: 50px;
                text-align: center;
                line-height: 50px;
                i{
                    font-size: 18px;
                    color: rgba(255,255,255,0.7);
                    @include transition(0.3s);
                    cursor: pointer;
                    outline: none;
                    &:hover{
                        color: #fff;
                    }
                }
            }
        }
    }
</style>