import shopList from "../../components/shop/shopList.vue";
import shopTypeList from "../../components/shop/shopTypeList.vue";
import Apply from "../../components/Apply";
import Store_details from "../../components/shop/Store_details.vue";//店铺详情页
export default[
    {
        path:"/shopList",
        name:shopList,
        component:shopList,
        meta:{
            isAuthorization:true,
        },
    },
    {
        path:"/shopTypeList",
        name:shopTypeList,
        component:shopTypeList,
        meta:{
            isAuthorization:true,
        }
    },
    {
        path:"/Apply",
        name:"Apply",
        component:Apply,
        meth:{
            isAuthorization:true,
        }
    },
    {
        path:"/Store_details",
        name:"Store_details",
        component:Store_details,
        meth:{
            isAuthorization:true,
        }
    }
]