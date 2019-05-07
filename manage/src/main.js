import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Login from './views/Login.vue'
import axios from "axios";
Vue.prototype.$axios = axios;
import filters from "./filter";
import components from "./components/index"
Vue.use(ElementUI)
Vue.use(components)
Vue.config.productionTip = false
//这个是路由发送的时候拦截,//看看他里面有没有meta.isAuthorization: true是不是的与true如果等于true的话判断他loccalstorage是不是有,令牌如果有的话,那么就直接退出,有的话继续发送请求
router.beforeEach((to,from,next)=>{
  console.log(to,from);
  if(to.meta.isAuthorization){
     if(localStorage.token){
         next();
     }else{
         store.commit("OUT_LOGIN");
     }
  }else{
     next();
  }
})
//这个是ajax拦截
axios.interceptors.request.use(config => {
  config.url = "http://127.0.0.1" + config.url;
  //在这里加这个是要判断他的令牌是不是正确,并且他是不是过期,要注意一点如果在后台设置代理话那么就
  //会报错说你没有preflight response,所有你要添加res.header("Access-Control-Allow-Headers","content-type,authorization");
  config.headers = {
    "authorization": localStorage.token
  }
  console.log(config)
  return config
})

//过滤器:
for (var key in filters) {
  Vue.filter(key, filters[key]);
}

new Vue({
  router,
  store,
  render: function (h) {
    return h(this.$store.state.admin.id ? App : Login)
  }
}).$mount('#app')