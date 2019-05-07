<template>
  <div>
    <el-form>
      <el-form-item label="店铺名称" :label-width="formLabelWidth">
        <el-input v-model="shopname" autocomplete="off" ></el-input>
      </el-form-item>
     <el-form-item label="店铺描述" :label-width="formLabelWidth"> 
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"> </el-input>
    </el-form-item>
     <el-form-item label="联系电话" :label-width="formLabelWidth">
        <el-input v-model="Telephone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="店铺地址" :label-width="formLabelWidth">
        <el-input v-model="address" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-upload
        class="upload-demo"
        action="http://127.0.0.1/uploadPic"
        :file-list="fileList"
        list-type="picture"
        :on-success="success"
         name="shopTypePic"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible',false)">取 消</el-button>
      <el-button type="primary" @click="addShopType">确 定</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
    props:["visible"],
    data() {
        return {
            shopname: '',//店铺的名称
            shopimg:'',//店铺的头像
            formLabelWidth: '120px',
            fileList:[],
            textarea:'',//店铺描述
            Telephone:'',//联系电话
            address:'',//店铺地址
        }
    },
    methods:{
        addShopType(){
            // console.log("提交")
            // console.log(this.shopname,this.shopimg)
            axios.post("/shopTypeList").then(({data})=>{
                console.log(data)
            })
        },
        success(response, file, fileList){
            console.log(response.params.newPicName)//这个是你存进去的图片的名称
            this.shopimg=response.params.newPicName
        }
    },
    mounted() {
    },
}
</script>
<style lang="less" scoped>
    .el-form{
        .el-form-item{
            // .el-input{
            //     input{
            //         width:400px;
            //     }
            // }
            // .el-textarea{
            //     textarea{
            //         width:400px;
            //     }
            // }
        }
    }
</style>
