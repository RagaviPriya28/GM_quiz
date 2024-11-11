import React from 'react';

export default function LobbyPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Quiz Title</h1>
      </div>
      <div style={styles.card}>
        <h4 style={styles.subtitle}>Jaitakshi</h4>
      </div>
      <div style={styles.card}>
        <p style={styles.text}>Please wait till the admin starts the quiz</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f9',
    gap: '1rem', // Adds space between the cards
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '80%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    margin: 0,
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#777',
    margin: 0,
  },
  text: {
    fontSize: '1rem',
    color: '#555',
    margin: 0,
  },
};
