import React from 'react';
import { useNavigate } from 'react-router-dom';

const sidebarStyle = {
  width: '200px',
  position: 'fixed',
  top: '80px',
  left: 0,
  bottom: 0,
  backgroundColor: '#fff',
  borderRight: '1px solid #e0e0e0',
  padding: '16px',
};

const titleStyle = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#666',
  margin: '16px 0 8px',
};

const itemStyle = {
  padding: '10px 12px',
  margin: '6px 0',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: '0.3s',
};

const hoverStyle = {
  backgroundColor: '#f3e5f5',
  transform: 'translateX(4px)',
};

const LeftSidebar = () => {
  const navigate = useNavigate();

  const sections = {
    'About': [
      { text: 'About Ayurveda', path: '/about' },
      { text: 'Team', path: '/team' },
    ],
    'Features': [
      { text: 'LeafSense', path: '/leafsense' },
      { text: 'HealthGuard', path: '/healthguard' },
      { text: 'AyurCheck', path: '/ayurcheck' },
    ],
  };

  return (
    <div style={sidebarStyle}>
      {Object.entries(sections).map(([section, items]) => (
        <div key={section}>
          <div style={titleStyle}>{section}</div>
          {items.map(({ text, path }) => (
            <div
              key={text}
              style={itemStyle}
              onClick={() => navigate(path)}
              onMouseOver={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
              onMouseOut={(e) => Object.assign(e.currentTarget.style, itemStyle)}
            >
              {text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LeftSidebar;
