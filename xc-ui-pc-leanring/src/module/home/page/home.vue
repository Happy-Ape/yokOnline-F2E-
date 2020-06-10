<template>
  <div>
    <p-head></p-head>
    <div class="personal-header" style="background-image: url(static/images/asset-banner.png);"></div>
    <!-- 页面 -->
    <div class="container">
      <div class="personal-nav pull-left">
        <div class="nav nav-stacked text-left">
          <div class="title">个人中心</div>
          <div class="my-ico" style="cursor: default">
            <img src="/static/images/studyuser.png" alt="">
            <p>{{this.name}}</p>
          </div>
          <div class="item">

            <li>
              <router-link class="mui-tab-item glyphicon glyphicon-education" :to="{path:'/'}">&nbsp;&nbsp;我的课程<i
                class="pull-right">></i></router-link>
            </li>
            <li>
              <router-link class="glyphicon glyphicon-heart" :to="{path:'/collection'}">&nbsp;&nbsp;我的收藏<i
                class="pull-right">></i></router-link>
            </li>
            <li>
              <router-link class="mui-tab-item glyphicon glyphicon-jpy" :to="{path:'/order'}">&nbsp;&nbsp;我的订单<i
                class="pull-right">></i></router-link>
            </li>
            <li>
              <router-link class="mui-tab-item glyphicon glyphicon-cog" :to="{path:'/setting'}">&nbsp;&nbsp;个人设置<i
                class="pull-right">></i></router-link>
            </li>
          </div>
        </div>
      </div>
      <div class="personal-content pull-right">
        <router-view></router-view>
        <!--<course-list></course-list>-->
      </div>
    </div>

    <p-foot></p-foot>
  </div>
</template>

<script>
  import PHead from '@/base/components/head.vue';
  import PFoot from '@/base/components/foot.vue';
  import utilApi from "../../../common/utils";
  import * as systemApi from '@/base/api/system'
  export default {
    components: {
      PHead,
      PFoot
    },
    data() {
      return {
        userId: '',
        name:''
      }
    },
    methods: {
      get_user_message(){
        systemApi.get_user_message(this.userId).then((res) => {
          if (res){
            this.name = res.name;
          }
        })
      }
    },
    created(){
      let activeUser = utilApi.getActiveUser();
      this.userId = activeUser.userid;
    },
    mounted() {
      this.get_user_message();

      $(function () {
        $('.aft').hover(function () {
          if (!$(this).hasClass('ac')) {
            $(this).find('ul').html($('#listcont').html())
            $(this).addClass('ac')
          } else {
            $(this).find('ul').text('')
            $(this).removeClass('ac')
          }
        })
      })


      $(function () {
        $(window).scroll(function () {
          if ($(this)[0].scrollY > 235) {
            $('.personal-nav').css({
              'position': 'fixed',
              'top': 10
            });
          } else if ($(this)[0].scrollY <= 155) {
            $('.personal-nav').css({
              'position': 'relative',
              'top': -70
            });
          }
          ;
        })
      })
    }
  }

</script>

<style>
  @import './../../../../static/plugins/normalize-css/normalize.css';
  /*@import './../../../../static/plugins/bootstrap/dist/css/bootstrap.css';*/
  @import './../../../../static/css/page-learing-personal.css';

</style>
