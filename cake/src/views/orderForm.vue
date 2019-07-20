<template>
  <div class="container">
    <div style="height:50px;width:100%;"></div>
    <div class="Tabbar">
      <mt-button class="toggle active" size="small" @click.native.prevent="active = ''">全部</mt-button>
      <mt-button class="toggle" size="small" @click.native.prevent="active = ''">待发货</mt-button>
      <mt-button class="toggle" size="small" @click.native.prevent="active = ''">待付款</mt-button>
      <mt-button class="toggle" size="small" @click.native.prevent="active = ''">待收货</mt-button>
      <mt-button class="toggle" size="small" @click.native.prevent="active = ''">已完成</mt-button>
      <mt-button class="toggle" size="small" @click.native.prevent="active = ''">已取消</mt-button>
      <mt-button class="toggle" size="small" @click.native.prevent="active = ''">售后</mt-button>
    </div>
    <div style="min-height:3px;width:100%;"></div>
    <div class="order-form">
      <router-link to>
        <div class="form-item">
          <span>
            支付订单
            <span class="order-code">20190718124567895</span>
          </span>
          <span class="order-time">2019-07-19 17:11</span>
        </div>
        <div class="form-box">
          <div class="form-info">
            <img src="images/product/64sd78f5465sda411.jpg" alt style />
            <span class="pName">蛋黄酥</span>
            <span class="state">
              状态:
              <span>预定</span>
            </span>
            <span class="count">
              ×
              <span>1</span>
            </span>
            <b class="subtotal">
              ￥
              <span>85.00</span>
            </b>
          </div>
        </div>
        <div class="end">
          <span>
            合计：
            <span class="total">
              ￥
              <span>85.00</span>
            </span>
          </span>
          <div class="over">
            <span class="off">取消</span>
            <span class="pay">付款</span>
          </div>
        </div>
      </router-link>
      <div style="min-height:3px;width:100%;background: #ddd;"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.container {
  background: rgba(221, 221, 221, 0.5);
  /* width:100%; */
}
/* 状态样式 */
.Tabbar {
  justify-content: space-around;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  /* width: 120%; */
}
.Tabbar .toggle {
  background: #fff;
  box-shadow: none;
  border-radius: 0;
  border: 0;
}
.Tabbar .active {
  border-bottom: 1px solid #ea5454;
  color: #ea5454;
}
/* 订单 */
.order-form {
  background: #fff;
  /* width:95%; */
  margin: 0 auto;
}
.order-form .form-item {
  font-size: 12px;
  color: #bbb;
  padding: 12px 0;
  margin: 0 2.5%;
}
.order-form .form-item .order-time {
  float: right;
}
.order-form .form-box {
  margin: 0 10px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  position: relative;
  color: #333;
}
.order-form .form-box img {
  width: 100px;
  height: 100px;
}
.form-box .form-info {
  height: 100px;
}
.form-box .form-info .pName {
  position: absolute;
  font-size: 18px;
  font-weight: 600;
  top: 18px;
  left: 120px;
}
.form-box .form-info .state {
  position: absolute;
  font-size: 15px;
  color: #7a7a7a;
  top: 50px;
  left: 120px;
}
.form-box .form-info .count {
  position: absolute;
  font-size: 15px;
  color: #7a7a7a;
  top: 90px;
  left: 120px;
}
.form-box .form-info .subtotal {
  position: absolute;
  font-size: 18px;
  color: #ed143d;
  top: 85px;
  left: 265px;
}
.order-form .end {
  color: #333;
  padding: 18px 12px 25px 10px;
  font-size: 18px;
}
.end .total {
  color: #ed143d;
  font-weight: bolder;
}
.end .over {
  float: right;
}
.end .over span.pay {
  margin-left: 10px;
}
.end .over span {
  padding: 6px 12px;
  font-size: 15px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
