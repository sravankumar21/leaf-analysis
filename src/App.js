import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import Navbar globally
import Homepage from './pages/Homepage';
import LeafSense from './components/LeafSense';
import HealthGuard from './components/HealthGuard';
import AyurCheck from './components/AyurCheck';
import About from './components/About';
import AboutAyurveda from './components/AboutAyurveda';
import RightSidebar from './components/RightSidebar';

function App() {
  const [report, setReport] = useState("");

  return (
    <Router>
      <Navbar />  {/* Global Navbar */}
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/leafsense" element={<LeafSense setReport={setReport} />} />
        <Route path="/healthguard" element={<HealthGuard />} />
        <Route path="/ayurcheck" element={<AyurCheck />} />
        <Route path="/about" element={<AboutAyurveda />} />
        <Route path="/team" element={<About />} />
      </Routes>

      <RightSidebar report={report} /> {/* Right Sidebar outside Routes */}
    </Router>
  );
}

export default App;
