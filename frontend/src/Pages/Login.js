import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    axios.post('http://localhost:8000/user/login', form)
      .then(res => {
        alert(`환영합니다, ${res.data.nickname} 님!`);

        // 🛑 user_id가 undefined인지 확인
        console.log("✅ 로그인 성공! 백엔드 응답 데이터:", res.data);

        // 🛑 user_id가 undefined면 에러 처리
        if (!res.data.user_id) {
            console.error("❌ user_id가 응답에서 누락됨!", res.data);
            alert("로그인에 문제가 발생했습니다. 관리자에게 문의하세요.");
            return;
        }

        const userData = {id:res.data.user_id, nickname:res.data.nickname}

        console.log("✅ 로그인 성공! 저장할 userData:", userData);
        //console.log("💡 userData 타입:", typeof userData); // → object
        //console.log("💡 JSON.stringify(userData):", JSON.stringify(userData));

        
        localStorage.setItem("user", JSON.stringify(userData));
        //console.log("💾 저장된 값:", localStorage.getItem("user"));
        setUser(userData);
        
        navigate('/');
      })
      .catch(err => alert("❌ 로그인 실패: ID 또는 비밀번호를 확인하세요."));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">  {/* ✅ 스타일 클래스 변경 */}
        <h2>로그인</h2>
        <input type="text" name="id" placeholder="ID" onChange={handleChange} />
        <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} />
        <div className="auth-buttons">
          <button onClick={handleLogin}>로그인</button>
          <button onClick={() => navigate('/signup')}>회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
