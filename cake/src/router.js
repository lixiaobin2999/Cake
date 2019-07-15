import Vue from "vue"
import Router from "vue-router"
import Index from "./views/Index"
import Details from "./views/Details"
import Classify from "./views/Classify"
import Cart from "./views/Cart"
import Own from "./views/Own"
import Login from "./views/Login"
import Information from "./views/Information"
import Close from "./views/Close.vue"
import productList from "./views/product_list.vue"
Vue.use(Router)
export default new Router({
  routes: [
    {path: "/", redirect: "/Index"},
    {path: "/Index",  component: Index},
    {path: "/Details/:pid",  component: Details,props: true},
    {path: "/Classify",  component: Classify},
    {path: "/Cart",  component: Cart},
    {path: "/Own",  component: Own},
    {path: "/Login",  component: Login},
    {path: "/Infornation",  component: Information},
    {path: "/Close",  component: Close},
    {path: "/List",  component: productList},
  ]
})
