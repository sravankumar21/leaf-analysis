import React from 'react';

const aboutAyurvedaStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const headingStyle = {
  fontSize: '2em',
  color: '#4caf50',
  marginBottom: '20px',
};

const sectionStyle = {
  marginBottom: '20px',
};

const sectionHeadingStyle = {
  fontSize: '1.5em',
  color: '#333',
  marginBottom: '10px',
};

const paragraphStyle = {
  fontSize: '1em',
  color: '#555',
  lineHeight: '1.6',
};

const ulStyle = {
  listStyleType: 'disc',
  marginLeft: '20px',
  color: '#555',
};

const liStyle = {
  marginBottom: '10px',
};

const AboutAyurveda = () => {
  return (
    <div style={aboutAyurvedaStyle}>
      <h1 style={headingStyle}>What is Ayurveda?</h1>
      <section style={sectionStyle}>
        <p style={paragraphStyle}>
          Ayurveda, an ancient system of natural healing, originated in India more than 5,000 years ago. The term Ayurveda comes from the Sanskrit words "Ayur" (life) and "Veda" (knowledge). It is a holistic approach to health that emphasizes balance in the body, mind, and spirit.
        </p>
      </section>
      <section style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Core Principles</h2>
        <ul style={ulStyle}>
          <li style={liStyle}><strong>Doshas:</strong> Ayurveda identifies three primary energies—Vata, Pitta, and Kapha—that govern our physical and mental characteristics.</li>
          <li style={liStyle}><strong>Five Elements:</strong> Earth, water, fire, air, and ether are the basic building blocks of life.</li>
          <li style={liStyle}><strong>Balance:</strong> Health is achieved by balancing the three doshas, which are affected by lifestyle, diet, and environment.</li>
        </ul>
      </section>
      <section style={sectionStyle}>
        <h2 style={sectionHeadingStyle}>Ayurvedic Treatments</h2>
        <p style={paragraphStyle}>
          Ayurveda utilizes natural remedies such as herbs, oils, and dietary adjustments to treat ailments and promote well-being. Some key practices include Panchakarma (detoxification), yoga, meditation, and massage therapies.
        </p>
      </section>
    </div>
  );
};

export default AboutAyurveda;
