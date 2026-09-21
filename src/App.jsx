import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GeneratorPage from './components/GeneratorPage';

import Header from './components/Header';

import ScheduleTemplate from './templates/ScheduleTemplate';
import templates from './templates';
import { buildStudentData } from './utils/generators';

function DirectPreview() {
  const config = templates.mnsu;
  const data = buildStudentData('Colin', 'Roskos', null, null, config, 'swe', 'cr4827rx', '10384726');
  return (
    <div style={{ margin: 0, padding: 0, width: '1024px', height: '500px', overflow: 'hidden' }}>
      <ScheduleTemplate config={config} studentData={data} mode="sheerid" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><LandingPage /></>} />
        <Route path="/generate/:templateId" element={<><Header /><GeneratorPage /></>} />
        <Route path="/preview" element={<DirectPreview />} />
      </Routes>
    </Router>
  );
}
