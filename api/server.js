const express = require("express");
const bodyParser = require("body-parser");
const db = require("./module/db2");
const jwt = require("./module/jwt");
const tool = require("./module/tool");
const {upPic} = require("./module/upPic")
const app = express();
app.use(bodyParser.json());
app.all("*",function (req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type,authorization");
    res.header("Access-Control-Allow-Methods","DELETE,PUT,GET,POST,OPTIONS");
    next();
})
app.post("/login",function (req,res) {
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
});
app.get("/adminLog",function (req,res) {
 //   console.log(req.query.pageIndex)
    var whereObj={}
 //   console.log(req.headers.authorization);//这个是获取的令牌里面的所有的值
    var token = jwt.deToken(req.headers.authorization)
  //  console.log(jwt.deToken(req.headers.authorization))
    if(token.ok===1){
     //   console.log(whereObj)
        var pageIndex = req.query.pageIndex/1;
        db.count("adminLog",whereObj,function (count) {
            var pageSize = 7;
            var pageSum = Math.ceil(count/pageSize) ;
            if(pageSum<0)
                pageSum =1;
            if(pageIndex > pageSum)
                pageIndex = pageSum;
            if(pageIndex < 0)
                pageIndex = 1;
            db.find("adminLog",{
                whereObj,
                skipNum:(pageIndex-1)*pageSize,
                limitNum:pageSize,
                sortObj:{
                    addTime:-1
                }
            },function (err,adminLog) {
                res.json(
                    {
                        ok:1,
                        adminLog,
                        pageIndex,
                        pageSum
                    }
                )
            })
        })
    }else{
        res.json({
            ok:-2,// 1 成功，-1 一般性的错误 ，-2 token 无权访问
            msg:"您没有权限访问该地址"
        })
    }
})
app.get("/deletee",function(req,res){
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
})
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
//申请店铺
app.post("/addshop",function(req,res){
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
})
//添加管理员
app.post("/adminLog",function(req,res){
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
})
//获取管理员
app.get("/adminAdd",function (req,res) {
    // console.log(req.query.pageIndex)
    var whereObj={}
  //  console.log(req.headers.authorization);//这个是获取的令牌里面的所有的值
    var token = jwt.deToken(req.headers.authorization)
   // console.log(jwt.deToken(req.headers.authorization))
    if(token.ok===1){
     //   console.log(whereObj)
        var pageIndex = req.query.pageIndex/1;
        db.count("adminList",whereObj,function (count) {
            var pageSize = 7;
            var pageSum = Math.ceil(count/pageSize) ;
            if(pageSum<0)
                pageSum =1;
            if(pageIndex > pageSum)
                pageIndex = pageSum;
            if(pageIndex < 0)
                pageIndex = 1;
            db.find("adminList",{
                whereObj,
                skipNum:(pageIndex-1)*pageSize,
                limitNum:pageSize,
                sortObj:{
                    addTime:-1
                }
            },function (err,adminList) {
                res.json(
                    {
                        ok:1,
                        adminList,
                        pageIndex,
                        pageSum
                    }
                )
            })
        })
    }else{
        res.json({
            ok:-2,// 1 成功，-1 一般性的错误 ，-2 token 无权访问
            msg:"您没有权限访问该地址"
        })
    }
})
//获取店铺信息
app.get("/Store/information",function(req,res){
    db.find("shopList",{
        sortObj:{
            addTime:-1,
        }
    },function(err,result){
        res.json({
            ok:1,
            result
        })
    })
})
//修改店铺的内容
// app.post("/modify",function(req,res){
//     var id = req.body.obj.id//传递过来的id
//     db.findOneById("shopList",id,function(err,b){
//         console.log(b)
//     })
// })
app.post("/modify",function(req,res){
    
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
})
//删除店铺
app.post("/delete_shop",function(req,res){
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
})
app.listen(80,function () {
    console.log("success");
})