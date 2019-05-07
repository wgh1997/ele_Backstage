import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin'
import shop from './shop';
import apply from './apply'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //管理员页码数据
        page:{
            pageIndex:1,// 当前页
            pageSum:1// 总页数
        },
        //添加或者修改的一些全局属性
        apply:{

        }
    },
    mutations:{
        //这个是修改页码的数量
        SET_ADMIN_LOG(state,data){
            console.log(111111)
            state.page.pageIndex=data.pageIndex,
            state.page.pageSum=data.pageSum
        }
    },   
    modules:{
        admin,
        shop,
        apply
    }
})
