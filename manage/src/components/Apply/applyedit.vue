<template>
  <div class="applyedit">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="id" prop="shopName">
                    <span ref="id">{{bbs}}</span>
                </el-form-item>
            <el-form-item label="店铺名字" prop="shopName">
                <el-input v-model="ruleForm.shopName"></el-input>
            </el-form-item>
             <el-form-item label="店铺头像" prop="name">
                <el-upload
                    class="avatar-uploader"
                     action="http://127.0.0.1/uploadPic"
                    :show-file-list="false"
                     name="shopTypePic"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 100px"></i>
                </el-upload>
              </el-form-item>
            <el-form-item label="类别名称"  prop="value">
                <el-select  @change="fn" v-model="ruleForm.value" placeholder="请选择活动区域">
                    <el-option
                     v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
        <el-form-item label="选择"  prop="myVal">
                <el-checkbox name="type" 
                    v-model="ruleForm.myVal"
                    v-for="item in details"
                    :label="item"
                ></el-checkbox>
        </el-form-item>
        <el-form-item label="店铺地址" prop="shopaddress">
                <el-input v-model="ruleForm.shopaddress"></el-input>
            </el-form-item>

            <el-form-item label="联系电话" prop="ContactNumber">
                <el-input v-model="ruleForm.ContactNumber"></el-input>
            </el-form-item>
            <el-form-item label="营业时间" prop="BusinessHours" style="margin: 0 0 0 0">
                <el-time-select
                placeholder="起始时间"
                v-model="ruleForm.startTime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }">
              </el-time-select>
              <el-time-select
                placeholder="结束时间"
                v-model="ruleForm.endTime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                }">
              </el-time-select>
            </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible',false)">取 消</el-button>
        <el-button type="primary" @click="resetForm('ruleForm')">确 定</el-button>
      
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
    props:["visible","bbs"],
    data() {
        return {
            pageIndex:"1",
            imageUrl: '',
            details:[],
            img:'',
            ruleForm: {value: '',label: '',myVal:[],shopName:'',shopaddress: '',ContactNumber: '',BusinessHours:"" , id:"",img:'',startTime:"",endTime:"",
            },
            rules: {
                shopName: [
                { required: true, message: '请输入符合要求的店铺名', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                shopaddress: [
                { required: true, message: '请输入店铺地址', trigger: 'change' },
                 { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                value: [
                { required: true, message: '请选择活动类别', trigger: 'change' }
                ],
                myVal: [
                    { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
                ],
                ContactNumber: [
                { required: true, message: '请输入正确的手机号', trigger: 'change'}
                ],
                // BusinessHours: [
                // { required: true, message: '请输入营业时间', trigger: 'blur'},
                // ],
            },
            options:[{value: 1,label: "美食"},{value: 2,label: "快餐便当"},{value: 3,label: "特色菜系"},{value: 4,label: "异国料理"},{value: 5,label: "异国料理"},{value: 6,label: "甜品饮品"}],
            value4: [new Date(2019, 9, 10, 8, 40), new Date(2019, 9, 10, 9, 40)],
        }
    },
    methods:{
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.ruleForm.img = file.response.params.newPicName
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        fn(){
           if(this.ruleForm.value===1){
            //    console.log()
               this.details=["小吃炸串","简餐便当","地方菜系","汉堡披萨","香菇冒菜"]
           }
           if(this.ruleForm.value===2){
                this.details=["其他快餐","盖浇饭","汉堡薯条","黄焖鸡米饭","麻辣烫"]
           }
           if(this.ruleForm.value===3){
               console.log(111)
                this.details=["其他西餐","披萨","刺身寿司"]
           }
           if(this.ruleForm.value===4){
                this.details=["小吃炸串","简餐便当","地方菜系","汉堡披萨","香菇冒菜"]
           }
           if(this.ruleForm.value===5){
                console.log(666666666666)
                this.details=["其他小吃","炸鸡炸串","小龙虾","烧烤","花甲"]
           }
           if(this.ruleForm.value===6){
                this.details=["奶茶果汁","面包蛋糕","甜品","咖啡"]
           }
        },
        resetForm(ruleForm){
         this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.$emit('update:visible',false)
            this.$store.dispatch("store_nformation",this.pageIndex)
            this.$store.dispatch("modifyb",this.ruleForm)
          } else {
            alert("请正确输入格式")
          }
        });
       },
       nns(){
            console.log(1111)
       }
 
    },
    beforeUpdate(){
        console.log(this.bbs,222222222)
        var arr = this.$store.state.apply.information;
        var content =arr.find((value,index,arr)=>{
           if(value._id==this.bbs){
             console.log(value.shopTypeId)
              //  this.imageUrl = require("../../../../api/upPic/+value.shopPic")
               this.ruleForm.id=this.bbs
                this.ruleForm.value  = value.shopTypeId/1;
                //this.ruleForm.myVal=[]//这个是类别
                //this.details=value.shopTypeName
                console.log(value)
                this.ruleForm.shopName=value.shopName//店铺名称
                this.ruleForm.shopaddress=value.shopaddress//店铺地址
                this.ruleForm.ContactNumber=value.ContactNumber//联系电话
                this.ruleForm.BusinessHours=value.BusinessHours//营业时间
           }
        })
    },
    mounted() {
        var arr = this.$store.state.apply.information;
        var content =arr.find((value,index,arr)=>{
           if(value._id==this.bbs){
             console.log(value.shopTypeId)
           //  this.imageUrl = require("../../../../api/upPic/"+value.shopPic)
               this.ruleForm.id=this.bbs
                this.ruleForm.value  = value.shopTypeId/1;
                this.ruleForm.myVal=[]//这个是类别
                //this.details=value.shopTypeName
                console.log(value)
                this.ruleForm.shopName=value.shopName//店铺名称
                this.ruleForm.shopaddress=value.shopaddress//店铺地址
                this.ruleForm.ContactNumber=value.ContactNumber//联系电话
                this.ruleForm.BusinessHours=value.BusinessHours//营业时间
           }
        })
    },
}
</script>
<style lang="less" scoped>
     .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .dialog-footer{
      margin:  35px 5px 1px 233px;
  }
</style>
