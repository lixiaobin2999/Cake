<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 page3 -->
    </router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      footer_show: true,
    };
  },
  created() {
    // 设置保存登录状态的uid
    this.$store.commit("setUserId");
  },
  methods: {
  }
};
</script>
<style >
@import "./assets/iconfont/iconfont.css";
@import "./assets/iconfont/iconfont2.css";
@import "./assets/iconfont/iconfont3.css";
</style>
<style>
</style>
