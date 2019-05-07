<template>
<div>  
  
<el-table :data="$store.state.apply.information" border style="width: 100%" >
    <el-table-column fixed label="店铺id" width="170">
      <template slot-scope="scope">
          <span>{{scope.row._id}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="shopName" label="店铺姓名" width="120">
      <template slot-scope="scope">
          <span >{{scope.row.shopName}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="addTime" label="添加时间" width="120">
      <template slot-scope="scope">
          <span >{{scope.row.addTime | date}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="shopPic" label="店铺图片" width="120">
      <template slot-scope="scope">
            <img :src="'../../../../api/upPic/'+scope.row.shopPic"  style="width:100px; height:100px">
            
      </template>
    </el-table-column>
    <el-table-column prop="shopTypeId" label="店铺类别ID" width="120"> 
      <template slot-scope="scope">
          <span v-if="scope.row.shopTypeId==1">
           美食
          </span>
           <span v-if="scope.row.shopTypeId==2">
           快餐便当
          </span>
           <span v-if="scope.row.shopTypeId==3">
           特色菜系
          </span>
           <span v-if="scope.row.shopTypeId==4">
           异国料理
          </span>
          <span v-if="scope.row.shopTypeId==5">
           异国料理
          </span>
          <span v-if="scope.row.shopTypeId==6">
           甜品饮品
          </span>
      </template>
    </el-table-column>
    <el-table-column prop="shopTypeName" label="店铺类别名称" width="100">
      <template slot-scope="scope">
          <span v-for="init in scope.row.shopTypeName">{{init}}/</span>
      </template>
    </el-table-column>
    <el-table-column prop="shopaddress" label="店铺地址" width="180">
      <template slot-scope="scope">
          <span >{{scope.row.shopaddress}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="ContactNumber" label="店铺联系电话" width="120">
      <template slot-scope="scope">
          <span >{{scope.row.ContactNumber}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="BusinessHours" label="店铺营业时间" width="120">
      <template slot-scope="scope">
      
          <span >{{scope.row.BusinessHours}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
    <template slot-scope="scope">
        <el-button @click="handleClick(scope.row._id)" type="text" size="small">删除</el-button>
        <el-button type="text" @click="Popup(scope.row._id)">编辑</el-button>
    </template>
    </el-table-column>  
</el-table>
<div>  
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <applyedit :visible.sync="dialogFormVisible" :bbs="id"></applyedit>
    </el-dialog>
</div>
</div>
</template>

<script>
import applyedit from "./applyedit";
  export default {
    data() {
      return {
        id:'',
        dialogTableVisible: false,
        dialogFormVisible: false,
        imageUrl:'',
      }
    },
    components:{
        applyedit
    },
    mounted() {
      this.$store.dispatch("store_nformation")
      this.imageUrl = require("../../../../api/upPic/1557059432314.jpg")
    },
    methods:{
      Popup(_id){
        this.dialogFormVisible = true
        this.id=_id
      },
       handleClick(row) {
        console.log(row);
       this.$axios.post("/delete_shop",{
         row
       }).then(({data})=>{
         console.log(data)
         if(data.ok===1){
             this.$store.dispatch("store_nformation")
         }
       })
      },
    }
  }
</script>
<style lang="less" scoped>
    
</style>