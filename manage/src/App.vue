<template>
  <el-container>
    <el-header>
      <el-row>
      
        <el-col class="logo" :span="8" :style="{width:isCollapse?'64px':'240px'}">
          <strong>{{isCollapse?'饿':'饿了么管理系统'}}</strong>
        </el-col>
        <el-col class="info" :span="8">
          <i
            :class="isCollapse?'el-icon-arrow-right':'el-icon-arrow-left'"
            @click="isCollapse=!isCollapse"
          ></i>
        </el-col>
        <el-col :span="8" class="adminInfo">
          <el-dropdown>
            <span class="el-dropdown-link">
             
              <img src="./assets/logo.png" alt>{{$store.state.admin.result}}
              
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-menu">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-warning" @click.native="$store.commit('OUT_LOGIN')">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">管理员设置</span>
            </template>
              <el-menu-item index="1-1" @click="$router.push('/adminList')">管理员登录日志</el-menu-item>
              <el-menu-item index="1-2" @click="$router.push('/adminLog')">添加管理员</el-menu-item>
              <el-menu-item index="1-3" @click="$router.push('/adminAdd')">管理员列表</el-menu-item>
          </el-submenu>
           <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">店铺管理</span>
            </template>
              <el-menu-item index="2-1" @click="$router.push('/shopList')">申请店铺</el-menu-item>
               <el-menu-item index="2-2" @click="$router.push('/Apply')">修改店铺</el-menu-item>
              <el-menu-item index="2-3">店铺详情</el-menu-item>
              <el-menu-item index="2-4" @click="$router.push('/shopTypeList')">添加店铺类别</el-menu-item>     
              <el-menu-item index="2-5">店铺类别列表</el-menu-item>       
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
         <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    fn(){
      console.log(22222)
    }
  },
  mounted() {
    console.log(this.$store.state.admin.result)
  },
};
</script>
<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 1000px;
}
.el-header {
  padding: 0px !important;
  background: #409eff;
  color: #ffffff;
  .info {
    font-size: 30px;
    line-height: 60px;
  }
  .logo {
    text-align: center;
    width: 240px;
    font-size: 25px;
    line-height: 60px;
    border-right: 1px solid rgba(238, 241, 146, 0.3);
  }
  .adminInfo {
    float: right;
    text-align: right;
    padding-right: 20px;
    line-height: 60px;
    .el-dropdown-link {
      span {
        color: #fff;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        border-radius: 20px;
      }
    }
  }
}
.toolbar {
  background: #f4f4f4;
  padding: 10px;
  marign: 20px 0 !important;
  height: 33px;
  .el-pagination{
    float: right;
  }
}
.el-table th,
.el-table td {
  text-align: center !important;
}
.toolbar .el-form-item {
  margin-bottom: 0px;
}
</style>
