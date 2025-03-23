const express = require("express");
const router = express.Router();
const db = require('../config/database');
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
    const { name, id, password, nickname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO user_info (user_name, user_id, password, nickname,created_at) VALUES (?, ?, ?, ?, current_timestamp)";
    
    db.query(sql, [name, id, hashedPassword, nickname], (err, result) => {
      if (err) return res.status(500).json({ error: "회원가입 실패" });
      res.status(200).json({ message: "회원가입 성공" });
    });
  });

  router.post("/login", (req, res) => {
    const { id, password } = req.body;
    const sql = "SELECT * FROM user_info WHERE user_id = ?";
    
    db.query(sql, [id], async (err, results) => {
      if (err || results.length === 0) return res.status(401).json({ error: "ID 또는 비밀번호가 올바르지 않습니다." });
  
      const user = results[0];
      console.log(user);
      
      const match = await bcrypt.compare(password, user.password);
  
      if (match) {
        req.session.user = user.nickname;
        res.json({ user_id : user.user_id,nickname: user.nickname });
      } else {
        res.status(401).json({ error: "ID 또는 비밀번호가 올바르지 않습니다." });
      }
    });
  });

  module.exports = router;