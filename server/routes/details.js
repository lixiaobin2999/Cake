// 引入express
const express = require("express");
// 引入连接池
const pool = require("../pool");
// 创建路由器
var router = express.Router();

const jwt = require("../jwt.js");

// 商品分类的路由
router.get("/classify", (req, res) => {
  var sql = "SELECT cid,cname,series,pic FROM cake_catalogue";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ code: 200, data: result });
    } else {
      res.send({ code: 400, msg: "获取失败" });
    }
  })
});

// 获取某系列的下的所有商品
router.get("/series", (req, res) => {
  var cid = req.query.cid;
  if (!cid) {
    res.send({ code: 400, msg: "没有该系列的商品" });
    return;
  }
  // 获取某系列商品信息
  var sql = `SELECT cname,series,pid,pname,price,cake_product.pic,read_num,
              sales_volume,shelf_time FROM cake_catalogue INNER JOIN 
              cake_product ON cake_catalogue.cid=? AND cake_product.cid=?`;
  pool.query(sql, [cid, cid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ code: 200, data: result });
    } else {
      res.send({ code: 400, msg: "没有该系列的商品" });
    }
  })
})

// 商品详情的路由
router.get("/details", (req, res) => {
  let token = req.headers.token;
  var uid = jwt.verifyToken(token);
  // 商品的id
  var pid = req.query.pid;
  var output = {
    product: [],
    spec: [],
    save: 0
  };

  if (!pid) {
    res.send({ code: 400, msg: "没有该商品" });
    return;
  }

  // 进入了这个商品的详情 浏览量加1
  var sql = "SELECT read_num FROM cake_product WHERE pid=?";
  pool.query(sql, [pid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // 先查询出原先的浏览量
      var read_num = parseInt(result[0].read_num);
      // 修改浏览量加1
      var sql2 = "UPDATE cake_product SET read_num=? WHERE pid=?";
      pool.query(sql2, [read_num + 1, pid], (err, result) => {
        if (err) throw err;
        // 修改成功后返回商品信息
        if (result.affectedRows > 0) {
          // 获取商品详情的信息
          var sql = `SELECT cake_product.pid,pname,price,pic,sales_volume,
                    read_num,details_pic FROM cake_product INNER JOIN 
                    cake_pic ON cake_product.pid=? AND cake_product.seq_state=1 
                    AND cake_pic.pid=?`;
          pool.query(sql, [pid, pid], (err, result) => {
            if (err) throw err;
            output.product = result;

            // 获取商品规格的信息
            var sql = `SELECT sid,size,cake_spec.price,is_state,style,fruit,
                      else_message,repertory FROM cake_product INNER JOIN 
                      cake_spec ON cake_product.pid=? AND cake_spec.pid=?`;
            pool.query(sql, [pid, pid], (err, result) => {
              if (err) throw err;
              output.spec = result;
              // 获取收藏
              if (!uid) {
                res.send({ code: 200, data: output });
              } else {
                var sql = "SELECT status FROM user_save WHERE uid=? AND pid=?";
                pool.query(sql, [uid, pid], (err, result) => {
                  if (err) throw err;
                  if (result.length > 0) {
                    // console.log(result[0].status)
                    output.save = result[0].status;
                    res.send({ code: 200, data: output });
                  } else {
                    res.send({ code: 200, data: output });
                  }
                })
              }
            })
          });
        }
      })
    } else {
      res.send({ code: 400, msg: "没有该商品" });
    }
  });
});


// 热门搜索的数据展示为浏览量高的商品
// 预览量大于100的取前十条数据到热门搜索进行展示
router.get("/search", (req, res) => {
  var sql = `SELECT * FROM cake_product WHERE read_num>100 order by read_num desc limit 0,10`;
  pool.query(sql, [], (err, result) => {
    if (err) throw err;
    res.send(result)
  })
})

// 搜索关键词
router.get("/keyword", (req, res) => {
  var pname = req.query.pname;
  // %% 模糊检索
  var p = `%${pname}%`
  var sql = `SELECT * FROM cake_product where pname like ?`;
  pool.query(sql, [p], (err, result) => {
    if (err) throw err;
    res.send(result)
  })
  // 搜索栏输入不为空的数值,存到后台搜索历史表中
  if (pname) {
    let token = req.headers.token;
    var uid = jwt.verifyToken(token);
    var sql2 = `INSERT INTO user_search VALUES(NULL,?,?)`;
    pool.query(sql2, [uid, pname], (err, result) => {
      if (err) throw err;
      // console.log(result)
      return;
    })
  }
})


module.exports = router;