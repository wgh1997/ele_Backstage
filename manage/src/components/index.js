//这里放的都是一些全局组件
import pagelnfo from "./common/pagelnfo.vue"//这个是全局的分页
const components = {
    pagelnfo,
}
export default {
    install(Vue){
        for(var key in components){
            Vue.component(key,components[key])
        }
    }
}