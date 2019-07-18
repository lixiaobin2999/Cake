<template>
  <div class="cart">
    <h1 class="title">购物车</h1>
    <div class="cart_box" v-for="(item,index) of list" :key="index">
      <label for="input" @click="Selected">
        <input type="checkbox" class="input" v-model="item.selected" />
        <span class="input_sp input_red" v-if="item.selected" @click="radios(index)">√</span>
        <span class="input_sp" v-if="!item.selected" @click="radios(index)"></span>
      </label>
      <router-link :to="`/Details/${item.pid}`">
        <img class="img" :src="`http://127.0.0.1:7700/${item.pic}`" alt />
      </router-link>
      <div>
        <router-link :to="`/Details/${item.pid}`">
          <span class="title_sp">
            <span v-text="item.pname"></span>
          </span>
        </router-link>
        <span class="state">
          <span :class="{none:item.is_state=='-1'}" v-text="`状态:\n${item.is_state}`"></span>
          <span :class="{none:item.size==null}" v-text="`尺寸:\n${item.size}`"></span>
          <span :class="{none:item.fruit==null}" v-text="`水果:\n${item.fruit}`"></span>
          <span :class="{none:item.else_message==null}" v-text="`套餐:\n${item.else_message}`"></span>
          <span :class="{none:item.style==null}" v-text="`款式:\n${item.style}`"></span>
        </span>
        <span class="sprice" v-text="`¥${item.price*item.count}`"></span>
      </div>
      <div>
        <span class="btn">
          <span class="sbtn" @click="btn_minute(index)">-</span>
          <span class="btn_value" v-text="item.count"></span>
          <span class="sbtn" @click="btn_add(index)">+</span>
        </span>
      </div>
    </div>
    <div class="bottom">
      <label for="bottom_input" @change="selectAll">
        <input type="checkbox" v-model="isSelectAll" id="bottom_input" />
        <span class="bottom_input"></span>
        <span class="all">全选</span>
      </label>
      <div class="count">
        <span class="money">
          <span>总计：¥{{money}}</span>
        </span>
        <span class="sum">
          <span>总数：{{num}}</span>
        </span>
      </div>
      <div class="bottom_right">
        <label class="delete" @click="delCart">删除</label>
        <label class="close">结算</label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      money: 0,
      num: 0,
      list: [],
      // 全选
      isSelectAll: false,
      // 是否为登陆状态
      uid: ""
    };
  },
  created() {
    this.uid = sessionStorage.getItem("uid");
    if (this.uid != "") this.load();
  },
  methods: {
    // 获取购物车列表信息
    load() {
      // 加了判断,是否为登陆状态
      var uid = sessionStorage.getItem("uid");
      if (uid != undefined) {
        this.axios
          .get("/cart/get_cart", { params: { user_id: 1 } })
          .then(result => {
            // console.log(result.data);
            if (result.data.code != 400) {
              for (var i of result.data.data) {
                i.selected = false;
              }
              this.list = result.data.data;
            } else {
              console.log("购物车为空");
            }
          });
      } else {
        console.log("没有登录");
      }
    },
    // 全选
    selectAll(e) {
      //全选按钮状态
      var cb = e.target.checked;
      //依据状态修改列表cb
      for (var item of this.list) {
        item.selected = cb;
      }
    },
    // 单选
    Selected(e) {
      for (var item of this.list) {
        if (item.selected != true) {
          this.isSelectAll = false;
          return;
        } else {
          this.isSelectAll = true;
        }
      }
    },
    //总价和数量更改
    hh: function() {
      //数量*单价的价格
      var price = 0;
      //勾选数量
      var numb = 0;
      var list = this.list;
      for (var i = 0; i < list.length; i++) {
        if (list[i].selected) {
          price += list[i].count * list[i].price;
          numb += list[i].count;
        }
      }
      // 总价
      this.money = price;
      //勾选数量
      this.num = numb;
      // console.log(numb);
    },
    radios(index) {
      //循环的商品
      var list = this.list;
      list[index].selected = !list[index].selected;
      this.hh();
    },
    //添加
    btn_add(index) {
      var list = this.list;
      var count = list[index].count;
      count = count + 1;
      list[index].count = count;
      this.hh();
      this.setCart(index);
    },
    //减去
    btn_minute(index) {
      var list = this.list;
      var count = list[index].count;
      if (count > 1) {
        count = count - 1;
        list[index].count = count;
      }
      this.hh();
      this.setCart(index);
    },
    // 发送axios 修改购物车列表的商品数量数据
    setCart(index) {
      // 是否为登陆状态
      var uid = sessionStorage.getItem("uid");
      if (uid != undefined) {
        var list = this.list[index];
        this.axios
          .post(
            "/cart/set_cart",
            `user_id=${uid}&product_id=${list.pid}&sid=${list.sid}&count=${list.count}`
          )
          .then(result => {
            // console.log(result);
          });
      }
    },
    // 删除购物车列表的商品信息
    delCart() {
      // 删除多个商品
      // 创建变量保存空字符串
      var str = "";
      // 创建循环拼接字符串内容
      for (var item of this.list) {
        // 选中状态
        if (item.selected) {
          str += item.cid + ",";
        }
      }
      str = str.substring(0, str.length - 1);
      // 判断如果用户没选商品提示
      if (str.length == 0) {
        this.$toast("请选中商品");
        return;
      }
      this.$messagebox
        .confirm("是否确认删除选中的商品")
        .then(action => {
          // 发送ajax请求
          this.axios.post("/cart/del_cart", `cids=${str}`).then(result => {
            // console.log(result);
            // 重新加载数据
            this.load();
          });
        })
        .catch(err => {
          return;
        });
    }
  },
  watch: {
    uid() {
      this.uid = "";
      this.load();
    }
  }
};
</script>
<style>
.none {
  display: none;
}
.cart .title {
  position: relative;
  width: 100%;
  top: 0;
  text-align: center;
  /* display: block; */
  color: #303030;
  height: 30px;
  background: #ffffff;
  line-height: 30px;
  padding: 3px 0 3px 0;
  font-size: 22px;
  z-index: 9;
  font-family: "苹方黑体";
}
.cart .cart_box {
  display: flex;
  /* margin-top:20px; */
  width: 100%;
  background: #fff;
  border-bottom: 0.3px solid #5555;
  padding-bottom: 2.5%;
}
.input,
#bottom_input {
  display: none;
}
.cart .input_sp {
  display: block;
  width: 20px;
  height: 20px;
  border: 1px solid #7b7b7b;
  border-radius: 50%;
  margin: 45px 8px 0 8px;
}
.cart .input_red {
  background: #f00;
  color: white;
  font-size: 10px;
}
.cart .img {
  width: 100px;
  margin-top: 10px;
  margin-right: 10px;
  height: 90px;
}
.cart .title_sp {
  display: block;
  font-size: 16px;
  color: #7b7b7b;
  margin-top: 14px;
  width: 200px;
}
.cart .state {
  display: block;
  font-size: 14px;
  color: #adadad;
  margin-top: 10px;
}
.cart .state span {
  margin-right: 5px;
}
.cart .sprice {
  display: block;
  font-size: 16px;
  color: #ff6464;
  margin-top: 10px;
}
.cart .btn {
  display: block;
  width: 130px;
  position: relative;
  right: 71%;
  top: 68%;
}
.cart .sbtn {
  display: inline-block;
  text-align: center;
  line-height: 30px;
  width: 30px;
  height: 30px;
  background: #f7f7f7;
  color: #a3a3a3;
  font-size: 18px;
}
.cart .btn_value {
  display: inline-block;
  text-align: center;
  line-height: 30px;
  width: 50px;
  height: 30px;
  background: #f7f7f7;
  font-size: 18px;
  color: #868686;
  margin: 0 2px 0 2px;
}
/* 底部样式 */
.cart .bottom {
  position: fixed;
  bottom: 8%;
  width: 100%;
  background: #fff;
  height: 50px;
}
.cart .bottom_input {
  /* display: none; */
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #7b7b7b;
  border-radius: 50%;
  margin: 0px 5px 0px 8px;
}
#bottom_input:checked + .bottom_input {
  background: #f00;
}
.cart .all {
  display: inline-block;
  position: relative;
  bottom: 5px;
  font-size: 13px;
  color: #6c6c6c;
}
.cart .money {
  display: block;
  font-size: 13px;
  margin-bottom: 10px;
  line-height: 10px;
  color: #ff5150;
}
.cart .sum {
  display: block;
  font-size: 13px;
  color: #ff5150;
  line-height: 10px;
}
.cart .count {
  display: inline-block;
  position: relative;
  top: 5px;
  margin-left: 10px;
  width: 100px;
  height: 40px;
}
.cart .bottom_right {
  float: right;
}
.cart .delete {
  display: inline-block;
  text-align: center;
  width: 80px;
  line-height: 50px;
  background: #ff9a7c !important;
  color: #fff;
  font-size: 13px;
}
.cart .close {
  display: inline-block;
  text-align: center;
  width: 80px;
  line-height: 50px;
  background: #fe7951 !important;
  color: #fff;
  font-size: 13px;
}
</style>