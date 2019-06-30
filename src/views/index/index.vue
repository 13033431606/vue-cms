<template>
    <div class="warpper">
        <div class="echarts inner_container">
            <div id="charts" v-loading="echarts_loading"></div>
        </div>
        <div class="todo_list inner_container">
            <div class="tag">
                TodoList
            </div>
            <div class="todo_input">
            <el-input type="text" class="ele_input" v-model="todo_input"
                      @keyup.enter.native="todo_add" maxlength="100"
                      show-word-limit placeholder="请输入待做内容">
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
            </el-input>
            </div>
            <div class="todo_wrapper need_scroll_small" v-loading="todo_loading">
                <div class="tips" v-show="todo_list.length == 0">
                    暂无事项
                </div>
                <div class="todo" v-loading="item.loading" v-for="(item,index) in todo_list" :class="item.state" :key="item.id">
                    <div class="sign" @click="todo_finish(index,item.id)"><i class="el-icon-check"></i></div>
                    {{item.title}}
                    <div class="close" @click="todo_remove(index,item.id)"><i class="el-icon-close"></i></div>
                </div>
            </div>
        </div>
        <el-timeline class="log_list inner_container need_scroll_small" v-loading="log_loading">
            <el-timeline-item :timestamp="item.time" placement="top" v-for="item in log_list">
                <el-card>
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.username }} 提交于 {{ item.time }}</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
    import api from "@/components/api";
    import qs from "qs";

    const todo_add=api.todo_add;
    const todo_index=api.todo_index;
    const todo_edit=api.todo_edit;
    const log_index=api.log_index;



    const type_tree_echarts=api.type_tree_echarts;

    var echarts = require('echarts');
    export default {
        data(){
            return{
                id:"charts",
                echarts_loading:true,
                echarts_data:[],
                echarts_text:"文章各分类占比",
                echarts_subtext:"文章总数:",
                //echarts各层次颜色
                color_lv1:"#333",
                color_lv2:"#FF8C00",
                color_lv3:"#3366CC",
                color_lv4:"#003366",
                color_lv5:"#333366",
                color_lv6:"#330033",
                //todo_list
                todo_loading:true,
                todo_input:'',//表单输入框
                todo_list:[],
                //log
                log_loading:true,
                log_list:[]
            }
        },
        methods:{
            //获取echarts数据
            type_tree_echarts(id){
                //开启图表loading
                this.echarts_loading=true;
                this.$axios({
                    url:type_tree_echarts,
                    params:{id :id}
                }).then((res) => {
                    this.echarts_data=res.data.data;
                    this.echarts_subtext+=res.data.count;
                    this.initChart();
                })
            },
            //初始化echarts
            initChart() {
                this.chart = echarts.init(document.getElementById("charts"));
                this.chart.setOption({
                    title: {
                        text: this.echarts_text,
                        subtext: this.echarts_subtext,
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    series: {
                        type: 'sunburst',
                        data: this.echarts_data,
                        nodeClick:false,
                        radius: [0, '90%'],
                        label: {
                            rotate: 'radial'
                        },
                        itemStyle: {
                            emphasis: {
                                color: '#222'
                            }
                        },
                        levels: [
                            // 留给数据下钻的节点属性
                            {},
                            //第一层
                            {itemStyle: {color: this.color_lv1}},
                            //第二层
                            {itemStyle: {color: this.color_lv2}},
                            //第三层
                            {itemStyle: {color: this.color_lv3}},
                            //第四层
                            {itemStyle: {color: this.color_lv4}},
                            //第五层
                            {itemStyle: {color: this.color_lv5}},
                            //第六层
                            {itemStyle: {color: this.color_lv6}},
                        ],
                    }
                })
                //初始化后关闭图表loading
                this.echarts_loading=false;
            },

            //todo_list方法
            //获取列表数据
            todo_index(){
                this.todo_loading=true;
                this.$axios({
                    url:todo_index,
                    method:"get"
                }).then((res) => {
                    this.todo_list=res.data.data.map(function (val) {
                        val['loading']=false;
                        return val
                    });
                    this.todo_loading=false;
                })
            },

            //向todo_list增加
            todo_add: function(){
                if(this.todo_input == '') return;
                let data={};
                data.title=this.todo_input;
                data.state="todo";
                data.user_id=this.$store.state.user.id;
                this.$axios({
                    url:todo_add,
                    method:"post",
                    data:qs.stringify(data)
                }).then((res) => {
                    data.loading=false;
                    data.id=res.data.update_id;
                    this.todo_list.unshift(data);
                    this.todo_input='';
                    this.$message({
                        type:"success",
                        message:"添加成功!"
                    })
                }).catch(() => {
                    this.$message({
                        type:"error",
                        message:"添加失败!"
                    })
                })
            },

            //完成事项
            todo_finish:function (index,id) {
                this.todo_list[index]["loading"]=true;
                let data={type:"finish",id:id};
                this.$axios({
                    url:todo_edit,
                    method:"post",
                    data:qs.stringify(data)
                }).then(() => {
                    this.todo_list.splice(index,1);
                    this.$message({
                        type:"success",
                        message:"已完成事项!"
                    });
                });
            },

            //废弃事项
            todo_remove: function (index,id) {
                this.todo_list[index]["loading"]=true;
                let data={type:"remove",id:id};
                this.$axios({
                    url:todo_edit,
                    method:"post",
                    data:qs.stringify(data)
                }).then(() => {
                    this.todo_list.splice(index,1);
                    this.$message({
                        type:"warning",
                        message:"已移除事项!"
                    });
                });
            },
            //log
            log_index(page,num){
                this.log_loading=true;
                this.$axios({
                    url:log_index,
                    method:"get",
                    params:{page:page,num:num}
                }).then((res) => {
                    this.log_list=res.data.data;
                    this.log_loading=false;
                })
            }
        },
        mounted(){
            this.type_tree_echarts(1);
            this.todo_index();
            this.log_index(1,10);
        },
        watch:{
            todo_list:function () {
                this.log_index(1,10);
            }
        }
    }
</script>

<style scoped lang="scss">
    .warpper{
        @include clear;
        .echarts{
            width: 40%;
            float: left;
            height: calc(100vh - 200px);
            #charts{
                width:100%;
                height: 100%;
            }
        }
        .todo_list{
            float: left;
            width:29%;
            margin-left: 1%;
            height: calc(100vh - 200px);
            position: relative;
            .tag{
                width: 80%;
                left: 10%;
                height: 60px;
                box-shadow: 0 10px 20px 0px rgba(0,0,0,0.08);
                border-radius: 5px;
                position: absolute;
                top: -10px;
                background: #fff;
                text-align: center;
                line-height: 60px;
                @include font(21px,#fff);
                font-weight: lighter;
                @include linear_gradient(120deg,$color,$color2,15%,lighten);
            }
            .todo_input{
                padding-top: 45px;
                margin-bottom: 20px;
                @include input(14px,#999);
                .ele_input{
                    width: 90%;
                    margin-left: 5%;
                }
            }
            .todo_wrapper{
                width: 100%;
                height: calc(100vh - 350px);
                .tips{
                    width: 100%;
                    text-align: center;
                    line-height: 40px;
                    @include font(17px,#666);
                    font-weight: 300;
                }
                .todo{
                    @include box-sizing();
                    width: 100%;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    line-height: 20px;
                    border-bottom: 1px solid #DCDFE6;
                    margin-bottom: 10px;
                    @include font(13px,#666);
                    @include box-sizing();
                    padding-left: 30px;
                    padding-right: 30px;
                    position: relative;
                    @include transition(0.5s);
                    word-break: break-all;
                    &:hover{
                        border-color: $logo_color;
                        .sign,.close{
                            opacity: 1;
                        }
                    }
                    .sign{
                        @include vertical;
                        left: 5px;
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        line-height: 20px;
                        border-radius: 3px;

                        @include transition(0.5s);
                        opacity: 0;
                        cursor: pointer;
                        &:hover{
                            color: #fff;
                            background: $logo_color;
                        }
                    }
                    .close{
                        @include vertical;
                        right: 5px;
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        line-height: 20px;
                        border-radius: 3px;
                        opacity: 0;
                        @include transition(0.5s);
                        cursor: pointer;
                        &:hover{
                            color: #fff;
                            background: $color;
                        }
                    }
                }
            }
        }
        .log_list{
            width: 29%;
            float: left;
            margin-left: 1%;
            height: calc(100vh - 200px);

        }
    }
</style>