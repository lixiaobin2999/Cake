<template>
  <div class="container">
    <div style="height:50px;width:100%;">
      <i class="iconfont" @click="$router.go(-1);" style="font-size:27px;">&#xe732;</i>
    </div>
    <!-- 订单状态 -->
    <div slot="content" class="nav-scroll-list-wrap scroll-wrapper">
      <cube-scroll
        ref="scroll"
        :data="navTxts"
        direction="horizontal"
        class="horizontal-scroll-list-wrap"
      >
        <ul class="nav-wrapper">
          <li v-for="(item,i) of navTxts" :key="i" class="nav-item">{{item}}</li>
        </ul>
      </cube-scroll>
    </div>
    <div style="min-height:8px;width:100%;"></div>
    <!-- 订单表 -->
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
const txts = ["全部", "待付款", "待发货", "待收货", "已完成", "已取消", "售后"];
export default {
  data() {
    return {
      navTxts: txts,
      options: 1,
      order_list:[]
    };
  },
  created(){
    // 获取用户id
    this.uid = this.$store.getters.getUserId;
    if(this.uid){
      // 获取该用户的所有订单信息
      this.axios.get("/product/order_list",{params:{user_id:this.uid}}).then(result=>{
        console.log(result)
      })
    }
  },
  methods: {
    scrollTo() {
      this.$refs.scroll.scrollTo(
        0,
        this.scrollToY,
        this.scrollToTime,
        ease[this.scrollToEasing]
      );
    }
  }
};
</script>
<style scoped  lang="stylus" rel="stylesheet/stylus">
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

/* 订单导航 */
.nav-scroll-list-wrap {
  background-color: white;
  height: 39px;
  border-bottom: 2px solid #ddd;

  .cube-scroll-content {
    display: inline-block;

    .nav-wrapper {
      display: inline-block;
      white-space: nowrap;
      line-height: 36px;
      padding: 0 5px;

      .nav-item {
        font-size: 18px;
        display: inline-block;
        padding: 0 3px;
        margin: 0 5px;

        &:nth-child(1) {
          color: #fa7b7a;
          border-bottom: 1px solid #ea5454;
        }
      }
    }
  }
}
</style>
