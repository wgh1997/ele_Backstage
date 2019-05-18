<template>
<div>
<el-button type="text" @click="visible = true">添加类别</el-button>
<el-dialog title="添加类别" :visible.sync="visible">
    <addDialog  :visible.sync="visible"></addDialog>
</el-dialog>
    <div>
        <template>
            <el-table
              :data="$store.state.shop.shopTypeList"
              style="width: 100%">
              <el-table-column
                prop="_id"
                label="id"
                width="180">
              </el-table-column>
              <el-table-column
                prop="shopTypeName"
                label="类别名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="shopTypePic"
                label="图片">
              </el-table-column>
              <el-table-column
              prop="addTime"
              label="添加时间">
            </el-table-column>
            </el-table>
          </template>
    </div>
    <pagelnfo actionsName="get_laibian"></pagelnfo>
</div>
     
   
</template>
<script>
  import addDialog from "./addDialog.vue";
export default {
    data() {
        return {
            visible:false,
            tableData:[],
            pageIndex:'1',//当前页
        }
    },
    components:{
        addDialog,
    },
    mounted() {
        console.log(this.$store.state.shop.shopTypeList)
        this.$store.dispatch("get_laibian",{
             
            })
        //  this.$axios.get("/get_laibian",{
        //     pageIndex:this.pageIndex
        //     }).then(({data})=>{
        //         console.log(data)
        //         this.tableData =data.shopTypeList;
        //         this.pageIndex = data.pageIndex;
        //         this.pageSum  =data.pageSum;
        //     })
    },
}
</script>
<style lang="less">

</style>
