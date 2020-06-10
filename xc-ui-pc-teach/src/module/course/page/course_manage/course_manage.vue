<template>
  <div>
    <template>
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>课程下线与上线（如果课程上线，需要重新发布）</span>
          </div>
          <div class="text item">
            <div v-if="course.status == '202001'">
              状态：未发布<br/>
              <el-button type="primary"  @click.native="down" >课程下线</el-button>
            </div>
              <div v-else-if="course.status == '202002'">
                状态：已发布<br/>
              <el-button type="primary"  @click.native="down" >课程下线</el-button>
            </div>
            <div v-else-if="course.status == '202003'">
              状态：已下线
              <br/>
              <el-button type="primary"  @click.native="up" >课程上线</el-button>
            </div>
          </div>
          <br/>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>删除课程</span>
          </div>
          <div class="text item">
            <el-button type="primary"  @click.native="deleteCourse" >删除课程</el-button>
            <br/><br/>
          </div>
        </el-card>
      </div>
    </template>
  </div>
</template>
<script>
  import * as sysConfig from '@/../config/sysConfig';
  import * as courseApi from '../../api/course';
  import utilApi from '../../../../common/utils';
  import * as systemApi from '../../../../base/api/system';
export default{

  data() {
    return {
      dotype: '',
      courseid: '',
      course: {"id": "", "name": "", "status": ""},
      previewurl: ''
    }
  },
  methods:{
    //上线
    up(){
        //调用课程管理服务的上线接口
      this.$confirm('确认上线该课程吗？', '提示', {}).then(() => {
        courseApi.up(this.courseid).then((res) => {
          console.log(res)
          if (res.success) {
            this.$message.success("上线成功，请修改、发布！")
            this.getCourseView()
          } else {
            this.$message.error(res.message);
          }
        });
      })
    },
    down(){
      //课程下线
      this.$confirm('确认下线该课程吗？', '提示', {}).then(() => {
        courseApi.down(this.courseid).then(res => {
          console.log(res)
          if (res.success) {
            this.$message.success("课程下线成功，该课程将不再被搜索到！")
            this.getCourseView()
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
    getCourseView(){
      courseApi.findCourseView(this.courseid).then(res=>{
        if(res && res.courseBase){
          //获取课程状态
          this.course.status = res.courseBase.status;
        }

      })
    },
    deleteCourse(){
      this.$confirm('确认删除该课程吗？', '提示', {}).then(() => {
        courseApi.deleteCourse(this.courseid).then(res => {
          console.log(res)
          if (res) {
            if (res.success) {
              this.$message.success("删除课程成功！")
              //跳转到我的课程界面
              this.$router.push({path: '/course/list'})
            } else {
              this.$message.error(res.message)
            }
          } else {
            this.$message.error("删除课程失败！")
          }
        })
      })
    }

  },
  mounted(){
    //课程id
    this.courseid = this.$route.params.courseid;
    //查询课程信息
    this.getCourseView();
  }

  }
</script>
<style>

</style>
