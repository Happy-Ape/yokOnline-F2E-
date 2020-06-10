<template>
  <div>
    <el-form :model="pageForm" label-width="80px" :rules="pageFormRules" ref="pageForm">
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
      <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
      <el-button @click="go_back">返回</el-button>
    </div>
  </div>
</template>
<script>
  import * as cmsApi from '../api/cms'

  export default {
    data() {
      return {
        //站点id
        siteId: '',
        addLoading: false,//加载效果标记
        //界面数据
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
      }
    },
    methods: {
      go_back() {
        this.$router.push({
          path: '/cms/site/list', query: {
            page: this.$route.query.page,
            siteName: this.$route.query.siteName
          }
        })
      },
      editSubmit() {
        this.$refs.pageForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              cmsApi.site_edit(this.siteId,this.pageForm).then((res) => {
                console.log(res);
                if (res.success) {
                  this.addLoading = false;
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  //返回
                  this.go_back();

                } else {
                  this.addLoading = false;
                  this.$message.error('提交失败');
                }
              });
            });
          }
        });
      }
    },
    created: function () {
      this.siteId = this.$route.params.siteId;
      //根据主键查询页面信息
      cmsApi.site_get(this.siteId).then((res) => {
        console.log(res);
        if (res) {
          this.pageForm = res;
        }
      });
    },
    mounted: function () {

    }
  }
</script>
<style>

</style>
