// 引入express
const express = require("express");
// 引入连接池
const pool = require("../pool");
// 创建路由器
var router = express.Router();

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
  var uid = req.query.uid;
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
    // console.log(result)
    res.send(result)
  })
})


// 预览量大于100的取前十条数据到热门搜索进行展示
router.get("/search", (req, res) => {
  var sql = `SELECT * FROM cake_product WHERE read_num>100 order by read_num desc limit 0,10`;
  pool.query(sql, [], (err, result) => {
    if (err) throw err;
    // console.log(result)
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
    return;
    console.log(result)
  })
  // 搜索栏输入不为空的数值,存到后台搜索历史表中
  if (pname) {
    var uid = req.query.uid;
    var sql2 = `INSERT INTO user_search VALUES(NULL,?,?)`;
    pool.query(sql2, [uid, pname], (err, result) => {
      if (err) throw err;
      // console.log(result)
      return;
      res.send(result)
    })
  }
})

// 搜索登录的用户的历史记录
router.get("/history", (req, res) => {
  var uid = req.query.uid;
  // console.log(uid)
  var sql = `SELECT * FROM user_search WHERE uid=?`;
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    // console.log(result)
    res.send(result)
  })
})

//清空搜索历史记录
router.get("/clearhis", (req, res) => {
  var uid = req.query.uid;
  var sql = `DELETE FROM user_search WHERE uid=?`;
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    res.send(result)
  })
})

// 收藏
router.post("/save", (req, res) => {
  var uid = req.body.uid;
  var pid = req.body.pid;

  if (!uid) {
    res.send({ code: 400, msg: "没有登录" })
    return;
  }

  var sql1 = "SELECT status FROM user_save WHERE uid=? AND pid=?";
  pool.query(sql1, [uid, pid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      var status = result[0].status == 0 ? 1 : 0;
      var sql2 = `UPDATE user_save SET status=? WHERE uid=? AND pid=?`
      pool.query(sql2, [status, uid, pid], (err, result) => {
        if (err) throw err;
        res.send({ code: 200, msg: "修改收藏状态成功" });
      })
    } else {
      var sql3 = `INSERT INTO user_save VALUES(NULL,?,?,1)`;
      pool.query(sql3, [uid, pid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 200, msg: "创建收藏状态为1成功" });
        } else {
          res.send({ code: 400, msg: "创建收藏失败" });
        }
      })
    }
  })

})

//收藏页
router.get("/save_list", (req, res) => {
  var uid = req.query.uid;
  var sql = `select p.pname, p.price, p.pic from cake_product p left join user_save s on p.pid = s.pid WHERE uid=? ORDER BY s.sid`;
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    res.send(result)
  })
})


//提交订单
router.get("/order", (req, res) => {
  var order_id = req.query.order_id;
  var product_id = req.query.product_id;
  var count = req.query.count;
  var difference = req.query.difference;
  var sql = `INSERT INTO cake_order_detail VALUES(NULL,?,?,?,?)`;
  pool.query(sql, [order_id, product_id, count, difference], (err, result) => {
    if (err) throw err;
    res.send(result)
  })
})
router.get("/user_order", (req, res) => {
  var user_id = req.query.user_id;
  var order_id = req.query.order_id;
  var status = req.query.status;
  var order_time = req.query.order_time;
  var sql = `INSERT INTO cake_order VALUES(NULL,?,?,NULL,?,?,NULL,NULL,NULL)`;
  pool.query(sql, [user_id, order_id, status, order_time], (err, result) => {
    if (err) throw err;
    res.send(result)
  })
})



//订单页
// 订单页面获取订单信息
router.get("/order_list", (req, res) => {
  var uid = req.query.uid;

  if (!uid) {
    res.send({ code: 400, msg: "还没有登录" });
    return;
  }
  var sql = `SELECT user_id,cake_order.order_id,status,order_time,count,product_id,difference,pic,
cake_spec.price,size,is_state,style,pname,fruit,else_message FROM ((cake_order INNER JOIN
cake_order_detail ON cake_order.user_id=? AND cake_order.order_id=
cake_order_detail.order_id) INNER JOIN cake_product ON
cake_order_detail.product_id=cake_product.pid) INNER JOIN 
cake_spec ON cake_spec.sid=cake_product.cid ORDER BY 
cake_order.oid  DESC`;
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ code: 200, data: result });
    } else {
      res.send({ code: 400, msg: "没有订单生成" });
    }
  })

})



module.exports = router;