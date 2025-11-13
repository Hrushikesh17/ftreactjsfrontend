// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function ProductList({ id, role }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state

//   const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true); // Start loading
//       console.log('Role:', role); // Debug role value
//       try {
        
//         if (role === 'SELLER') {
//           const response = await axios.get(`${API_BASE_URL}/api/sellers/${id}/products`);
//           setProducts(response.data);
//           console.log('Products fetched:', response.data);// Fetch products owned by seller
          
//         } else if(role==='BUYER') {
//           const response = await axios.get(`${API_BASE_URL}/api/users`);
//           setProducts(response.data);
//           console.log('Products fetched:', response.data); // Endpoint for all products or buyer-specific products
        
//         }

//         // Debug fetched products
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchProducts();
//   }, [id, role]);

//   if (loading) {
//     return <p>Loading products...</p>; // Loading indicator
//   }

//   return (
//     <div style={styles.productList}>
//       {products.length === 0 ? (
//         <p>No products available.</p> // Message for empty product list
//       ) : (
//         products.map((product, index) => (
//           <div key={product.id || index} style={styles.productCard}>
//             <h2>{product.name}</h2>
//             <p>{product.description}</p>
//             <p>Price: ${product.price}</p>
//             <p>Category: {product.category}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// const styles = {
//   productList: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns layout
//     gap: '20px',
//     padding: '20px',
//     marginTop: '45vh', // Add space from the top to make room for the navbar
//   },
//   productCard: {
//     backgroundColor: '',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//   },
//   '@media (max-width: 1024px)': { // Tablet view
//     productList: {
//       gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns on tablets
//     },
//   },
//   '@media (max-width: 768px)': { // Mobile view
//     productList: {
//       gridTemplateColumns: 'repeat(1, 1fr)', // 1 column on mobile
//     },
//   },
// };

// export default ProductList;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function ProductList({ id, role }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (role === 'SELLER') {
          const response = await axios.get(`${API_BASE_URL}/api/sellers/${id}/products`);
          setProducts(response.data);
        } else if (role === 'BUYER') {
          const response = await axios.get(`${API_BASE_URL}/api/users`);
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, role]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <ProductGrid>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product, index) => (
          <Card key={product.id || index}>
            <div className="card__shine" />
            <div className="card__glow" />
            <div className="card__content">
              <div className="card__badge">NEW</div>
              <div className="card__image" />
              <div className="card__text">
                <p className="card__title">{product.name}</p>
                <p className="card__description">{product.description}</p>
              </div>
              <div className="card__footer">
                <div className="card__price">${product.price}</div>
                <div className="card__button">
                  <svg height={16} width={16} viewBox="0 0 24 24">
                    <path
                      strokeWidth={2}
                      stroke="currentColor"
                      d="M4 12H20M12 4V20"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>

              <div className="card__actions">
                <button className="view-btn">View Details</button>
                <button className="buy-btn">Buy Now</button>
              </div>
            </div>
          </Card>
        ))
      )}
    </ProductGrid>
  );
}

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  padding: 20px;
  margin-top: 45vh;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Card = styled.div`
  --card-bg: #ffffff;
  --card-accent: #7c3aed;
  --card-text: #1e293b;
  --card-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);

  width: 220px;
  height: 300px; /* increased height */
  background: var(--card-bg);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--card-shadow);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .card__shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0) 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card__glow {
    position: absolute;
    inset: -10px;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(124, 58, 237, 0.3) 0%,
      rgba(124, 58, 237, 0) 70%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .card__content {
    padding: 1.25em;
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    height: 100%;
    position: relative;
    z-index: 2;
  }

  .card__badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #10b981;
    color: white;
    padding: 0.25em 0.5em;
    border-radius: 999px;
    font-size: 0.7em;
    font-weight: 600;
    transform: scale(0.8);
    opacity: 0;
    transition: all 0.4s ease 0.1s;
  }

  .card__image {
    width: 100%;
    height: 90px;
    background: linear-gradient(45deg, #a78bfa, #8b5cf6);
    border-radius: 12px;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
  }

  .card__text {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
  }

  .card__title {
    color: var(--card-text);
    font-size: 1.1em;
    font-weight: 700;
    margin: 0;
  }

  .card__description {
    color: var(--card-text);
    font-size: 0.75em;
    margin: 0;
    opacity: 0.7;
  }

  .card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card__price {
    color: var(--card-text);
    font-weight: 700;
    font-size: 1em;
  }

  .card__button {
    width: 28px;
    height: 28px;
    background: var(--card-accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
  }

  .card__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .view-btn,
  .buy-btn {
    flex: 1;
    margin: 5px 3px;
    padding: 6px 8px;
    border: none;
    border-radius: 8px;
    font-size: 0.8em;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s ease;
  }

  .view-btn {
    background: #60a5fa;
    color: white;
  }

  .view-btn:hover {
    background: #3b82f6;
  }

  .buy-btn {
    background: #10b981;
    color: white;
  }

  .buy-btn:hover {
    background: #059669;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  &:hover .card__shine {
    opacity: 1;
    animation: shine 3s infinite;
  }

  &:hover .card__glow {
    opacity: 1;
  }

  &:hover .card__badge {
    transform: scale(1);
    opacity: 1;
  }

  &:hover .card__image {
    transform: translateY(-5px) scale(1.03);
  }

  @keyframes shine {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

export default ProductList;
