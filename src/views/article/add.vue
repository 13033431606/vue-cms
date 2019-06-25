<template>
    <div class="article_edit inner_container">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <!--标题-->
            <el-form-item label="标题" prop="title">
                <el-input
                        type="text"
                        placeholder="请输入内容..."
                        v-model="form.title"
                        maxlength="200"
                        show-word-limit
                ></el-input>
            </el-form-item>

            <!--上传-->
            <el-form-item label="图片" prop="img">
                <el-upload
                        :action="file_upload"
                        list-type="picture-card"
                        :on-preview="upload_preview"
                        :on-remove="upload_remove"
                        :on-success="upload_success"
                        :on-error="upload_error"
                        :limit="6"
                        :on-exceed="upload_exceed"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>

            <!--分类-->
            <el-form-item label="分类" prop="pid">
                <el-cascader
                        :show-all-levels="false"
                        placeholder="请选择文章分类"
                        v-model="form.pid"
                        :options="options"
                        v-loading="tree_loading"
                        :props="{
                            expandTrigger: 'hover' ,
                            label: 'name',
                            value: 'id',
                            children: 'son'
                        }"
                        @change="cat_change"></el-cascader>
            </el-form-item>

            <!--日期-->
            <el-form-item label="日期" prop="time">
                <el-date-picker
                        v-model="form.time"
                        type="date"
                        :value-format="time_type"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>

            <!--关键词-->
            <el-form-item label="关键词" prop="keywords">
                <el-input
                        type="text"
                        placeholder="请输入内容..."
                        v-model="form.keywords"
                        maxlength="150"
                        show-word-limit
                ></el-input>
            </el-form-item>

            <!--描述-->
            <el-form-item label="描述" prop="description">
                <el-input
                        type="text"
                        placeholder="请输入内容..."
                        v-model="form.description"
                        maxlength="350"
                        show-word-limit
                ></el-input>
            </el-form-item>

            <!--内容-->
            <el-form-item label="内容" prop="content">
                <editor api-key="w2tyn2nq7v7yo8gq1qx7rs8pif7w1tbck1ff2y5nb7fv6l59" v-model="form.content" :init="all_option"></editor>
            </el-form-item>

            <!--排序-->
            <el-form-item label="排序" prop="order">
                <el-input-number v-model="form.order" controls-position="right" @change="order_change" :min="1" :max="999"></el-input-number>
            </el-form-item>

            <!--状态-->
            <el-form-item label="状态" prop="state">
                <el-radio v-model="form.state" label="on">显示</el-radio>
                <el-radio v-model="form.state" label="off">隐藏</el-radio>
            </el-form-item>

            <!--提交-->
            <el-form-item>
                <el-button type="primary" @click="submit_form('form')">立即创建</el-button>
                <el-button @click="reset_form('form')">重置</el-button>
            </el-form-item>


        </el-form>
    </div>

</template>

<script>
    import qs from 'qs';

    import api from "@/components/api";
    const article_add=api.article_add;

    const file_upload=api.file_upload;
    const type_tree=api.type_tree;



    export default {
        components:{
          "editor":()=>import("@tinymce/tinymce-vue"),
        },
        created(){
            this.type_tree(1);
        },
        data() {
            return {
                tree_loading:true,
                //表单相关
                form: {
                    title: '',
                    img:'',
                    pid:'',
                    time:'',
                    keywords: '',
                    description: '',
                    content: '',
                    order:'',
                    state:'on'
                },
                img_arr:[],
                //表单验证
                rules: {
                    title: [
                        { required: true, message: '请输入文章标题', trigger: 'blur' },
                    ],
                    pid: [
                        { required: true, message: '请选择文章分类', trigger: 'blur' }
                    ],
                    time: [
                        { required: true, message: '请选择日期', trigger: 'blur' }
                    ]
                },
                //上传组件
                dialogImageUrl: '',
                dialogVisible: false,
                //上传路径
                file_upload:file_upload,
                //分类数据
                options:[],
                //日期格式
                time_type:'yyyy-MM-dd',
                order:"1",
                //文章状态
                radio:"1",
                //富文本编辑器
                all_option:{
                    selector: '#content',
                    //插件载入
                    plugins:
                    'autosave ' +//自动保存,草稿箱
                    'anchor ' +//锚点
                    'autolink ' +//自动识别a标签
                    'autoresize ' +//自动适配尺寸
                    'code ' +//查看源码
                    'charmap '+//特殊字符表
                    'codesample ' +//代码美化展示
                    'directionality ' +//文字方向
                    'emoticons ' +//表情符号
                    'fullpage ' +//编辑文档属性，如标题、关键字和说明
                    'fullscreen ' +//全屏
                    'help ' +//帮助文档
                    'hr ' +//添加水平线
                    'image imagetools ' +//图片及图片工具
                    'importcss ' +//匹配css
                    'insertdatetime ' +//时间选择工具
                    'link ' +//添加超链接
                    //'legacyoutput ' +//将输出html换为旧语法
                    //'linkchecker ' +//链接验证,需配置,暂未使用//https://www.tiny.cloud/docs/plugins/linkchecker/
                    'lists ' +//列表样式
                    'media ' +//多媒体
                    // 'nonbreaking ' +//不间断空格
                    //'noneditable ' +//纺织用户更改元素内容,适合模板使用
                    // 'pagebreak ' +//分页符
                    'paste ' +//黏贴
                    'preview ' +//预览
                    'print ' +//打印
                    'save ' +//保存
                    'searchreplace ' +//查找替换
                    //'spellchecker ' +//拼写检查
                    'table ' +//表格
                    // 'template ' +//模板
                    'textpattern ' +//转换特殊字符,类似markdown
                    'toc ' +//添加内容列表
                    'visualblocks ' +//显示区域块内容
                    'visualchars ' +//查看默认隐藏的标识符
                    'wordcount ' +//显示文字字数
                    'imagetools table spellchecker'
                    ,

                    //工具栏
                    toolbar: [
                        'newdocument save restoredraft | undo redo | formatselect | fontselect | fontsizeselect'
                        ,'bold italic underline strikethrough | forecolor backcolor | subscript superscript |alignleft aligncenter alignright alignjustify | outdent indent | removeformat'//字体样式处理
                        ,"numlist bullist"//列表样式
                        ,'link image'//图片引入
                        ,"table"//表格相关
                        ,"ltr rtl"//文字方向
                        ,"anchor"//锚点
                        ,"hr"//添加水平线
                        ,"codesample"//代码美化展示
                        ,"media"//多媒体操作
                        ,"charmap"//特殊字符表
                        ,"emoticons"//表情文字
                        ,"fullpage"//编辑文档属性，如标题、关键字和说明
                        ,"insertdatetime"//时间选择工具//https://www.tiny.cloud/docs/plugins/insertdatetime/
                        // ,"nonbreaking"//不间断空格
                        // ,"pagebreak"//分页符
                        ,"paste"//黏贴
                        ,"searchreplace"//查找替换
                        //,"spellchecker"//拼写检查
                        //,"table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol"//表格相关
                        // ,"template"
                        ,"textpattern"
                        ,"toc"
                        ,"visualblocks"//显示区域块内容
                        ,"visualchars"//
                        ,"wordcount"
                        ,"print"//打印
                        ,"preview"//预览
                        ,"code"//查看源码
                        ,"fullscreen"//全屏

                    ],

                    //图片工具需配置服务器,暂未处理//https://www.tiny.cloud/docs/plugins/imagetools/
                    imagetools_cors_hosts: ['wpimg.wallstcn.com', 'wallstreetcn.com'],//图片工具
                    // // imagetools_credentials_hosts: ['thy1024851617.gz01.bdysite.com', 'otherdomain.com'],//图片工具
                    imagetools_proxy: '__ROOT__/proxy.php',//图片工具
                    imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",//图片工具

                    //匹配图片上传路径
                    images_upload_url: this.file_upload,
                    images_upload_base_path: '/public/uploads/',//前缀路径
                    automatic_uploads:true,
                    relative_urls : false,
                    remove_script_host : true,

                    //模板
                    templates: [
                        {title: 'Some title 1', description: 'Some desc 1', content: 'My content'},
                    ],

                    //编辑器默认最低高度
                    min_height: 350,
                    max_height: 600,

                    //匹配css//https://www.tiny.cloud/docs/plugins/importcss/
                    content_css:"",
                    paste_data_images: true,
                    //右键快捷操作
                    contextmenu: "link image imagetools table spellchecker",

                    //菜单栏
                    menubar: 'file edit insert view format tools table help',
                }
            }
        },
        methods: {
            //获取树状结构
            type_tree(id){
                this.tree_loading=true;
              this.$axios({
                  url:type_tree,
                  params:{id:id}
              }).then(res=>{
                  this.tree_loading=false;
                  this.options=res.data.data[0]["son"];
              })
            },

            //上传组件
            upload_remove(file, fileList) {
                console.log(file, fileList);
            },
            upload_preview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            upload_success(response, file, fileList){
                this.img_arr.push(response.data);
                this.form.img=this.img_arr.join(",");
            },
            upload_error(response, file, fileList){
                console.log(response);
            },
            upload_exceed(){
                this.$message({
                    showClose: true,
                    message: '图片上传超出限制,最多六张!',
                    type: 'warning'
                });
            },

            //分类pid
            cat_change(value) {
                this.form.pid=value.splice(value.length-1,1);
                console.log(this.pid_arr)
            },

            order_change(value){

            },

            //提交表单
            submit_form(formName) {
                var that=this;
                console.log(that.form)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.$axios({
                            url:article_add,
                            method: 'post',
                            data:qs.stringify(that.form)
                        }).then(res=>{
                            console.log(res);
                        })
                    } else {
                        console.log('验证错误');
                        return false;
                    }
                });
            },
            //重置表单
            reset_form(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="scss">

</style>