<template>
    <div class="inner_container">
        <el-button plain @click="delete_selections">删除选中</el-button>
        <el-tree
                :data="tree"
                node-key="id"
                show-checkbox
                ref="tree"
                default-expand-all
                :expand-on-click-node="false"
                @check="get_checked"
                :props="{
                    label: 'title',
                    value: 'id',
                    children: 'son'
                }"
               >
            <span class="custom-tree-node" slot-scope="{ node }">
            <span>{{ node.label }}</span>
            <div class="edit_button">
                <el-button
                        size="mini" >
                ID : {{node.data.id}}
                </el-button>
                <el-button
                        size="mini"
                        @click="category_view(node)">
                查看
              </el-button>
              <el-button
                      size="mini"
                      @click="category_edit(node)">
                编辑
              </el-button>
              <el-button
                      size="mini"
                      type="danger"
                      @click="category_del(node)">
                删除
              </el-button>
            </div>
          </span>
        </el-tree>
    </div>
</template>

<script>
    import api from "@/components/api";

    const type_tree=api.type_tree;
    const category_del=api.category_del;

    export default {
        data() {
            return {
                tree:[],
                delete_id:''
            };
        },
        created(){
            this.type_tree(1);
        },
        methods: {
            type_tree(id){
                let that=this;
                this.$axios({
                    url: type_tree,
                    method: 'get',
                    params: {id: id}
                }).then( (res) => {
                    that.tree=res.data.data;
                    that.tree[0].disabled=true;

                })
            },
            //分类操作
            category_view(node){
                this.$router.push({ name: "article_list", params:{pid: node.data.id}});
            },
            category_edit(node){
                this.$router.push({ name: "category_edit", params:{id: node.data.id}});
            },
            category_del(node){
                this.delete_id=node.data.id;
                this.$confirm('确定删吗?此操作会一并删除其子类分的所有数据,删除的分类:'+node.data.title,'提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((res) => {
                    this.delete_category(this.delete_id);
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
            //处理多选
            get_checked(){
                this.delete_id=this.$refs.tree.getCheckedKeys([]).join(",");
            },
            //删除分类方法
            delete_category(id){
                this.$axios({
                    url:category_del,
                    method:"get",
                    params:{id:id}
                }).then((res) => {
                    //确认删除后更新页面数据
                    this.type_tree(1);
                });
            },
            //删除选中
            delete_selections(){
                if(this.delete_id != ''){
                    this.$confirm('确定删吗?此操作会一并删除其子类分的所有数据,删除的分类:'+this.delete_id,'提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.delete_category(this.delete_id);
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
            }
        }
    };
</script>

<style  lang="scss">
    .el-tree-node__content{
        height: 46px;
        border-bottom: 1px solid #EBEEF5;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>