<template>
  <div v-html="html"></div>
</template>

<script>
  import * as orderApi from "../api/order";

  export default {
    data(){
      return{
        orderNumer:'',
        html:''
      }
    },
    methods:{
      goAliPay(){
        console.log("orderNumber:"+this.orderNumber)
        let params = {}
        params.orderNumber = this.orderNumber
        orderApi.goAlipay(params).then( res => {
          console.log(res)
          this.html = res;
          console.log(this.html)
          this.$nextTick(() => {
            document.forms[0].submit()
          })
        })
      }
    },
    mounted(){
      this.orderNumber=this.$route.params.orderNumber;
      this.goAliPay();
    }
  }
</script>
