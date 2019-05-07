const express = require("express");
const bodyParser = require("body-parser");
const db = require("../module/db2");
const jwt = require("../module/jwt");
const tool = require("../module/tool");
const {upPic} = require("../module/upPic")
const common = require("../module/common")
const app = express();
app.use(bodyParser.json());
app.all("*",function (req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type,authorization");
    res.header("Access-Control-Allow-Methods","DELETE,PUT,GET,POST,OPTIONS");
    next();
})
//登录
module.exports.login = function (req,res) {
    //  console.log(req.body.account,req.body.password)
      db.findOne("adminList",{
          account:req.body.account,
          password:req.body.password,
      },function (err,info) {
          if(info){
              db.insertOne("adminLog",{
                  adminName:info.account,
                  addTime:Date.now()
              },function (err) {
                  // 成功
                  res.json({
                      ok:1,
                      mgs:"成功",
                      result:info.account,
                      id:info._id,
                      token:jwt.getToken(info.account,info._id)
                  })
              })
  
          }else{
              // 失败
              res.json({
                  ok:-1,
                  msg:"登陆失败"
              })
          }
      })
  }
  //登录日志
  module.exports.adminLoga = function (req,res) {
    common.getInfoList("adminLog",req,res)
    //   console.log(req.query.pageIndex)
    //    var whereObj={}
    // //   console.log(req.headers.authorization);//这个是获取的令牌里面的所有的值
    //    var token = jwt.deToken(req.headers.authorization)
    //  //  console.log(jwt.deToken(req.headers.authorization))
    //    if(token.ok===1){
    //     //   console.log(whereObj)
    //        var pageIndex = req.query.pageIndex/1;
    //        db.count("adminLog",whereObj,function (count) {
    //            var pageSize = 7;
    //            var pageSum = Math.ceil(count/pageSize) ;
    //            if(pageSum<0)
    //                pageSum =1;
    //            if(pageIndex > pageSum)
    //                pageIndex = pageSum;
    //            if(pageIndex < 0)
    //                pageIndex = 1;
    //            db.find("adminLog",{
    //                whereObj,
    //                skipNum:(pageIndex-1)*pageSize,
    //                limitNum:pageSize,
    //                sortObj:{
    //                    addTime:-1
    //                }
    //            },function (err,adminLog) {
    //                res.json(
    //                    {
    //                        ok:1,
    //                        adminLog,
    //                        pageIndex,
    //                        pageSum
    //                    }
    //                )
    //            })
    //        })
    //    }else{
    //        res.json({
    //            ok:-2,// 1 成功，-1 一般性的错误 ，-2 token 无权访问
    //            msg:"您没有权限访问该地址"
    //        })
    //    }
   }
   //删除
   module.exports.deletee  =function(req,res){
    var id = req.query.querye;
  //  console.log(id)
    db.findOneById("adminLog",id,function(err,content){
  //      console.log(content.goodsPic)
        db.deleteOneById("adminLog",id,function(err){
            if(err){
    //            console.log("删除失败")
                tool.send(res,-1,"删除失败")

            }else{
                tool.send(res,1,"删除成功")
            }
        })
    })
}
//添加管理员
module.exports.adminLog = function(req,res){
    //  console.log(req.body.adminName,11111111)
    //  console.log(req.body.passWord,1111111111)
      db.insertOne("adminList",{
          adminName:req.body.adminName,
          passWord:req.body.passWord,
          time:Date.now(),
      },function(err){
          if(err){
       //       console.log("失败")
          }else{
              res.json({
                  ok:1,
                  mag:"成功"
              })
          }
      })
  }
  //获取管理员
  module.exports.adminAdd =function (req,res) {
    common.getInfoList("adminList",req,res)
}