// 引入express
const express = require("express");
// 引入连接池
const pool = require("../pool");
// 创建路由器
var router = express.Router();

const fs = require("fs");


router.post('/', function (req, res) {
  //接收前台POST过来的base64
  var imgData = decodeURIComponent(req.body.imgData);
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  console.log(base64Data)
  var dataBuffer = new Buffer(base64Data,'base64');
  console.log(dataBuffer)
  var newFile = new Date().getTime() + Math.floor(Math.random() * 9999);
  fs.writeFile(`public/${newFile}.png`, dataBuffer, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("保存成功！");
    }
  });
});


module.exports = router;