<template>
  <div>

    <el-row class="container" style="width: 470px">

      <div id="body">
        <div class="g-center login-page" @keyup.enter="login">
          <el-tabs v-model="activeName">
            <el-tab-pane label="用户登陆" name="login">
              <el-form :model="loginForm" label-width="80px" :rules="loginRules" ref="loginForm" class="login-form">
                <el-form-item label="账号" prop="username">
                  <el-input v-model="loginForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="loginForm.password" type="password" auto-complete="off">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click.native="login" :loading="editLoading">登陆</el-button>
                  <el-button type="primary" @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="用户注册" name="register">
              <el-form :model="registerForm" label-width="80px" :rules="registerRules" ref="registerForm"
                       class="register-form">
                <el-form-item label="账号" prop="username">
                  <el-input v-model="registerForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="name">
                  <el-input v-model="registerForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="registerForm.password" type="password" auto-complete="off">
                  </el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                  <el-radio-group v-model="registerForm.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="身份" prop="utype">
                  <el-radio-group v-model="registerForm.utype">
                    <el-radio :label="101001" >普通用户(学生)</el-radio>
                  </el-radio-group>
                  <p style="font-size: 10px;color: red">*仅限用户注册，如您是管理员或者教师，请联系相应的管理员注册账号！</p>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                  <el-input v-model="registerForm.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="registerForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="QQ" prop="qq">
                  <el-input v-model="registerForm.qq" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click.native="register" :loading="editLoading">注册</el-button>
                  <el-button type="primary" @click="resetForm('registerForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>

      </div>

    </el-row>


  </div>
</template>
<script>

  import utilApi from '../../common/utils';
  import * as loginApi from '../api/login';

  import Vue from 'vue'
  import {
    isPassword,
    isUserName,
     validateEmailLogin,
    validateLen,
    validatePhone,
    validateQQLogin
  } from "../../../static/js/validate";

  export default {
    components: {},
    data() {
      return {
        LoginFormVisible: false,
        activeName: 'login',
        editLoading: false,
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        registerForm: {
          username: '',
          password: '',
          name: '',
          sex: 1,
          utype: 101001,
          phone: '',
          email: '',
          qq: ''
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
        user: {
          userid: '',
          username: '',
          userimg: ''
        },
        logined: false,
        returnUrl: ''
      }
    },
    methods: {
      login: function () {

        this.$refs.loginForm.validate((valid) => {
          if (valid) {

            this.editLoading = true;

            let para = Object.assign({}, this.loginForm);
            console.log(para)
            loginApi.login(para).then((res) => {
                this.editLoading = false;
                if (res.success) {
                  this.$message('登陆成功');
                  //刷新 当前页面
                  // alert(this.returnUrl)
                  // console.log(this.returnUrl)
                  if (this.returnUrl != 'undefined' && this.returnUrl != ''
                    && !this.returnUrl.includes("/userlogout")
                    && !this.returnUrl.includes("/userlogin")) {
                    setTimeout(function (returnUrl) {
                      window.location = returnUrl;
                    }, 1000, this.returnUrl)

                  } else {
                    //跳转到首页
                    setTimeout(function () {
                      window.location.href = 'http://www.yok.com/'
                    }, 1000)
                  }

                } else {
                  if (res.message) {
                    this.$message.error(res.message);
                  } else {
                    this.$message.error('登陆失败');
                  }
                }
              },
              (res) => {
                this.editLoading = false;
              });


          }
        });

      },
      register: function () {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            this.editLoading = true;
            let para = Object.assign({}, this.registerForm);
            loginApi.register(para).then((res) => {
                this.editLoading = false;
                console.log(res);
                if (res.success) {
                  this.$message.success('注册成功');
                  //刷新 当前页面
                  // alert(this.returnUrl)
                  //console.log(this.returnUrl)
                  setTimeout(function () {
                    window.location.reload();
                  }, 1000)
                } else {
                  if (res.message) {
                    this.$message.error(res.message);
                  } else {
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
      resetForm: function (formName) {
        this.$refs[formName].resetFields();
      },
      refresh_user: function () {
        let activeUser = utilApi.getActiveUser();

        if (activeUser) {
          this.logined = true
          this.user = activeUser;
          //console.log(this.user.username)
        } else {
          this.showlogin()
        }
      },
      showlogin: function () {
        this.LoginFormVisible = true;
      }
    },
    created() {
      // var this_ = this;
      //bus.$on('childa-message', this.showlogin(this_));


    },
    mounted() {

      this.refresh_user()
//    Vue.prototype.loginwin = this;
      if (this.$route.query && this.$route.query.returnUrl) {

        let returnUrl = Base64.decode(this.$route.query.returnUrl)
        //alert(returnUrl)
        this.returnUrl = returnUrl;
        //alert(this.returnUrl)
      }
      /*bus.$on('childa-message', function(data) {
        console.log("aaaaaaaaaaaaa"+data)
        alert(this.LoginFormVisible)
        this.LoginFormVisible = true
        alert(this.LoginFormVisible)
      });*/


    }
  }
</script>
<style scoped>
  .login-form {
    width: 400px;
    margin: 5% auto 0;
  }
</style>
