<template>
  <div class="all_font">
    <div class="header">
      <i class="iconfont" @click="jump">&#xe732;</i>
      <h1 class="no_wrap">个人信息</h1>
    </div>
    <div class="content">
      <div class="logo">
        <img src="../../public/images/avatar.png" alt />
      </div>
      <div class="same_style">
        <span class="item_info" v-text="`手机号:${phone}`"></span>
      </div>
      <div class="same_style">
        <span class="item_info" v-text="`真实姓名:${real_name}`"></span>
      </div>
      <div class="sex_info">
        性别:
        <label for="male">男<input type="radio" name="sex" id="male" /></label>
        <label for="female">女<input type="radio" name="sex" id="female" /></label>
      </div>
      <div class="selectBirth sex_info" @click="showFormatPicker">
        <span>生日:&nbsp;&nbsp;</span>
        <span class="gray pl" v-text="birth"></span>
        <span class="gray">该信息我们将为你保密</span>
        <i class="iconfont gray">&#xe731;</i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // 返回上一级 是回到个人中心页
  data() {
    return {
      birth: "请选择生日", //页面显示的日期
      phone: "",
      real_name: "",
      gender: "",
      birthday: "" //日期组件选中的值
    };
  },
  created() {
    var uid = sessionStorage.getItem("uid");
    if (uid) {
      this.axios.post("/user/own", `uid=${uid}`).then(result => {
        // console.log(result);
        this.phone = result.data.data[0].phone;
        this.real_name = result.data.data[0].real_name;
        this.real_name = this.real_name == null ? "" : this.real_name;
        this.gender = result.data.data[0].gender;
        if (this.gender == 1) {
          female.checked = true;
        } else if (this.gender == 0) {
          male.checked = true;
        }
        this.birth = result.data.data[0].birthday;
        if (this.birth) {
          this.birth = this.birth.split("T")[0];
          this.birthday = this.birth;
          var year = this.birth.split("-")[0];
          var month = this.birth.split("-")[1];
          var day = this.birth.split("-")[2];
          this.birth = `${year}年${month}月${day}日`;
        }else{
          this.birth="请选择生日"
        }
      });
    }
  },
  methods: {
    jump() {
      this.$router.go(-1);
    },
    showFormatPicker() {
      if (!this.formatPicker) {
        this.formatPicker = this.$createDatePicker({
          title: "生日",
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(this.birthday),
          format: {
            year: "YY年",
            month: "MM月",
            date: "D 日"
          },
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      }
      this.formatPicker.show();
    },
    selectHandle(date, selectedVal, selectedText) {
      this.birth = `${selectedVal[0]}年${selectedVal[1]}月${selectedVal[2]}日`;
    }
  }
};
</script>
<style>
.all_font {
  font: 0.12rem/1.5 "Hiragino Sans GB", STFangsong, "Microsoft YaHei", Helvetica,
    STXihei, Arial, serif;
  color: #3e3e3e;
}
.header {
  margin-top: 20px;
  line-height: 0.44rem;
  position: relative;
}
.no_wrap {
  color: #a38d6b;
  font-size: 14px;
  height: 0.44rem;
  text-align: center;
}
.header i {
  float: left;
  color: #a38d6b;
  width: 0.44rem;
  height: 0.44rem;
  position: absolute;
  top: 0;
  left: 12px;
}
.logo {
  position: relative;
  width: 65px;
  height: 65px;
  margin: 50px auto 30px;
}
.content .mint-cell-wrapper {
  padding: 0.12rem 0.1rem 0.12rem 0;
  border-bottom: 1px solid #e0dcd1;
  margin-left: 20px;
}
.same_style {
  overflow: hidden;
  border-bottom: 1px solid #e0dcd1;
  padding: 0.12rem 0.1rem 0.12rem 0;
}
.same_style span {
  font-size: 18px;
  float: left;
}
.same_style .item_info {
  margin-left: 20px;
}
.sex_info {
  padding: 0.12rem 0.1rem 0.12rem 0;
  margin-left: 20px;
  font-size: 18px;
  border-bottom: 1px solid #e0dcd1;
}
.gray {
  font-size: 14px;
  color: #9c9c9c;
}
.selectBirth {
  position: relative;
}
.selectBirth .pl {
  padding-right: 50px;
}
.selectBirth i {
  font-size: 23px;
  position: absolute;
  top: 2px;
}
.mint-field-core::input-placeholder {
  color: #9c9c9c;
}
</style>
