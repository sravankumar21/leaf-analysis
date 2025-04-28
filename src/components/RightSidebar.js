import React from 'react';

const sidebarStyle = {
  width: '240px',
  position: 'fixed',
  top: '80px',
  right: 0,
  bottom: 0,
  backgroundColor: '#fff',
  borderLeft: '1px solid #e0e0e0',
  padding: '16px',
  overflowY: 'auto',
  zIndex: 10,
};

const headingStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '12px',
  textAlign: 'center',
};

const buttonStyle = {
  padding: '10px 16px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#4caf50',
  color: '#fff',
  cursor: 'pointer',
  marginBottom: '16px',
  width: '100%',
  textAlign: 'center',
  display: 'block',
};

const reportPreviewStyle = {
  height: '180px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '16px',
  overflowY: 'auto',
  fontFamily: 'monospace',
  fontSize: '14px',
  whiteSpace: 'pre-line',
  boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)',
};

const RightSidebar = ({ report }) => {
  return (
    <div style={sidebarStyle}>
      <div style={headingStyle}>Download Report</div>

      <button style={buttonStyle}>Generate Report</button>

      <div style={reportPreviewStyle}>
        <p style={{ color: '#888', fontStyle: 'italic', textAlign: 'center' }}>
          {report || 'Report will appear here after generation...'}
        </p>
      </div>

      <button style={buttonStyle}>Download PDF</button>
    </div>
  );
};

export default RightSidebar;
