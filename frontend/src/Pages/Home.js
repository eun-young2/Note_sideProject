import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

function Home({ user, setUser }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    console.log("📢 노트 데이터를 가져오는 중..."); // 로그 추가
  
    axios.get('http://localhost:8000/note')
      .then(res => {
        console.log("✅ 노트 데이터 수신:", res.data); // 받아온 데이터 확인
        setNotes(res.data);
      })
      .catch(err => {
        console.error("❌ 노트 가져오기 실패:", err);
      });
  };
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const next = () => {
    if (startIndex + 3 < notes.length) setStartIndex(prev => prev + 1);
  };

  const prev = () => {
    if (startIndex > 0) setStartIndex(prev => prev - 1);
  };

  const goToNoteDetail = (id) => {
    if (!user) {
      alert("로그인 후 노트를 볼 수 있습니다.");
      navigate('/login');
      return;
    }
    navigate(`/note/${id}`);
  };

  const addNewNote = () => {
    const newNote = {
      title: `새로운 노트 ${notes.length + 1}`,
      content: '새 노트의 내용을 입력해주세요.'
    };

    axios.get('/note', newNote)
      .then(() => fetchNotes())
      .catch(err => console.error(err));
  };

  const goToNewNote = () => {
    navigate('/new');
  };

  const handleNewNote = () => {
    if (user) {
      navigate('/new');
    } else {
      alert("새 노트를 작성하려면 회원가입이 필요합니다.");
      navigate('/signup');
    }
  };

  const handleLogout = () => {
    setUser(null);  // 상태 초기화
    localStorage.removeItem("user");  // ✅ 로그인 정보 삭제
    alert("로그아웃 되었습니다.");
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
       {/* ✅ 로그인 여부에 따른 우측 상단 UI */}
       <div className="user-menu">
            {user ? (
              <>
                <span>{user} 님 환영합니다!</span>
                <button onClick={handleLogout}>로그아웃</button> {/* ✅ 로그아웃 버튼 */}
              </>
            ) : (
              <>
                <button onClick={() => navigate('/signup')}>회원가입</button>
                <button onClick={() => navigate('/login')}>로그인</button>
              </>
            )}
          </div>
    <div className="card">
      <div className="header">
        <div>
          <h2>심플 노트</h2>
             {/* ✅ 다크모드 토글 버튼 추가 */}
          <p>잊지않도록 기록하세요.</p>
          
        </div>
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
       
        </div>

        <input className="input-box" placeholder="검색"/>
        <select className="input-box">
          <option>최근순</option>
          <option>오래된순</option>
        </select>

        <div className="notes-container">
  <button className="arrow-btn" onClick={prev}>◀</button>
  <div className="notes-list">
  {user ? (
      notes.length > 0 ? (
        notes.slice(startIndex, startIndex + 3).map((note) => (
          <div 
            key={note.id} 
            className="note" 
            onClick={() => goToNoteDetail(note.id)}
          >
            <h3>{note.title}</h3>
            <span>{new Date(note.updated_at).toLocaleString()}</span>
          </div>
        ))
      ) : (
        <p>📢 불러올 노트가 없습니다.</p>
      )
    ) : (
      <p className="locked-note">🔒 로그인 후 노트 확인 가능 합니다.</p>
    )}
  </div>
  <button className="arrow-btn" onClick={next}>▶</button>
</div>

<button className="add-note-btn" onClick={handleNewNote}>새 노트</button>

      </div>
    </div>
  );
}

export default Home;
