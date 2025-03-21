import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    id: '',
    password: '',
    nickname: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    axios.post('http://localhost:8000/user/signup', form)
      .then(() => {
        alert("회원가입 성공! 로그인하세요.");
        navigate('/login');
      })
      .catch(err => console.error("❌ 회원가입 실패:", err));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">  {/* ✅ 스타일 클래스 변경 */}
        <h2>회원가입</h2>
        <input type="text" name="name" placeholder="이름" onChange={handleChange} />
        <input type="text" name="id" placeholder="ID" onChange={handleChange} />
        <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} />
        <input type="text" name="nickname" placeholder="닉네임" onChange={handleChange} />
        <button onClick={handleSignup}>회원가입</button>
      </div>
    </div>
  );
}

export default Signup;
