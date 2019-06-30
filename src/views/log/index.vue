<template>
    <div class="log inner_container" v-loading="log_loading">
        <el-table
                :data="log_list"
                style="width: 100%">

            <el-table-column
                    prop="title"
                    label="内容">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="类型"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="日期"
                    width="180">
            </el-table-column>
        </el-table>

        <!--分页-->
        <div class="page">
            <el-pagination
                    @size-change="handle_size_change"
                    @current-change="handle_current_change"
                    :current-page="current_page"
                    :page-sizes="[5, 10, 15]"
                    :page-size="page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total_count">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import api from "@/components/api"
    const log_index=api.log_index;

    export default {
        data(){
            return{
                log_loading:true,
                log_list: [],
                page_size:10,
                current_page:1,
                total_count:0,
            }
        },
        created(){
            this.log_index(1,10)
        },
        methods:{
            log_index(page,num) {
                this.log_loading=true;
                this.$axios({
                    url:log_index,
                    method:"get",
                    params:{page:page,num:num}
                }).then((res) => {
                    this.log_list=res.data.data;
                    this.total_count=res.data.count;
                    this.log_loading=false;
                })
            },
            //每页数量调整
            handle_size_change(val) {
                this.page_size=val;
            },
            //当前页码调整
            handle_current_change(val) {
                this.current_page=val;
            }
        },
        watch:{
            ////每页数量调整
            page_size:function () {
                this.log_index(this.current_page,this.page_size);
            },
            //当前页码调整
            current_page:function () {
                this.log_index(this.current_page,this.page_size);
            },
        }
    }
</script>
<style scoped lang="scss">

</style>