import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function SellerLogin() {
  const identifierRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Clear messages after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setSuccessMessage('');
    }, 4000);
    return () => clearTimeout(timer);
  }, [error, successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      identifier: identifierRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/sellers/login/seller`, null, {
        params: {
          identifier: credentials.identifier,
          password: credentials.password,
        },
      });

      const { id, shopName, role } = response.data;
      setSuccessMessage('Login successful! Redirecting to the dashboard...');

      // Pass the data in the URL
      setTimeout(() => {
        navigate(`/user-Home?id=${id}&shopName=${shopName}&role=${role}`);
      }, 2000);
    } catch (err) {
      setError('Invalid email/phone number or password');
    }
  };

  return (
    <StyledWrapper>
      {successMessage && <p className="successMessage">{successMessage}</p>}
      {error && <p className="errorMessage">{error}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <p>Seller Login</p>
        <div className="group">
          <input
            required
            className="main-input"
            type="text"
            ref={identifierRef}
            placeholder="Email or Phone number"
          />
          <span className="highlight-span" />
          <label className="label">Email or Phone number</label>
        </div>
        <div className="group">
          <input
            required
            className="main-input"
            type="password"
            ref={passwordRef}
            placeholder="Password"
          />
          <span className="highlight-span" />
          <label className="label">Password</label>
        </div>
        <button className="submit">Login</button>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  padding: 0 10px;

  .successMessage,
  .errorMessage {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    color: #fff;
    font-size: 1em;
    z-index: 1000;
    max-width: calc(100vw - 40px);
    word-wrap: break-word;
  }

  .successMessage {
    background-color: green;
  }

  .errorMessage {
    background-color: red;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    padding: 40px;
    background-color: black;
    border-radius: 20px;
    width: 100%;
    max-width: 400px;
  }

  .form p {
    padding-bottom: 20px;
    font-size: 1.5em;
    font-weight: bold;
    letter-spacing: 0.5px;
    color: white;
    text-align: center;
  }

  .group {
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }

  .main-input {
    font-size: 1em;
    padding: 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #6c6c6c;
    background: transparent;
    color: #ffffff;
  }

  .main-input:focus {
    outline: none;
    border-bottom-color: #42ff1c;
  }

  .label {
    color: #999999;
    font-size: 1em;
    position: absolute;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    pointer-events: none;
  }

  .main-input:focus ~ .label,
  .main-input:valid ~ .label {
    top: -20px;
    font-size: 0.875em;
    color: #42ff1c;
  }

  .highlight-span {
    position: absolute;
    height: 60%;
    width: 0;
    top: 25%;
    left: 0;
    opacity: 0.5;
    background: #42ff1c;
  }

  .main-input:focus ~ .highlight-span {
    animation: input-focus 0.3s ease;
  }

  @keyframes input-focus {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  .submit {
    margin-top: 1.2rem;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #42ff1c;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1em;
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .form {
      padding: 20px;
    }

    .form p {
      font-size: 1.2em;
    }

    .main-input {
      font-size: 0.9em;
    }

    .label {
      font-size: 0.9em;
    }

    .submit {
      font-size: 0.9em;
    }
  }

  @media (max-width: 480px) {
    .successMessage,
    .errorMessage {
      top: 10px;
      right: 10px;
      font-size: 0.9em;
      padding: 8px 15px;
    }

    .form {
      width: 100%;
      padding: 15px;
    }

    .form p {
      font-size: 1em;
    }

    .main-input {
      font-size: 0.85em;
    }

    .label {
      font-size: 0.85em;
    }

    .submit {
      font-size: 0.85em;
    }
  }
`;

export default SellerLogin;
