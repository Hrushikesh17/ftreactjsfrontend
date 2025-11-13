import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const DeleteProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const InputContainer = styled.div`
  position: relative;
  margin: 50px auto;
  width: 190px;
`;

const InputField = styled.input`
  font-size: 20px;
  color: rgb(255, 255, 255);
  border: none;
  border-bottom: 2px solid #a5a2a2;
  outline: none;
  width: 100%;
  background-color: transparent;
  
  &:focus ~ label,
  &:valid ~ label {
    top: -20px;
    transition: 0.3s;
    color: rgb(172, 46, 172);
  }
  
  &:focus ~ .underline,
  &:valid ~ .underline {
    transform: scaleX(1);
    transition: 1s;
  }

  &:focus ~ .sideline,
  &:valid ~ .sideline {
    transform: scaleX(1);
    transition: 1s;
  }

  &:focus ~ .upperline,
  &:valid ~ .upperline {
    transform: scaleX(1);
    transition: 1s;
  }

  &:focus ~ .line,
  &:valid ~ .line {
    transform: scaleX(1);
    transition: 1s;
  }
`;

const Label = styled.label`
  transition: all 0.3s ease;
  color: #d3d2d2;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const Underline = styled.div`
  position: absolute;
  bottom: 4px;
  left: -7px;
  height: 2px;
  width: 110%;
  background-color: rgb(172, 46, 172);
  transform: scaleX(0);
`;

const Sideline = styled.div`
  position: relative;
  bottom: 15px;
  right: 18px;
  height: 2px;
  width: 18%;
  background-color: rgb(172, 46, 172);
  transform: scaleX(0);
  rotate: 90deg;
`;

const Upperline = styled.div`
  position: absolute;
  bottom: 30px;
  left: -8px;
  height: 2px;
  width: 110%;
  background-color: rgb(172, 46, 172);
  transform: scaleX(0);
`;

const Line = styled.div`
  position: relative;
  bottom: 17px;
  left: 178px;
  height: 2px;
  width: 18%;
  background-color: rgb(172, 46, 172);
  transform: scaleX(0);
  rotate: 90deg;
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f;
  }
`;

const Message = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: ${({ isError }) => (isError ? 'red' : 'green')};
`;

const DeleteProduct = () => {
  const productIdRef = useRef(null);  // Use useRef for product ID input
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const [id, setId] = useState('');
  const [role, setRole] = useState('');
  const [shopName, setShopName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setId(params.get('id') || '');
    setRole(params.get('role') ? decodeURIComponent(params.get('role')) : '');
    setShopName(params.get('shopName') ? decodeURIComponent(params.get('shopName')) : '');
  }, [location.search]);

  const handleDeleteProduct = async () => {
    const productId = productIdRef.current.value;

    if (!productId) {
      setMessage('Please enter a product ID');
      setIsError(true);
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/sellers/${id}/products/${productId}`);
      setMessage('Product deleted successfully');
      setIsError(false);

      setTimeout(() => {
        navigate(`/user-Home?id=${id}&shopName=${shopName}&role=${role}`, { replace: true });
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('Product not found or invalid product ID');
      } else if (error.response && error.response.status === 403) {
        setMessage('You do not own this product');
      } else {
        setMessage('An error occurred while deleting the product');
      }
      setIsError(true);
    }
  };

  return (
    <DeleteProductContainer>
      <h2 style={{ color: '#fff' }}>Delete Product</h2>
      <InputContainer className="input-container">
        <InputField
          ref={productIdRef}  // Set ref to the input field
          type="text"
          required
          id="input"
        />
        <Label className="label" htmlFor="input">Enter Product ID</Label>
        <Underline className="underline"></Underline>
        <Sideline className="sideline"></Sideline>
        <Upperline className="upperline"></Upperline>
        <Line className="line"></Line>
      </InputContainer>
      <DeleteButton onClick={handleDeleteProduct}>Delete Product</DeleteButton>
      {message && <Message isError={isError}>{message}</Message>}
    </DeleteProductContainer>
  );
};

export default DeleteProduct;
