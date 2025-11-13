// src/Components/SearchProductList.jsx
import React from 'react';

function SearchProductList({ products }) {
  return (
    <div style={styles.productList}>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map(product => (
          <div key={product.id} style={styles.productCard}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Category: {product.category}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  productList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns layout
    gap: '20px',
    padding: '20px',
  },
  productCard: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fffffff',
  },
};

export default SearchProductList;
