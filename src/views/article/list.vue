<template>
    <div class="article_index inner_container">
        <el-button plain @click="delete_selections">删除选中</el-button>
        <el-table
                :data="article_data"
                @selection-change="handle_selection_change"
                v-loading="loading"
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="Id"
                    prop="id"
                    width="70">
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
                    prop="sort"
                    width="70">
            </el-table-column>
            <el-table-column
                    sortable
                    label="添加时间"
                    prop="time"
                    width="100">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handle_view(scope.row.id)">预览</el-button>
                    <el-button
                            size="mini"
                            @click="handle_edit(scope.row.id)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handle_delete(scope.row.id)">删除</el-button>
                </template>
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

        <!--预览-->
        <el-dialog class="preview_dialog" :title="preview_data.title" :visible.sync="dialog_visible">
            <div id="preview_article" v-loading="preview_loading">
                <el-divider v-if="preview_data.img" content-position="left">缩略图</el-divider>
                <el-carousel trigger="click" height="150px" v-if="preview_data.img" class="preview_banner">
                    <el-carousel-item v-for="item in preview_data.img.split(',')" :key="item">
                        <img class="need_contain" :src="formal_path+item" alt="">
                    </el-carousel-item>
                </el-carousel>
                <el-divider v-if="preview_data.keywords" content-position="left">关键词</el-divider>
                <div class="keywords">{{preview_data.keywords}}</div>
                <el-divider v-if="preview_data.description" content-position="left">描述</el-divider>
                <div class="description">{{preview_data.description}}</div>
                <el-divider v-if="preview_data.content" content-position="left">内容</el-divider>
                <div class="content" v-html="preview_data.content"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from "@/components/api";

    const article_index=api.article_index;
    const article_del=api.article_del;
    const get_single_article=api.get_single_article;
    const formal_path=api.formal_path;

    export default {
        data() {
            return {
                article_data:[],
                search: '',
                page_size:10,
                current_page:1,
                typeid:this.$route.params.pid?this.$route.params.pid:0,
                total_count:0,
                loading:true,
                //删除的id
                delete_id:"",
                //文章的状态
                state:true,
                //预览文章的loading
                preview_loading: true,
                //预览文章的开关
                dialog_visible: false,
                //预览文章的数据
                preview_data:{},
                //正式资源路径
                formal_path:formal_path
            }
        },
        created(){
            this.get_data(this.typeid,this.current_page,this.page_size);
        },
        methods: {
            //多选框点击
            handle_selection_change(val) {
                let ids=val.map(function (value) {
                    return value.id
                });
                this.delete_id=ids.join(",");
            },

            //获取文章数据
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

            //删除文章方法
            delete_article(id){
                this.$axios({
                    url:article_del,
                    method:"get",
                    params:{id:id}
                }).then((res) => {
                    //确认删除后更新页面数据
                    this.get_data(this.typeid,this.current_page,this.page_size);
                });
            },

            //表单操作事件
            handle_view(id) {
                this.preview_loading= false;
                this.dialog_visible= true;
                this.$axios({
                    url:get_single_article,
                    params:{id: id},
                    method:"get"
                }).then((res) => {
                    this.preview_data= res.data.data;
                    console.log(res.data.data);
                })

            },
            handle_edit(id) {
                this.$router.push({ name: 'article_edit', params: { id: id }})
            },
            //处理单id删除的方法
            handle_delete(id) {
                this.delete_id=id;
                this.$confirm('确定删吗?删除的id:'+this.delete_id,'提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delete_article(this.delete_id);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //删除选中的条目
            delete_selections(){
                if(this.delete_id != ''){
                    this.$confirm('确定删吗?删除的id:'+this.delete_id,'提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.delete_article(this.delete_id);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    })
                }
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
                this.get_data(this.typeid,this.current_page,this.page_size)
            },
            //当前页码调整
            current_page:function () {
                this.get_data(this.typeid,this.current_page,this.page_size)
            },
        }
    }
</script>

<style lang="scss">
    #preview_article{
        code{
            white-space: pre-wrap;
        }
        img{
            max-width: 100%!important;
        }
        table{
            max-width: 100%!important;
        }
    }
</style>
<style scoped lang="scss">
    .page{
        padding-top: 20px;
    }
    .preview_dialog{
        #preview_article{
            width: 100%;
            min-height: 300px;
            .preview_banner{
                overflow: hidden;
            }
        }
    }
</style>
