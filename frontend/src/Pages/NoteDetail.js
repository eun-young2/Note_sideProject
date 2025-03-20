import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import './NoteDetail.css';

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";  // ✅ 다크모드 상태 유지
  });

  useEffect(() => {
    axios.get(`/note/${id}`)
      .then(res => setNote(res.data))
      .catch(err => console.error("❌ 노트 불러오기 실패:", err));
  }, [id]);

  const deleteNote = () => {
    axios.delete(`/note/${id}`)
      .then(() => navigate('/'))
      .catch(err => console.error("❌ 노트 삭제 실패:", err));
  };

  const updateNote = () => {
    axios.put(`/note/${id}`, note)
      .then(() => {
        console.log("✅ 노트 수정 성공");
        navigate('/');  // ✅ 수정 후 홈으로 이동
      })
      .catch(err => console.error("❌ 노트 수정 실패:", err));
  };

  // ✅ 다크모드 토글 기능 추가
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);  // ✅ 다크모드 상태 저장
      return newMode;
    });
  };

  return (
    <div className={`background ${darkMode ? 'dark' : ''}`}> {/* ✅ 다크모드 적용 */}
      <div className="card">
        <div className="header">
          <h2>심플 노트</h2>
          <button className="back-btn" onClick={() => navigate('/')}>뒤로가기</button>
        </div>

        {/* ✅ 다크모드 토글 스위치 추가 */}
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode}/>
          <span className="slider"></span>
        </label>

        <input
          className="input-box"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          placeholder="노트 제목"
          autoFocus={isEditing}
        />

        <textarea
          className="input-box"
          rows="7"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          placeholder="노트 내용을 입력하세요."
          
        />

        <div className="note-actions">
          <button className="delete-btn" onClick={deleteNote}>노트 제거</button>

          <div className="button-group">
          <button className="edit-btn" onClick={updateNote}>수정</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetail;
