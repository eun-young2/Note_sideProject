require('dotenv').config();
const mysql = require('mysql2');

// 5-2. DB정보 저장
const conn = mysql.createConnection({
    'host': process.env.DB_HOST,
    'user' : process.env.DB_USER,
    'password' : process.env.DB_PASSWORD,
    'port' : process.env.DB_PORT,
    'database' : process.env.DB_NAME
})
//
// 5-3. DB 정보 연결 및 모듈 내보내기
conn.connect(err => {
    if (err) {
      console.error('❌ MySQL 연결 실패:', err);
    } else {
      console.log('✅ MySQL 연결 성공!');
    }
  });
module.exports = conn