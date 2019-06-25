<template>
    <div class="article_index inner_container">
        <el-table
                :data="article_data"
                v-loading="loading"
                style="width: 100%">
            <el-table-column
                    label="Id"
                    prop="id"
                    width="80">
            </el-table-column>
            <el-table-column
                    label="标题"
                    prop="title"
                    width="500">
            </el-table-column>
            <el-table-column
                    label="分类"
                    prop="pname"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="排序"
                    prop="order"
                    width="80">
            </el-table-column>
            <el-table-column
                    label="添加时间"
                    prop="time"
                    width="160">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="page">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
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
    import api from "@/components/api";

    const article_index=api.article_index;

    export default {
        data() {
            return {
                article_data:[],
                search: '',
                page_size:5,
                current_page:1,
                typeid:0,
                total_count:0,
                loading:true,
            }
        },
        created(){
            this.get_data(this.typeid,this.current_page,this.page_size);
        },
        methods: {
            get_data(id,page,num){
                this.loading=true;
                this.$axios({
                    url:article_index,
                    params:{
                        id:id,
                        page:page,
                        num:num
                    }
                }).then((res)=>{
                    this.article_data=res.data.data;
                    this.total_count=res.data.count;
                    this.loading=false;
                })
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            //每页数量调整
            handleSizeChange(val) {
                this.page_size=val;
            },
            //当前页码调整
            handleCurrentChange(val) {
                this.current_page=val;
            }
        },
        watch:{
            ////每页数量调整
            page_size:function () {
                this.get_data(this.typeid,this.current_page,this.page_size)
            },
            //当前页码调整
            current_page:function () {
                this.get_data(this.typeid,this.current_page,this.page_size)
            },
        }
    }
</script>

<style scoped lang="scss">
    .page{
        padding-top: 20px;
    }
</style>