<template >
  <div class="container">
    <!-- .icon-fenxiang -->
    <!-- -1表示上一个路由 -->
    <h1 class="fanhui" @click="$router.go(-1);">商品详情</h1>
    <!-- 大图 -->
    <div style="margin:0.25rem 0">
      <img :src="`http://127.0.0.1:7000/${list.pic}`" alt />
    </div>
    <!-- 简介 -->
    <div class="intro">
      <div class="intro-head">
        <span class="price" v-text="`￥${priceAll}`"></span>
        <span class="pname" v-text="list.pname"></span>
      </div>
      <div class="fengxiang">
        <div class="iconfont">&#xe608;</div>
        <p>分享</p>
      </div>
      <div class="clearfix countAll">
        <span v-text="`销量：${list.sales_volume}件`"></span>
        <span>
          库存:
          <i v-text="repertoryAll"></i>件
        </span>
        <span v-text="`浏览量：${list.read_num}`"></span>
      </div>
    </div>
    <div style="height:0.27rem;width:100%;background-color:#ddd;margin:0"></div>
    <div class="spec" @click="Select">
      请选择 &nbsp;尺寸
      <i>&gt;</i>
    </div>
    <div style="height:0.27rem;width:100%;background-color:#ddd;margin:0"></div>
    <div class="Tabbar">
      <mt-button class="toggle active" size="small" @click.native.prevent="active = 'tab1'">商品详情</mt-button>
      <mt-button class="toggle" size="small" @click.native.prevent="active = 'tab2'">商品评论</mt-button>
    </div>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab1">
        <img :src="`http://127.0.0.1:7000/${list.details_pic}`" alt />
      </mt-tab-container-item>
      <mt-tab-container-item id="tab2">
        <mt-button size="small" @click.native.prevent="active = ''">全部</mt-button>
        <mt-button size="small" @click.native.prevent="active = ''">有图</mt-button>
        <mt-button size="small" @click.native.prevent="active = ''">好评</mt-button>
        <mt-button size="small" @click.native.prevent="active = ''">中评</mt-button>
        <mt-button size="small" @click.native.prevent="active = ''">差评</mt-button>
      </mt-tab-container-item>
    </mt-tab-container>
    <div style="position:fixed;bottom:0;width:100%;z-index:999;">
      <ul class="gat-nav">
        <li class="li-nav">
          <i class="iconfont">&#xe604;</i>
          <span @click="$router.push('/Index');">首页</span>
        </li>
        <li class="li-nav">
          <i class="iconfont">&#xe602;</i>
          <span>收藏</span>
        </li>
        <li class="buy">
          <span class="add-cart" @click="Select">加入购物车</span>
          <span class="now-buy" @click="Select">立即购买</span>
        </li>
      </ul>
    </div>
    <!-- 点击请选择尺寸后在下面弹出一个规格选择 -->
    <div class="select_spec" v-show="show_spec">
      <!-- 一层蒙板 -->
      <div class="mask" @click="Cancel"></div>
      <!-- 规格信息 -->
      <div class="Spec">
        <!-- 上面图片 价格 库存 -->
        <div class="pic_list">
          <img :src="`http://127.0.0.1:7000/${list.pic}`" />
          <div v-text="`￥168-288`"></div>
          <div class="Repertory">
            库存
            <i style="color:green" v-text="repertoryAll"></i>件
          </div>
        </div>
        <div class="Spec_select">
          <!-- 尺寸 -->
          <div class="Size" v-if="size_list!=''">
            <span class="Spec_name">尺寸</span>
            <div class="Size_select">
              <span
                :class="{spec_active:spec_active}"
                v-for="(item,i) in size_list"
                :key="i"
                v-text="item.size"
              ></span>
            </div>
          </div>
          <!-- 状态 -->
          <div class="Size" v-if="is_state_list!=''">
            <span class="Spec_name">状态</span>
            <div class="Size_select">
              <span
                :class="{spec_active:spec_active}"
                v-for="(item,i) of is_state_list"
                :key="i"
                v-text="item.is_state"
              ></span>
            </div>
          </div>
          <!-- 款式 -->
          <div class="Size" v-if="style_list!=''">
            <span class="Spec_name">款式</span>
            <div class="Size_select">
              <span
                :class="{spec_active:spec_active}"
                v-for="(item,i) of style_list"
                :key="i"
                v-text="item.style"
              ></span>
            </div>
          </div>
          <!-- 水果 -->
          <div class="Size" v-if="fruit_list!=''">
            <span class="Spec_name">水果</span>
            <div class="Size_select">
              <span
                :class="{spec_active:spec_active}"
                v-for="(item,i) of fruit_list"
                :key="i"
                v-text="item.fruit"
              ></span>
            </div>
          </div>
          <!-- 其他规格 -->
          <div class="Size" v-if="else_message_list!=''">
            <span class="Spec_name">水果</span>
            <div class="Size_select">
              <span
                :class="{spec_active:spec_active}"
                v-for="(item,i) of else_message_list"
                :key="i"
                v-text="item.else_message"
              ></span>
            </div>
          </div>
        </div>
        <div class="Number">
          <span>数量</span>
          <div class="Input">
            <span>-</span>
            <input type="text" value="1" />
            <span>+</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    // name:"Tabbar"
    return {
      active: "tab1",
      list: [],
      // 显示规格
      show_spec: false,
      // 最低~最高价钱
      priceAll: "",
      // 库存
      repertoryAll: "",
      // 规格的数据
      spec_list: [],
      // 尺寸的数据
      size_list: [],
      // 状态的数据
      is_state_list: [],
      // 款式的数据
      style_list: [],
      // 水果的数据
      fruit_list: [],
      // 其他规格数据
      else_message_list: [],
      // 选中了那个规格
      spec_active: false,
      // 尺寸的数据
      size_list: []
    };
  },
  props: ["pid"],
  created() {
    this.load();
  },
  methods: {
    load() {
      this.axios
        .get("/product/details", { params: { pid: this.pid } })
        .then(result => {
          // console.log(result.data.data.spec);
          this.list = result.data.data.product[0];
          var spec = result.data.data.spec;
          this.spec_list = spec;
          // // console.log(spec);
          // 价钱的数组
          var priceArray = [];
          // 库存
          var repertory = 0;
          for (var i = 0; i < spec.length; i++) {
            repertory += spec[i].repertory;
            priceArray.push(spec[i].price);
            // console.log(spec[i]);
            if (spec[i].is_state != "-1") {
              this.is_state_list.push(spec[i]);
            }
            if (spec[i].size != null) {
              this.size_list.push(spec[i]);
            }
            if (spec[i].style != null) {
              this.style_list.push(spec[i]);
            }
            if (spec[i].fruit != null) {
              this.fruit_list.push(spec[i]);
            }
            if (spec[i].else_message != null) {
              this.else_message_list.push(spec[i]);
            }
          }
          // 最高价
          var max_price = Math.max.apply(null, priceArray);
          // 最低价
          var min_price = Math.min.apply(null, priceArray);
          // console.log(min_price, max_price);
          if (max_price == min_price) {
            this.priceAll = max_price;
          } else {
            this.priceAll = min_price + "~" + max_price;
          }
          // 所有库存
          this.repertoryAll = repertory;
          console.log(this.size_list);
        });
    },
    // 点击出现选择规格
    Select() {
      this.show_spec = true;
    },
    // 点击遮罩层退出选择规格选择
    Cancel() {
      this.show_spec = false;
    }
  },
  watch: {
    $route() {
      this.load();
    }
  }
};
</script>
<style scoped>
.fanhui {
  font-size: 24px;
  text-align: center;
  margin-top: 10px;
}
.fanhui::before {
  content: "<";
  font-size: 25px;
  float: left;
  margin-left: 10px;
  color: #9c9c9c;
}
.clearfix::before {
  content: "";
  clear: both;
  display: block;
}
.clearfix::after {
  content: "";
  clear: both;
  display: block;
}
img {
  width: 100%;
}
i {
  font-style: normal;
}
/*  */
.container {
  font-size: 0.4rem;
  /* 遮罩层需要父级为定位 */
  position: relative;
}
/* 产品简介 */
.intro {
  margin: 0.2rem 0.2rem;
}
.intro .intro-head {
  text-align: left;
  float: left;
}
.intro .fengxiang {
  text-align: center;
  margin: 0 0.4rem 0 0;
  float: right;
}
.intro .fengxiang p {
  margin-top: 0.1rem;
  letter-spacing: 1px;
  color: #585757;
  font-size: 0.21rem;
}
.intro .intro-head span {
  margin: 0.3rem 0;
  font-weight: 600;
  display: block;
}
.intro .intro-head span.price {
  color: brown;
}
.countAll {
  text-align: center;
}
.countAll span {
  font-size: 0.21rem;
  color: #585757;
}
.countAll span:nth-child(1) {
  float: left;
}
.countAll span:nth-child(3) {
  float: right;
}
/* 尺寸 */
.spec {
  padding: 0.4rem;
}
.spec i {
  float: right;
  font-size: 0.5rem;
  color: #585757;
}
/* 详情/评论 */
.Tabbar {
  justify-content: space-around;
  display: flex;
}
.toggle {
  background: #fff;
  box-shadow: none;
  border-radius: 0;
  outline: none;
  color: #333;
  font-size: 0.5rem;
  height: 50px;
}
.Tabbar .active {
  border-bottom: 2px solid #ea5454;
}
/* 底部导航 */
.gat-nav {
  width: 100%;
  height: 1.3rem;
  background-color: #fff;
  border-top: 2px solid #ccc;
  padding: 0.05rem 0;
  font-size: 0.1rem;
}
.gat-nav li {
  float: left;
  text-align: center;
}
.gat-nav li.li-nav {
  margin: 0.27rem 0 0 0.4rem;
}
.gat-nav li i {
  margin-bottom: 0.08rem;
  display: block;
}
.gat-nav li.buy {
  float: right;
  margin-right: 0.3rem;
}
.gat-nav li.buy span {
  display: inline-block;
  height: 1rem;
  color: #fff;
  margin-top: 6px;
  font-size: 0.4rem;
  line-height: 1rem;
  text-align: center;
}
.gat-nav li.buy span.add-cart {
  width: 4rem;
  background: #ff9a7c;
  border-radius: 0.53rem 0 0 0.53rem;
}
.gat-nav li.buy span.now-buy {
  width: 3rem;
  background: #fe7951;
  border-radius: 0 0.53rem 0.53rem 0;
}

/* 规格选择 */
.select_spec {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
/* 蒙板 */
.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
/* 规格信息 */
.Spec {
  width: 100%;
  position: fixed;
  bottom: 1.3rem;
  background-color: #fff;
  z-index: 9;
}
.pic_list {
  width: 100%;
  height: 70px;
  position: relative;
  border-bottom: 1px solid red;
}
.pic_list > img {
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: -47px;
  left: 10px;
  background-color: #fff;
  border: 2px solid #fff;
}
.pic_list > div {
  position: absolute;
  display: block;
  left: 135px;
  top: 10px;
}
.pic_list > .Repertory {
  top: 40px;
}
.Spec_select {
  padding: 15px 10px 10px 10px;
  border-bottom: 1px solid #ccc;
}
.Spec_select .Size_select {
  margin-top: 10px;
  overflow: hidden;
}
.Spec_select .Size_select > span {
  border: 1px solid #000;
  border-radius: 5px;
  float: left;
  height: 35px;
  text-align: center;
  line-height: 35px;
  margin-right: 15px;
  margin-bottom: 10px;
  padding: 0 10px 0 10px;
}
.Spec_select .Size {
  overflow: hidden;
}
.Spec_select .Size > .Spec_name {
  display: block;
  margin-top: 10px;
}
/* 数量加减 */
.Spec .Number {
  width: 100%;
  height: 50px;
  margin-top: 12px;
}
.Spec .Number > span {
  float: left;
  margin-left: 10px;
  margin-top: 10px;
}
.Spec .Number .Input {
  float: right;
  margin-right: 5px;
}
.Spec .Number .Input > input {
  width: 35px;
  height: 30px;
  background-color: #ccc;
  margin: 0 5px 0 5px;
  outline: none;
  text-align: center;
}
.Spec .Number .Input > span {
  width: 30px;
  height: 30px;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  background-color: #ccc;
}
.spec_active {
  background-color: #fe7951;
  border-color: #fe7951 !important;
}
</style>