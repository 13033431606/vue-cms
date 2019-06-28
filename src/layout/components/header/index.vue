<template>
    <div>
        <header_bar></header_bar>
        <header_guide></header_guide>
    </div>
</template>

<script>
    export default {
        components: {
            "header_bar": () => import("@/components/header_bar"),
            "header_guide": () => import("@/components/header_guide"),
        },
        data(){
            return{
                msg:"sdasd"
            }
        }

    }
</script>

<style scoped lang="scss">

</style>