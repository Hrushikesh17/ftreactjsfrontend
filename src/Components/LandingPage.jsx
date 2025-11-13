import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { gsap } from 'gsap';
import logo from '../Assets/logo.png'; // Update with the correct path to your logo image

function LandingPage() {
  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the "Free" text dropping from the top
    tl.fromTo(
      ".freetext", 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 2 }
    )
    // Animate the logo image coming from the right
    .fromTo(
      ".logo", 
      { x: 100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1 },
      "-=1" // Overlap the end of this animation with the previous one by 1 second
    )
    // After "FreeTree" animation, grow the button from scale 0 to full size
    .fromTo(
      ".button", 
      { scale: 0 }, 
      { scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
      "<" // Start this animation when the previous one starts
    );
  }, []);

  const btnname = "Explore More";

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        <span className="freetext" style={styles.freetext}>FreeTree</span>
        <img src={logo} alt="Logo" className="logo" style={styles.logo} />
      </h1>
      <p style={styles.message}>We are glad to have you here. Start exploring our features.</p>
      <div style={styles.buttonContainer}>
        <Link to="/registration-choice">
          <Button btnname={btnname} className="button" />
        </Link>
      </div>
      <p style={styles.loginMessage}>
        Already have an account? <Link to="/login-choice">Login here</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    boxSizing: 'border-box',
  },
  heading: {
    fontSize: '2.5em',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  freetext: {
    color: 'green', // Color for "Free"
  },
  logo: {
    width: '100px', // Adjust as needed
    height: 'auto',
    marginTop: '10px',
  },
  message: {
    fontSize: '1.2em',
    marginBottom: '40px',
  },
  buttonContainer: {
    marginBottom: '20px',
  },
  loginMessage: {
    fontSize: '1em',
  },
  '@media (max-width: 768px)': {
    heading: {
      fontSize: '2em',
    },
    message: {
      fontSize: '1em',
    },
    buttonContainer: {
      marginBottom: '15px',
    },
    loginMessage: {
      fontSize: '0.9em',
    },
  },
  '@media (max-width: 480px)': {
    heading: {
      fontSize: '1.5em',
    },
    message: {
      fontSize: '0.9em',
    },
    buttonContainer: {
      marginBottom: '10px',
    },
    loginMessage: {
      fontSize: '0.8em',
    },
  },
};

export default LandingPage;
