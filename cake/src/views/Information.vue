<template>
  <div class="all_font">
    <div class="header">
      <i class="iconfont" @click="jump">&#xe732;</i>
      <h1 class="no_wrap">个人信息</h1>
    </div>
    <div class="content">
      <div class="logo" @click.stop="uploadHeadImg">
        <img :src="pic" alt />
      </div>
      <input type="file" @change="handleFile" class="hiddenInput" />
      <div class="same_style">
        <span class="item_info" v-text="`手机号:${phone}`"></span>
      </div>
      <mt-field label="真实姓名:" v-model="real_name"></mt-field>
      <div class="sex_info">
        性别:
        <label for="male">
          男
          <input type="radio" name="sex" id="male" />
        </label>
        <label for="female">
          女
          <input type="radio" name="sex" id="female" />
        </label>
      </div>
      <div class="selectBirth sex_info" @click="showFormatPicker">
        <span>生日:&nbsp;&nbsp;</span>
        <span class="gray pl" v-text="birth"></span>
        <span class="gray">该信息我们将为你保密</span>
        <i class="iconfont gray">&#xe731;</i>
      </div>
    </div>
    <mt-button class="save" @click="save">保存</mt-button>
  </div>
</template>
<script>
// 导入eventBus 兄弟之间通信
// import eventBus from "../eventBus.js";
export default {
  data() {
    return {
      birth: "请选择生日", //页面显示的日期
      phone: "",
      real_name: "",
      gender: "",
      birthday: "", //日期组件选中的值
      isFirstEnter: false, // 是否第一次进入，默认false
      pic: "images/avatar.png"
    };
  },
  created() {
    this.isFirstEnter = true;
    // 获取该用户的个人信息
    var uid = this.$store.getters.getUserId;
    if (uid) {
      this.axios.post("/user/own", `uid=${uid}`).then(result => {
        // console.log(result);
        this.phone = result.data.data[0].phone;
        this.real_name = result.data.data[0].real_name;
        this.real_name = this.real_name == null ? "" : this.real_name;
        this.gender = result.data.data[0].gender;
        if (this.gender == 1) {
          male.checked = true;
        } else if (this.gender == 0) {
          female.checked = true;
        }
        this.birth = result.data.data[0].birthday;
        if (this.birth) {
          this.birthday = this.birth;
        } else {
          this.birth = "请选择生日";
        }
      });
    }
  },
  methods: {
    // 打开图片上传
    uploadHeadImg: function() {
      this.$el.querySelector(".hiddenInput").click();
    },
    // 将头像显示
    handleFile: function(e) {
      let $target = e.target || e.srcElement;
      let file = $target.files[0];
      var reader = new FileReader();
      reader.onload = data => {
        let res = data.target || data.srcElement;
        this.pic = res.result;
      };
      reader.readAsDataURL(file);
    },
    jump() {
      this.$router.push("/Index");
      // eventBus.$emit("activeState", "me");
    },
    showFormatPicker() {
      var time = new Date();
      var year = time.getFullYear();
      var month = time.getMonth();
      var date = time.getDate();
      if (!this.formatPicker) {
        this.formatPicker = this.$createDatePicker({
          title: "生日",
          min: new Date(1920, 0, 1),
          max: new Date(year, month, date),
          value: new Date(this.birthday),
          format: {
            year: "YYYY年",
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
    },
    //存入用户修改的个人信息
    save() {
      var uid = this.$store.getters.getUserId;
      if (female.checked == true) {
        this.gender = 0;
      } else if (male.checked == true) {
        this.gender = 1;
      }
      this.birth2 = this.birth.replace(/[\u4e00-\u9fa5]/g, "-");
      this.birth2 = this.birth.split("T")[0];
      this.axios
        .post(
          "/user/set",
          `uid=${uid}&real_name=${this.real_name}&gender=${this.gender}&birthday=${this.birth2}`
        )
        .then(result => {
          // console.log(result);
          if (result.data.code == 200) {
            this.$toast("保存成功");
          } else {
            this.$messagebox("保存失败");
          }
        });
    }
  }
};
</script>
<style>
.hiddenInput {
  display: none;
}
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

.all_font .save {
  background: #ff4001;
  width: 60%;
  height: 40px;
  line-height: 40px;
  position: absolute;
  left: 50%;
  margin-left: -2.6rem;
  margin-top: 30px;
  color: #fff;
  font-size: 12px;
}
.mint-field .mint-cell-title {
  width: 1.8rem !important;
}
</style>
