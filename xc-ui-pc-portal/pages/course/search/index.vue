<template>
  <div>
    <div class="learing-list">
      <div class="list-box">
        <ul>
          <li>关键字搜索：</li>
          <ol>
            <li>{{keyword}}

              <nuxt-link v-if="keyword" class="title-link" :to="'/course/search?keyword=&mt='+mt+'&st=' + st+'&grade='+grade">
                &Chi;
              </nuxt-link>
            </li>
          </ol>
        </ul>
        <ul>
          <li>一级分类：</li>
          <li v-if="mt!=''"><nuxt-link  class="title-link" :to="'/course/search?keyword='+keyword+'&grade='+grade">全部</nuxt-link></li>
          <li class="all" v-else>全部</li>
          <ol>
            <li v-for="category_v in first_category">
              <nuxt-link  class="title-link all" :to="'/course/search?keyword='+keyword+'&mt=' + category_v.id" v-if="category_v.id == mt">{{category_v.name}}</nuxt-link>
              <nuxt-link  class="title-link" :to="'/course/search?keyword='+keyword+'&mt=' + category_v.id" v-else>{{category_v.name}}</nuxt-link>
            </li>
          </ol>
          <!--<ol>
            <li>数据分析</li>
            <li>机器学习工程</li>
            <li>前端开发工程</li>
          </ol>-->
        </ul>
        <ul>
          <li>二级分类：</li>
          <li v-if="st!=''"><nuxt-link  class="title-link" :to="'/course/search?keyword='+keyword+'&mt='+mt+'&grade='+grade">全部</nuxt-link></li>
          <li class="all" v-else>全部</li>
          <ol v-if="second_category.length>0">
            <li v-for="category_v in second_category">
              <nuxt-link  class="title-link all" :to="'/course/search?keyword='+keyword+'&mt='+mt+'&st=' + category_v.id" v-if="category_v.id == st">{{category_v.name}}</nuxt-link>
              <nuxt-link  class="title-link" :to="'/course/search?keyword='+keyword+'&mt='+mt+'&st=' + category_v.id" v-else>{{category_v.name}}</nuxt-link>
            </li>
            <!-- <li>大数据</li>
             <li>云计算</li>-->
          </ol>
          <!--<a href="#" class="more">更多 ∨</a>-->
        </ul>
        <ul>
          <li>难度等级：</li>
          <li v-if="grade!=''">
            <nuxt-link  class="title-link" :to="'/course/search?keyword='+keyword+'&mt=' + mt+'&st='+st+'&grade='">全部
            </nuxt-link>
          </li>
          <li class="all" v-else >全部</li>
          <ol>
            <li v-if="grade=='200001'" class="all">初级</li>
            <li v-else><nuxt-link  class="title-link" :to="'/course/search?keyword='+keyword+'&mt=' + mt+'&st='+st+'&grade=200001'">初级</nuxt-link></li>
            <li v-if="grade=='200002'" class="all">中级</li>
            <li v-else><nuxt-link  class="title-link" :to="'/course/search?keyword='+keyword+'&mt=' + mt+'&st='+st+'&grade=200002'">中级</nuxt-link></li>
            <li v-if="grade=='200003'" class="all">高级</li>
            <li v-else><nuxt-link  class="title-link" :to="'/course/search?keyword='+keyword+'&mt=' + mt+'&st='+st+'&grade=200003'">高级</nuxt-link></li>
          </ol>
        </ul>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-9 list-row-left">
          <div class="list-cont-left">
            <div class="tit">
              <ul class="nav nav-tabs ">
                <!--<li class="active"><a href="#">推荐</a></li>
                <li><a href="#">最新</a></li>
                <li><a href="#">热评</a></li>-->
                <!-- <div class="page navbar-right">
                   <a href="#" class="prev">
                     < </a>
                   <span class="">1/28</span>
                   <a href="#" class="next"> ></a>
                 </div>-->
              </ul>
            </div>
            <div class="tab-content">
              <div class="content-list">

                <!--<div class="recom-item">
                  <a href="/course/detail?id=1010" target="_blank">
                    <p><img src="/img/widget-demo1.png" width="100%" alt=""><span class="lab">HOT</span></p>
                    <ul>
                      <li>Think PHP 5.0 博客系统实战项目演练 </li>
                      <li><span>高级</span> <em> · </em> 1125人在学习</li>
                    </ul>
                  </a>
                </div>-->
                <div class="recom-item" v-for="(course, index) in courselist">
                  <a :href="'/course/detail/'+course.id+'.html'" target="_blank">
                    <!--<a href="/course/detail/test.html" target="_blank">-->
                    <div v-if="course.pic">
                      <p><img :src="imgUrl+'/'+course.pic" width="100%" alt=""></p>
                    </div>
                    <div v-else>
                      <p><img src="/img/widget-demo1.png" width="100%" alt=""></p>
                    </div>
                    <ul >
                      <li class="course_title"><span v-html="course.name"></span></li>
                      <li style="float: left"><span v-if="course.charge == '203001'">免费</span><span v-if="course.charge == '203002'">￥{{course.price | money}}</span>
                        &emsp;  &emsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span v-if="course.grade == '200001'" style="color: gray;">初级课程</span> <span v-if="course.grade == '200002'" style="color: gray;">中级课程</span> <span v-if="course.grade == '200003'" style="color: gray;">高级课程</span>

                      </li>
                    </ul>
                    <!--</a>-->
                  </a>
                </div>

                <li class="clearfix"></li>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>

          <div style="text-align: center">
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :total="total"
              :page-size="page_size"
              :current-page="page"
              prev-text="上一页"
              next-text="下一页">
            </el-pagination>
          </div>
        </div>
        <div class="col-md-3 list-row-rit" style="cursor: default">
          <div class="list-cont-right">
            <div class="right-box">
              <div class="tit">猜你喜欢</div>
              <div class="contList">
                <div class="contList-titB">如果您已经通过了对JAVA基础的学习，能够熟练运用JAVA进行编程开发，那么我将给您推荐一些以下课程，并且通过项目带领大家由浅入深轻松掌握JAVA的理论基础、开发模式，更加全面的掌握JAVA实际开发中会用到的框架运行机制。</div>
                <a href="http://www.yok.com/course/detail/4028e58161bcf7f40161bcf8b77c0000.html">
                <div class="contList-item">
                  <p>spring cloud实战</p>
                  <li><span>高级</span> <em> · </em> 1125人在学习</li>
                </div>
                </a>
                <a href="http://www.yok.com/course/detail/4028e58161bd3b380161bd3bcd2f0000.html" >
                <div class="contList-item">
                  <p>Redis从入门到实战</p>
                  <li><span>高级</span> <em> · </em> 2038人在学习</li>
                </div>
                </a>
                <a href="http://www.yok.com/course/detail/402883006ffaca47016ffb8ee4350000.html">
                <div class="contList-item">
                  <p>MYSQL入门级教学</p>
                  <li><span>高级</span> <em> · </em> 832人在学习</li>
                </div>
                </a>
              </div>
            </div>
            <!--猜你喜欢结束-->
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  //配置文件
  let config = require('~/config/sysConfig')
  import querystring from 'querystring'
  import * as courseApi from '~/api/course'
  export default {
    head() {
      return {
        title: '优课在线——课程',
        meta: [
          {charset: 'utf-8'},
          {name: 'description', content: '优课在线，一个专门的网络在线学习平台。'},
          {name: 'keywords', content: this.keywords}
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/asset-favicon.ico' },
          {rel: 'stylesheet', href: '/static/plugins/normalize-css/normalize.css'},
          {rel: 'stylesheet', href: '/static/plugins/bootstrap/dist/css/bootstrap.css'},
          {rel: 'stylesheet', href: '/static/css/page-learing-list.css'}
        ]
      }
    },
    async asyncData({ store, route }) {//服务端调用方法
      //当前页码
      let page = route.query.page;
      if(!page){
        page = 1;
      }else{
        page = Number.parseInt(page)
      }
      //向java微服务发起请求搜索课程
      //请求搜索服务，搜索服务
      let course_data = await courseApi.search_course(page,8,route.query);
      //查询分类
      let category_data = await courseApi.sysres_category()
      if (course_data &&　course_data.queryResult ) {
        //全部分类
        let category = category_data.category//分部分类
        let first_category = category[0].children//一级分类
        let second_category=[]//二级分类
        let keywords = ''
        let mt=''
        let st=''
        let grade=''
        let keyword=''
        let total = course_data.queryResult.total
        if( route.query.mt){
          mt = route.query.mt
        }
        if( route.query.st){
          st = route.query.st
        }
        if( route.query.grade){
          grade = route.query.grade
        }
        if( route.query.keyword){
          keyword = route.query.keyword
        }
        //遍历一级分类
        for(var i in first_category){
          keywords+=first_category[i].name+' '
          if(mt!=''&& mt == first_category[i].id){
            //取出二级分类
            second_category = first_category[i].children;
            // console.log(second_category)
            break;
          }
        }
        return {
          courselist: course_data.queryResult.list,//课程列表
          first_category:first_category,
          second_category:second_category,
          mt:mt,
          st:st,
          grade:grade,
          keyword:keyword,
          page:page,
          total:total,
          imgUrl:config.imgUrl
        }

      }else{
        return {
          courselist: {},//课程列表
          first_category:{},
          second_category:{},
          mt:'',
          st:'',
          grade:'',
          keyword:'',
          page:page,
          total:0,
          imgUrl:config.imgUrl
        }
      }


    },
    data(){
      return {
        courselist: {},
        first_category:{},
        second_category:{},
        mt:'',
        st:'',
        grade:'',
        keyword:'',
        imgUrl:config.imgUrl,
        total:0,//总记录数
        page:1,//页码
        page_size:8,//每页显示个数
      }
    },
    watch:{//路由发生变化立即搜索search表示search方法
      '$route':'search'
    },
    methods:{
      //分页触发
      handleCurrentChange(page) {
        //当前页码
        this.page = page
        //将当前页码设置到route中
        this.$route.query.page = page
        //将route中所有参数转成key/value串
        let querys = querystring.stringify(this.$route.query)
        window.location = '/course/search?'+querys;
      },
      search(){
        //刷新当前页面
        window.location.reload();
      }
    },
    mounted(){
     // console.log(this.courselist)
    }
  }
</script>
<style>
  .eslight{
    color: red;
  }
  a {
    color: #000;
  }
  .el-icon-arrow-left:before {
    content: "<";
  }
  .el-icon-d-arrow-left:before {
    content: "...";
  }
  .el-icon-arrow-right:before {
    content: ">";
  }
  .el-icon-d-arrow-right:before {
    content: "...";
  }
  .el-icon-more:before {
    content: "...";
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    background-color: #fff;
  }
  .course_title{
    height: 20px;
    width: 160px;
    overflow:hidden;
  }
  .eslight{
    color: #990000;
  }
</style>
