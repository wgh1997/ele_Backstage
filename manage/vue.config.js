module.exports={
    // 开发环境当中的服务进行配置。
    devServer:{
        port:88,
        host:"127.0.0.1",
        open:true,// 在浏览器当中打开项目。
        // proxy:{
        //     "/ele":{//你请接口的地址是一.ele开头的就会走这个代理.
        //         target:"http://127.0.0.1",//你要跨域的域名
        //         changeOrigin:true,//你要是不是要开启//代理
        //         pathRewrite:{
        //             "^/ele":""
        //         }
        //     }
        // }
    }
}