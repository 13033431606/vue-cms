<template>
     <div class="container">
        <div class="left_part">
            <index_sidebar class="sidebar"></index_sidebar>
        </div>
         <div class="right_part need_scroll_small">
             <index_header class="index_header"></index_header>
             <div class="index_main">
                 <index_main></index_main>
             </div>
         </div>
     </div>
</template>

<script>
    import index_header from "./components/header";
    import index_sidebar from "./components/sidebar";
    import index_main from "./components/main";
    export default {
        name: "index",
        components:{
            index_header, index_sidebar, index_main
        }
    }
</script>

<style scoped lang="scss">
    .container{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        @include a;
        .left_part{
            width: 250px;
            height: 100vh;
            float: left;
            background: #222;
            z-index: 5;
            @include box-shadow(0 0 16px 0 rgba(0,0,0,0.15));
            position: fixed;
            top: 0;
            left: 0;
        }
        .right_part{
            width: calc(100% - 250px);
            height: 100%;
            float: right;
            background: #f8f8f8;
            height: 100vh;
            .index_header{
                width: 100%;
                height: auto;
            }
            .index_main{
                width: 100%;
                height: auto;
                @include box-sizing();
                padding: 20px 20px;
            }
        }
    }
</style>
<style lang="scss">
    .inner_container{
        @include a;
        border-radius: 5px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 10px 20px 0px rgba(0,0,0,0.08);
        @include box-sizing();
        padding: 20px 15px;
    }
</style>