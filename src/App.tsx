// import { useState } from 'react';
import './App.css';
import Gen from './Pages/Gen/Gen.tsx';
import Resizing from "./Pages/Resizing/Resizing.tsx"
import { Routes, Route } from 'react-router-dom';
// import Test from './components/Test';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Gen />} />
      <Route path="/resizing" element={<Resizing />} />
    </Routes>
  );
};

export default App;
