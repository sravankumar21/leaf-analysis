import React from 'react';
import groupPhoto from '../videos/Team Image.jpeg'; // Add your group photo here

const About = () => {
  return (
    <div style={styles.aboutContainer}>
      <h1 style={styles.heading}>Meet Our Team</h1>
      
      {/* Centered image of the team */}
      <div style={styles.imageContainer}>
        <img src={groupPhoto} alt="Team" style={styles.teamPhoto} />
      </div>

      {/* Information cards */}
      <div style={styles.infoCardsContainer}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Tejas</h2>
          <p style={styles.cardText}>ID: 160121771095</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Kethan</h2>
          <p style={styles.cardText}>ID: 160121771127</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Sravan</h2>
          <p style={styles.cardText}>ID: 160121771308</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  aboutContainer: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    textAlign: 'center',
  },
  heading: {
    color: 'black', // Heading color changed to black
    marginBottom: '40px',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center', // Center the image horizontally
    marginBottom: '30px',
  },
  teamPhoto: {
    borderRadius: '10%',
    width: '400px', // Image size increased
    height: '300px', // Image size increased
    objectFit: 'cover',
  },
  infoCardsContainer: {
    display: 'flex',
    justifyContent: 'center', // Center the cards horizontally
    gap: '30px',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '200px',
    textAlign: 'center',
  },
  cardTitle: {
    color: '#34495e',
    fontSize: '1.5rem',
  },
  cardText: {
    color: '#7f8c8d',
    fontSize: '1rem',
  },
};

export default About;
