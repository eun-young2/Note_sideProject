import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import NoteDetail from './Pages/NoteDetail';
import NewNote from './Pages/NewNote';
import Signup from './Pages/Signup';
import Login from './Pages/Login';

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} /> {/* ✅ 수정 */}
        <Route path="/note/:id" element={<NoteDetail user={user} setUser={setUser}  />} />
        <Route path="/new" element={<NewNote user={user} setUser={setUser}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
