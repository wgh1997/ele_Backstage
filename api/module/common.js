const express = require("express");
const db = require("./db2");
const jwt = require("./jwt");
const config = require("./config")
const app = express();
app.all("*",function (req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type,authorization");
    res.header("Access-Control-Allow-Methods","DELETE,PUT,GET,POST,OPTIONS");
    next();
})
module.exports.getInfoList=function(coll,req,res) {
    
    // const deInfo =  jwt.deToken(req.headers.authorization);
    // if(deInfo.ok === 1){
        console.log(2222222222)
    var pageIndex = req.query.pageIndex?req.query.pageIndex/1:1;
    db.count(coll,{},function (count) {
        // var config.PAGE_NUM = 8;
        var pageSum = Math.ceil(count/config.PAGE_NUM) ;
        if(pageSum<0)
            pageSum =1;
        if(pageIndex > pageSum)
            pageIndex = pageSum;
        if(pageIndex < 0)
            pageIndex = 1;
        db.find(coll,{
            skipNum:(pageIndex-1)*config.PAGE_NUM,
            limitNum:config.PAGE_NUM,
            sortObj:{
                addTime:-1
            }
        },function (err,results) {
            if(err){
                console.log("失败")
            }
            console.log(results)
            res.json(
                {
                    ok:1,
                    [coll]:results,
                    pageIndex,
                    pageSum
                }
            );

        })
    })
    // }
    // else{
    //     res.json({
    //         ok:-2,// 1 成功，-1 一般性的错误 ，-2 token 无权访问
    //         msg:"您没有权限访问该地址"
    //     })
    // }
}