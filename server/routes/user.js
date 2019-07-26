// 引入express
const express = require("express");
// 引入连接池
const pool = require("../pool");
// 创建路由器
var router = express.Router();

const fs = require("fs");

const jwt = require("../jwt.js");

// 用户注册 有正则验证
router.post("/reg", (req, res) => {
  var phone = req.body.phone;
  var upwd = req.body.upwd;

  var reg1 = /^1[3-9]\d{9}$/; // 手机号码的正则表达式
  if (!reg1.test(phone)) {
    res.send({ code: 400, msg: "手机号格式不正确" });
    return;
  }
  // 不能纯英文字母,不能纯数字,不能有空格的8到16位密码
  var reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![\W_]+$)[0-9A-Za-z\W_]{8,16}$/;
  // true 密码格式不正确, false 密码格式正确
  if (!upwd || reg2.test(upwd) == false) {
    res.send({ code: 400, msg: "密码格式不正确" });
    return;
  }

  var sql = "SELECT phone FROM cake_user WHERE phone=?";
  pool.query(sql, [phone], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send({ code: 400, msg: "该手机号已经注册" });
    } else {
      var sql2 = `INSERT INTO cake_user VALUE
                  (NULL,NULL,?,md5(?),DEFAULT,NULL,NULL,DEFAULT,NULL)`;
      pool.query(sql2, [phone, upwd], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          var sql = "SELECT uid FROM cake_user WHERE phone=? AND upwd=md5(?)";
          pool.query(sql, [phone, upwd], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              // session 的登陆id
              req.session.uid = result[0].uid;
              // console.log(req.session.uid)
              let token = jwt.generateToken(result[0].uid);
              res.send({ code: 200, data: result, token: token });
            }
          })
        } else {
          res.send({ code: 400, msg: "注册失败" });
        }
      })
    }
  })

});


// 用户登录 要传入 手机号和密码
router.post("/login", (req, res) => {
  var phone = req.body.phone;
  var upwd = req.body.upwd;

  if (!phone) {
    res.send({ code: 400, msg: "手机号不能为空" });
    return;
  }
  if (!upwd) {
    res.send({ code: 400, msg: "密码不能为空" });
    return;
  }

  var sql = "SELECT uid FROM cake_user WHERE phone=? AND upwd=md5(?)";
  pool.query(sql, [phone, upwd], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // session 的登陆id
      req.session.uid = result[0].uid;
      // console.log(req.session.uid)
      let token = jwt.generateToken(result[0].uid);
      res.send({ code: 200, data: result, token: token });
    } else {
      res.send({ code: 400, msg: "用户名或密码错误" });
    }
  })
});

//忘记密码-修改密码
router.post("/loseP", (req, res) => {
  var phone = req.body.phone;
  var upwd = req.body.upwd;
  var sql1 = `SELECT * FROM cake_user WHERE phone=?`;
  pool.query(sql1, [phone], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      var sql2 = `UPDATE cake_user SET upwd=md5(?) WHERE phone=?`
      // console.log(456)
      pool.query(sql2, [upwd, phone], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 200, msg: "修改密码成功" })
        } else {
          res.send({ code: 400, msg: "修改密码失败" })
        }
      })
    }
  })
})


// 个人中心 /own
router.post("/own", (req, res) => {
  var uid = req.user;
  // console.log(req.user);
  if (!uid) {
    res.send({ code: 400, msg: "没有登录,请先登录" });
    return;
  }

  var sql = `SELECT uname,phone,avatar,real_name,birthday,gender FROM cake_user 
  WHERE uid=?`;
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // session 的登陆id
      req.session.uid = result.uid;
      res.send({ code: 200, data: result });
    } else {
      res.send({ code: 400, msg: "没有该用户存在,请先注册" });
    }
  })
});

// 个人信息 /set
router.post("/set", (req, res) => {
  var uid = req.user;
  var real_name = req.body.real_name;
  var gender = req.body.gender;
  var birthday = req.body.birthday;
  var imgData = decodeURIComponent(req.body.imgData);
  var phone = req.body.phone;

  var sql = "SELECT avatar FROM cake_user WHERE uid=?"
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      var url = imgData == "null" ? result[0].avatar : `images/avatar/${phone}.png`;

      var sql = `UPDATE cake_user SET real_name=?,gender=?,birthday=?,avatar=? 
  WHERE uid=?`;
      pool.query(sql, [real_name, gender, birthday, url, uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          if (imgData == "null") {
            res.send({ code: 200, data: result });
          } else {
            // 保存图片
            var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
            // console.log(base64Data)
            var dataBuffer = new Buffer(base64Data, 'base64');
            fs.writeFile(`public/images/avatar/${phone}.png`, dataBuffer, function (err) {
              if (err) {
                res.send(err);
              } else {
                res.send({ code: 200, data: result });
              }
            });
          }
        } else {
          res.send({ code: 400, msg: "保存失败" })
        }
      })
    }
  })
})


// 收藏
router.post("/save", (req, res) => {
  var uid = req.user;
  var pid = req.body.pid;
  // console.log(uid);

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
  var uid = req.user;
  var sql = `select p.pname, p.price, p.pic from cake_product p left join user_save s on p.pid = s.pid WHERE uid=? ORDER BY s.sid DESC`;
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    res.send(result)
  })
});


// 搜索登录的用户的历史记录
router.get("/history", (req, res) => {
  var uid = req.user;
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
  var uid = req.user;
  var sql = `DELETE FROM user_search WHERE uid=?`;
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    res.send(result)
  })
})



module.exports = router;