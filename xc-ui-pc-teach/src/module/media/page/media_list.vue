<template>
  <div>
    <!--查询表单-->
    <el-form :model="params">
      原始名称：
      <el-input v-model="params.fileOriginalName" style="width:160px"></el-input>
      处理状态：
      <el-select v-model="params.processStatus" placeholder="请选择处理状态" style="width:160px">
        <el-option
          v-for="item in processStatusList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button type="primary" v-on:click="query" size="big">查询</el-button>
      <router-link class="mui-tab-item" :to="{path:'/upload'}">&nbsp;
        <el-button  type="primary" size="big" v-if="ischoose != true">上传文件</el-button>
      </router-link>
    </el-form>
    <!--列表-->
    <el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column type="index" width="30">
      </el-table-column>
      <el-table-column prop="fileOriginalName" label="原始文件名称" width="220">
      </el-table-column>
      <el-table-column prop="fileName" label="文件名称" width="220">
      </el-table-column>
      <el-table-column prop="fileUrl" label="访问url" width="280">
      </el-table-column>
      <el-table-column prop="fileSize" label="文件大小" width="115" >
      </el-table-column>
      <el-table-column prop="processStatus" label="处理状态" width="115" :formatter="formatProcessStatus">
      </el-table-column>
      <el-table-column prop="uploadTime" label="创建时间" width="170" :formatter="formatCreatetime">
      </el-table-column>
      <el-table-column label="开始处理" width="110" v-if="ischoose != true">
        <template slot-scope="scope">
          <el-button
            size="small" type="primary" plain @click="process(scope.row.fileId)">开始处理
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="80" v-if="ischoose != true">
        <template slot-scope="scope">
          <el-button
            size="small" type="primary" plain @click="del(scope.row.fileId)">删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="选择" width="80" v-if="ischoose == true">
        <template slot-scope="scope">
        <el-button
          size="small" type="primary" plain @click="choose(scope.row)">选择</el-button>
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
  import * as mediaApi from '../api/media'
  import utilApi from '@/common/utils';
  export default{
    props: ['ischoose'],
    data(){
      return {
        params:{
          page:1,//页码
          size:6,//每页显示个数
          fileName:'',//文件名称
          processStatus:''//处理状态
        },
        listLoading:false,
        list:[],
        total:0,
        processStatusList:[]
      }
    },
    methods:{
      formatCreatetime(row, column){
        var createTime = new Date(row.uploadTime);
        if (createTime) {
          return utilApi.formatDate(createTime, 'yyyy-MM-dd hh:mm:ss');
        }
      },
      formatProcessStatus(row,column){
        var processStatus = row.processStatus;
        if (processStatus) {
            if(processStatus == '303001'){
              return "处理中";
            }else if(processStatus == '303002'){
              return "处理成功";
            }else if(processStatus == '303003'){
              return "处理失败";
            }else if(processStatus == '303004'){
              return "无需处理";
            }
        }
      },
      choose(mediaFile){
          if(mediaFile.processStatus !='303002' && mediaFile.processStatus !='303004'){
            this.$message.error('该文件未处理，不允许选择');
            return ;
          }
        if(!mediaFile.fileUrl){
          this.$message.error('该文件的访问url为空，不允许选择');
          return ;
        }
        //调用父组件的choosemedia方法
        this.$emit('choosemedia',mediaFile.fileId,mediaFile.fileOriginalName,mediaFile.fileUrl);
      },
      changePage(page){
        this.params.page = page;
        this.query()
      },
      del (id) {
        this.$confirm('确认删除该媒资文件吗？', '提示', {}).then(() => {
          mediaApi.media_delete(id).then((res) => {
            console.log(res)
            if (res.success) {
              this.$message.success('删除成功！');
              this.changePage(this.params.page);
            } else {
              this.$message.error(res.message);
            }
          })
        })
      },
      process (id) {
        //alert(id+" "+status)
        mediaApi.media_process(id,status).then((res)=>{
        //  console.log(res)
          if(res) {
            if (res.success) {
              this.$message.success('开始处理，请稍后查看处理结果');
              this.changePage(this.params.page);
            } else {
              this.$message.success(res.message);
              this.changePage(this.params.page);
            }
          }else{
           this.$message.error('操作失败，请刷新页面重试');
         }
        })
      },
      query(){
        mediaApi.media_list(this.params.page,this.params.size,this.params).then((res)=>{
          this.total = res.queryResult.total;
         var tempList = res.queryResult.list;
          for(var i=0;i<tempList.length;i++){
            var size =tempList[i].fileSize;
            size=size/1024/1024;
            size = size.toFixed(2)+'M';
            tempList[i].fileSize=size;
          }
          this.list=tempList;
        })
      }
    },
    created(){
        //默认第一页
      this.params.page = Number.parseInt(this.$route.query.page||1);
    },
    mounted() {
      //默认查询页面
      this.query()
      //初始化处理状态
      this.processStatusList = [
        {
          id:'',
          name:'全部'
        },
        {
          id:'303001',
          name:'处理中'
        },
        {
          id:'303002',
          name:'处理成功'
        },
        {
          id:'303003',
          name:'处理失败'
        },
        {
          id:'303004',
          name:'无需处理'
        }
      ]
    }
  }
</script>
<style>

</style>
