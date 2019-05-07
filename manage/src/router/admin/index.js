import adminList from "@/components/admin/adminList"
import adminLog from "@/components/admin/adminLog"
import adminAdd from "@/components/admin/adminAdd"
export default [
    {
        path:"/adminList",
        component:adminList,
        alias:"/",
        meta:{
            isAuthorization:true// true 需要验证 false 不需要验证
        },
    },
    {
        path:"/adminLog",
        component:adminLog,
        meta:{
            isAuthorization:true// true 需要验证 false 不需要验证
        },
    },
    {
        path:"/adminAdd",
        component:adminAdd,
        meta:{
            isAuthorization:true// true 需要验证 false 不需要验证
        },
    }
]