<script>
    const base_url= "http://cms-api.tt/public";//目标域名

    //public
    const temp_path= base_url+ "/uploads/temp/";//缓存路径
    const formal_path= base_url+ "/uploads/";//正式路径

    //aritlce
    const article_index= base_url+ "/article/index";//id, page, num
    const article_add= base_url+ "/article/add";//data
    const article_del= base_url+ "/article/del";//id
    const get_single_article= base_url+ "/article/get_single_article";//id

    //category
    const category_add= base_url+ "/category/add";//data
    const category_del= base_url+ "/category/del";//id
    const get_single_category= base_url+ "/category/get_single_category";//id

    //base
    const file_upload= base_url+ "/base/upload";//文件上传 file
    const del_file= base_url+ "/base/del_file";//文件删除 file_name
    const type_tree= base_url+ "/base/type_tree";//获取树状结构 id
    const get_temp_size= base_url+ "/base/get_temp_size";//获取缓存目录大小
    const temp_clear= base_url+ "/base/temp_clear";//清空缓存目录
    const type_tree_echarts= base_url+ "/base/type_tree_echarts";//获取echarts类型的数据


    export default {
        //public
        temp_path,formal_path,
        //article部分
        article_index,article_del,article_add,get_single_article,
        //category
        category_add,category_del,get_single_category,
        //base部分
        file_upload,type_tree,del_file,get_temp_size,temp_clear,type_tree_echarts
    }
</script>

