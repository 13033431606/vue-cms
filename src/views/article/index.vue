<template>
    <div class="article_index inner_container">
        <el-table
                :data="articleData"
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
                    prop="cat"
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
    </div>
</template>

<script>
    import api from "@/components/api";

    const article_url=api.article_url;

    export default {
        data() {
            return {
                articleData:[],
                search: ''
            }
        },
        created(){
            this.get_data();
        },
        methods: {
            get_data(){
                this.$axios({
                    url:article_url,
                    params:{
                        page:1,
                        limit:6
                    }
                }).then((res)=>{
                    this.articleData=res.data.data;
                })
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
    }
</script>

<style scoped lang="scss">

</style>