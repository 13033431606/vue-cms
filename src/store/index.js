import Vue from "vue";
import Vuex from "vuex";
import Cookie from 'js-cookie';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //用来记录用户的登录状态
        user: {
            username: Cookie.get("theory_user")? JSON.parse(Cookie.get("theory_user"))["username"]: false,
            id: Cookie.get("theory_user")? JSON.parse(Cookie.get("theory_user"))["id"]: false,
            token: Cookie.get("theory_user")? JSON.parse(Cookie.get("theory_user"))["token"]: false,
        },
    },
    getters: {
        user_token: state => {
            return state.user.token
        }
    },
    mutations: {
        clear_state(state){
            state.user.username=false;
            state.user.id=false;
            state.user.token=false;
        },
        update_user(state){
            state.user=JSON.parse(Cookie.get("theory_user"));
        }
    }
})


export default store