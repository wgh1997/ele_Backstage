import axios from "axios";
export default {
    //数据的存储
    state:{
        information:[],
    },
    //修改数据
    mutations:{
        STOREINFORMATION(state,obj){
            state.information=obj;
        },
        //这个是更新status的数据的
        MODUFYBE(state,obj){
            state.information=obj;
            console.log(state.information)
        }
    },
    //执行异步操作
    actions:{
        //这个是获取
        store_nformation({commit},obj){
            console.log(111111111111)
            console.log("我要异步操作获取数据了",commit)
            axios.get("/Store/information",{
                params:{
                    pageIndex:obj.pageIndex,
                   
                },
            }).then(({data})=>{
                console.log(data)
                console.log(data.shopList)
                commit("STOREINFORMATION",data.shopList)
               commit("SET_ADMIN_LOG",data)
            })
        },
        //这个是修改
        modifyb({commit},obj){
            axios.post("/modify",{
                obj
            }).then(({data})=>{
                console.log(data)
                if(data.ok===1){
                    // console.log(commit)
                    // commit("MODUFYBE",obj)
                }
            })
        },
       
        
    },
    //计算属性
    getters:{

    }
}