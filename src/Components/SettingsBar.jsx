import React, { useState } from 'react';
import close from '../Assets/close.png';
import editIcon from '../Assets/edit.png';
import deleteIcon from '../Assets/delete.png';
import logoutIcon from '../Assets/logout.png';
import addproduct from '../Assets/addproduct.png';
import editproduct from '../Assets/editproduct.png';
import deletproduct from '../Assets/deleteproduct.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirMationModel from './ConfirMationModel';
import styled from 'styled-components';

function SettingsBar({ isOpen, onClose, id, shopName, role }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/', { replace: true }); // Redirect to main page and replace the history
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      navigate('/', { replace: true }); // Redirect to the main page after successful deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleEditProduct = () => {
    navigate('/edit-product'); // Navigate to edit product page
  };

  const handleDeleteProduct = () => {
    navigate('/delete-product'); // Navigate to delete product page
  };

  return (
    <div style={{ ...styles.settingsBar, right: isOpen ? '0' : '-300px' }}>
      <button style={styles.closeButton} onClick={onClose}>
        <img src={close} alt="Close" style={styles.closeImage} />
      </button>
      <h2 style={styles.title}>Settings</h2>
      <div style={styles.optionsContainer}>
        <Link to={`/user-edit?id=${id}&role=${role}`} style={styles.optionLink}>
          <div style={styles.option}>
            <img src={editIcon} alt="Edit" style={styles.optionIcon} />
            <StyledButton>Edit Profile</StyledButton>
          </div>
        </Link>
        <div style={styles.option}>
          <img src={deleteIcon} alt="Delete" style={styles.optionIcon} onClick={() => setIsModalOpen(true)} />
          <StyledButton onClick={() => setIsModalOpen(true)}>Delete Profile</StyledButton>
        </div>
        <div style={styles.option}>
          <img src={logoutIcon} alt="Logout" style={styles.optionIcon} onClick={handleLogout} />
          <StyledButton onClick={handleLogout}>Logout</StyledButton>
        </div>

        {role === 'SELLER' && (
          <>
            <Link to={`/add-product?id=${id}&role=${role}&shopName=${shopName}`} style={styles.optionLink}>
              <div style={styles.option}>
                <img src={addproduct} alt="Add Product" style={styles.optionIcon} />
                <StyledButton>Add Product</StyledButton>
              </div>
            </Link>
            <Link to={`/delete-product?id=${id}&role=${role}&shopName=${shopName}`} style={styles.optionLink}>
              <div style={styles.option}>
                <img src={deletproduct} alt="Delete Product" style={styles.optionIcon} onClick={handleDeleteProduct} />
                <StyledButton onClick={handleDeleteProduct}>Delete Product</StyledButton>
              </div>
            </Link>
            <Link to={`/update-product?id=${id}&role=${role}&shopName=${shopName}`} style={styles.optionLink}>
              <div style={styles.option}>
                <img src={editproduct} alt="Edit Product" style={styles.optionIcon} onClick={handleEditProduct} />
                <StyledButton onClick={handleEditProduct}>Edit Product</StyledButton>
              </div>
            </Link>
          </>
        )}
      </div>

      <ConfirMationModel
        isOpen={isModalOpen}
        onConfirm={() => {
          handleDelete();
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}

const styles = {
  settingsBar: {
    position: 'fixed',
    top: '0',
    right: '-300px',
    width: '300px',
    height: '100%',
    backgroundColor: '#ccff33',
    boxShadow: '-2px 0 5px rgba(0,0,0,0.5)',
    padding: '20px',
    transition: 'right 0.3s ease',
    zIndex: 1000,
    '@media (max-width: 768px)': {
      width: '100%',
    },
    '@media (min-width: 769px) and (max-width: 1024px)': {
      width: '80%',
    },
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    top: '2vh',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: 0,
    '@media (max-width: 768px)': {
      top: '1vh',
    },
  },
  closeImage: {
    height: '5vh',
    width: 'auto',
    '@media (max-width: 768px)': {
      height: '4vh',
    },
    '@media (min-width: 769px) and (max-width: 1024px)': {
      height: '4.5vh',
    },
  },
  title: {
    fontSize: '1.5em',
    marginBottom: '20px',
    '@media (max-width: 768px)': {
      fontSize: '1.3em',
    },
    '@media (min-width: 769px) and (max-width: 1024px)': {
      fontSize: '1.4em',
    },
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  optionIcon: {
    height: '24px',
    width: 'auto',
    cursor: 'pointer',
  },
  optionLink: {
    textDecoration: 'none',
  },
};

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  font-size: 17px;
  color: #fff;
  border-radius: 7px;
  letter-spacing: 4px;
  font-weight: 700;
  text-transform: uppercase;
  transition: 0.5s;
  background: #006400;
  box-shadow: 0 0 25px rgb(0, 140, 255);
  width: 100%;

  &:hover {
    box-shadow: 0 0 5px rgb(0, 140, 255), 0 0 25px rgb(0, 140, 255), 0 0 50px rgb(0, 140, 255), 0 0 100px rgb(0, 140, 255);
  }
`;

export default SettingsBar;
