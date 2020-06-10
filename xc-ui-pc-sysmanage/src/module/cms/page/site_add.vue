<template>
  <div>
    <el-form   :model="pageForm" label-width="120px" :rules="pageFormRules" ref="pageForm" >
      <el-form-item label="站点名称" prop="siteName">
        <el-input v-model="pageForm.siteName" auto-complete="off" ></el-input>
      </el-form-item>

      <el-form-item label="站点域名" prop="siteDomain">
        <el-input v-model="pageForm.siteDomain" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="站点端口" prop="sitePort">
        <el-input v-model="pageForm.sitePort" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="访问路径" prop="siteWebPath">
        <el-input v-model="pageForm.siteWebPath" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker type="datetime" placeholder="创建时间" v-model="pageForm.siteCreateTime"></el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      <el-button @click="go_back">返回</el-button>
    </div>
  </div>
</template>
<script>
  import * as cmsApi from '../api/cms'
  export default{
    data(){
      return {
        addLoading: false,//加载效果标记
        //新增界面数据
        pageForm: {
          siteName: '',
          siteDomain: '',
          siteWebPath: '',
          sitePort:'',
          siteCreateTime: new Date()
        },
        pageFormRules: {
          siteName:[
            {required: true, message: '请输入站点名称', trigger: 'blur'}
          ],
          siteDomain:[
            {required: true, message: '请输入站点域名', trigger: 'blur'}
          ],
          siteWebPath: [
            {required: true, message: '请输入访问路径', trigger: 'blur'}
          ],
          sitePort: [
            {required: true, message: '请输入站点端口', trigger: 'blur'}
          ]
        },
        goback_params: {
          page: this.$route.query.page,
          siteName:this.$route.query.siteName
        }
      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/cms/site/list', query: {
            page: this.$route.query.page,
            siteName:this.$route.query.siteName
          }
        })
      },
      addSubmit(){
        this.$refs.pageForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              cmsApi.site_add(this.pageForm).then((res) => {
                  console.log(res);
                if(res.success){
                  this.addLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  //清空表单
                  this.$refs['pageForm'].resetFields();

                }else if(res.message){
                  this.addLoading = false;
                  this.$message.error(res.message);
                }else{
                  this.addLoading = false;
                  this.$message.error('提交失败');
                }
              }).catch(() => {

              });
            });
          }
        });
      }
    },
    created: function () {

    },
    mounted:function(){

    }
  }
</script>
<style>

</style>
