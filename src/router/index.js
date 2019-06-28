import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import layout from '@/layout'

export const default_router= [
    { path: "/", component: layout, redirect: "/index", name: "index", meta: {title: "首页"},
        children: [
            { path: "index", component:() => import("@/views/index"), name:"index" ,meta: {title: "图表"}}
        ]
    },
    { path: "/article", component: layout, redirect: "/article/list", name: "article_list", meta: {title: "文章"},
        children: [
            { path: "list", component:() => import("@/views/article/list"), name: "article_list" ,meta: {title: "文章列表"}},
            { path: "edit", component:() => import("@/views/article/handle"), name: "article_edit" ,meta: {title: "编辑文章"}},
            { path: "add", component:() => import("@/views/article/handle"), name: "article_add" ,meta: {title: "添加文章"}},
        ]
    },
    { path: "/category", component: layout, redirect: "/category/list", meta: {title: "分类"},
        children: [
            { path: "list", component: () => import("@/views/category/list"), name: "article_list",meta: {title: "分类列表"}},
            { path: "edit", component: () => import("@/views/category/handle"), name: "category_edit", meta: {title: "编辑分类"}},
            { path: "add", component: () => import("@/views/category/handle"), name: "category_add", meta: {title: "添加分类"}}
        ]

    }
];

const router = new VueRouter({
    routes:default_router
});

export default router;