<template>
  <div>
    <el-form>
      <el-form-item label="店铺类别" :label-width="formLabelWidth" >
        <el-input v-model="shopname" autocomplete="off" style="width:500px"></el-input>
      </el-form-item>
    </el-form>
    <div style="margin:0px 0px 49px 25px">
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
    <div slot="footer" class="dialog-footer" style="margin: 0px 0px 0px 231px">
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
            shopname: '',//店铺类别的名称
            shopimg:'',//店铺的头像
            formLabelWidth: '100px',
            fileList:[],
        }
    },
    methods:{
     
        addShopType(){
            this.$emit('update:visible',false)
            this.$store.dispatch("shoptypeList",{
              goodsTypeName:this.shopname,
              shopTypePic:this.shopimg
            })
           
        },
        success(response, file, fileList){
            console.log(response.params.newPicName)//这个是你存进去的图片的名称
            this.shopimg=response.params.newPicName
        }
    },
    mounted() {
       console.log(this.visible)
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
