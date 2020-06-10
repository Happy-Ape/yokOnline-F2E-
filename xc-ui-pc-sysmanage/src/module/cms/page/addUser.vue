<template>
  <div>

        <el-row class="container" style="width: 470px">

          <div id="body">
            <div class="g-center login-page" @keyup.enter="login">
              <el-tabs v-model="activeName" >
                  <el-form :model="registerForm" label-width="80px" :rules="registerRules" ref="registerForm" class="register-form">
                    <el-form-item label="账号" prop="username">
                      <el-input v-model="registerForm.username" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="name">
                      <el-input v-model="registerForm.name" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="密码"  prop="password" >
                      <el-input v-model="registerForm.password" type="password" auto-complete="off" >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                      <el-radio-group v-model="registerForm.sex">
                        <el-radio  :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="身份" prop="utype">
                      <el-radio-group v-model="registerForm.utype">
                        <el-radio :label="101001">学生</el-radio>
                        <el-radio :label="101002">教师</el-radio>
                        <el-radio :label="101003">管理员</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                      <el-input v-model="registerForm.phone" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="registerForm.email" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="QQ" prop="qq">
                      <el-input v-model="registerForm.qq" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item >
                      <el-button type="primary"  @click.native="register" :loading="editLoading">注册</el-button>
                      <el-button type="primary"  @click="resetForm('registerForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
              </el-tabs>
            </div>

        </div>

        </el-row>


  </div>
</template>
<script>
import * as loginApi from "../api/cms";
import {
  isPassword, isUserName,
  validateEmailLogin,
  validateLen,
  validatePhone,
  validateQQLogin
} from "../../../../static/js/validate";

export default {
	components:{

	},
  data() {
    return {
      LoginFormVisible:false,
      activeName: 'login',
      editLoading: false,
      registerForm: {
        username:'',
        password: '',
        name:'',
        sex:'',
        utype:'',
        phone:'',
        email:'',
        qq:''
      },
      registerRules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {validator: isUserName, trigger: "blur"}
        ],
        name: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: validateLen, trigger: "blur"},
          {validator: isPassword, trigger: "blur"}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
        utype: [
          {required: true, message: '请选择身份', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: validatePhone, trigger: "blur"}
        ],
        email: [
          {validator: validateEmailLogin, trigger: "blur"}
        ],
        qq: [
          {validator: validateQQLogin, trigger: "blur"}
        ]
      },
      user:{
        userid:'',
        username: '',
        userimg: ''
      },
      logined:false,
      returnUrl:''
    }
  },
  methods: {
    register: function () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.editLoading = true;
          let para = Object.assign({}, this.registerForm);
          loginApi.register(para).then((res) => {
              this.editLoading = false;
              console.log(res);
              if(res.success){
                this.$message.success('注册成功');
               //  //刷新 当前页面
               //  // alert(this.returnUrl)
               //  //console.log(this.returnUrl)
               // setTimeout(function () {
               //   window.location.reload();
               // },500)
                this.resetForm("registerForm");
              }else{
                if(res.message){
                  this.$message.error(res.message);
                }else{
                  this.$message.error('注册失败');
                }
              }
            },
            (res) => {
              this.editLoading = false;
            });
        }
      })
    },
    resetForm:function(formName){
      this.$refs[formName].resetFields();
    },
  },
  created() {
    // var this_ = this;
    //bus.$on('childa-message', this.showlogin(this_));


  },
  mounted() {
  }
}
</script>
<style scoped>
  .login-form{width: 400px;margin:5% auto 0;}
</style>
