<template>
    <div>
        <header_logo></header_logo>
        <sidebar></sidebar>
        <set_bar></set_bar>
    </div>
</template>

<script>
    export default {
        components:{
            "sidebar": () => import("@/components/sidebar"),
            "header_logo": () => import("@/components/header_logo"),
            "set_bar": () => import("@/components/set_bar"),
        }
    }
</script>

<style scoped lang="scss">

</style>