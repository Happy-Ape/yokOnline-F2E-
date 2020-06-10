<template>
  <div class="personal-content">
    <div class="only-setting">
      <div class="title">个人设置</div>
      <div class="portrait">
        <img src="/static/images/studyuser.png" alt="">
        <span>{{usermsg.name}}</span> <span class="ch" @click="showpopup(1)" style="cursor: pointer">修改昵称 ></span>
      </div>
      <div class="title">账户设置</div>
      <div class="account">
        <div class="item">
          <div class="ico" style="background-position: 3px 10px"></div>
          <div>
            <p v-if="usermsg.phone==null || usermsg.phone==''"><em>手机</em>未绑定</p>
            <p v-else><em>手机</em>已绑定（{{usermsg.phone}}）</p>
            <p>您可以享受手机相关的安全及提醒服务</p>
          </div>
          <input type="submit" class="submit" @click="showpopup(2)" value="绑定手机"
                 v-if="usermsg.phone==null || usermsg.phone==''">
          <input type="submit" class="submit" @click="showpopup(3)" value="修改手机" v-else>
        </div>
        <div class="item">
          <div class="ico" style="background-position: -84px 10px"></div>
          <div>
            <p><em>密码</em>已设置</p>
            <p>为提高账号安全，建议你定期修改密码</p>
          </div>
          <input type="submit" class="submit" value="修改密码" @click="showpopup(4)">
        </div>
        <div class="item">
          <div class="ico" style="background-position: -41px 10px"></div>
          <div>
            <p v-if="usermsg.email==null || usermsg.email==''"><em>邮箱</em>未绑定</p>
            <p v-else><em>邮箱</em>已绑定（{{usermsg.email}}）</p>
            <p>您可以享受邮箱通知推送服务</p>
          </div>
          <input type="submit" class="submit" value="绑定邮箱" @click="showpopup(5)"
                 v-if="usermsg.email==null || usermsg.email==''">
          <input type="submit" class="submit" value="修改邮箱" @click="showpopup(6)" v-else>
        </div>
      </div>
      <div class="title">社交账户</div>
      <div class="social">
        <div class="item">
          <div class="ico" style="background-position: -120px 10px"></div>
          <div>
            <p v-if="usermsg.qq==null || usermsg.qq==''"><em>QQ</em>未绑定</p>
            <p v-else><em>QQ</em>已绑定（{{usermsg.qq}}）</p>
            <p>您可以享受QQ相关的安全及提醒服务</p>
          </div>
          <input type="submit" class="submit" value="添加绑定" @click="showpopup(7)"
                 v-if="usermsg.qq==null || usermsg.qq==''">
          <input type="submit" class="submit" value="修改绑定" @click="showpopup(8)" v-else>
        </div>
        <!--弹窗-->
        <div v-show="popup">
          <!--这里是要展示的内容层-->
          <div class="pop">
            <br>
            <div style="color: #118dff;font-size: 26px;font-weight:600">
              <span> &nbsp;修改{{this.text}}</span>
              <span @click="closepopup" style="cursor: pointer;float: right;color: gray;font-size: 50px">×&nbsp;</span>
            </div>
            <br>
            <br>
            <div>
              &emsp; &emsp;当前{{this.text}} : &nbsp;<span style="color: gray">{{this.oldvalue}}</span>
            </div>
            <br>
            <br>
            <div>
              <el-form :model="setEmailForm" label-width="50px" :rules="setEmailRules" ref="setEmailForm"
                       v-if="this.text == '邮箱'">
                <el-form-item prop="email">
                  <span style="font-size: 20px">新的{{this.text}} :</span>
                  <el-input v-model="setEmailForm.email" auto-complete="off" style="width: 60%"></el-input>
                </el-form-item>
                <el-form-item>
                  &emsp; &emsp; &emsp; &emsp; &emsp;
                  <el-button type="primary" @click.native="setEmail" :loading="editLoading">提交</el-button>&emsp; &emsp;
                  <el-button type="primary" @click="resetForm('setEmailForm')">重置</el-button>
                </el-form-item>
              </el-form>

              <el-form :model="setPasswordForm" label-width="50px" :rules="setPasswordRules" ref="setPasswordForm"
                       v-if="this.text == '密码'">
                <el-form-item prop="pass">
                  <span style="font-size: 20px">新的{{this.text}} :</span>
                  <el-input v-model="setPasswordForm.pass" type="password" auto-complete="off"
                            style="width: 60%"></el-input>
                  <br>
                </el-form-item>
                <el-form-item prop="pass2">
                  <span style="font-size: 20px">确认{{this.text}} :</span>
                  <el-input v-model="setPasswordForm.pass2" type="password" auto-complete="off"
                            style="width: 60%"></el-input>
                </el-form-item>
                <el-form-item>
                  &emsp; &emsp; &emsp; &emsp; &emsp;
                  <el-button type="primary" @click.native="setPassword" :loading="editLoading">提交</el-button>&emsp; &emsp;
                  <el-button type="primary" @click="resetForm('setPasswordForm')">重置</el-button>
                </el-form-item>
              </el-form>

              <el-form :model="setQQForm" label-width="50px" :rules="setQQRules" ref="setQQForm"
                       v-if="this.text == 'QQ'">
                <el-form-item prop="qq">
                  <span style="font-size: 20px">新的{{this.text}} :</span>
                  <el-input v-model="setQQForm.qq" auto-complete="off" style="width: 60%"></el-input>
                </el-form-item>
                <el-form-item>
                  &emsp; &emsp; &emsp; &emsp; &emsp;
                  <el-button type="primary" @click.native="setQQ" :loading="editLoading">提交</el-button>&emsp; &emsp;
                  <el-button type="primary" @click="resetForm('setQQForm')">重置</el-button>
                </el-form-item>
              </el-form>

              <el-form :model="setPhoneForm" label-width="50px" :rules="setPhoneRules" ref="setPhoneForm"
                       v-if="this.text == '手机号'">
                <el-form-item prop="phone">
                  <span style="font-size: 20px">新的{{this.text}} :</span>
                  <el-input v-model="setPhoneForm.phone" auto-complete="off" style="width: 60%"></el-input>
                </el-form-item>
                <el-form-item>
                  &emsp; &emsp; &emsp; &emsp; &emsp;
                  <el-button type="primary" @click.native="setPhone" :loading="editLoading">提交</el-button>&emsp; &emsp;
                  <el-button type="primary" @click="resetForm('setPhoneForm')">重置</el-button>
                </el-form-item>
              </el-form>
              <el-form :model="setNameForm" label-width="50px" :rules="setNameRules" ref="setNameForm"
                       v-if="this.text == '昵称'">
                <el-form-item prop="name">
                  <span style="font-size: 20px">新的{{this.text}} :</span>
                  <el-input v-model="setNameForm.name" auto-complete="off" style="width: 60%"></el-input>
                </el-form-item>
                <el-form-item>
                  &emsp; &emsp; &emsp; &emsp; &emsp;
                  <el-button type="primary" @click.native="setName" :loading="editLoading">提交</el-button>&emsp; &emsp;
                  <el-button type="primary" @click="resetForm('setNameForm')">重置</el-button>
                </el-form-item>
              </el-form>

            </div>
          </div>
          <!--这里是半透明背景层-->
          <div class="over"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as systemApi from '@/base/api/system';
  import utilApi from "../../../common/utils";
  import '../../../../static/js/validate.js';
  import {isPassword, validateEmail, validateLen, validatePhone, validateQQ} from "../../../../static/js/validate";

  export default {
    components: {},
    data() {
      var validatePass = (rule, value2, callback) => {
        if (value2 !== this.setPasswordForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        userId: '',
        usermsg: {},
        text: '',
        oldvalue: '',
        popup: 0,
        form: '',
        editLoading: false,
        setEmailForm: {
          email: '',
        },
        setEmailRules: {
          email: [
            {required: true, message: '请输入新的邮箱', trigger: 'blur'},
            {validator: validateEmail, trigger: "blur"}
          ]
        },

        setNameForm: {
          name: '',
        },
        setNameRules: {
          name: [
            {required: true, message: '请输入新的昵称', trigger: 'blur'}
          ],
        },

        setQQForm: {
          qq: '',
        },
        setQQRules: {
          qq: [
            {required: true, message: '请输入新的QQ', trigger: 'blur'},
            {validator: validateQQ, trigger: "blur"}
          ]
        },

        setPhoneForm: {
          phone: '',
        },
        setPhoneRules: {
          phone: [
            {required: true, message: '请输入新的手机号', trigger: 'blur'},
            {validator: validatePhone, trigger: "blur"}
          ]
        },

        setPasswordForm: {
          pass: '',
          pass2: ''
        },
        setPasswordRules: {
          pass: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {validator: validateLen, trigger: "blur"},
            {validator: isPassword, trigger: "blur"}

          ],
          pass2: [
            {required: true, message: '请确认密码', trigger: 'blur'},
            {validator: validatePass, trigger: "blur"}
          ]
        },
      }
    },
    methods: {
      get_user_message() {
        systemApi.get_user_message(this.userId).then((res) => {
          //console.log(res)
          if (res) {
            this.usermsg = res;
          }
        })
      },
      setName: function () {
        this.$refs.setNameForm.validate((valid) => {
          if (valid) {
            this.editLoading = true;
            let params = '';
            let val = this.setNameForm.name;
            let flag = "name";
            systemApi.update_message(val,this.userId,flag).then((res) => {
              this.editLoading = false;
              console.log(res);
              if (res.success) {
                this.$message.success("修改昵称成功");
                this.closepopup();
                this.get_user_message();
              } else {
                this.$message.success("修改昵称失败");
                this.resetForm('setNameForm');
              }
            })
          }
        })
      },
      setPhone: function () {
        this.$refs.setPhoneForm.validate((valid) => {
          if (valid) {
            this.editLoading = true;
            let params = '';
            let val = this.setPhoneForm.phone;
            let flag ="phone";
            systemApi.update_message(val,this.userId,flag).then((res) => {
              this.editLoading = false;
              console.log(res);
              if (res.success) {
                this.$message.success("绑定手机成功");
                this.closepopup();
                this.get_user_message();
              } else {
                this.$message.success("绑定手机失败");
                this.resetForm('setPhoneForm');
              }
            })
          }
        })
      },
      setPassword: function () {
        this.$refs.setPasswordForm.validate((valid) => {
          if (valid) {
            this.editLoading = true;
            let params = '';
            let val = this.setPasswordForm.pass;
            let flag = "password";
            systemApi.update_message(val,this.userId,flag).then((res) => {
              this.editLoading = false;
              console.log(res);
              if (res.success) {
                this.$message.success("修改密码成功，请重新登录");
                this.closepopup();
                setTimeout(function () {
                  window.location = "http://ucenter.yok.com/#/logout";
                },1000)
              } else {
                this.$message.success("修改密码失败");
                this.resetForm('setPasswordForm');
              }
            })
          }
        })
      },
      setEmail: function () {
        this.$refs.setEmailForm.validate((valid) => {
          if (valid) {
            this.editLoading = true;
            let params = '';
            let val = this.setEmailForm.email;
            let flag = "email"
            systemApi.update_message(val,this.userId,flag).then((res) => {
              this.editLoading = false;
           //   console.log(res);
              if (res.success) {
                this.$message.success("绑定邮箱成功");
                this.closepopup();
                this.get_user_message();
              } else {
                this.$message.success("绑定邮箱失败");
                this.resetForm('setEmailForm');
              }
            })
          }
        })
      },
      setQQ: function () {
        this.$refs.setQQForm.validate((valid) => {
          if (valid) {
            this.editLoading = true;
            let params = '';
            let val = this.setQQForm.qq;
            let flag ="qq";
            systemApi.update_message(val,this.userId,flag).then((res) => {
              this.editLoading = false;
             // console.log(res);
              if (res.success) {
                this.$message.success("绑定QQ成功");
                this.closepopup();
                this.get_user_message();
              } else {
                this.$message.success("绑定QQ失败");
                this.resetForm('setQQForm');
              }
            })

          }
        })
      },
      resetForm: function (formName) {
        this.$refs[formName].resetFields();
      },
      showpopup(index) {
        if (index == "1") {
          this.oldvalue = this.usermsg.name;
          this.text = "昵称";
          this.form = "setNameForm";
        } else if (index == "2") {
          this.oldvalue = "未绑定";
          this.text = "手机号";
          this.form = "setPhoneForm"
        } else if (index == "3") {
          this.oldvalue = this.usermsg.phone;
          this.form = "setPhoneForm"
          this.text = "手机号";
        } else if (index == "4") {
          this.oldvalue = "********";
          this.form = "setPasswordForm"
          this.text = "密码";
        } else if (index == "5") {
          this.oldvalue = "未绑定";
          this.form = "setEmailForm"
          this.text = "邮箱";
        } else if (index == "6") {
          this.oldvalue = this.usermsg.email;
          this.form = "setEmailForm"
          this.text = "邮箱";
        } else if (index == "7") {
          this.oldvalue = "未绑定";
          this.form = "setQQForm"
          this.text = "QQ";
        } else if (index == "8") {
          this.oldvalue = this.usermsg.qq;
          this.form = "setQQForm"
          this.text = "QQ";
        }
        this.popup = 1;
      },
      closepopup() {
        this.resetForm(this.form);
        this.popup = 0;
      },
    },
    created() {
      let activeUser = utilApi.getActiveUser();
      this.userId = activeUser.userid;
    },
    mounted() {
      this.get_user_message();
    }
  }

</script>

<style>
  @import './../../../../static/css/page-learing-personal-mail.css';

  .pop {
    position: fixed;
    font-size: 20px;
    height: 360px;
    width: 540px;
    background-color: white;
    border-radius: 0.25rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }

  .over {
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    filter: alpha(opacity=70);
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #111111;
  }
</style>
