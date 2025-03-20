const express = require("express");
const router = express.Router();
const db = require('../config/database');

// 전체 노트 가져오기
// ✅ 전체 노트 가져오기 API
router.get("/", (req, res) => {
    const sql = "SELECT * FROM notes ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ DB 조회 실패:", err);
            return res.status(500).json({ error: "서버 오류" });
        }
        console.log("✅ 데이터 조회 성공:", results);
        res.status(200).json(results);  // ✅ JSON 형식으로 반환
    });
});
  
// 특정 노트 가져오기 (이 API가 반드시 필요!)
  router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM notes WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) return res.status(404).json({ error: "노트를 찾을 수 없습니다." });
      res.json(results[0]);
    });
  });

  router.post('/enter',(req,res)=>{
    const {title, content} = req.body;

    if(!title||!content){
        return res.status(400).json({ error:"제목과 내용을 입력해주세요!"});
    }
    const sql = "INSERT INTO notes (title,content,created_at,updated_at) VALUES (?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";
    db.query(sql,[title,content],(err,results)=>{
        if(err){
            console.error("데이터 삽입 실패", err);
            return res.status(500).json({ error: "서버 오류" });
        }
        console.log("데이터 삽입 성공",results);
        res.status(201).json({ message: "노트 추가 완료", insertId: results.insertId });
    })
  })

  router.delete('/:id', (req,res)=>{
    const {id} = req.params;

    if (!id) {
        return res.status(400).json({ error: "삭제할 노트의 ID가 필요합니다!" });
    }

    const sql = "DELETE FROM notes WHERE id = ?"
    db.query(sql,[id],(err,results)=>{
         if (err) {
            console.error("❌ 노트 삭제 실패:", err);
            return res.status(500).json({ error: "서버 오류" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "삭제할 노트를 찾을 수 없습니다!" });
        }

        console.log("✅ 노트 삭제 성공:", results);
        res.status(200).json({ message: "노트 삭제 완료", deletedId: id });
    })
  })

  router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {title,content} = req.body;

    if(!id){
        return res.status(400).json({error:"수정할 노트의 ID가 필요합니다."});
    }

    const sql = "UPDATE notes SET title =?,content = ? WHERE ID = ?"
    db.query(sql,[title,content,id],(err,results)=>{
        if(err){
            console.error("❌ 노트 수정 실패:", err);
            return res.status(500).json({ error: "서버 오류" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "수정할 노트를 찾을 수 없습니다!" });
        }
        console.log("✅ 노트 수정 성공:", results);
        res.status(200).json({ message: "노트 수정 완료", updatedId: id });
    })
  })
module.exports = router;
