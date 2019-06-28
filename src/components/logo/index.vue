<template>
    <div class="logo" :style="logo_style">
        T<span>h</span>eory
    </div>
</template>

<script>
    export default {
        prop:['logo_style'],
        data(){
            return{
                logo_style:this.logo_style
            }
        }
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