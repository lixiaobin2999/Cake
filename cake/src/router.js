import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Details from './views/Details'
import Classify from './views/Classify'
import Cart from './views/Cart'
import Own from './views/Own'
import Login from './views/Login'
import Information from './views/Information'
import Close from './views/Close.vue'
import Search from './views/Search.vue'
import ProductList from './views/ProductList.vue'
import ResetPwd from './views/ResetPwd.vue'
import orderForm from './views/orderForm.vue'

Vue.use(Router)

export default new Router({
  routes: [
{
  path: '/',
  redirect: '/Index',
  meta: {
keepAlive: false, //此组件不需要被缓存
  }
},
{
  path: '/Index',
  component: Index,
  name: 'Index',
  meta: {
keepAlive: true, //此组件需要被缓存
isBack: false, //用于判断上一个页面是哪个
  }
},
{
  path: '/Details/:pid',
  component: Details,
  name: 'Details',
  props: true
},
{
  path: '/Classify',
  name: 'Classify',
  component: Classify,
},
{
  path: '/Cart',
  name: 'Cart',
  component: Cart
},
{
  path: '/Own',
  name: 'Own',
  component: Own
},
{
  path: '/Login',
  name: 'Login',
  component: Login
},
{
  path: '/Infornation',
  name: 'Infornation',
  component: Information,
  meta: {
keepAlive: false, //此组件需要被缓存
isBack: false, //用于判断上一个页面是哪个
  }
},
{
  path: '/Close',
  name: 'Close',
  component: Close
},
{
  path: '/Search',
  name: 'Search',
  component: Search
},
{
  path: '/ProductList/:cid',
  component: ProductList,
  name: 'ProductList',
  props: true,
  meta: {
keepAlive: false, //此组件需要被缓存
isBack: false, //用于判断上一个页面是哪个
  }
},
{
  path: '/ResetPwd',
  name: 'ResetPwd',
  component: ResetPwd
},
,
{
  path: '/orderForm',
  name: 'orderForm',
  component: orderForm
},
  ]
})
