// 引入mysql模块
const mysql = require('mysql');

// 创建连接池
var pool = mysql.createPool({
  host: 'w.rdc.sae.sina.com.cn',
  port: '3306',
  user: 'w20llx1o30',
  password: 'jzjxkh0yhiwimi311m5l4hy0l03xyyizwi3i3ymm',
  database: 'app_xiaoxuan',
  connectionLimit: 20
});

// 导出连接池
module.exports = pool;

