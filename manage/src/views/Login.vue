<template>
<div class="bee">
    <el-form :rules="rules" :model="adminForm" class="ruleForm" label-width="40px" ref="signin" status-icon>
    <h3>饿了么管理员登录</h3>
    <el-form-item label="账号" prop="account">
      <el-input v-model="adminForm.account" type="text" placeholder="请输入管理员账号" ref="bbs"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="adminForm.password"
        placeholder="请输入管理员密码"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()" :loading="loading">登录</el-button>
    </el-form-item>
  </el-form>
</div>

</template>
<script>
export default {
  naem: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (regExp.test(value) === false) {
        callback(new Error("密码要由8-16字母和数字组成，不能是纯数字或纯英文"));
      } else {
        // console.log(callback,value,rule);
        callback();
      }
    };
    return {
      loading: false,
      adminForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          { message: "请输入管理员账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          {  trigger: "blur", validator: validatePass }
        ]
      } 
    }  
  },
  methods: {
    submitForm() {
      // console.log(this.$refs.bbs);
      // console.log(this.$refs.signin);
      // console.log(document.querySelector(".ruleForm"));
      //这个是获取
      //validate他是验证表单元素,也就是验证所有的表单是不是满足条件,
      this.$refs.signin.validate(valid => {
        if (valid) {
          this.loading = true;
          // console.log("成功");
          this.$store.dispatch("adminLogin", {
            data:{
               account: this.adminForm.account,
              password: this.adminForm.password
            },
             //因为登录失败之后没办法操作让他的旋转停下来所以要传递一个回调函数去重新调一下这个函数
              success:()=>{
                  console.log(this)
                  this.loading = false;
              }
          });
          
        } else {
          this.$message({
            message: "登录失败",
            type: "error",
          });
        }
      });
    }
  },
  mounted() {
   
  }
};
</script>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.bee {
	width:100%;
	height: 100%;
	// background:url("../assets/1.png");
	background-size: 100% 100%;
}
.ruleForm {
  width: 350px;
  margin: 150px auto;
  text-align: center;
  border: 1px solid #9d9d9d;
  padding: 20px 35px;
  box-shadow: 0 0 30px #bebebe;
  border-radius: 15px;
  .el-form-item {
    margin: 0px 0 33px 0;
  }
  .el-button {
    width: 150px;
    height: 35px;
    margin: 0 40px 0 0;
  }
  h3 {
    color: #0080ff;
    font-size: 20px;
    margin: 0 0 20px 0;
  }
}
</style>