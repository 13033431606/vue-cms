import Vue from "vue";
import VueRouter from 'vue-router';
import store from "@/store";
import Cookie from 'js-cookie';

Vue.use(VueRouter);

import layout from '@/layout'

export const default_router= [
    { path: "", component:layout, redirect: "index"},
    //login
    { path: "/login", component:() => import("@/views/login/login"), name: "login", meta:{title: "登录"}},
    //index
    { path: "/index", component: layout, name: "index", meta: {title: "首页"},
        children: [
            { path: "", component:() => import("@/views/index"), name:"index" ,meta: {title: "信息"}}
        ]
    },
    //article
    { path: "/article", component: layout, redirect: "/article/list", name: "article_list", meta: {title: "文章"},
        children: [
            { path: "list", component:() => import("@/views/article/list"), name: "article_list" ,meta: {title: "文章列表"}},
            { path: "edit", component:() => import("@/views/article/handle"), name: "article_edit" ,meta: {title: "编辑文章"}},
            { path: "add", component:() => import("@/views/article/handle"), name: "article_add" ,meta: {title: "添加文章"}},
        ]
    },
    //category
    { path: "/category", component: layout, redirect: "/category/list", meta: {title: "分类"},
        children: [
            { path: "list", component: () => import("@/views/category/list"), name: "article_list",meta: {title: "分类列表"}},
            { path: "edit", component: () => import("@/views/category/handle"), name: "category_edit", meta: {title: "编辑分类"}},
            { path: "add", component: () => import("@/views/category/handle"), name: "category_add", meta: {title: "添加分类"}}
        ]
    },
    //log
    { path: "/log" ,component: layout, redirect: "/log/index", meta: {title: "日志"},
        children:[
            { path: "index", component: () => import("@/views/log/index"), name: "log", meta:{ title: "日志列表"}}
        ]
    }
];



const router = new VueRouter({
    routes:default_router,

});

router.beforeEach((to, from, next) => {
    if(to.name == "login"){
        next()
    }
    else{
        if(Cookie.get('theory_user')){
            next();
        }
        else{
            next({path:"/login"});
        }
    }
});

export default router;