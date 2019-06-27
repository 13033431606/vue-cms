<template>
    <div class="header_nav">
        <div class="user_logo"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                squareUrl:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
            }
        }
    }
</script>

<style scoped lang="scss">
    .header_nav{
        width: 100%;
        height: 50px;
        background: #fff;
        border-bottom: 1px solid #dcdcdc;
        .user_logo{
            float: right;
            width: 40px;
            height: 40px;
            @include linear_gradient(120deg,$color,$color2,10%);
            margin-top: 5px;
            margin-right: 5px;
            border-radius: 5px;
            box-shadow: 0 5px 10px 0px rgba(0,0,0,0.08);
        }
    }
</style>