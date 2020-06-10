<template>
  <div class="personal-cont">
    <div class="my-course">
      <div class="title">
        <div class="lab-title">我的收藏</div>
        <div class="tit-Item"><span  style="color:black;"><em>按收藏时间进行排序</em></span><span  style="color:black"><em>全部</em></span></div>
      </div>
      <div class="cont">
        <div v-for="course in courseList" class="col-lg-6">
          <div class="item">
            <div @click="show(course.courseId)" title="点击查看课程" style="cursor: default">
              <div class="item-left col-lg-2">
                <img
                  v-if="courseMap[course.courseId] && courseMap[course.courseId].pic"
                  :src="'http://img.yok.com/'+courseMap[course.courseId].pic" width="100%" alt="">
              </div>
              <div class="title"><em class="lab" style="font-weight: 600"
                                       v-if="courseMap[course.courseId]">{{courseMap[course.courseId].name}} </em><em
                class="status">收藏中</em>
                <div class="aft">● ● ●
                  <ul></ul>
                </div>
              </div>
              <div class="time" v-if="courseMap[course.courseId] &&courseMap[course.courseId].valid=='204002'">课程有效日期:
                {{courseMap[course.courseId].startTime | formatDate}} -- {{courseMap[course.courseId].endTime |
                formatDate}}
              </div>
              <div class="time" v-else>课程有效日期: 永久有效</div>
              <div class="time">收藏日期:{{course.createTime | formatDate}}</div>
            </div>
            <div class="parting"></div>
            <div class="butItem text-center">
              <a @click="show(course.courseId)" class="golearing" style="cursor:pointer">查看课程
              </a>
              <a @click="cancelCollect(course.courseId)" class="golearing" style="cursor:pointer">取消收藏</a>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="content">
          <div class="all show">
            <div class="allclass-cont">
              <div class="content">
                <div class="page-item">
                  <a v-on:click="switchPage(1)" v-if="this.page == 1" style="color:gray;cursor: not-allowed">首页</a>
                  <a v-on:click="switchPage(1)" v-else style="color: black;cursor: pointer">首页</a>&emsp;
                  <a v-on:click="switchPage(page - 1)" v-if="this.page == 1"
                     style="color:gray;cursor: not-allowed">上一页</a>
                  <a v-on:click="switchPage(page - 1)" v-else style="color: black;cursor: pointer">上一页</a>&emsp;
                  <span v-for="item in totalPage" v-bind:class="{'current-page': item == page }" v-text="item"
                        v-on:click="switchPage(item)"></span>
                  <a v-on:click="switchPage(page  + 1)" v-if="this.page == this.totalPage"
                     style="color:gray;cursor: not-allowed">下一页</a>
                  <a v-on:click="switchPage(page  + 1)" v-else style="color: black;cursor: pointer">下一页</a>&emsp;
                  <a v-on:click="switchPage(totalPage)" v-if="this.page == this.totalPage"
                     style="color:gray;cursor: not-allowed">尾页</a>
                  <a v-on:click="switchPage(totalPage)" v-else style="color: black;cursor: pointer">尾页</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as courseApi from '../api/course'
  import * as systemApi from '@/base/api/system'
  import utilApi from '../../../common/utils';

  export default {
    components: {},
    data() {
      return {
        page: 1,
        size: 4,
        courseList: [],
        courseMap: {},
        userId: '',
        total: 1,
        totalPage: 1,
      }
    },

    methods: {
      findCourseByIds(course_ids) {
        //根据课程id取课程信息
        //console.log(course_ids)
        systemApi.course_findByIds(course_ids).then((res) => {
          this.courseMap = res;
        })
      },
      show(id) {
        window.open("http://www.yok.com/course/detail/" + id + ".html");
      },
      cancelCollect(courseId) {
        courseApi.cancel_collect(courseId, this.userId).then((res) => {
          //  console.log(res)
          if (res.success) {
            this.$message.success("您已取消收藏")
            this.query()
          } else if (res.message) {
            this.$message.error(res.message)
          } else {
            this.$message.error("取消失败")
          }
        })
      },
      switchPage(page) {
        if (page < 1) {
          page = 1;
        } else if (page > this.totalPage) {
          page = this.totalPage;
        }
        this.page = page;
        this.query();
      },
      query() {
        courseApi.collect_list(this.page, this.size, this.userId).then((res) => {
          if (res.success) {
            this.courseList = res.queryResult.list;
            this.total = res.queryResult.total;
            this.totalPage = Math.ceil(this.total / this.size);
            //查询 课程 信息
            let courseIds = []
            this.courseList.forEach((item, index) => {
                courseIds.push(item.courseId)
              }
            )
            this.findCourseByIds(courseIds.toString())
          }
        })
      }
    },
    created() {
      let activeUser = utilApi.getActiveUser();
      this.userId = activeUser.userid;
    },
    mounted() {
      this.query();
    }
  }

</script>

<style>
  @import './../../../../static/css/page-learing-personal-allclass.css';
  @import './../../../../static/plugins/normalize-css/normalize.css';
  @import './../../../../static/css/page-learing-personal.css';
  span.current-page,
  span:hover {
    color: #26a5ff;
    background: #26a5ff;
  }

</style>
