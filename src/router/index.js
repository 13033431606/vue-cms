import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import layout from '@/layout'

export const default_router= [
    { path: "/article", component: layout, redirect: "/article/index",
        children: [
            { path: "index", component:() => import("@/views/article")},
            { path: "edit", component:() => import("@/views/article/handle"), name: "article_edit"},
            { path: "add", component:() => import("@/views/article/handle"), name: "article_add"},
        ]
    },
    { path: "/category", component: layout, redirect: "/category/index",
        children: [
            { path: "index", component: () => import("@/views/category")},
            { path: "edit", component: () => import("@/views/category/handle"), name: "category_edit"},
            { path: "add", component: () => import("@/views/category/handle"), name: "category_add"}
        ]

    }
];

const router = new VueRouter({
    routes:default_router
});

export default router;