<template>
    <div class="header_nav">
        <user_icon class="user_left"></user_icon>
    </div>
</template>

<script>
    export default {
        components:{
            "user_icon": () => import("@/components/user/icon")
        }
    }
</script>

<style scoped lang="scss">
    .header_nav{
        width: 100%;
        height: 50px;
        background: #fff;
        border-bottom: 1px solid #dcdcdc;
        .user_left{
            float: right;
            margin-top: 5px;
            margin-right: 15px;
        }
    }
</style>