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
        height: 60px;
        line-height: 60px;
        padding-bottom: 10px;
        text-align: center;
        span{
            color: $logo_color;
        }
    }
</style>