import axios from "axios";
export default {
    //存储数据
    state:{
        shopTypeList:[] 
    },
    //修改数据
    mutations:{
        GET_LAIBIAN(state,obj){
            console.log(obj)
           state.shopTypeList=obj;
        },
    },
    //执行异步操作
    actions:{
        //这个是店铺的类别
        shoptypeList({commit},obj){
            axios.post("/shopTypeList",{
                obj
            }).then(({data})=>{
                if(data.ok===1){
                    console.log("成功")
                }
            })
        },
        //这个是获取店铺类别的信息
        get_laibian({commit},obj){
            console.log(obj.pageIndex)
            axios.get("/get_laibian",obj).then(({data})=>{
                    if(data.ok===1){
                        commit("GET_LAIBIAN",data.shopTypeList)
                        commit("SET_ADMIN_LOG",data)  
                    }
                })
        }
        
    },
    //计算属性
    getters:{

    }
}