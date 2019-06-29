<template>
    <div class="header_guide">
        <div class="crumb">
            <span v-for="item in this.$route.matched">
                    {{item.meta.title}} /
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        created(){

        },
        methods:{},
    }
</script>

<style scoped lang="scss">
    .header_guide{
        width: 100%;
        height: 60px;
        background: #fff;
        line-height: 60px;
        text-align: right;
        @include box-shadow(0 1px 3px 0px rgba(0, 0, 0, 0.05));
        @include box-sizing();
        padding: 0 20px;
        .crumb{
            float: left;
            span{
                color: #333;
                font-size: 17px;
                font-weight: lighter;
                display: inline-block;
                &:first-child{
                    font-size: 23px;
                }
            }
        }
    }
</style>