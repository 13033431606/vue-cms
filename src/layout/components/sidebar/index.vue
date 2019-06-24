<template>
    <div>
        <header_logo></header_logo>
        <sidebar></sidebar>
    </div>
</template>

<script>
    export default {
        components:{
            "sidebar": () => import("@/components/sidebar"),
            "header_logo": () => import("@/components/header_logo"),
        }
    }
</script>

<style scoped lang="scss">

</style>