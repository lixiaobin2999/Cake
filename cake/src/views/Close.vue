<template>
  <div class="page-navbar">
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="1">
        <span class="top_btn">同城配送</span>
      </mt-tab-item>
      <mt-tab-item id="2">
        <span class="top_btn">到店自取</span>
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item class="box" id="1">
        <div class="site">
          <span>请选择收货地址</span>
          <span class="right">&gt;</span>
        </div>
        <div class="myshop">
          <span>门店名称：××蛋糕</span>
          <span>门店电话：0000-00000000</span>
          <span
            class="line_height"
          >配送门店：1.地址：越秀区侨光路8号华厦大厦B座7楼达内&nbsp;2.营业时间：8:30-18:00 每周一至周五公休。3.蛋糕预约三年起，请填写预约时间。</span>
        </div>
        <div class="sub">
          <span class="noborder">预约专用</span>
          <div @click="showDateTimePicker">
            <i>*&nbsp;</i>
            <span>预&nbsp;约&nbsp;日&nbsp;期</span>
            <span class="right">{{time}}&nbsp;&gt;</span>
          </div>
          <mt-field label="备注："></mt-field>
        </div>
        <div class="product" v-for="(item,index) of list" :key="index">
          <img :src="`http://kirito7.applinzi.com/${item.pic}`" alt />
          <span class="product_title" v-text="item.pname"></span>
          <span class="product_details">
            <span :class="{none:item.is_state=='-1'}" v-text="`状态:\n${item.is_state}`"></span>
            <span :class="{none:item.size==null}" v-text="`尺寸:\n${item.size}`"></span>
            <span :class="{none:item.fruit==null}" v-text="`水果:\n${item.fruit}`"></span>
            <span :class="{none:item.else_message==null}" v-text="`套餐:\n${item.else_message}`"></span>
            <span :class="{none:item.style==null}" v-text="`款式:\n${item.style}`"></span>
          </span>
          <span class="jiesuan_shuliang" v-text="`×${item.count}`"></span>
          <span class="price" v-text="`¥${item.price}`"></span>
        </div>
        <div class="method">
          <span class="pay">
            <span>支付方式</span>
            <span class="right">微信支付&nbsp;&gt;</span>
          </span>
          <span>
            <span>运费</span>
            <span class="right pay_site">请先选择收货地址</span>
          </span>
        </div>
      </mt-tab-container-item>

      <mt-tab-container-item class="box" id="2">
        <div class="contact">
          <mt-field class="pro" label="收货人：" placeholder="可以手动填写"></mt-field>
          <mt-field class="phone" label="联系电话：" placeholder="可以手动填写"></mt-field>
        </div>
        <div class="myshop">
          <span>门店名称：××蛋糕</span>
          <span>门店电话：0000-00000000</span>
          <span
            class="line_height"
          >配送门店：1.地址：越秀区侨光路8号华厦大厦B座7楼达内&nbsp;2.营业时间：8:30-18:00 每周一至周五公休。3.蛋糕预约三年起，请填写预约时间。</span>
          <span class="attention">*自提订单请去以上门店提货</span>
        </div>
        <div class="sub">
          <span class="noborder">预约专用</span>
          <div @click="showDateTimePicker">
            <i>*&nbsp;</i>
            <span>预&nbsp;约&nbsp;日&nbsp;期</span>
            <span class="right">{{time}}&nbsp;&gt;</span>
          </div>
          <mt-field label="备注："></mt-field>
        </div>
        <div class="product" v-for="(item,index) of list" :key="index">
          <img :src="`http://kirito7.applinzi.com/${item.pic}`" alt />
          <span class="product_title" v-text="item.pname"></span>
          <span class="product_details">
            <span :class="{none:item.is_state=='-1'}" v-text="`状态:\n${item.is_state}`"></span>
            <span :class="{none:item.size==null}" v-text="`尺寸:\n${item.size}`"></span>
            <span :class="{none:item.fruit==null}" v-text="`水果:\n${item.fruit}`"></span>
            <span :class="{none:item.else_message==null}" v-text="`套餐:\n${item.else_message}`"></span>
            <span :class="{none:item.style==null}" v-text="`款式:\n${item.style}`"></span>
          </span>
          <span class="jiesuan_shuliang" v-text="`×${item.count}`"></span>
          <span class="price" v-text="`¥${item.price}`"></span>
        </div>
        <div class="method">
          <span class="pay">
            <span>支付方式</span>
            <span class="right">微信支付&nbsp;&gt;</span>
          </span>
          <span>
            <span>运费</span>
            <span class="right attention">包邮</span>
          </span>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="bottom">
      <span class="money">总计：¥268</span>
      <label class="submit">提交订单</label>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "1",
      pickerValue: "",
      time: "",
      list: [
        {
          pic: "images/product/64sd78f5465sda4110.jpg",
          pname: "提拉米苏",
          is_state: "-1",
          size: "5寸",
          fruit: "芒果",
          else_message: null,
          style: null,
          count: 1,
          price: 10
        },
        {
          pic: "images/product/64sd78f5465sda4110.jpg",
          pname: "提拉米苏",
          is_state: "-1",
          size: "5寸",
          fruit: "芒果",
          else_message: null,
          style: null,
          count: 1,
          price: 10
        }
      ]
    };
  },
  created() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var current = year + "-" + month + "-" + date;
    var hours = time.getHours();
    var minutes =
      time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    var second =
      time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
    this.time =
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      second;
  },
  methods: {
    showDateTimePicker() {
      if (!this.dateTimePicker) {
        this.dateTimePicker = this.$createDatePicker({
          title: "预约日期",
          min: new Date(2019, 0, 1, 1, 0, 0),
          max: new Date(2020, 7, 1, 1, 0, 0),
          value: new Date(),
          columnCount: 6,
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      }

      this.dateTimePicker.show();
    },
    selectHandle(date, selectedVal, selectedText) {
      // this.$createDialog({
      //   type: "warn",
      //   content: `Selected Item: <br/> - date: ${date} <br/> - value: ${selectedVal.join(
      //     ", "
      //   )} <br/> - text: ${selectedText.join(" ")}`,
      //   icon: "cubeic-alert"
      // }).show();
      this.time =
        selectedText[0] +
        "-" +
        selectedText[1] +
        "-" +
        selectedText[2] +
        " " +
        selectedText[3] +
        ":" +
        selectedText[4] +
        ":" +
        selectedText[5];
    }
    // cancelHandle() {
    //   this.$createToast({
    //     type: "correct",
    //     txt: "Picker canceled",
    //     time: 1000
    //   }).show();
    // }
  }
};
</script>
<style scoped>
body {
  background: #f9f9f9;
}
.none {
  display: none !important;
}
/* .page-navbar {
} */
.page-part {
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}
.box {
  margin-bottom: 55px;
  margin-top: 50px;
}
.page-navbar .mint-tab-item-label {
  font-size: 16px;
}

.top_btn {
  display: inline-block;
}
.right {
  float: right;
}
.site {
  display: block;
  height: 35px;
  font-size: 16px;
  margin-top: 2px;
  color: #3e3e3e;
  line-height: 35px;
  background-color: #fff;
  padding: 0 10px 0 10px;
}
.contact {
  display: block;
  height: 95px;
  font-size: 16px;
  margin-top: 2px;
  color: #3e3e3e;
  /* margin-bottom: 15px; */
  line-height: 30px;
  background-color: #fff;
  padding: 0 10px 0 10px;
  border-bottom: 1px solid #ccc;
}
.contact .pro {
  /* border:0 !important */
}
.myshop {
  /* line-height: 35px; */
  margin-top: 10px;
  background-color: #fff;
  color: #3e3e3e;
  padding: 5px 10px 0 10px;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
}
.myshop span {
  display: block;
  margin-top: 10px;
  padding-bottom: 10px;
}
.line_height {
  line-height: 17px;
}
.attention {
  color: #e1465b;
}
.sub {
  display: block;
  background-color: #fff;
  color: #3e3e3e;
  padding: 0 10px 0 10px;
  margin-top: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}
.sub > span {
  display: block;
  /* padding: 5px 10px 0 10px; */
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}
.sub > div {
  display: block;
  /* padding: 5px 10px 0 10px; */
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}
.sub i {
  color: #f00;
}
.sub .noborder {
  border: 0;
}
.product {
  position: relative;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  padding: 0 10px 0 10px;
  /* margin-top: px; */
  background-color: #fff;
  color: #5558;
}
.product img {
  width: 95px;
  height: 90px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.product_title {
  color: #3e3e3e;
  font-size: 16px;
  margin-bottom: 5px;
  display: inline-block;
  line-height: 25px;
  position: absolute;
  top: 15px;
  left: 120px;
}
.product_details {
  position: absolute;
  top: 43px;
  left: 110px;
  margin-left: 5px !important;
}
.product_details span {
  display: inline-block;
  line-height: 25px;
  margin-left: 5px;
}
.jiesuan_shuliang {
  position: absolute;
  top: 80px;
  left: 120px;
}
.product .price {
  position: absolute;
  color: #e1465b;
  top: 80px;
  right: 10px;
}
.method {
  margin-top: 10px;
  background-color: #fff;
  color: #3e3e3e;
  font-size: 14px;
}
.method > span {
  display: block;
  line-height: 35px;
  border-bottom: 1px solid #ddd;
  padding: 0px 10px 0 10px;
}
.pay_site {
  color: #5558;
}
.bottom {
  position: fixed;
  bottom: 0;
  padding: 0px 10px 0 10px;
  background-color: #fff;
}
.money {
  display: inline-block;
  font-size: 16px;
  margin-bottom: 10px;
  line-height: 10px;
  color: #ff5150;
}
.submit {
  position: relative;
  display: inline-block;
  text-align: center;
  width: 120px;
  line-height: 50px;
  background: #fe7951 !important;
  color: #fff;
  font-size: 14px;
  left: 161px;
}
</style>
