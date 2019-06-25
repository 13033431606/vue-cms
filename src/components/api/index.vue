<script>
    const base_url= "http://cms-api.tt/public";//目标域名

    //aritlce
    const article_index= base_url+ "/article/index";//id, page, num
    const article_add= base_url+ "/article/add";//data


    //base
    const file_upload= base_url+ "/base/upload";//文件上传 file
    const type_tree= base_url+ "/base/type_tree";//获取树状结构 id


    export default {
        article_index,file_upload,article_add,type_tree
    }
</script>

