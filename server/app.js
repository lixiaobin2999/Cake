// 引入express
const express=require("express");
// 引入body-parser 中间件
const bodyParser=require("body-parser");
// 引入cors中间件 跨域
const cors=require("cors");
// 引入session 模块
const session=require("express-session");
// 导入index路由器  主页
const indexRouter=require("./routes/index");
// 导入login路由器   登陆 注册
const loginRouter=require("./routes/user");
// 导入details路由器  商品
const detailsRouter=require("./routes/details");
// 导入cart路由器  购物车
const cartRouter=require("./routes/cart");
// 创建服务器
var server=express();
// 端口
server.listen (7700);
// 使用cors中间件 跨域
server.use (cors({
  origin: ["http://localhost:7000", "http://127.0.0.1:5500", "http://127.0.0.1:7000"],
  credentials :true
})
);
// 挂载session
server.use (session( {
  secret:"128位字符串",     // 自定义字符串
  resave:true,             // 每次请求更新数据
  saveUninitialized:true   // 保存初始化数据
})
);
// 使用路由的前面使用中间件
// 使用body - parser中间件将post请求的数据格式化为对象
server.use (bodyParser.urlencoded({
  // 不使用扩展的qs模块.而是使用querystring模块  格式为对象
  extended:false
})
);
// 托管静态资源到public
server.use (express.static('public'));
// 挂载路由器
server.use ("/index", indexRouter);
server.use ("/user", loginRouter);
server.use ("/product", detailsRouter);
server.use ("/cart", cartRouter);