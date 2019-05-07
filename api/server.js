const express = require("express");
const bodyParser = require("body-parser");
const db = require("./module/db2");
const jwt = require("./module/jwt");
const tool = require("./module/tool");
const {upPic} = require("./module/upPic")
const app = express();
app.use(express.static(__dirname+"/upPic"));
app.use(bodyParser.json());
app.all("*",function (req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type,authorization");
    res.header("Access-Control-Allow-Methods","DELETE,PUT,GET,POST,OPTIONS");
    next();
})
const admin = require("./router/admin");
const shop = require("./router/shop")
//管理员设置
app.post("/login",shop.login);//登录
app.get("/adminLog",shop.adminLoga)//日志渲染
app.get("/deletee",shop.deletee)//删除记录
app.post("/adminLog",shop.adminLog)//添加管理员
app.get("/adminAdd",shop.adminAdd)//获取管理员
// //提交
app.post("/shopTypeList",function(req,res){
  //  console.log(req.body);
    res.json({
        ok:1
    })
})
//图片
app.post("/uploadPic",function (req,res) {
  //  console.log(1111111)
    upPic(req,"shopTypePic",function (obj) {
        res.json(obj);
    })
})

//店铺模块
app.post("/addshop",admin.addshop)//申请店铺
app.get("/Store/information",admin.information)//获取店铺信息
app.post("/modify",admin.modify)//修改店铺的内容
app.post("/delete_shop",admin.delete_shop)//删除店铺
app.listen(80,function () {
    console.log("success");
})