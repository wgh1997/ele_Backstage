import axios from "axios";
import bus from "@/bus";
export default {
    state:{
        id:localStorage.id,//管理员id
        result:localStorage.result,//管理员用户名
        token:localStorage.token,//这个是你要验证的令牌
        adminLog:[],//管理员日志
    },
    mutations:{
        CAHNGE_BOOK_LIST(state,obj){
            //修改
            state.id = localStorage.id = obj.id;
            state.result = localStorage.result = obj.result;
            state.token=localStorage.token  = obj.token;
        },
        //这个是获取管理员里面的数据
        SET_ADMIN_LOG(state,arr){
            state.adminLog=arr.adminLog
            console.log(state.adminLog)
            
        },
        //这个是判断清空本地存储的值
        OUT_LOGIN(state){
            localStorage.clear();
            state.id=localStorage.id=null;
        },
    },
    actions:{
        //
        adminLogin({commit},obj){
            obj.success()
            axios.post("/login",obj.data).then(({data})=>{
               if(data.ok===1){
                    commit("CAHNGE_BOOK_LIST",data);
               }else{
                    bus.$message({
                        message: "登录失败请重新登录",
                        type: "error",               
                    });
               }
            })
        },
        getAdminLog({commit},obj){
            console.log(obj)
            console.log(obj.pageIndex)
            axios.get("/adminLog",{
                params:{
                    pageIndex:obj.pageIndex,
                   
                },
                //在这里加这个是要判断他的令牌是不是正确,并且他是不是过期,要注意一点如果在后台设置代理话那么就
                //会报错说你没有preflight response,所有你要添加res.header("Access-Control-Allow-Headers","content-type,authorization");
                // headers:{
                //     "authorization":localStorage.token
                //   }
            }).then(({data})=>{
                console.log(data)
                //这个是操作成功的把页面渲染出来
                if(data.ok===1){
                   commit("SET_ADMIN_LOG",data)
                }
                //这返回的是你令牌超时的操作
                if(data.ok===-2){
                    commit("OUT_LOGIN")
                }
            })
        },
        // delete({commit},querye){
        //     console.log(querye)
        //     axios.get("/deletee",{
        //         params:{
        //             querye
        //         }
        //     }).then(({data})=>{
        //         commit("DELETE",data);
        //     })
        // }
    },
    getters:{

    }
}
       