<template>
  <div>
    <el-form   :model="pageForm" label-width="120px" :rules="pageFormRules" ref="pageForm" >
      <el-form-item label="所属站点" prop="siteId">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板名称" prop="templateName">
        <el-input v-model="pageForm.templateName" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="模板参数" prop="templateParameter">
        <el-input v-model="pageForm.templateParameter" auto-complete="off" ></el-input>
      </el-form-item>
      <el-form-item label="模板文件ID" prop="templateFileId">
        <el-input v-model="pageForm.templateFileId" auto-complete="off" ></el-input>
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
        //站点列表
        siteList:[],
        //新增界面数据
        pageForm: {
          siteId: '',
          templateName:'',
          templateParameter: '',
          templateFileId: '',
        },
        pageFormRules: {
          templateName:[
            {required: true, message: '请输入模板名称', trigger: 'blur'}
          ],
          siteId:[
            {required: true, message: '请选择所属站点', trigger: 'blur'}
          ],
          templateFileId: [
            {required: true, message: '请输入模板文件ID', trigger: 'blur'}
          ],
        },
        goback_params: {
          page: this.$route.query.page,
          siteId:this.$route.query.siteId,
          templateName:this.$route.query.templateName
        }
      }
    },
    methods:{
      go_back(){
        this.$router.push({
          path: '/cms/template/list', query: {
            page: this.$route.query.page,
            siteId:this.$route.query.siteId,
            siteName:this.$route.query.siteName
          }
        })
      },
      querySite(){
        cmsApi.site_list().then((res)=>{
          //this.total = res.queryResult.total
          this.siteList = res.queryResult.list

        })
      },
      addSubmit(){
        this.$refs.pageForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              cmsApi.template_add(this.pageForm).then((res) => {
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
      this.querySite();
    }
  }
</script>
<style>

</style>
