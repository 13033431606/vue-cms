<template>
    <div class="set_bar">
        <div class="set_ele">
            <el-tooltip class="item" effect="dark" content="系统设置" placement="top">
                <i class="el-icon-setting"></i>
            </el-tooltip>
        </div>
        <div class="set_ele">
            <el-tooltip class="item" effect="dark" content="刷新页面" placement="top">
                <i class="el-icon-refresh"></i>
            </el-tooltip>
        </div>
        <div class="set_ele">
            <el-tooltip class="item" effect="dark" content="清空缓存" placement="top">
                <i class="el-icon-delete"></i>
            </el-tooltip>
        </div>
        <div class="set_ele">
            <el-tooltip class="item" effect="dark" content="退出登录" placement="top">
                <i class="el-icon-switch-button"></i>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped lang="scss">
    .set_bar{
        width: 100%;
        position: absolute;
        bottom: 0;
        height: 50px;
        background: #111;
        z-index: 50;
        .set_ele{
            width: 25%;
            float: left;
            line-height: 50px;
            text-align: center;
            line-height: 50px;
            &:hover{
                i{
                    color: #fff;
                }
            }
            i{
                font-size: 18px;
                color: rgba(255,255,255,0.8);
                @include transition(0.3s);
                cursor: pointer;
            }
        }
    }
</style>