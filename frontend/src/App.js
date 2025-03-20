import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import NoteDetail from './Pages/NoteDetail';
import NewNote from './Pages/NewNote';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note/:id" element={<NoteDetail />} />
        <Route path="/new" element={<NewNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;