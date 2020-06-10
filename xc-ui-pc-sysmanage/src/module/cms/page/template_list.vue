<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      <!--站点 -->
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          :key="null"
          :label="null"
          :value="null">
        </el-option>
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      <!--名称 -->
      模板名称:
      <el-input v-model="params.templateName" style="width:100px"></el-input>
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <router-link class="mui-tab-item" :to="{path:'/cms/template/add/',query:{
          page: this.params.page,
          siteId: this.params.siteId,
           templateName: this.params.templateName
          }}">
        <el-button type="primary" size="small">新增模板</el-button>
      </router-link>
    </el-form>
    <!--列表-->
    <el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="templateName" label="模板名称" width="150">
      </el-table-column>
      <el-table-column prop="templateParameter" label="模板参数" width="130">
    </el-table-column>
      <el-table-column prop="siteId" label="所属站点ID" width="250">
      </el-table-column>
      <el-table-column prop="templateFileId" label="模板文件ID" width="250">
      </el-table-column>
      <el-table-column label="编辑" width="80">
        <template slot-scope="scope">
          <el-button
            size="small" type="primary"
            @click="edit(scope.row.templateId)">编辑
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="80">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="del(scope.row.templateId)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--分页-->
    <el-col :span="24" class="toolbar">

      <el-pagination background layout="prev, pager, next" @current-change="changePage" :page-size="this.params.size"
                     :total="total" :current-page="this.params.page"
                     style="float:right;">
      </el-pagination>
    </el-col>
  </div>
</template>
<script>
  import * as cmsApi from '../api/cms'
  import utilApi from '@/common/utils';

  export default {
    data() {
      return {
        params: {
          page: 1,//页码
          size: 6,//每页显示个数
          siteId:'', //站点id
          templateName: ''//名称
        },
        listLoading: false,
        list: [],
        siteList: [],//站点列表
        total: 0,
      }
    },
    methods: {
      edit(templateId) {
        this.$router.push({
          path: '/cms/template/edit/' + templateId, query: {
            page: this.params.page,
            siteId: this.params.siteId,
            templateName: this.params.templateName
          }
        })
      },
      //删除
      del(templateId) {
        this.$confirm('您是否确认删除该记录吗?', '提示', {
          type: "warning"
        }).then(() => {
          this.listLoading = true;
          cmsApi.template_del(templateId).then((res) => {
            this.listLoading = false;
            if (res.success) {
              this.$message.success("删除成功")
              this.query();
            } else {
              this.$message.error('删除失败');
            }
          });
        }).catch(() => {

        });
      },
      changePage(page) {
        this.params.page = page;
        this.query()
      },
      query() {
        cmsApi.template_list_params(this.params.page, this.params.size, this.params).then((res) => {
          console.log(res)
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      },
      querySite() {
        cmsApi.site_list().then((res) => {
          //this.total = res.queryResult.total
          this.siteList = res.queryResult.list

        })
      }
    },

    created() {
      //存储 请求参数
      /*if(this.$route.query.page){
       this.params.page = Number.parseInt(this.$route.query.page)
       }*/
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteId = this.$route.query.siteId || '';
      this.params.templateName = this.$route.query.templateName || '';
    },
    mounted() {
      //默认查询页面
      this.query()
     //初始化站点列表
      this.querySite();
    }
  }
</script>
<style>

</style>
