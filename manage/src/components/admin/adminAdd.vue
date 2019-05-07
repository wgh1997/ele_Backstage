<template>
    <div>
        <el-table :data="tableData">
            <el-table-column  label="管理员id" width="180">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{scope.row._id}}</span>
                            </template>
            </el-table-column>
            <el-table-column  label="管理员名称" width="180">
                    <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.adminName}}</span>
                          </template>
            </el-table-column>
            <el-table-column  label="添加管理员的时间">
                    <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.time | date}}</span>
                          </template>
                 
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                pageSum:'',
                pageIndex:1,

            }
        },
        mounted() {
            this.$axios.get("/adminAdd",{
                pageIndex:this.pageIndex
            }).then(({data})=>{
                console.log(data)
                if(data.ok===1){
                    this.pageSum = data.pageSum;
                    this.tableData = data.adminList;
                    this.pageIndex= data.pageIndex
                    console.log(this.tableData)
                }
            })
        },
        methods: {
            
        },
    }
</script>
<style>

</style>