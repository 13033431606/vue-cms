<template>
    <div class="user_icon">
        <el-dropdown size="small">
            <div class="icon"></div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>安全退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped lang="scss">
    .user_icon{
        .icon{
            width: 40px;
            height: 40px;
            @include linear_gradient(120deg,$color,$color2,10%);
            background: url("../../assets/img/icon.jpg");
            background-size: cover;
            border-radius: 5px;
            box-shadow: 0 5px 10px 0px rgba(0,0,0,0.1);
            text-align: center;
            cursor: pointer;
        }
    }
</style>