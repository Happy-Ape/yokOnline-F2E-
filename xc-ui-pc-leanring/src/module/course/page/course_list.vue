<template>
  <div class="personal-cont">
    <div class="my-course">
      <div class="title">
        <div class="lab-title">全部课表</div>
        <div class="tit-Item" style="cursor: default"><span style="color:black"><em>按加入时间进行排序</em></span><span
          style="color:black"><em>全部</em></span>
        </div>
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
              <div class="title"><em class="lab"
                                     v-if="courseMap[course.courseId]" style="cursor: pointer;font-weight: 600">{{courseMap[course.courseId].name}} </em><em
                class="status">学习中</em>
                <div class="aft">● ● ●
                  <ul></ul>
                </div>
              </div>
              <!--<div class="about"><span class="lab">正在学习</span> 使用对象 </div>-->
              <div class="time" v-if="course.valid=='204001'">课程有效日期: 永久有效</div>
              <div class="time" v-else>课程有效日期: {{course.startTime | formatDate}} -- {{course.endTime | formatDate}}
              </div>
              <div class="time">课程获取日期: {{course.createTime | formatDate}}
              </div>
              <div class="rate">
                <li></li>
                <li></li>
                <li class="active"></li>
                <li class="active"></li>
                <em style="color: #ff7c2d;font-weight: 500 " v-if="courseMap[course.courseId]&&courseMap[course.courseId].grade == '200001'">初级课程</em>
                <em style="color: #ff7c2d;font-weight: 500" v-if="courseMap[course.courseId]&&courseMap[course.courseId].grade == '200002'">中级课程</em>
                <em style="color: #ff7c2d;font-weight: 500" v-if="courseMap[course.courseId]&&courseMap[course.courseId].grade == '200003'">高级课程</em>&nbsp;&nbsp;
                <li class="active"></li>
                <li class="active"></li>
                <li></li>
                <li></li>
              </div>
            </div>
            <div class="parting"></div>
            <div class="butItem text-center">
              <router-link :to="'/learning/'+course.courseId+'/0'" class="golearing" target="_blank">去 学 习</router-link>
              <a @click="deleteCourse(course.courseId)" class="golearing" style="cursor:pointer">删除课程</a>
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
        systemApi.course_findByIds(course_ids).then((res) => {
          this.courseMap = res;
          //console.log(this.courseMap[this.courseList[0].courseId].pic)
        })
      },
      deleteCourse(courseId) {
        const confirmText = ['您确定删除该门课程吗?', '注意：此操作将让您不能继续学习这门课程，您只能通过重新报名或者购买的方式再次学习。']
        const newDatas = []
        const h = this.$createElement
        for (const i in confirmText) {
          newDatas.push(h('p', null, confirmText[i]))
        }
        this.$confirm(
          '提示',
          {
            title: '提示',
            message: h('div', null, newDatas),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          } ).then(() => {
          courseApi.delete_course(courseId, this.userId).then((res) => {
            //console.log(res)
            if (res.success) {
              this.$message.success("删除选课成功")
              this.query()
            } else if (res.message) {
              this.$message.error(res.message)
            } else {
              this.$message.error("删除选课失败")
            }
          })
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
      show(id) {
        window.open("http://www.yok.com/course/detail/" + id + ".html");
      },
      query() {
        courseApi.course_list(this.page, this.size, this.userId).then((res) => {
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
      //如果用户登录判断该用户的学习状态

      this.query();

    }
  }

</script>

<style>
  @import './../../../../static/css/page-learing-personal-allclass.css';
  @import './../../../../static/plugins/normalize-css/normalize.css';
  /*@import './../../../../static/plugins/bootstrap/dist/css/bootstrap.css';*/
  @import './../../../../static/css/page-learing-personal.css';

  span.current-page,
  span:hover {
    color: #26a5ff;
    background: #26a5ff;
  }
</style>
