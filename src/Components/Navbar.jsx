import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import profile from '../Assets/profile.png';
import styled from 'styled-components';

function Navbar({ name, onSettingsClick, shopName }) {
  return (
    <StyledNavbar>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logoImage" />
        </Link>
      </div>
      <div className="settings">
        <img
          src={profile}
          alt="Profile"
          className="settingsImage"
          onClick={onSettingsClick}
        />
        <span className="name">{decodeURIComponent(name) || shopName}</span>
      </div>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 11vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: rgba(51, 51, 51, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;

  .logo {
    position: absolute;
    left: 15%;
    transform: translateX(-50%);
  }

  .logoImage {
    height: 10vh;
  }

  .settings {
    position: absolute;
    right: 10%;
    display: flex;
    flex-direction: column; /* Stack items vertically */
    align-items: center; /* Center items horizontally */
    text-align: center; /* Center text */
  }

  .name {
    margin-top: 5px; /* Space between profile image and username */
    font-size: 1.2em;
    color: #fff;
  }

  .settingsImage {
    height: 5vh;
    cursor: pointer;
  }

  /* Responsive Styles */
  @media (max-width: 1024px) {
    .logoImage {
      height: 8vh;
    }

    .settingsImage {
      height: 4vh;
    }
  }

  @media (max-width: 768px) {
    height: 12vh;

    .logo {
      left: 10%;
    }

    .logoImage {
      height: 7vh;
    }

    .settings {
      right: 5%;
    }

    .settingsImage {
      height: 4vh;
    }

    .name {
      font-size: 1em;
    }
  }

  @media (max-width: 480px) {
    height: 15vh;

    .logo {
      left: 10%;
    }

    .logoImage {
      height: 7vh;
    }

    .settings {
      right: 25%;
      top:30%;
    }

    .settingsImage {
      height: 5vh;
    }

    .name {
      font-size: 0.9em;
    }
  }
`;

export default Navbar;
