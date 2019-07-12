<template>
  <div>
    <div>
      <mt-tab-container v-model="active">
        <!-- 首页 -->
        <mt-tab-container-item id="myIndex">
          <div style="text-align: center;;width:100%">
            <!-- 搜索 -->
            <div class="mySearch">
              <mt-search autofocus></mt-search>
            </div>
            <!-- 产品导航 -->
            <div class="product-nav">
              <router-link to="#" class="list-nav">
                <span class="iconfont">&#xe6be;</span>
              </router-link>
              <router-link to="#" class="list-nav">
                <span class="iconfont">&#xe666;</span>
              </router-link>
              <router-link to="#" class="list-nav">
                <span class="iconfont">&#xe613;</span>
              </router-link>
              <router-link to="#" class="list-nav">
                <span class="iconfont">&#xe601;</span>
              </router-link>
            </div>
            <!-- 推荐 -->
            <router-link to="#">
              <img src="images/banner/yan01.jpg" width="95%" />
            </router-link>
            <!-- 公告 -->
            <div class="gonggao">
              <p class="iconfont">
                <span class="up">
                  <i class="laba"></i>
                </span>
                <span class="slide">店铺营业时间为：8:30-18:00,对每一份甜点心怀敬意,为保证最佳赏味,请提前预约制作。</span>
              </p>
            </div>
          </div>
        </mt-tab-container-item>
        <!-- 分类 -->
        <mt-tab-container-item id="myProduct" class="mem">
          <classify></classify>
        </mt-tab-container-item>
        <!-- 购物车 -->
        <mt-tab-container-item id="MyCart">
          <cart></cart>
        </mt-tab-container-item>
        <!-- 个人中心 -->
        <mt-tab-container-item id="me">
          <own></own>
        </mt-tab-container-item>
      </mt-tab-container>

      <!-- 底部 -->
      <mt-tabbar v-model="active" fixed>
        <mt-tab-item id="myIndex">首页</mt-tab-item>
        <mt-tab-item id="myProduct">所有商品</mt-tab-item>
        <mt-tab-item id="MyCart">购物车</mt-tab-item>
        <mt-tab-item id="me">个人中心</mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>
<script>
// 导入需要的子组件(分类,购物车,个人中心)
import Classify from "./Classify.vue";
import Cart from "./Cart";
import Own from "./Own";

export default {
  data() {
    return {
      active: "myIndex"
    };
  },
  // 注册子组件
  components: {
    Classify: Classify,
    cart: Cart,
    own: Own
  }
};
</script>
<style>
/* 顶部食品类型 */
.product-nav {
  margin: 0.28rem;
  text-align: center;
  display: flex;
}
/* 公告 */
.gonggao {
  text-align: left;
  width: 95%;
  display: inline-block;
  overflow: hidden;
}

.gonggao p {
  display: inline-block;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
}
.gonggao span.up {
  background: #fff !important;
  display: inline-block;
  overflow: hidden;
}
.gonggao span i.laba {
  display:inline-block;
  width:15px;
  height:15px;
  background:url("/images/laba.png") no-repeat center center;
  color: #243f4c;
  margin-right: 0.15rem;
  overflow: hidden;
  z-index: 1000;
  background-size: 100%;
}
.gonggao span.slide{
  color: #795548;
  animation: translatex 7s linear infinite;
  animation-play-state: running;
  display: inline-block;
  white-space: nowrap;
}

@keyframes translatex {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-620px);
  }
}

.product-nav .list-nav {
  width: 24%;
  justify-content: space-around;
}
.product-nav .list-nav span {
  font-size: 1.1rem;
}
/*  */
.mem {
  height: 500px;
}
/* 搜索框的高 */
.mySearch {
  height: 52px;
}

.mint-searchbar {
  background-color: #efeff4 !important;
}

/* 取消的文字样式 */
.mySearch .mint-searchbar-cancel {
  font-size: 14px !important;
  color: #000 !important;
}

/* 搜索框的文字样式 */
.mySearch .mint-searchbar-core {
  font-size: 14px !important;
}
</style>



