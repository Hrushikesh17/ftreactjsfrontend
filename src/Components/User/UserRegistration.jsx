import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function UserRegistration() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const addressRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();


  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const address = addressRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;

    if (!name || !email || !password || !address || !phoneNumber) {
      setError('All fields are required.');
      clearMessages();
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format.');
      clearMessages();
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      clearMessages();
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Phone number must be exactly 10 digits.');
      clearMessages();
      return;
    }

    const formData = {
      name,
      email,
      password,
      role: 'BUYER',
      address,
      phoneNumber,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/register/user`,formData);

      console.log('Registration successful:', response.data);
      setSuccessMessage('Registration successful! Redirecting to login page...');
      clearMessages();
      setTimeout(() => {
        navigate('/login-user');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data || 'An error occurred during registration');
      clearMessages();
    }
  };

  const clearMessages = () => {
    setTimeout(() => {
      setError(null);
      setSuccessMessage('');
    }, 2000); // Clear messages after 4 seconds
  };

  return (
    <StyledWrapper>
      <div className="form">
        <div className="title">User Registration</div>
        <div className="subtitle">Create your account</div>

        {successMessage && <Notification className="successMessage">{successMessage}</Notification>}
        {error && <Notification className="errorMessage">{error}</Notification>}

        <form onSubmit={handleSubmit}>
          <div className="input-container ic1">
            <input placeholder="" type="text" className="input" ref={nameRef} />
            <div className="cut" />
            <label className="iLabel" htmlFor="name">
              Name
            </label>
          </div>

          <div className="input-container ic2">
            <input placeholder="" type="email" className="input" ref={emailRef} />
            <div className="cut cut-short" />
            <label className="iLabel" htmlFor="email">
              Email
            </label>
          </div>

          <div className="input-container ic2">
            <input placeholder="" type="password" className="input" ref={passwordRef} />
            <div className="cut cut-short" />
            <label className="iLabel" htmlFor="password">
              Password
            </label>
          </div>

          <div className="input-container ic2">
            <textarea placeholder="" className="input textarea" ref={addressRef} />
            <div className="cut cut-short" />
            <label className="iLabel" htmlFor="address">
              Address
            </label>
          </div>

          <div className="input-container ic2">
            <input placeholder="" type="number" className="input" ref={phoneNumberRef} />
            <div className="cut cut-short" />
            <label className="iLabel" htmlFor="phoneNumber">
              Phone Number
            </label>
          </div>

          <button className="submit" type="submit">
            Register
          </button>
        </form>
      </div>
    </StyledWrapper>
  );
}

const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  font-family: sans-serif;
  color: white;
  background-color: ${(props) => (props.className === 'successMessage' ? 'green' : 'red')};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  padding: 20px;

  .form {
    background-color: #ffffff;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .title {
    color: #a7c957;
    font-family: sans-serif;
    font-size: 36px;
    font-weight: 600;
    margin-top: 0;
  }

  .subtitle {
    color: #386641;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .input-container {
    position: relative;
    width: 100%;
    margin-top: 20px;
  }

  .input {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 12px;
    color: #333;
    font-size: 16px;
    height: 50px;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
    outline: none;
  }

  .textarea {
    height: 100px;
    padding: 10px;
  }

  .cut {
    background-color: #fff;
    border-radius: 10px;
    height: 20px;
    left: 20px;
    position: absolute;
    top: -20px;
    transition: transform 200ms;
    width: 76px;
  }

  .cut-short {
    width: 50px;
  }

  .iLabel {
    color: #666;
    font-family: sans-serif;
    left: 20px;
    position: absolute;
    top: 20px;
    transition: transform 200ms, color 200ms;
    pointer-events: none;
    line-height: 14px;
  }

  .input:focus ~ .cut {
    transform: translateY(8px);
  }

  .input:focus ~ .iLabel {
    transform: translateY(-30px) translateX(10px) scale(0.75);
    color: #70e000;
  }

  .input:not(:focus) ~ .iLabel {
    color: #808097;
  }

  .submit {
    background-color: #08d;
    border-radius: 12px;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    height: 50px;
    margin-top: 20px;
    text-align: center;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .submit:active {
    background-color: #06b;
  }

  @media (max-width: 768px) {
    .form {
      padding: 15px;
      max-width: 100%;
    }

    .title {
      font-size: 28px;
    }

    .subtitle {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    .form {
      padding: 10px;
      max-width: 100%;
    }

    .title {
      font-size: 24px;
    }

    .subtitle {
      font-size: 12px;
    }

    .input {
      font-size: 14px;
    }

    .submit {
      font-size: 16px;
    }
  }
`;

export default UserRegistration;
