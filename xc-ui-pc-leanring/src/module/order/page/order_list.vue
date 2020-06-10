<template>
  <div class="allclass-content">
    <div class="top-title"><em id="all" @click="cheakStatus(0)" style="color:orangered;font-size: 16px;cursor: pointer">全部课程</em>  &nbsp;| &nbsp; <em
      id="wait"
      @click="cheakStatus(2)"
      style="color:black;font-size: 16px;cursor: pointer">待付款</em> &nbsp;|&nbsp;
      <em
        id="succ" @click="cheakStatus(1)" style="color:black;font-size: 16px;cursor: pointer;">已完成</em> &nbsp;| &nbsp;<em id="outs"
                                                                                           @click="cheakStatus(3)"
                                                                                           style="color:black;font-size: 16px;cursor: pointer">已关闭</em>
    </div>
    <div class="nav" style="cursor: default">
      <div><em class="col-md-6">课程信息</em><em class="col-md-4"><em>订单金额</em>&emsp;<em>实付款</em>&emsp;<em>交易状态</em></em><em
        class="col-md-2">交易操作</em></div>
    </div>
    <div class="content" style="cursor: default">
      <div class="all show">
        <div class="allclass-cont">
          <div class="content">
            <div class="item" v-for="order in orderList">
              <div class="time-orderid"><em>{{order.startTime| formatDate}}</em> &emsp;&emsp;&emsp;<em>订单号：{{order.orderNumber}}</em>
                <span style="cursor: pointer;font-size: 24px;float: right;color: orangered"
                      @click="del(order.orderNumber)" title="删除订单">×</span></div>
              <div class="item-content">
                <div class="item-left col-lg-2"><img
                  v-if="courseMap[JSON.parse(order.details).courseId] && courseMap[JSON.parse(order.details).courseId].pic"
                  :src="'http://img.yok.com/'+courseMap[JSON.parse(order.details).courseId].pic"
                  width="100%" alt=""></div>
                <div class="item-cent col-lg-4">
                  <div class="title" style="margin-top: 30px;font-weight: 500"
                       v-if="courseMap[JSON.parse(order.details).courseId] && courseMap[JSON.parse(order.details).courseId].name">
                    {{courseMap[JSON.parse(order.details).courseId].name}}
                  </div>
                </div>

                <div class="col-lg-4 lab-info">
                  &emsp;&emsp;<em>{{order.initialPrice}}</em>&emsp;&emsp;&emsp;&emsp;<em>{{order.price}}</em>&emsp;&emsp;&emsp;&emsp;<em
                  v-if="order.status == '30101'">待支付</em><em
                  v-if="order.status == '30102'">已完成</em><em v-if="order.status == '30103'">已取消</em>
                </div>
                <div class="item-rit col-lg-2" v-if="order.status == '30101'">

                  <router-link :to="'/pay/'+order.orderNumber" target="_blank">去 支 付</router-link>
                  <a href="javascript:;" @click="cancel(order.orderNumber)">取消订单</a>
                </div>
                <div class="item-rit col-lg-2" v-if="order.status == '30102'">
                  <br/>
                  <router-link :to="'/pay/'+order.orderNumber" target="_blank">查看订单</router-link>
                  <a href="javascript:;" @click="show(JSON.parse(order.details).courseId)">查看课程</a>
                </div>
                <div class="item-rit col-lg-2" v-if="order.status == '30103'">
                  <br/>
                  <router-link :to="'/pay/'+order.orderNumber" target="_blank">查看订单</router-link>
                  <a href="javascript:;" @click="show(JSON.parse(order.details).courseId)">查看课程</a>
                </div>
              </div>
            </div>
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
</template>

<script>
  import * as orderApi from '../api/order';
  import * as systemApi from '@/base/api/system';
  import utilApi from '../../../common/utils';

  export default {
    components: {},
    data() {
      return {
        page: 1,
        size: 3,
        orderList: [],
        courseMap: {},
        status: '0', //0：全部  1：已付款  2：待付款   3：已取消
        userId: '',
        total: 1,
        totalPage: 1,
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return utilApi.formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
      cheakStatus(flag) {
        var all = document.getElementById("all");
        var wait = document.getElementById("wait");
        var succ = document.getElementById("succ");
        var outs = document.getElementById("outs");
        if (flag == "0") {
          all.style.color = "orangered";
          succ.style.color = "black";
          wait.style.color = "black";
          outs.style.color = "black";
          this.status = "0";
        } else if (flag == "1") {
          succ.style.color = "orangered";
          all.style.color = "black";
          wait.style.color = "black";
          outs.style.color = "black";
          this.status = "1";
        } else if (flag == "2") {
          wait.style.color = "orangered";
          succ.style.color = "black";
          all.style.color = "black";
          outs.style.color = "black";
          this.status = "2";
        } else if (flag == "3") {
          outs.style.color = "orangered";
          succ.style.color = "black";
          wait.style.color = "black";
          all.style.color = "black";
          this.status = "3";
        } else {
          all.style.color = "#00a4ff";
          succ.style.color = "#black";
          wait.style.color = "#black";
          outs.style.color = "#black";
          this.status = "0";
        }
        this.query();
      },
      del(id) {
        this.$confirm('您确定删除该订单吗?', '提示', {type: 'warning'}).then(() => {
          orderApi.delete_order(id).then((res) => {
            if (res.success) {
              this.$message.success("删除成功");
              this.query();
            } else if (res.message) {
              this.$message.error(res.message);
            } else {
              this.$message.error("删除失败！");
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
      cancel(id) {
        this.$confirm('您确定取消该订单吗?', '提示', {type: 'warning'}).then(() => {
          orderApi.cancel(id).then((res) => {
            if (res.success) {
              this.$message.success("取消成功");
              this.query();
            } else if (res.message) {
              this.$message.error(res.message);
            } else {
              this.$message.error("取消失败！");
            }
          })
        })
      },
      show(courseId) {
        let returnUrl = " http://www.yok.com/course/detail/" + courseId + ".html";
        window.open(returnUrl);
      },
      timer() {
        return setInterval(() => {
          this.query();
        }, 1000 * 60 * 5)
      },
      query() {
        let params = {
          userId: this.userId,
          status: this.status
        }
        orderApi.order_list(this.page, this.size, params).then((res) => {
          //console.log(res)
          if (res.success) {
            this.orderList = res.queryResult.list;
            console.log(this.orderList);
            this.total = res.queryResult.total;
            this.totalPage = Math.ceil(this.total / this.size);
            if (this.orderList.length != 0) {
              this.findCourseByIds()
            }
            for (var i = 0; i < this.orderList.length; i++) {
              //  console.log(value.status)
              let value = this.orderList[i];
              if (value.status == "30101") {
                this.timer()
              }
            }
          }
        })
      },
      findCourseByIds: function () {
        //根据课程id取课程信息
        let course_ids = ''
        this.orderList.forEach(function (value) {
          let xcOrdersDetails = value.details;
          let detail = JSON.parse(xcOrdersDetails);
          let course_id = detail.courseId;
          course_ids += course_id + ',';
        });
        systemApi.course_findByIds(course_ids).then((res) => {
          if (res) {
            this.courseMap = res;
          }
        })
      }
    },
    created() {
      let activeUser = utilApi.getActiveUser();
      this.userId = activeUser.userid;
      this.query();
    },
    mounted() {

    }
  }

</script>

<style>
  @import './../../../../static/css/page-learing-personal-allclass.css';

  span.current-page,
  span:hover {
    color: #26a5ff;
    background: #26a5ff;
  }
</style>

