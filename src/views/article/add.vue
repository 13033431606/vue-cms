<template>
    <div class="article_edit inner_container">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <!--标题-->
            <el-form-item label="标题" prop="title">
                <el-input
                        type="text"
                        placeholder="请输入内容..."
                        v-model="form.title"
                        maxlength="10"
                        show-word-limit
                ></el-input>
            </el-form-item>

            <!--上传-->
            <el-form-item label="图片" prop="img">
                <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
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
                        placeholder="请选择文章分类"
                        v-model="form.pid"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                        @change="catChange"></el-cascader>
            </el-form-item>

            <!--关键词-->
            <el-form-item label="关键词" prop="keywords">
                <el-input
                        type="text"
                        placeholder="请输入内容..."
                        v-model="form.keywords"
                        maxlength="10"
                        show-word-limit
                ></el-input>
            </el-form-item>

            <!--描述-->
            <el-form-item label="描述" prop="description">
                <el-input
                        type="text"
                        placeholder="请输入内容..."
                        v-model="form.description"
                        maxlength="10"
                        show-word-limit
                ></el-input>
            </el-form-item>

            <!--内容-->
            <el-form-item label="内容" prop="content">
                <Editor api-key="w2tyn2nq7v7yo8gq1qx7rs8pif7w1tbck1ff2y5nb7fv6l59" :init="all_option"></Editor>
            </el-form-item>

            <!--排序-->
            <el-form-item label="排序" prop="order">
                <el-input-number v-model="order" controls-position="right" @change="orderChange" :min="1" :max="999"></el-input-number>
            </el-form-item>

            <!--状态-->
            <el-form-item label="状态" prop="state">
                <el-radio v-model="radio" label="1">显示</el-radio>
                <el-radio v-model="radio" label="2">隐藏</el-radio>
            </el-form-item>

            <!--提交-->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>


        </el-form>
    </div>

</template>

<script>

    export default {
        components:{
          "Editor":()=>import("@tinymce/tinymce-vue"),
        },
        data() {
            return {
                //表单相关
                form: {
                    title: '',
                    pid:'',
                    img:'',
                    keywords: '',
                    description: '',
                    content: '',
                    order:'',
                    state:''
                },
                //表单验证
                rules: {
                    title: [
                        { required: true, message: '请输入文章标题', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    pid: [
                        { required: true, message: '请选择文章分类', trigger: 'change' }
                    ]
                },
                //上传组件
                dialogImageUrl: '',
                dialogVisible: false,
                //分类数据
                options:[
                    {
                        value: 'zhinan',
                        label: '指南',
                    }
                ],
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
                    'nonbreaking ' +//不间断空格
                    //'noneditable ' +//纺织用户更改元素内容,适合模板使用
                    'pagebreak ' +//分页符
                    'paste ' +//黏贴
                    'preview ' +//预览
                    'print ' +//打印
                    'save ' +//保存
                    'searchreplace ' +//查找替换
                    //'spellchecker ' +//拼写检查
                    'table ' +//表格
                    'template ' +//模板
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
                        ,"nonbreaking"//不间断空格
                        ,"pagebreak"//分页符
                        ,"paste"//黏贴
                        ,"searchreplace"//查找替换
                        //,"spellchecker"//拼写检查
                        //,"table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol"//表格相关
                        ,"template"
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
                    images_upload_url: '__APP__/tinymce/upLoad',
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
            //上传组件
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //分类
            catChange(value) {
                console.log(value);
            },

            orderChange(value){
                console.log(value);
            },
            //提交表单
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped lang="scss">

</style>