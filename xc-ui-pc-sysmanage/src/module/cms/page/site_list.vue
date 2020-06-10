<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      <!--名称 -->
      站点名称:
      <el-input v-model="params.siteName" style="width:100px"></el-input>
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <router-link class="mui-tab-item" :to="{path:'/cms/site/add/',query:{
          page: this.params.page,
           siteName: this.params.siteName
          }}">
        <el-button type="primary" size="small">新增站点</el-button>
      </router-link>
    </el-form>
    <!--列表-->
    <el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="siteName" label="站点名称" width="150">
      </el-table-column>
      <el-table-column prop="siteDomain" label="站点域名" width="180">
      </el-table-column>
      <el-table-column prop="sitePort" label="端口" width="80">
      </el-table-column>
      <el-table-column prop="siteWebPath" label="访问路径" width="120">
      </el-table-column>
      <el-table-column prop="siteCreateTime" label="创建时间" width="250">
      </el-table-column>
      <el-table-column label="编辑" width="80">
        <template slot-scope="scope">
          <el-button
            size="small" type="primary"
            @click="edit(scope.row.siteId)">编辑
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="80">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="del(scope.row.siteId)">删除
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
          siteName: ''//名称
        },
        listLoading: false,
        list: [],
        total: 0,
      }
    },
    methods: {
      formatCreatetime(row, column) {
        var createTime = new Date(row.siteCreateTime);
        if (createTime) {
          return utilApi.formatDate(createTime, 'yyyy-MM-dd hh:mm:ss');
        }
      },
      edit(siteId) {
        this.$router.push({
          path: '/cms/site/edit/' + siteId, query: {
            page: this.params.page,
            siteName: this.params.siteName
          }
        })
      },
      //删除
      del(siteId) {
        this.$confirm('您是否确认删除该记录吗?', '提示', {
          type: "warning"
        }).then(() => {
          this.listLoading = true;
          cmsApi.site_del(siteId).then((res) => {
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
        cmsApi.site_list_params(this.params.page, this.params.size, this.params).then((res) => {
          console.log(res)
          this.total = res.queryResult.total
          this.list = res.queryResult.list
        })
      }
    },

    created() {
      //存储 请求参数
      /*if(this.$route.query.page){
       this.params.page = Number.parseInt(this.$route.query.page)
       }*/
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteName = this.$route.query.siteName || '';
    },
    mounted() {
      //默认查询页面
      this.query()

    }
  }
</script>
<style>

</style>
