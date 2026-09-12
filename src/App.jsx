import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GeneratorPage from './components/GeneratorPage';

import Header from './components/Header';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generate/:templateId" element={<GeneratorPage />} />
      </Routes>
    </Router>
  );
}
