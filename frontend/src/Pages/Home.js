import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

function Home({ user, setUser }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");  // ✅ 검색어 상태 추가 
  
  const nickname = user ? user.nickname : "Guest"; 
  useEffect(() => {
    fetchNotes();
  }, [sortOrder]);

  // useEffect(() => {
   // const storedUser = localStorage.getItem("user");
  //  console.log(localStorage.getItem("user"));
   // console.log("📢 localStorage에서 불러온 user (문자열):", storedUser);
   // console.log("📢 storedUser의 타입:", typeof storedUser);
    
   // if (storedUser) {
   //   try {
    //    const parsedUser = JSON.parse(storedUser);
       // console.log("📢 저장된 사용자 데이터:", parsedUser);
    //    setUser(parsedUser || {}); // ✅ user가 null이면 빈 객체로 대체
   //   } catch (error) {
   //     console.error("❌ 사용자 데이터 파싱 실패:", error);
   //     localStorage.removeItem("user");  // ❗ 문제 있는 값 삭제
    //    setUser({}); // ✅ 에러 발생 시 빈 객체로 설정
    //  }
  //  }
//}, []);

useEffect(() => {
  if (user && user.id) {
    fetchNotes();
  }
}, [user, sortOrder]);

  const fetchNotes = () => {
    if(!user) return;
    console.log(`📢 노트 데이터를 가져오는 중... 정렬: ${sortOrder}`);
  
    axios.get(`http://localhost:8000/note?user_id=${user.id}&sort=${sortOrder}`)
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
    if (!user||!user.id) {
      alert("로그인 후 메모를 작성할 수 있습니다!");
      navigate("/login");
      return;
  }

    const newNote = {
      title: `새로운 노트 ${notes.length + 1}`,
      content: '새 노트의 내용을 입력해주세요.',
      user_id : user.id
    };

    console.log("📢 노트 생성 요청 데이터:", newNote);

    axios.post('http://localhost:8000/note/enter', newNote)
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

  // ✅ 정렬 옵션 변경 이벤트
  const handleSortChange = (event) => {
    const selectedSort = event.target.value === "오래된순" ? "oldest" : "latest"; // ✅ 한글 값 변환
    setSortOrder(selectedSort); // ✅ 상태 업데이트
};

 // ✅ 검색된 노트만 필터링
 const filteredNotes = notes.filter(note => 
  note.title.toLowerCase().includes(searchTerm.toLowerCase())
);

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
                <span>{user.nickname} 님 환영합니다!</span>
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

        <input 
          className="input-box" 
          placeholder="검색어 입력" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select className="input-box" onChange={handleSortChange}>
          <option>최근순</option>
          <option>오래된순</option>
        </select>

        <div className="notes-container">
  <button className="arrow-btn" onClick={() => setStartIndex(prev => Math.max(prev - 1, 0))}>◀</button>
  <div className="notes-list">
  {user ? (
    filteredNotes.length > 0 ? (  // 🔹 ✅ 필터링된 노트를 사용
      filteredNotes.slice(startIndex, startIndex + 3).map((note) => (
        <div 
          key={note.id} 
          className="note" 
          onClick={() => navigate(`/note/${note.id}`)}
        >
          <h3>{note.title}</h3>
          <span>{new Date(note.updated_at).toLocaleString()}</span>
        </div>
      ))
    ) : (
      <p>📢 검색 결과가 없습니 다.</p>  // 🔹 검색 결과 없을 때 메시지
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
