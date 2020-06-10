<template>
  <!--头部导航-->
  <header>
    <div class="learingHeader">
      <nav class="navbar">
        <div class="">
          <div class="logo"><img src="/static/images/asset-logoIco.png" width="100%" alt=""></div>
          <div class="nav-list">
            <ul class="nav navbar-nav">
              <li ><a href="http://www.yok.com/">首页</a></li>
              <li><a href="http://www.yok.com/course/search">课程</a></li>
              <li></li>
            </ul>
          </div>

          <div class="sign-in">
            <!-- 未登录 -->
            <!-- <a href="#">登录 </a> <span> | </span> <a href="#"> 注册</a>-->
            <!-- 登录 -->
           <!-- <a href="#" class="personal"><span class="personalIco"></span>消息</a>
            <a href="#" class="personal">购物车</a>-->
            <em v-if="logined == true" style="cursor:default">欢迎您：{{this.user.username}}</em>
            <a href="javascript:;" class="personal" @click="logout" v-if="logined == true">退出</a>
            <router-link :to="{path: '/'}" class="personal">个人中心</router-link>
            <a href="javascript:;" class="personal" @click="showlogin" v-if="logined == false">登陆|注册</a>

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
<script type="text/javascript">

  import utilApi from '../../common/utils'
  import * as loginApi from '../../module/home/api/home'
  import {getjwt} from "../api/system";
  export default {
    components:{

    },
    data() {
      return {
        keyword:'',
        LoginFormVisible:false,
        logined:false
      }
    },
    methods: {
      search() {
        if (this.keyword === '') {
          window.location = "http://www.yok.com/course/search"
        } else {
          let keyword = encodeURIComponent(this.keyword)
          window.location = "http://www.yok.com/course/search?keyword="+keyword
        }
      },
      //退出登录
      logout: function () {
        this.$confirm('确认退出吗?', '提示', {
        }).then(() => {
          //跳转到统一登陆
          this.$router.push({ path: '/logout'})
        }).catch(() => {

        });
      },
      refresh_user:function(){
        //取出cookie中的令牌
        let uid = utilApi.getCookie("uid")
        let activeUser= utilApi.getActiveUser();
        if(activeUser){
          this.logined = true
          this.user = activeUser;
          //console.log(this.user.username)
        }else{
          if(!uid){
            return ;
          }
          //请求查询jwt
          getjwt().then((res) => {
            console.log(res)
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
      showlogin: function(){
        window.location = "http://ucenter.yok.com/#/login?returnUrl="+ Base64.encode(window.location)
      }
    },
    mounted() {
      this.refresh_user()

    }
  }
</script>
<style >
  @import './../../../static/plugins/normalize-css/normalize.css';
  /*@import './../../../static/plugins/bootstrap/dist/css/bootstrap.css';*/
  @import './../../../static/css/page-header.css';
</style>
