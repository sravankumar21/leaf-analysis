import React from 'react';
import LeftSidebar from '../components/LeftSidebar'; 
import RightSidebar from '../components/RightSidebar'; // ✅ import right sidebar
import Footer from '../components/Footer';
import '../styles/Homepage.css';

const Homepage = () => {
  return (
    <div>
      <LeftSidebar />
      <RightSidebar /> {/* ✅ add it here */}
      
      <div 
        className="home-container" 
        style={{ 
          marginLeft: '240px', 
          marginRight: '240px', // ✅ space for RightSidebar
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          textAlign: 'center',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <div className="home-content">
          <img 
            src="https://cdn.pixabay.com/photo/2021/08/06/20/20/leaf-6527126_1280.png" 
            alt="Healthcare Illustration" 
            className="home-image" 
          />
          <h1 className="home-heading">Ayurvedic Leaf Detection - Classification - Analysis</h1>
          <p className="home-subheading">Harnessing Nature's Wisdom for Healthier Plants.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
