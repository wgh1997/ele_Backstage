<template>
  <div class="bbs" ref="Essential_information">
    <el-button type="text" @click="dialogFormVisible = true">添加店铺</el-button>
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <addDialog :visible.sync="dialogFormVisible"></addDialog>
    </el-dialog>
    <div>
      <el-steps :active="active+1" finish-status="success" align-center>
        <el-step title="1.基本信息"></el-step>
        <el-step title="2.身份信息"></el-step>
        <el-step title="3.执照信息"></el-step>
        <el-step title="4.完成"></el-step>
      </el-steps>
      <div>
        <div v-show="active===0">
          <h1>基本信息</h1>
          <div>
            <el-form class="demo-ruleForm" :rules="rules" status-icon :model="Essential_information">
              <el-form-item label="店铺名称" label-width="100px" prop="shopname">
                <el-input v-model="Essential_information.shopname" autocomplete="off" style="width:450px"
                  placeholder="店铺名称"></el-input>
              </el-form-item>
              <el-form-item label="店铺描述" label-width="100px" prop="textarea" status-icon>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="Essential_information.textarea"
                  style="width:450px"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" label-width="100px" prop="telephone" status-icon>
                <el-input v-model="Essential_information.telephone" autocomplete="off" style="width:450px"
                  placeholder="手机号"></el-input>
              </el-form-item>
              <el-form-item label="店铺地址" label-width="100px" status-icon>
                <el-button round style="margin: 0 0 15px 16px;" @click="centerDialogVisible = true">
                  <i class="el-icon-edit" >定位{{coordinate}}</i>
                </el-button>

                <el-dialog title="提示" :visible.sync="centerDialogVisible" width="80%" center >
                  <mop :visible.sync="centerDialogVisible" @lalala="addOne"></mop>
                </el-dialog>

                <v-distpicker province city area @selected="onSelected" style="margin: 0 0 14px 0px"></v-distpicker>
                <el-input v-model="Essential_information.address" autocomplete="off" style="width:450px"
                  placeholder="店铺详细地址"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-show="active===1">
          <el-form>
            <h1>身份信息</h1>
            <el-form-item label="姓名" label-width="100px" :model="Essential_information">
              <el-input v-model="Essential_information.full_name" autocomplete="off" style="width:450px"
                placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" label-width="100px">
              <el-input v-model="Essential_information.ID_card_no" autocomplete="off" style="width:450px"
                placeholder="身份证号码"></el-input>
            </el-form-item>
            <el-form-item label="身份证正反面" label-width="100px">
              <el-upload action="http://127.0.0.1/uploadPic" list-type="picture-card" :file-list="fileList"
                :on-success="handlsuccess" name="shopTypePic">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt>
              </el-dialog>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="active===2">
          <el-form>
            <el-form-item label="营业执照照片" label-width="100px">
              <el-upload class="upload-demo" ref="upload" action="http://127.0.0.1/uploadPic" :file-list="fileList"
                :on-success="Businesssuccess" name="shopTypePic" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传营业执照
                </el-button>
                <div slot="tip" class="el-upload__tip">
                  <img class="tip_img" src="" alt="">
                  只能上传jpg/png文件，且不超过500kb
                </div>

              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="active===3">
          <img src="../../assets/01c85956e685706ac7255885d22c10.png@1280w_1l_2o_100sh.png" alt
            style="margin: 0px 1px 0px 138px">
        </div>
      </div>
      <el-button style="margin-top: 12px;" @click="previous_step" v-show="yin">上一步</el-button>
      <el-button style="margin-top: 12px;" v-show="yin" @click="next_step('Essential_information')">
        <span ref="userName">下一步</span>
      </el-button>
      <div></div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import addDialog from "./addDialog";
  import VDistpicker from "v-distpicker";
  import mop from "../mop.vue"
  export default {
    data() {
      var Cell_phone_number = (rule, value, callback) => {
        let regExp = /^1(3|4|5|7|8)\d{9}$/;
        if (value === "") {
          callback(new Error("请输入输入手机号"));
        } else if (regExp.test(value) === false) {
          callback(new Error("请输入的手机号符合12位数字"));
        } else {
          callback(); //这个是继续向下运行的
        }
      };
      return {
        coordinate:'',
        centerDialogVisible: false,
        dialogFormVisible: false,
        active: 0,
        yin: true,
        Essential_information: {
          shopname: "", //店铺的名称
          shopimg: "", //店铺的头像
          textarea: "", //店铺描述
          telephone: "", //联系电话
          address: "", //店铺地址
          ID_card_no: "", //身份证号码
          full_name: "",//姓名
          ID_cardimg: [],//身份证照片
          Busines_img: [],//营业执照照片
        },
        dialogImageUrl: "",
        dialogVisible: false,
        fileList: [],
        rules: {
          shopname: [
            { message: "请正确输入店铺名称", trigger: "blur" },
            { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
          ],
          textarea: [
            { message: "请正确输入店铺描述", trigger: "blur" },
            { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
          ],
          telephone: [{ trigger: "blur", validator: Cell_phone_number }],
          address: [
            { message: "店铺地址", trigger: "blur" },
            { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
          ]
        }
      };
    },
    components: {
      addDialog,
      VDistpicker,
      mop,
    },
    methods: {
      addOne(n){
        console.log(n)
        this.coordinate = n
        },
      next_step(formName) {
        this.active++;
        if (this.active === 3) {
          console.log("我要运行啦");
          this.yin = false;
          console.log(this.Essential_information.address, "地址");
          axios.post("/addshop", {
            shopname: this.Essential_information.shopname,
            shopimg: this.Essential_information.shopimg, //店铺的头像
            textarea: this.Essential_information.textarea, //店铺描述
            telephone: this.Essential_information.telephone, //联系电话
            address: this.Essential_information.address, //店铺地址
            ID_card_no: this.Essential_information.ID_card_no, //身份证号码
            full_name: this.Essential_information.full_name,//姓名
            ID_cardimg: [this.Essential_information.ID_cardimg],//身份证照片
            Busines_img: [this.Essential_information.Busines_img],//营业执照照片
          }).then(({ data }) => {
            console.log(data)
          })
        }
        if (this.active === 2) {
          this.$refs.userName.innerHTML = "提交";
        }

      },
      previous_step() {
        if (this.active-- < 1) this.active = 0;
      },
      //获取到的地址
      onSelected(data) {
        console.log(data.area.value); //区
        console.log(data.city.value); //市
        console.log(data.province.value); //省
        this.Essential_information.address = data.province.value + '/' + data.city.value + '/' + data.area.value
      },
      //这个是上传身份证成功返回的函数
      handlsuccess(response, file, fileList) {
        this.Essential_information.ID_cardimg = response.params.newPicName
        console.log(response.params.newPicName);//身份证的照片
        
      },
      //这个是营业执照的上传
      Businesssuccess(response, file, fileList) {
        this.Essential_information.Busines_img = response.params.newPicName
        console.log(response.params.newPicName);//营业执照的照片
      },
      //这个是点击手动上传
      submitUpload() {
        console.log(this.$refs.upload);
        this.$refs.upload.submit();
      },
      //这个是判断他是不是正确
      // submitForm(formName) {
      //   console.log(1)
      //   console.log(this.$refs[formName])
      //     this.$refs[formName].validate((valid) => {
      //       if (valid) {
      //         alert('submit!');
      //       } else {
      //         console.log('error submit!!');
      //         return false;
      //       }
      //     });
      //   },
    },
    mounted() {
      
    },
  };
</script>
<style lang="less" scoped>
  .tip_img {
    width: 150px;
    height: 150px;
  }
</style>