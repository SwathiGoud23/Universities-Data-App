import React from 'react';
import Institutions from './components/Pages/Institutions.js';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Institutions />} />
    </Routes>
  );
}

export default App;
