<template>
    <div class="toolbar">
        <el-pagination
                background
                layout="prev, pager, next"
                :page-count="$store.state.page.pageSum"
                :current-page="$store.state.page.pageIndex"
                @current-change="currentChange"

        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "page-info",
        props:["actionsName","params"],
        methods:{
            currentChange(pageIndex){
                var par = {
                    pageIndex
                }
                if(this.params){// 如果要传其它的数据。
                    Object.assign(par,this.params)
                }
                console.log(par);
                this.$store.dispatch(this.actionsName,par)
            }
        }
    }
</script>

<style scoped>

</style>