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
//申请店铺
module.exports.addshop = function(req,res){
    var shopName = req.body.shopname//店铺名称
    var shopPic = ''//头像
    //console.log(shopimg,222,shopname,1111,)
    var textarea= req.body.textarea //店铺描述
    var ContactNumber= req.body.telephone //联系电话
    var shopaddress= req.body.address//店铺地址
    var ID_card_no=req.body.ID_card_no //身份证号码
    var full_name=req.body.full_name //姓名
    var ID_cardimg=[req.body.ID_cardimg]//身份证照片
    var Busines_img=[req.body.Busines_img];//营业执照照片 
    var addTime = Date.now(); 
    db.insertOne("shopList",{
        shopName,
        shopPic,
        textarea,
        ContactNumber,
        shopaddress,
        ID_card_no,
        full_name,
        ID_cardimg,
        Busines_img,
        addTime,
        shopTypeId:'',
        shopTypeName:'',
    },function(err,bb){
        if(err){
            res.json({
                ok:-1
            }) 
        }else{
            res.json({
                ok:1
            })
        }
    })
   // console.log(shopname)
}
//获取店铺信息
module.exports.information = function(req,res){
    common.getInfoList("shopList",req,res)
}
//修改店铺信息
module.exports.modify  = function(req,res){
    var id = req.body.obj.id//传递过来的id
    console.log(req.body.obj,111111111111)
    var shopName = req.body.obj.shopName//店铺的名字
    console.log(shopName)
    var shopPic  = req.body.obj.img//铺的图片
    var shopTypeId = req.body.obj.value/1//店铺id的类别
    var shopTypeName  = req.body.obj.value//店铺类别的名称
    console.log(shopTypeName)
    var addTime = Date.now()//添加店铺的时间
    var shopaddress = req.body.obj.shopaddress//店铺的地址
    var ContactNumber = req.body.obj.ContactNumber/1//联系电话
    var BusinessHours  =req.body.obj.BusinessHours //营业时间
    var myVal = req.body.obj.myVal
    db.updateOneById("shopList",id,{$set:{
        shopName,
        shopPic,
        shopTypeId,
        shopTypeName:req.body.obj.myVal,
        addTime,
        shopaddress,
        ContactNumber,
        BusinessHours,
      
    }},function(err,results){
        console.log(err)
        if(err){
            console.log("失败")
        }else{
            res.json({
                ok:1,
               
            })
        }
    })
}
//删除店铺
module.exports.delete_shop = function(req,res){
    console.log(req.body.row)
    db.deleteOneById("shopList",req.body.row,function(err){
        if(err){
            console.log("失败")
        }else{
            res.json({
                ok:1, 
            })
        }
    })
}
//店铺类别
module.exports.shopTypeList = function(req,res){
    console.log("我要存储")
    db.insertOne("shopTypeList",{
        shopTypeName:req.body.shopTypeName,
        shopTypePic:req.body.shopTypePic,
        addTime:Date.now()
    },function(err,results){
        if(err){
            console.log("失败")
        }else{

            res.json({
                ok:1, 
                results
            })
        }
    })
  }
  //获取店铺类别信息
  module.exports.get_laibian = function(req,res){
    console.log("我在哪里")
    common.getInfoList("shopTypeList",req,res)
}