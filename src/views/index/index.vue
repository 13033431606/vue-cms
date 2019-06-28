<template>
    <div class="warpper">
        <div class="echarts inner_container">
            <div id="charts" v-loading="loading"></div>
        </div>

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
                color_lv1:"#333",
                color_lv2:"#FF8C00",
                color_lv3:"#3366CC",
                color_lv4:"#003366",
                color_lv5:"#333366",
                color_lv6:"#330033",
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
            }
        },
        mounted(){
            this.type_tree_echarts(1);
        },
    }
</script>

<style scoped lang="scss">
    .warpper{
        @include clear;
        .echarts{
            width: 550px;
            float: left;
            #charts{
                width:100%;
                height: 500px;
            }
        }

    }
</style>