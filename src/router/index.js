import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import layout from '@/layout'

export const default_router= [
    { path: "/article", component: layout,
        children: [
            { path: "index", component:() => import("@/views/article") },
            { path: "edit", component:() => import("@/views/article/handle"), name: "article_edit"},
            { path: "add", component:() => import("@/views/article/handle"), name: "article_add"},
        ]
    },
];

const router = new VueRouter({
    routes:default_router
});

export default router;