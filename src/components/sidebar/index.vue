<template>
    <el-menu
            :default-active=this.$router.path
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#222"
            text-color="rgba(255,255,255,0.95)"
            active-text-color="#FF8C00"
            router
    >
        <el-submenu index="article">
            <template slot="title">
                <i class="el-icon-document"></i>
                <span>文章</span>
            </template>
            <el-menu-item index="/article/index">列表</el-menu-item>
            <el-menu-item index="/article/add">添加</el-menu-item>
            <el-menu-item index="article_category">分类</el-menu-item>
        </el-submenu>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-document"></i>
                <span>文章</span>
            </template>
            <el-menu-item index="1-4-1">列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-menu{
        border-right: none;
        font-weight: lighter;
        font-size: 13px;
    }

</style>