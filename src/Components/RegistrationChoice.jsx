// src/RegistrationChoice.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';

// Loader Component
const Loader = () => {
  return (
    <StyledWrapper>
      <div className="spinner-container">
        <div className="spinner">
          <div className="spinner">
            <div className="spinner">
              <div className="spinner">
                <div className="spinner">
                  <div className="spinner" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .spinner-container {
    width: 150px;
    height: 150px;
    position: relative;
    margin: 30px auto;
    overflow: hidden;
  }

  .spinner {
    position: absolute;
    width: calc(100% - 9.9px);
    height: calc(100% - 9.9px);
    border: 5px solid transparent;
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 5s cubic-bezier(0.17, 0.49, 0.96, 0.79) infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

// Button Component with Styled-Components
const Button = ({ children }) => {
  return (
    <StyledButtonWrapper>
      <button>
        <span>{children}</span>
      </button>
    </StyledButtonWrapper>
  );
};

const StyledButtonWrapper = styled.div`
  button {
    padding: 0.9em 1.8em;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: #fff; /* Text color set to white */
    border: 3px solid #ff0;
    font-size: 14px;
    position: relative;
    font-family: inherit;
    background: transparent;
    cursor: pointer;
    overflow: hidden;
    display: inline-block;
    transition: color 0.5s;
  }

  button::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #363636;
    color: #ff0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    z-index: 1;
    transform: scale(0) rotateY(0deg);
  }

  button:hover::before {
    transform: scale(1) rotateY(360deg);
    opacity: 1;
  }

  button span {
    position: relative;
    z-index: 2;
  }
`;

// Main Component
function RegistrationChoice() {
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      ".button.left",
      { y: "-100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 4 }
    )
    .fromTo(
      ".button.right",
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 4 },
      "<" // Start this animation at the same time as the previous one
    );
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Choose Registration Type</h1>
      <p style={styles.message}>Please select whether you want to register as a seller or a buyer.</p>
      
      <div style={styles.buttonContainer}>
        <Link to="/register/user" className="button left">
          <Button>Register as Buyer</Button>
        </Link>
        <Link to="/register/seller" className="button right">
          <Button>Register as Seller</Button>
        </Link>
      </div>
      
      {/* Loader Component Integration Below Buttons */}
      <Loader />
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  heading: {
    fontSize: '2.5em',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.2em',
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
    flexDirection: 'row', // Default to row
  },
};

// Responsive Styles
const responsiveStyles = `
  @media (max-width: 768px) {
    ${styles.container} {
      padding: '30px';
    }
    
    ${styles.heading} {
      fontSize: '2em';
    }
    
    ${styles.message} {
      fontSize: '1em';
    }
    
    ${styles.buttonContainer} {
      flexDirection: 'column'; // Stack buttons vertically on tablets and mobiles
    }
    
    ${StyledButtonWrapper} {
      button {
        fontSize: '12px'; // Adjust button text size for smaller screens
        padding: '0.7em 1.4em'; // Adjust button padding
      }
    }
  }
  
  @media (max-width: 480px) {
    ${styles.container} {
      padding: '20px';
    }
    
    ${styles.heading} {
      fontSize: '1.5em';
    }
    
    ${styles.message} {
      fontSize: '0.9em';
    }
    
    ${StyledButtonWrapper} {
      button {
        fontSize: '10px'; // Further adjust button text size for smaller screens
        padding: '0.5em 1em'; // Further adjust button padding
      }
    }
  }
`;

export default RegistrationChoice;
