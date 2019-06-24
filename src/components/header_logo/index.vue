<template>
    <div class="logo">
        T<span>h</span>eory
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
    .logo{
        @include font(21px,#fff);
        font-weight: bold;
        height: 50px;
        line-height: 50px;
        text-align: center;
        padding-bottom: 25px;
        span{
            color: $logo_color;
        }
    }
</style>