<template>
    <div class="warpper">
        <div class="echarts inner_container">
            <div id="charts" v-loading="loading"></div>
        </div>
        <div class="todo_list inner_container">
            <div class="tag">
                TodoList
            </div>
            <div class="todo_input">
                <input type="text" v-model="todo_input" @keyup.enter="add_todo" placeholder="请输入待做内容">
            </div>
            <div class="todo_wrapper need_scroll_small">
                <div class="tips" v-show="todo_list.length == 0">
                    暂无事项
                </div>
                <div class="todo" v-loading="item.loading" v-for="(item,index) in todo_list" :class="item.state" :key="item.id">
                    <div class="sign" @click="finish_todo(index)"><i class="el-icon-check"></i></div>
                    {{item.title}}
                    <div class="close" @click="remove_todo(index)"><i class="el-icon-close"></i></div>
                </div>
            </div>
        </div>
        <el-timeline class="log_list inner_container need_scroll_small">
            <el-timeline-item timestamp="2018/4/12" placement="top" v-for="item in todo_list">
                <el-card>
                    <h4>{{ item.title }}</h4>
                    <p>Thy 提交于 2019/6/29 20:46</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
    import api from "@/components/api";

    const type_tree_echarts=api.type_tree_echarts;

    var echarts = require('echarts');
    export default {
        data(){
            return{
                id:"charts",
                loading:true,
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
                todo_input:'',//表单输入框
                todo_list:[
                    {title:"测试内容测试内容测试内容测试内测试内容测试内容测试内容测试内容测试内容容测试内容",state:"todo",id:"1" ,loading:false},
                    {title:"测试内容",state:"todo",id:"2" ,loading:false},
                    {title:"测试内容",state:"todo",id:"3" ,loading:false},
                    {title:"测试内容测试内容测试内容测试内容测试内测试内容测试内容测试内容测试内容测试内容容测试内容",state:"todo",id:"4" ,loading:false},
                    {title:"测试内容",state:"todo",id:"5" ,loading:false},
                    {title:"测试内容",state:"todo",id:"6" ,loading:false},
                    {title:"测试内容测试内容测试内容测试内容测试内测试内容测试内容测试内容测试内容测试内容容测试内容",state:"todo",id:"7" ,loading:false},
                ]
            }
        },
        methods:{
            //获取echarts数据
            type_tree_echarts(id){
                //开启图表loading
                this.loading=true;
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
                this.loading=false;
            },

            //todo_list方法
            //向todo_list增加
            add_todo: function(){
                let data={};
                data.title=this.todo_input;
                data.id=Math.round(Math.random()*100);
                data.state="todo";
                data.loading=false;
                this.todo_list.unshift(data);
                this.todo_input='';
            },
            //完成事项
            finish_todo:function (index) {
                this.todo_list[index]["loading"]=true;
                var that=this;
                setTimeout(function () {
                    that.todo_list.splice(index,1);
                    that.$message({
                        type:"success",
                        message:"已完成事项!"
                    });
                },500)
            },
            //废弃事项
            remove_todo: function (index) {
                this.todo_list[index]["loading"]=true;
                var that=this;
                setTimeout(function () {
                    that.todo_list.splice(index,1);
                    that.$message({
                        type:"warning",
                        message:"已删除事项!"
                    });
                },500)
            },

        },
        mounted(){
            this.type_tree_echarts(1);
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
                input{
                    width: 90%;
                    height: 40px;
                    margin-left: 5%;
                    @include box-sizing();
                    padding-left: 8px;
                    padding-right: 8px;
                    line-height: 40px;
                    @include font(14px,#666);
                    border: 1px solid #DCDFE6;
                    border-radius: 4px;
                    @include transition(0.5s);
                    &:focus{
                        border-color: $color;
                    }
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