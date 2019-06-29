<template>
    <transition name="fade_y" mode="out-in">
        <router-view></router-view>
    </transition>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss">
    /*动画区域*/
    .fade-enter{
    @include Y(50px);
        opacity: 0;
    }
    .fade-enter-active{
    @include transition(0.5s);
    }

    .fade-leave-active{
    @include transition(0.5s);
    }
    .fade-leave-to{
    @include Y(50px);
        opacity: 0;
    }
</style>