<template>
  <!--头部导航-->
  <header>
    <div class="learingHeader">
      <nav class="navbar">
        <div class="">
          <div class="logo"><img src="/static/img/asset-logoIco.png" width="195" height="42" alt=""></div>
          <div class="nav-list">
            <ul class="nav navbar-nav">
              <li ><a href="/">首页</a></li>
              <li><nuxt-link  class="title-link" to="/course/search" style="color: orangered">课程</nuxt-link></li>
              <li></li>
            </ul>
          </div>

          <div class="sign-in">
            <!-- 未登录 -->
            <!-- <a href="#">登录 </a> <span> | </span> <a href="#"> 注册</a>-->
            <!-- 登录 -->
           <!-- <a href="#" class="personal"><span class="personalIco"></span>消息</a>
            <a href="#" class="personal">购物车</a>
            <a href="#" class="myInfo"><img src="/static/img/asset-myImg.jpg" alt="">个人中心</a>-->
            <span v-if="logined == true">欢迎您：{{this.user.username}}</span>
            <a href="javascript:;" class="personal" @click="logout" v-if="logined == true">退出</a>
            <a href="javascript:;" class="personal" @click="showlogin" v-if="logined == false">登陆&nbsp;|&nbsp;注册</a>
            <el-dialog title="登陆|注册" :visible.sync="LoginFormVisible">
              <login-form></login-form>
            </el-dialog>
            <a href="javascript:;" class="personal" @click="gocenter">个人中心</a>
            <a href="javascript:;" class="personal" @click="goteach">教学管理中心</a>
            <a href="javascript:;" class="personal" @click="gosystem">系统后台</a>
          </div>
          <div class="starch">
            <div><input type="text" class="input-search" v-model="keyword" @keyup.enter="search"  placeholder="输入查询关键词"></div>
            <div class="searchword"><a @click="search">搜索</a> </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
  import utilApi from '~/api/utils'
  import loginForm from '~/components/loginForm.vue'
  import {getjwt} from "../api/login";
  export default {
    components:{
      loginForm
    },
    head: {
      link: [
        { rel: 'stylesheet', href: '/static/plugins/normalize-css/normalize.css"' },
        { rel: 'stylesheet', href: '/static/plugins/bootstrap/dist/css/bootstrap.css' },
        { rel: 'stylesheet', href: '/static/css/page-learing-index.css' },
        { rel: 'stylesheet', href: '/static/css/page-header.css' },
      ]
    },
    data() {
      return {
        keyword: '',
        logined:false,
        LoginFormVisible:false
      }
    },
    methods:{
      search() {
        if (this.keyword === '') {
          this.$router.push(`/course/search`)
        } else {
          let keyword = encodeURIComponent(this.keyword)
          this.$router.push(`/course/search?keyword=`+keyword)
        }
      },
//退出登录
      logout: function () {
        this.$confirm('确认退出吗?', '提示', {
        }).then(() => {
          //跳转到统一登陆
          window.location = "http://ucenter.yok.com/#/logout"
        }).catch(() => {

        });
      },
      gocenter: function () {
        //从sessionStorage中取出当前用户
        let activeUser =  utilApi.checkActiveUser();
        let uid = utilApi.getCookie("uid")
        if (activeUser && uid && uid == activeUser.uid) {
          this.logined = true
          window.location ="http://ucenter.yok.com";
        } else {
          this.$message.warning('请先登录！');
        }
      },
      goteach: function () {
        //从sessionStorage中取出当前用户
        let activeUser =  utilApi.checkActiveUser();
        let uid = utilApi.getCookie("uid")
        if (activeUser && uid && uid == activeUser.uid) {
          this.logined = true
          this.user = activeUser;
          let type = this.user.utype;
          if (type == "101001") {
            this.$message.error('您没有访问权限');
            return;
          } else {
            window.location = "http://teach.yok.com";
          }
        } else {
          this.$message.warning('请先登录！');
        }
      },
      gosystem: function () {
        //从sessionStorage中取出当前用户
        let activeUser =  utilApi.checkActiveUser();
        let uid = utilApi.getCookie("uid")
        if (activeUser && uid && uid == activeUser.uid) {
          this.logined = true
          this.user = activeUser;
          let type = this.user.utype;
          if (type == "101001" || type == "101002") {
            this.$message.error('您没有访问权限');
            return;
          } else {
            //window.location ="http://teach.yok.com";
            window.location = "http://system.yok.com";
          }
        } else {
          this.$message.warning('请先登录！');
        }
      },
      refresh_user:function(){
        let activeUser= utilApi.checkActiveUser();
        let uid = utilApi.getCookie("uid")
        //alert(activeUser);
        if(activeUser){
          this.logined = true
          this.user = activeUser;
          //alert(this.user.name)
          //console.log(this.user.username)
        }else{
          if(!uid){
            return ;
          }
          //请求查询jwt
          getjwt().then((res) => {
            //console.log(res)
            if(res.success){
              let jwt = res.jwt;
              let activeUser =utilApi.getUserInfoFromJwt(jwt);
              console.log("activeUser="+activeUser);
              if(activeUser){
                this.logined = true
                this.user = activeUser;
                utilApi.setUserSession("activeUser",JSON.stringify(activeUser))
              }
            }
          })
        }
      },
      showlogin:function(){
        this.returnUrl = window.location;
        this.LoginFormVisible = true;
      }
    },
    mounted() {
      this.refresh_user();
    }
  }
</script>
<style lang="postcss">

</style>
