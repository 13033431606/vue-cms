import Vue from 'vue';
import App from './App.vue';
import store from "@/store";
import Cookie from 'js-cookie';
import Axios from 'axios';


//element-ui
import ElementUi from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/element_config.scss';
Vue.use(ElementUi);

//默认样式
import "./assets/css/reset.css";

import router from "./router"

Vue.config.productionTip = false;

Vue.prototype.$axios=Axios;
Vue.prototype.$cookie=Cookie;


new Vue({
  render: h => h(App),
    router,
    store
}).$mount('#app');


