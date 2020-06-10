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
      <!-- 模板-->
      <el-select v-model="params.templateId" placeholder="请选择模板">
        <el-option
          :key="null"
          :label="null"
          :value="null">
        </el-option>
        <el-option
          v-for="item in templateList"
          :key="item.templateId"
          :label="item.templateName"
          :value="item.templateId">
        </el-option>
      </el-select>
      <!--别名 -->
      页面别名:
      <el-input v-model="params.pageAliase" style="width:100px"></el-input>
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <router-link class="mui-tab-item" :to="{path:'/cms/page/add/',query:{
          page: this.params.page,
          siteId: this.params.siteId,
           templateId: this.params.templateId,
           pageAliase: this.params.pageAliase
          }}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <!--列表-->
    <el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="250">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="120">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="120">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column label="编辑" width="80">
        <template slot-scope="scope">
          <el-button
            size="small" type="primary"
            @click="edit(scope.row.pageId)">编辑
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="80">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="del(scope.row.pageId)">删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="静态化" width="100">
        <template slot-scope="scope">
          <el-button
            size="small" type="primary" plain @click="generateHtml(scope.row.pageId)">静态化
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="页面预览" width="110">
        <template slot-scope="scope">
          <el-button
            size="small" type="primary" plain @click="preview(scope.row.pageId)">页面预览
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="发布" width="80">
        <template slot-scope="scope">
          <el-button
            size="small" type="primary" plain @click="postPage(scope.row.pageId)">发布
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
          siteId: '',//站点id
          templateId: '',//模板id
          pageAliase: ''//别名
        },
        listLoading: false,
        list: [],
        total: 0,

        siteList: [],//站点列表
        templateList: []//模板列表
      }
    },
    methods: {
      formatCreatetime(row, column) {
        var createTime = new Date(row.pageCreateTime);
        if (createTime) {
          return utilApi.formatDate(createTime, 'yyyy-MM-dd hh:mm:ss');
        }
      },
      generateHtml(id) {
        this.$router.push({
          path: '/cms/page/html/' + id, query: {
            page: this.params.page,
            siteId: this.params.siteId,
            templateId:this.params.templateId,
            pageAliase: this.params.pageAliase
          }
        })
      },
      preview(pageId){
        window.open("http://www.yok.com/cms/preview/"+pageId);
      },
      postPage(id) {
        this.$confirm('确认发布该页面吗?', '提示', {}).then(() => {
          this.listLoading = true;
          cmsApi.page_postPage(id).then((res) => {
            if (res.success) {
              console.log('发布页面id=' + id);
              this.listLoading = false;
              this.$message.success('发布成功，请稍后查看结果');
            } else {
              this.$message.error('发布失败');
            }
          });
        }).catch(() => {

        });
      },
      edit(pageId) {
        this.$router.push({
          path: '/cms/page/edit/' + pageId, query: {
            page: this.params.page,
            siteId: this.params.siteId,
            templateId:this.params.templateId,
            pageAliase: this.params.pageAliase
          }
        })
      },
      //删除
      del(pageId) {
        this.$confirm('您是否确认删除该记录吗?', '提示', {
          type:"warning"
        }).then(() => {
          this.listLoading = true;
          cmsApi.page_del(pageId).then((res) => {
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
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
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
      },
      queryTemplate() {
        cmsApi.template_list().then((res) => {
          //this.total = res.queryResult.total
          this.templateList = res.queryResult.list

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
      this.params.templateId = this.$route.query.templateId || '';
      this.params.pageAliase = this.$route.query.pageAliase || '';
    },
    mounted() {
      //默认查询页面
      this.query()
      //初始化站点列表
      this.querySite();
      //初始化模板列表
      this.queryTemplate();

    }
  }
</script>
<style>

</style>
