import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewNote.css';

function NewNote({ user, setUser }) {
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: '', content: '' });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";  // ✅ 다크모드 상태 유지
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode); // ✅ 다크모드 상태 저장
  }, [darkMode]);

  const handleSaveNote = () => {
    if (!note.title || !note.content) {
      alert('제목과 내용을 입력해주세요!');
      return;
    }
    if (!user || !user.id) {
      alert("로그인이 필요합니다!");
      navigate('/login');
      return;
    }

    const noteWithUser = {
      ...note,
      user_id: user.id, // ✅ user_id 추가
    };

    console.log("📥 노트 저장 요청:", noteWithUser);

    axios.post('http://localhost:8000/note/enter', noteWithUser)
      .then(() => {
        navigate('/'); // 저장 후 홈으로 이동
      })
      .catch(err => console.error("❌ 노트 저장 실패:", err));
  };

  // ✅ 다크모드 토글 함수
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);  // ✅ 다크모드 상태 저장
      return newMode;
    });
  };

  // ✅ 로그아웃 기능
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    alert("로그아웃 되었습니다.");
    navigate('/');
  };

  return (
    <div className={`background ${darkMode ? 'dark' : ''}`}> {/* ✅ 다크모드 적용 */}
      {/* ✅ 사용자 정보 영역 (화면 우측 상단) */}
      {user && (
        <div className="user-menu">
          <span>{user.nickname} 님 환영합니다!</span>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      )}
      <div className="card">
        <div className="header">
          <h2>새 노트 추가</h2>
          <button className="back-btn" onClick={() => navigate('/')}>뒤로가기</button>
        </div>

        {/* ✅ 다크모드 토글 버튼 추가 */}
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode}/>
          <span className="slider"></span>
        </label>

        <input
          className="input-box"
          placeholder="제목 입력"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />

        <textarea
          className="input-box"
          rows="7"
          placeholder="내용 입력"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />

        <button className="save-btn" onClick={handleSaveNote}>등록</button>
      </div>
    </div>
  );
}

export default NewNote;
