<template>
    <div>
        <logo :style="{fontSize:26+'px'}"></logo>
        <sidebar></sidebar>
        <set_bar></set_bar>
    </div>
</template>

<script>
    export default {
        components:{
            "sidebar": () => import("@/components/sidebar"),
            "logo": () => import("@/components/logo"),
            "set_bar": () => import("@/components/set_bar"),
        }
    }
</script>

<style scoped lang="scss">

</style>