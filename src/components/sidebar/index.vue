<template>
    <el-menu
            :default-active=this.$route.path
            class="el-menu-vertical-demo"
            background-color="#222"
            text-color="rgba(255,255,255,0.95)"
            active-text-color="#FF8C00"
            router
    >
        <el-menu-item index="/index">
            <i class="el-icon-house"></i>
            <span>首页</span>
        </el-menu-item>
        <el-submenu index="article">
            <template slot="title">
                <i class="el-icon-document"></i>
                <span>文章</span>
            </template>
            <el-menu-item index="/article/list">列表</el-menu-item>
            <el-menu-item index="/article/add">添加</el-menu-item>
        </el-submenu>
        <el-submenu index="category">
            <template slot="title">
                <i class="el-icon-files"></i>
                <span>分类</span>
            </template>
            <el-menu-item index="/category/list">列表</el-menu-item>
            <el-menu-item index="/category/add">添加</el-menu-item>
        </el-submenu>
        <el-menu-item index="/log">
            <i class="el-icon-date"></i>
            <span>日志</span>
        </el-menu-item>

    </el-menu>
</template>

<script>
    export default {

    }
</script>

<style scoped lang="scss">
    .el-menu{
        border-right: none;
        font-weight: lighter;
        font-size: 13px;
    }

</style>