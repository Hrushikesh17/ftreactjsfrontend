import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import the useNavigate hook

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
  padding: 40px;
  background: #e3e3e3;
  box-shadow: 16px 16px 32px #c8c8c8, -16px -16px 32px #fefefe;
  border-radius: 8px;
`;

const InputBox = styled.div`
  position: relative;
  width: 250px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  border-bottom-left-radius: 8px;
  transition: 0.1s;
  &:focus, &:valid {
    border: 2px solid #000;
    border-radius: 8px;
  }
  &:focus ~ span, &:valid ~ span {
    transform: translateY(-30px);
    font-size: 0.8em;
    padding: 5px 10px;
    background: #000;
    color: #fff;
    letter-spacing: 0.2em;
    border-radius: 8px;
  }
`;

const Label = styled.span`
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 14px;
  color: #000;
  pointer-events: none;
  transition: 0.5s;
  letter-spacing: 2px;
`;

const Button = styled.button`
  height: 45px;
  width: 100px;
  border-radius: 5px;
  border: 2px solid #000;
  cursor: pointer;
  background-color: transparent;
  transition: 0.5s;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 2px;
  &:hover {
    background-color: #000;
    color: white;
  }
`;

const Message = styled.p`
  color: ${(props) => (props.success ? 'green' : 'red')};
`;

const AddProduct = () => {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  
  const [message, setMessage] = useState('');
  const [id, setId] = useState('');
  const [role, setRole] = useState('');
  const [shopName, setShopName] = useState('');

  const location = useLocation();
  const navigate = useNavigate(); // Use the useNavigate hook to programmatically navigate

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setId(params.get('id') || '');
    setRole(params.get('role') ? decodeURIComponent(params.get('role')) : '');
    setShopName(params.get('shopName') ? decodeURIComponent(params.get('shopName')) : '');
  }, [location.search]); // Dependency array ensures this effect runs only when location.search changes

  console.log(id,role,shopName);
  const handleSubmit = async () => {
    const product = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: parseFloat(priceRef.current.value),
      category: categoryRef.current.value,
    };
  
    try {
      const response = await axios.post(`${API_BASE_URL}/api/sellers/${id}/products`, product);
      if (response.status === 201) {
        setMessage('Product added successfully!');
        setTimeout(() => {
          navigate(`/user-Home?id=${id}&shopName=${shopName}&role=${role}`, { replace: true }); // Corrected line
        }, 1500); // Delay to let the success message show before redirecting
      }
    } catch (error) {
      setMessage('Failed to add product. Please try again.');
    }
  };

  return (
    <Container>
      <Card>
        <InputBox>
          <Input type="text" ref={nameRef} required />
          <Label>Product Name</Label>
        </InputBox>
        <InputBox>
          <Input type="text" ref={descriptionRef} required />
          <Label>Description</Label>
        </InputBox>
        <InputBox>
          <Input type="number" ref={priceRef} required />
          <Label>Price</Label>
        </InputBox>
        <InputBox>
          <Input type="text" ref={categoryRef} required />
          <Label>Category</Label>
        </InputBox>
        <Button onClick={handleSubmit}>Add Product</Button>
        {message && <Message success={message.includes('successfully')}>{message}</Message>}
      </Card>
    </Container>
  );
};

export default AddProduct;
