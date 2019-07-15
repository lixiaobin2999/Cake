<template>
  <div>
    <div class="caption">
      <i class="iconfont">&#xe732;</i>
      <h1 class="caption-info">商品列表</h1>
    </div>
    <div class="mysearch">
      <input type="text" class="search" />
      <span class="search-btn">搜索</span>
    </div>
    <ul class="order">
      <li>
        <span class="active">综合</span>
      </li>
      <li>
        <span>最新</span>
      </li>
      <li>
        <span>价格</span>
        <i class="add"></i>
        <i class="cut"></i>
      </li>
      <li>
        <span>销量</span>
      </li>
      <li>
        <span>评分</span>
      </li>
    </ul>
    <div style="height:0.2rem;background:#bbb;opacity:0.3;"></div>
    <div class="proList">
      <div class="pro-item">
        <img src="images/product/64sd78f5465sda417.jpg" alt />
        <p class="repertory">
          <i class="iconfont">&#xe661;</i> 138
        </p>
        <h4 class="pName">曲奇(200g)</h4>
        <span class="price">￥48.00</span>
        <span class="volume">已售12件</span>
      </div>
      <div class="pro-item">
        <img src="images/product/64sd78f5465sda417.jpg" alt />
        <p class="repertory">
          <i class="iconfont">&#xe661;</i> 138
        </p>
        <h4 class="pName">曲奇(200g)</h4>
        <span class="price">￥48.00</span>
        <span class="volume">已售12件</span>
      </div>
      <div class="pro-item">
        <img src="images/product/64sd78f5465sda417.jpg" alt />
        <p class="repertory">
          <i class="iconfont">&#xe661;</i> 138
        </p>
        <h4 class="pName">曲奇(200g)</h4>
        <span class="price">￥48.00</span>
        <span class="volume">已售12件</span>
      </div>
      <div class="pro-item">
        <img src="images/product/64sd78f5465sda417.jpg" alt />
        <p class="repertory">
          <i class="iconfont">&#xe661;</i> 138
        </p>
        <h4 class="pName">曲奇(200g)</h4>
        <span class="price">￥48.00</span>
        <span class="volume">已售12件</span>
      </div>
      <div class="pro-item">
        <img src="images/product/64sd78f5465sda417.jpg" alt />
        <p class="repertory">
          <i class="iconfont">&#xe661;</i> 138
        </p>
        <h4 class="pName">曲奇(200g)</h4>
        <span class="price">￥48.00</span>
        <span class="volume">已售12件</span>
      </div>
      <div class="pro-item">
        <img src="images/product/64sd78f5465sda417.jpg" alt />
        <p class="repertory">
          <i class="iconfont">&#xe661;</i> 138
        </p>
        <h4 class="pName">曲奇(200g)</h4>
        <span class="price">￥48.00</span>
        <span class="volume">已售12件</span>
      </div>
      <div class="pro-item">
        <img src="images/product/64sd78f5465sda417.jpg" alt />
        <p class="repertory">
          <i class="iconfont">&#xe661;</i> 138
        </p>
        <h4 class="pName">曲奇(200g)</h4>
        <span class="price">￥48.00</span>
        <span class="volume">已售12件</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
/* 头部 */
.caption {
  width: 100%;
  padding: 0.35rem 0;
}
.caption i.iconfont {
  float: left;
  font-size: 0.65rem;
  text-indent: 0.26rem;
  font-weight: bolder;
}
.caption-info {
  font-size: 0.65rem;
  text-align: center;
  margin-right: 0.63rem;
}
.mysearch {
  background: #ccc;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
}
.search {
  height: 0.9rem;
  width: 80%;
  margin: 0.22rem 0 0 0.22rem;
  border-radius: 5px;
  outline: 0;
  text-align: center;
  font-size: 0.4rem;
}
.search-btn {
  font-size: 0.43rem;
  float: right;
  margin: 0.48rem 0.48rem 0 0;
}
.order {
  display: flex;
  justify-content: space-around;
  padding: 0.4rem 0;
}
.order li {
  float: left;
  font-size: 0.45rem;
  position: relative;
}
.order li span.active{
  color: #ed143d;
}
.order li .add {
  position: absolute;
  right: -15px;
  top: -6px;
  opacity: 0.5;
}
.order li .add:before {
  content: "\25B2";
  font-size: 12px;
}
.order li .cut {
  position: absolute;
  right: -15px;
  opacity: 0.5;
  top: 4px;
}
.order li .cut:before {
  content: "\25Bc";
  font-size: 12px;
}
.proList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.proList .pro-item {
  width: 49.5%;
  background: rgba(239, 239, 239, 0.9);
  margin-bottom: 0.12rem;
}
.proList .pro-item img {
  width: 100%;
}
.repertory {
  width: 100%;
  font-size: 0.43rem;
  padding: 0.1rem 0;
  background: #ccc;
  color: #fff;
  margin-top: -0.13rem;
  text-indent: 0.2rem;
}
.pro-item .pName {
  font-size: 0.43rem;
  text-indent: 0.3rem;
  line-height: 0.66rem;
}
.pro-item span.price {
  display: inline-block;
  font-size: 0.4rem;
  font-weight: 600;
  text-indent: 0.12rem;
  color: #ed143d;
}
.pro-item span.volume {
  float: right;
  margin-right: 0.2rem;
  font-size: 0.38rem;
  color: #000;
  opacity: 0.5;
}
</style>
