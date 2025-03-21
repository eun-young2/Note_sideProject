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
        setUser(res.data.nickname);
        localStorage.setItem("user", res.data.nickname);
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
