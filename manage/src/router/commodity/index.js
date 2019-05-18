import getcommodity from "../../components/commodity/getcommodity.vue"//添加店铺类别
import seecommodity from "../../components/commodity/seecommodity.vue"//获取店铺的列表
export default [
    {
        path:"/getcommodity",
        component:getcommodity,
        alias:"/",
        meta:{
            isAuthorization:true// true 需要验证 false 不需要验证
        },
    },
    {
        path:"/seecommodity",
        component:seecommodity,
        meta:{
            isAuthorization:true// true 需要验证 false 不需要验证
        },
    },
]