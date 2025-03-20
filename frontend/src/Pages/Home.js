import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

function Home() {
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

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="card">
        <div className="header">
          <div>
            <h2>심플 노트</h2>
            <p>잊지않도록 기록하세요.</p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode}/>
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
    {notes.length > 0 ? (
      notes.slice(startIndex, startIndex + 3).map((note) => (
        <div 
        key={note.id} 
        className="note" 
        onClick={() => goToNoteDetail(note.id)} // 📌 클릭하면 이동!
      >
          <h3>{note.title}</h3>
          <span>{new Date(note.updated_at).toLocaleString()}</span>
        </div>
      ))
    ) : (
      <p>📢 불러올 노트가 없습니다.</p>
    )}
  </div>
  <button className="arrow-btn" onClick={next}>▶</button>
</div>

<button className="add-note-btn" onClick={() => navigate('/new')}>새 노트</button>

      </div>
    </div>
  );
}

export default Home;
