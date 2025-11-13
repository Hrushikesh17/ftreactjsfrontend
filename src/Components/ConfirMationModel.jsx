import React from 'react';
import styled from 'styled-components';

function ConfirMationModel({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <StyledOverlay>
      <StyledModal>
        <h2>Are you sure you want to delete your profile?</h2>
        <div style={styles.buttonContainer}>
          <StyledConfirmButton onClick={onConfirm}>Yes</StyledConfirmButton>
          <StyledCancelButton onClick={onCancel}>No</StyledCancelButton>
        </div>
      </StyledModal>
    </StyledOverlay>
  );
}

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const StyledModal = styled.div`
  background-color: #f7cad0;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  color: red;

  @media (max-width: 768px) {
    width: 80%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 10px;
  }
`;

const StyledConfirmButton = styled.button`
  background-color: #28a745; /* Green */
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 10px 20px;
  font-size: 17px;
  letter-spacing: 4px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0 10px;
  transition: 0.5s;
  transition-property: box-shadow;
  box-shadow: 0 0 25px #28a745; /* Green shadow */

  &:hover {
    box-shadow: 0 0 5px #28a745,
                0 0 25px #28a745,
                0 0 50px #28a745,
                0 0 100px #28a745;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8em;
  }
`;

const StyledCancelButton = styled.button`
  background-color: #dc3545; /* Red */
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 10px 20px;
  font-size: 17px;
  letter-spacing: 4px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0 10px;
  transition: 0.5s;
  transition-property: box-shadow;
  box-shadow: 0 0 25px #dc3545; /* Red shadow */

  &:hover {
    box-shadow: 0 0 5px #dc3545,
                0 0 25px #dc3545,
                0 0 50px #dc3545,
                0 0 100px #dc3545;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8em;
  }
`;

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    gap: '10px',
    flexDirection: 'row',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
};

export default ConfirMationModel;
