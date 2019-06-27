<template>
    <div class="article_edit inner_container">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" v-loading="form_loading">
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
                        :limit="6"
                        :on-exceed="upload_exceed"
                        :file-list="img_list"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialog_visible">
                    <img width="100%" :src="dialog_imageurl" alt="Theory by thy">
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
                            label: 'title',
                            value: 'id',
                            children: 'son',
                            checkStrictly: true
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
            <el-form-item label="排序" prop="sort">
                <el-input-number v-model="form.sort" controls-position="right" @change="sort_change" :min="0" :max="9999"></el-input-number>
            </el-form-item>

            <!--点击量-->
            <el-form-item label="点击" prop="click">
                <el-input-number v-model="form.click" controls-position="right" @change="click_change" :min="0" :max="999999"></el-input-number>
            </el-form-item>

            <!--状态-->
            <el-form-item label="显示" prop="state">
                <el-switch
                        active-value="on"
                        inactive-value="off"
                        v-model="form.state">
                </el-switch>
            </el-form-item>

            <!--提交-->
            <el-form-item>
                <el-button type="primary" :loading="submit_loading" @click="submit_form('form')">立即提交</el-button>
                <el-button @click="reset_form('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    import qs from 'qs';
    import api from "@/components/api";


    const temp_path=api.temp_path;
    const formal_path=api.formal_path;


    const article_add=api.article_add;
    const get_single_article=api.get_single_article;

    const file_upload=api.file_upload;
    const del_file=api.del_file;

    const type_tree=api.type_tree;


    export default {
        components:{
          "editor":()=>import("@tinymce/tinymce-vue"),
        },
        created(){
            this.type_tree(1);
            this.getNowFormatDate();
            if(this.$route.params.id){
                this.get_single_article();
            }
        },
        data() {
            return {
                //控制loading
                tree_loading:true,
                submit_loading:false,
                form_loading:false,//编辑页面用
                //表单相关
                form: {
                    title: '',
                    img:'',//和img_arr,img_list,三者相关联
                    pid:[],
                    time:'',
                    keywords: '',
                    description: '',
                    content: '',
                    sort:0,
                    state:true,
                    click:0,
                    //如果是编辑的话,会有id值
                    id:this.$route.params.id?this.$route.params.id:0,
                },
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
                img_arr:[],//用来缓冲处理图片删除或者添加的中间件数组
                img_list: [],//供上传组件识别的数组,内为图片对象
                img_remove: "",//将要移除的图片filename
                dialog_imageurl: '',//预览图片的路径
                dialog_visible: false,//预览图片的开关
                //上传路径
                file_upload:file_upload,
                //分类数据
                options:[],
                //日期格式
                time_type:'yyyy-MM-dd',
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
                    images_upload_url: file_upload,
                    images_upload_base_path: temp_path,//前缀路径
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
            //判断有无传值,有的话获取数据
            get_single_article(){
                this.form_loading= true;
                this.$axios({
                    url: get_single_article,
                    method: "get",
                    params: {id: this.$route.params.id}
                }).then((res) => {
                    //处理pid
                    //element-ui级联组件支持数组值
                    //pid经上传后序列化成了字符串,所以得转化一下
                    let pid_arr= [];
                    pid_arr.push(parseInt(res.data.data.pid));
                    this.form= res.data.data;
                    this.form.pid= pid_arr;

                    console.log(pid_arr)
                    //处理图片列表
                    //首先判断不为空
                    if(res.data.data.img != ''){
                        this.img_arr= res.data.data.img.split(",");
                        this.img_list= this.img_arr.map(function (value) {
                            return {name: "value", url: formal_path+value, data: value}
                        });
                    }

                    this.form_loading=false;
                })
            },
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

            //获取当前时间
            getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
                this.form.time=currentdate;
            },

            //上传组件方法群
            upload_remove(response) {
                let that= this;
                let img_remove= response.response? response.response.data: response.data;

                let qs_filename= qs.stringify({file_name:img_remove});
                this.$axios({
                    url: del_file,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: qs_filename,
                    method: "post"
                }).then((res) => {
                    let index= that.img_arr.indexOf(img_remove);
                    that.img_arr.splice(index,1);
                    //因为不监听splice方法,所以手动改
                    that.form.img= that.img_arr.join(",")
                    that.$message({
                        message: "图片删除成功!",
                        type: "success"
                    })
                }).catch(() => {
                    that.$message({
                        message: "图片删除失败!",
                        type: "error"
                    })
                })
            },
            upload_preview(file) {
                this.dialog_imageurl= file.url;
                this.dialog_visible= true;
            },
            upload_success(response){
                this.img_arr.push(response.data);
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
                //eleme联级组件返回的是数组,方便维护,取单一父id传值
                this.form.pid= value;
            },

            //排序sort
            sort_change(value){
                this.form.sort= value;
            },

            //点击量click
            click_change(value){
                this.form.click= value;
            },

            //提交表单
            submit_form(formName) {
                //开启上传loading开关
                this.submit_loading= true;

                var that=this;
                this.$refs[formName].validate((valid) => {
                    //先通过验证
                    if (valid) {
                        //因为用post传值,得用qs序列化,并添加header
                        //更改pid的数据类型
                        this.form.pid= this.form.pid[this.form.pid.length-1];

                        that.$axios({
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            url: article_add,
                            method: 'post',
                            data: qs.stringify(that.form)
                        }).then(res=>{
                            if(res){
                                //返回提示信息
                                that.$message({
                                    showClose: true,
                                    message: this.$route.params.id? '修改成功!': '添加成功!',
                                    type: 'success'
                                });

                                //关闭上传按钮loading
                                that.submit_loading= false;
                                if(that.$route.params.id){
                                    //修改完重新加载数据
                                    that.get_single_article()
                                }
                                else{
                                    //添加完后清空表格内容
                                    this.$refs[formName].resetFields();
                                    this.img_list=[];
                                    this.img_arr=[];
                                }
                            }
                            else{
                                //返回提示信息
                                that.$message({
                                    showClose: true,
                                    message: this.$route.params.id? '修改失败!': '添加失败!',
                                    type: 'error'
                                });
                                that.submit_loading=false;
                            }
                        })
                    } else {

                        //返回提示信息
                        that.$message({
                            showClose: true,
                            message: '验证失败!',
                            type: 'error'
                        });
                        //关闭上传按钮loading
                        this.submit_loading= false;
                        return false;
                    }
                });
            },
            //重置表单
            reset_form(formName) {
                this.$refs[formName].resetFields();
                this.img_list=[];
                this.img_arr=[];
            }
        },
        watch: {
            //检测图片处理中间件数组,监听不了splice
            img_arr:function (value) {
                this.form.img= value.join(",")
            },
            $route(to,from){
                //判断是否是从编辑页调至添加页
                if(this.$route.name == "article_add"){
                    this.id=0;
                    this.$refs["form"].resetFields();
                    this.img_list=[];
                    this.img_arr=[];
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>