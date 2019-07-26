// 引入express
const express = require("express");
// 引入连接池
const pool = require("../pool");
// 创建路由器
var router = express.Router();

router.get("/carousel", (req, res) => {
  var sql = "SELECT img,title,pid FROM cake_index_carousel";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    res.send({ code: 200, data: result });
  })
})

// 需要一个参数,某个系列的id
router.get("/index", (req, res) => {
  // 哪个系列下的所有商品
  var cid = req.query.cid;
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;

  if (!cid) {
    res.send({ code: 400, msg: "没有该系列的商品" });
    return;
  }

  // 设置默认值
  if (!pno || pno == 0) pno = 1;
  if (!pageSize) pageSize = 9;

  // 获取首页商品信息
  var sql2 = `SELECT cname,series,pid,pname,price,cake_product.pic,read_num
                sales_volume FROM cake_catalogue INNER JOIN cake_product ON 
                cake_catalogue.cid=? AND cake_product.cid=? AND
                cake_product.seq_state=1 LIMIT ?,?`;
  var offset = (pno - 1) * pageSize;
  pno = parseInt(pno);
  pageSize = parseInt(pageSize);
  pool.query(sql2, [cid, cid, offset, pageSize], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ code: 200, data: result });
    } else {
      res.send({ code: 400, msg: "没有该系列的商品" })
    }
  })
});

// // 首页分类商品
// router.get("/indexClassify",(req,res)=>{
//   // var 
// });



module.exports = router;