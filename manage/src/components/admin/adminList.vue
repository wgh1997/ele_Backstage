<template>
  <div>
    <div class="toolbar">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="管理员" v-model="querye"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="v=>this.$store.dispatch('getAdminLog',{search:querye})">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="$store.state.admin.adminLog" style="width: 100%">
      <el-table-column label="id">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row._id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理员">
        <template slot-scope="scope">
          <i class="el-icon-info"></i>
          <span style="margin-left: 10px">{{scope.row.adminName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录时间">
        <template slot-scope="scope">
          <el-popover placement="top">
            <div slot="reference" class="name-wrapper">
              <i class="el-icon-time"></i>
              <span size="medium" style="margin-left: 10px">{{scope.row.addTime | date}}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click=sdelete(scope.row._id)>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="toolbar">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="$store.state.page.pageIndex"
        :page-count="$store.state.page.pageSum"
        @current-change="v=>this.$store.dispatch('getAdminLog',{pageIndex:v})"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      pageIndex: 1,
      querye:"",
    };
  },
  mounted() {
    this.$store.dispatch("getAdminLog", this.pageIndex);
    // console.log(this.$store.state.admin.adminLog)
  },
  methods: {
      sdelete(id) {
        axios.get("/deletee",{
        params:{
            querye:id
        }
      }).then(({data})=>{
        if(data.ok===1){
          // console.log(data)
          // console.log(this.$store.state.page.pageIndex)
          var obj ={
            pageIndex:this.$store.state.page.pageIndex
          }
          this.$store.dispatch("getAdminLog",obj);
        }
    })
    }
  }
};
</script>
<style lang="less" scoped>
.toolbar{
    margin: 0px 0 13px 0;
    background: #ffffff;
    .el-form {
          float: right;
    }
    }
   .active{
        background: red !important;
   }
   .el-menu{
       min-height: 100% !important;
   }
</style>
