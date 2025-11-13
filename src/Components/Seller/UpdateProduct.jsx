import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ProductUpdate = () => {
  const [productId, setProductId] = useState('');
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);

  const [userId, setId] = useState('');
  const [role, setRole] = useState('');
  const [shopName, setShopName] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setId(params.get('id') || '');
    setRole(params.get('role') ? decodeURIComponent(params.get('role')) : '');
    setShopName(params.get('shopName') ? decodeURIComponent(params.get('shopName')) : '');
  }, [location.search]);

  const checkProductOwnership = () => {
    fetch(`${API_BASE_URL}/api/sellers/${userId}/products/${productId}/ownership`)
      .then(response => response.json())
      .then(isOwnedByUser => {
        if (isOwnedByUser) {
          setIsFormVisible(true);
          setError('');
        } else {
          setError('Product is owned by another seller');
        }
      })
      .catch(() => setError('Error checking product ownership'));
  };

  const handleProductIdSubmit = (e) => {
    e.preventDefault();
    checkProductOwnership();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: parseFloat(priceRef.current.value),
      category: categoryRef.current.value,
    };

    fetch(`${API_BASE_URL}/api/sellers/${userId}/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
    .then(response => {
      if (response.ok) {
        navigate(`/user-Home?id=${userId}&shopName=${shopName}&role=${role}`, { replace: true });
      } else {
        return response.json().then(data => setError(data.message || 'Failed to update product.'));
      }
    })
    .catch(() => setError('An error occurred while updating the product.'));
  };

  return (
    <FormContainer className="form">
      {!isFormVisible ? (
        <form onSubmit={handleProductIdSubmit}>
          <p>Enter Product ID</p>
          <div className="group">
            <input
              required
              className="main-input"
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Product ID"
            />
            <span className="highlight-span"></span>
            <label className="lebal-email">Product ID</label>
          </div>
          <button className="submit" type="submit">Verify Product ID</button>
          {error && <Error>{error}</Error>}
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>Update Product</p>
          <div className="group">
            <input required ref={nameRef} className="main-input" type="text" placeholder="Product Name" />
            <span className="highlight-span"></span>
            <label className="lebal-email">Product Name</label>
          </div>
          <div className="container-1">
            <div className="group">
              <textarea  ref={descriptionRef} className="main-input" placeholder="Product Description"></textarea>
              <span className="highlight-span"></span>
              <label className="lebal-email">Product Description</label>
            </div>
          </div>
          <div className="container-1">
            <div className="group">
              <input  ref={priceRef} className="main-input" type="number" placeholder="Product Price" />
              <span className="highlight-span"></span>
              <label className="lebal-email">Product Price</label>
            </div>
          </div>
          <div className="container-1">
            <div className="group">
              <input  ref={categoryRef} className="main-input" type="text" placeholder="Product Category" />
              <span className="highlight-span"></span>
              <label className="lebal-email">Product Category</label>
            </div>
          </div>
          <button className="submit" type="submit">Update Product</button>
          {error && <Error>{error}</Error>}
        </form>
      )}
    </FormContainer>
  );
};

// Styled components
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 120px 40px;
  background-color: black;
  border-radius: 20px;
  border: 1px solid white;

  p {
    padding-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: white;
  }

  .group {
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }

  .main-input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
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

  .lebal-email {
    color: #999999;
    font-size: 16px;
    position: absolute;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
  }

  .main-input:focus ~ .lebal-email,
  .main-input:valid ~ .lebal-email {
    top: -20px;
    font-size: 18px;
    color: #42ff1c;
  }

  .highlight-span {
    position: absolute;
    height: 60%;
    width: 0;
    top: 25%;
    left: 0;
    opacity: 0.5;
  }

  .main-input:focus ~ .highlight-span {
    animation: input-focus 0.3s ease;
  }

  @keyframes input-focus {
    from {
      background: #42ff1c;
    }
    to {
      width: 100%;
    }
  }

  .submit {
    margin-top: 1.2rem;
    padding: 10px 20px;
    border-radius: 10px;
    background: white;
    color: black;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

export default ProductUpdate;
