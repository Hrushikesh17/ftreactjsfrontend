import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function LoginChoice() {
  return (
    <StyledContainer>
      <h1 className="heading">Choose Login Type</h1>
      <p className="message">Please select whether you want to Login as a seller or a buyer.</p>
      <div className="buttonContainer">
        <Link to="/login-user">
          <StyledButton className="btn">
            <i className="animation" />
            Login as Buyer
            <i className="animation" />
          </StyledButton>
        </Link>
        <Link to="/login-seller">
          <StyledButton className="btn">
            <i className="animation" />
            Login as Seller
            <i className="animation" />
          </StyledButton>
        </Link>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  text-align: center;
  padding: 50px;

  .heading {
    font-size: 2.5em;
    margin-bottom: 20px;
  }

  .message {
    font-size: 1.2em;
    margin-bottom: 40px;
  }

  .buttonContainer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  @media (max-width: 1024px) {
    .heading {
      font-size: 2em; /* Adjusted for tablets */
    }
    .message {
      font-size: 1.1em; /* Adjusted for tablets */
    }
    padding: 40px;
  }

  @media (max-width: 768px) {
    .heading {
      font-size: 1.8em; /* Adjusted for mobile phones */
    }
    .message {
      font-size: 1em; /* Adjusted for mobile phones */
    }
    padding: 30px;
  }

  @media (max-width: 480px) {
    padding: 20px;

    .heading {
      font-size: 1.5em; /* Adjusted for smaller mobile screens */
    }
    .message {
      font-size: 0.9em; /* Adjusted for smaller mobile screens */
    }
  }
`;

const StyledButton = styled.button`
  outline: 0;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background: #40B3A2;
  min-width: 200px;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 16px 20px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  overflow: hidden;
  cursor: pointer;
  margin: 10px;

  &:hover {
    opacity: 0.95;
  }

  .animation {
    border-radius: 100%;
    animation: ripple 0.6s linear infinite;
  }

  @keyframes ripple {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1),
                  0 0 0 20px rgba(255, 255, 255, 0.1),
                  0 0 0 40px rgba(255, 255, 255, 0.1),
                  0 0 0 60px rgba(255, 255, 255, 0.1);
    }
    100% {
      box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.1),
                  0 0 0 40px rgba(255, 255, 255, 0.1),
                  0 0 0 60px rgba(255, 255, 255, 0.1),
                  0 0 0 80px rgba(255, 255, 255, 0);
    }
  }

  @media (max-width: 1024px) {
    min-width: 180px; /* Adjusted button size for tablets */
    padding: 14px 18px;
    font-size: 11px;
  }

  @media (max-width: 768px) {
    min-width: 160px; /* Adjusted button size for mobile phones */
    padding: 12px 16px;
    font-size: 10px;
  }

  @media (max-width: 480px) {
    min-width: 140px; /* Adjusted button size for smaller mobile screens */
    padding: 10px 14px;
    font-size: 9px;
  }
`;

export default LoginChoice;
