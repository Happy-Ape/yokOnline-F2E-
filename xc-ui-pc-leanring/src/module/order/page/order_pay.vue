<template>
  <div>
    <p-head></p-head>
    <!--主体内容-->
    <div class="container">
      <div class="learing-pay">
        <div class="tit">
          <div v-if="order.status =='30101'">订单将在 {{order.endTime | formatDate}} 自动取消，请尽快完成支付</div>
          <div class="info">
            <p><span>订单号：{{orderNumber}}</span>
              <span>支付金额：<em>￥ {{order.price}}</em></span>
              <span v-if="order.status=='30101'">订单状态：未支付 </span>
              <span v-if="order.status=='30102'">订单状态：已支付 </span>
              <span v-if="order.status=='30103'">订单状态：已取消 </span>
              <span>创建时间：{{order.startTime | formatDateContainS}}</span>
            </p>
          </div>

        </div>
        <div class="pay-list">
          <div class="top"><span>课程名称</span><span>小计(元)</span></div>
          <div class="row">
            <p><span v-if="courseMap&&courseMap.courseBase">{{courseMap.courseBase.name}}</span><span>{{orderDetails.coursePrice}}</span>
            </p>
          </div>
        </div>
        <div v-if="order.status =='30101'">
          <div class="tit">选择支付方式</div>
          <div class="pay-method">
            <span href="#" class="zfb" @click="alipay">支 付 宝</span>
            <span href="#" class="weixin" @click="weixinpay">微信支付</span>

            <!--<p><a class="go-pay">我的订单列表</a></p>-->
          </div>
          <!--<el-dialog-->
          <!--title="微信扫码"-->
          <!--:visible.sync="weixinpayVisible"-->
          <!--width="380px">-->
          <!--订单号：{{orderNumber}} 支付金额：￥{{money}}元-->
          <!--<qriously :value="codeUrl" :size="338"/>-->
          <!--<el-button type="primary" @click="query_weixinpay">我已经完成支付</el-button>-->
          <!--</el-dialog>-->
        </div>
        <div v-if="order.status =='30102'">
          <div class="pay-method">
            <p style="color:grey;font-size: 18px"> 您已支付该订单！</p>
          </div>
        </div>
        <div v-if="order.status =='30103'">
          <div class="pay-method">
            <p style="color:orangered;font-size: 18px"> 订单已经被取消，请重新创建订单！</p>
            <p>
              <button href="#" class="go-pay" @click="createOrder" :loading="editLoading" style="height:40px">重新创建订单
              </button>
            </p>
          </div>
        </div>
        <div class="pay-method">
          <p>
            <router-link to="/order" class="go-pay">我的订单列表</router-link>
          </p>
        </div>
      </div>
    </div>
    <p-foot></p-foot>
  </div>
</template>

<script>
  import PHead from '@/base/components/head.vue';
  import PFoot from '@/base/components/foot.vue';
  import * as orderApi from '../api/order'
  import utilApi from '../../../common/utils';
  import http from "../../../base/api/public";

  export default {
    components: {
      PHead,
      PFoot
    },
    data() {
      return {
        codeUrl: '',
        orderNumber: '',
        order: {},
        userId: '',
        orderDetails: [],
        courseMap: {},
        itemIdList: [],
        itemId: '',
        money: '',
        weixinpayVisible: false,
        editLoading: true
      }
    },

    methods: {
      alipay() {
        this.$message.success("正在前往支付宝支付...")
        this.$router.push({path: '/alipay/' + this.orderNumber})
      },

      weixinpay() {
        this.$message.success("暂不支持微信支付，请使用支付宝支付！")
      },
      createOrder() {
        orderApi.createOrder(this.itemId, this.userId).then((res) => {
            // console.log(res);
            this.editLoading = false;
            if (res.success) {
              this.$message.success("重新创建订单成功")
              //跳转到支付页面
              let returnUrl = "http://ucenter.yok.com/#/pay/" + res.xcOrders.orderNumber;
              setTimeout(function (returnUrl) {
                window.location.href = returnUrl;
                window.location.reload();
              }, 800, returnUrl)
            } else {
              if (res.message) {
                this.$message.error(res.message);
              } else {
                this.$message.error("订单创建失败，请刷新页面重试")

              }
            }
          },
          (res) => {
            this.editLoading = false;
          });
      },
      // query_weixinpay() {
      //   let params = {
      //     orderNumber: this.orderNumber
      //   }
      //   orderApi.pay_queryWeixinPayStatus(params).then((res) => {
      //     //console.log(res)
      //     if (res.success) {
      //       if (res.xcOrdersPay && res.xcOrdersPay.status == '402002') {
      //         this.$message.success("支付成功！")
      //         //查询订单信息
      //         this.query_order(this.orderNumber)
      //       } else {
      //         this.$message.error("还未支付完成，请扫码支付！")
      //       }
      //     } else {
      //       this.$message.error("查询支付结果失败，请刷新页面重试！")
      //     }
      //   })
      // },
      query_order(orderNumber) {
        //获取订单信息
        orderApi.order_findById(orderNumber).then((res) => {
          //console.log(res)
          if (res.success) {
            this.order = res.xcOrders
            this.userId = this.order.userId
            //console.log("订单状态：" + this.order.status)
            if (this.order.status == "30101") {
              //启动定时器
              this.timer()
            }
            try {
              this.orderDetails = JSON.parse(res.xcOrders.details)
              this.itemId = this.orderDetails.courseId
            } catch (e) {
            }
            //console.log( this.orderDetails )
            if (this.itemId) {
              //取出商品信息
              orderApi.course_view(this.itemId).then((res) => {
                //console.log(res)
                if (res) {
                  this.courseMap = res;
                  console.log(this.courseMap)
                }
              })
            }

          }
        })
      },
      // 定时器
      timer() {
        //console.log("id " + this.orderNumber)
        return setInterval(() => {
          orderApi.order_findById(this.orderNumber).then((res) => {
            if (res.success) {
              let noworder = res.xcOrders;
              // console.log("最新订单状态：" + noworder.status);
              if (noworder.status == "30103") {
                  this.$message.warning("您已超时为支付，正在取消订单！")
                setTimeout(function () {
                window.location.reload();
                }, 1000)
              }
            }
          })
        }, 30000)
      }
    },
    created() {
      //获取订单号
      this.orderNumber = this.$route.params.orderNumber
      this.query_order(this.orderNumber)

    },
    mounted() {


    }
  }

</script>

<style>
  @import './../../../../static/css/page-learing-pay.css';

</style>

