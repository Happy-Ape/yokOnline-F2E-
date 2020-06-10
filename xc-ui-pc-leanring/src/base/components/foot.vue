<template>
  <!--底部版权-->
  <footer>
    <div class="container" style="cursor: default">
      <div class="row">
        <div class="col-md-7">
          <div>
            <img src="/static/images/asset-logoIco.png" alt=""></div>
          <div>优课在线，一个专门致力于IT软件开发人才学习的在线学习网站。</div>
          <div>© 2020年 ERIC保留版权所有</div>
          <input type="button" class="btn btn-primary" value="下 载" />
        </div>
        <div class="col-md-5 row">
          <dl class="col-md-4">
            <dt>关于网站</dt>
            <dd>关于开发者</dd>
            <dd>客户服务</dd>
            <dd>帮助</dd>
          </dl>
          <dl class="col-md-4">
            <dt>新手指南</dt>
            <dd>如何注册</dd>
            <dd>如何观看</dd>
            <dd>如何购买</dd>
          </dl>
          <dl class="col-md-4">
            <dt>鸣谢</dt>
            <dd>教学方</dd>
            <dd>合作方</dd>
            <dd>导师</dd>
          </dl>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
  }
</script>
<style scoped>

  /*
   * colors variables
   */
  footer {
    width: 100%;
    background: #fff;
    margin-top: 20px;
    padding: 40px 0;
    line-height: 260%;
  }

  footer .btn-primary {
    min-width: 100px;
    margin-top: 10px;
  }

  footer img {
    position: relative;
    top: -8px;
    left: 0px;
  }

  footer dt {
    margin-bottom: 20px;
  }

  footer dd {
    line-height: 200%;
  }

</style>
