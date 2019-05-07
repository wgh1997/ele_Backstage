<template>
    <div class="bbs">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="管理员名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
                
            </el-form-item>
            <el-form-item label="管理员密码" prop="Password">
                <el-input v-model="ruleForm.Password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    Password: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    Password: [
                        { required: true, message: '请输入正确的密码', trigger: 'change' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.ruleForm)
                        this.$axios.post("/adminLog",{
                            adminName:this.ruleForm.name,
                            passWord:this.ruleForm.Password,
                        }).then(({data})=>{
                            if(data.ok===1){
                                alert("添加成功")
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style scoped>
    .bbs{
        width:500px;
        height:300px;
        margin: 50px 0 0 0 ;
    }

</style>