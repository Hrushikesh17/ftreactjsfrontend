import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import ProductList from './ProductList';
import SettingsBar from './SettingsBar';
import SearchProductList from './SearchProductList';
import searchIcon from '../Assets/search.png';
import { useLocation } from 'react-router-dom';

function HomePage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [shopName, setShopName] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Update role, id, and name based on URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setId(params.get('id') || '');
    setName(params.get('name') ? decodeURIComponent(params.get('name')) : '');
    setRole(params.get('role') ? decodeURIComponent(params.get('role')) : '');
    setShopName(params.get('shopName') ? decodeURIComponent(params.get('shopName')) : '');
  }, [location.search]);

  console.log(id, name, shopName, role);

  // Cycle background color every second
  useEffect(() => {
    const colors = ['#ccff33', '#9ef01a', '#70e000', '#38b000', '#008000', '#007200', '#006400', '#004b23', '#03045e', '#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4', '#ade8f4', '#caf0f8'];
    const interval = setInterval(() => {
      setBgColor(prevColor => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Focus search input on component mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Handle search input changes with debouncing
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (searchKeyword.trim() === '') {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      handleSearch();
    }, 300);

    setDebounceTimeout(timeout);
  }, [searchKeyword, role, id]);

  const handleSearch = async () => {
    if (searchKeyword.trim() === '') {
      return;
    }

    try {
      const endpoint =
        role === 'SELLER'
          ? `${API_BASE_URL}/api/sellers/${id}/products/search/${searchKeyword}`
          : `${API_BASE_URL}/api/users/search/${searchKeyword}`;

      const response = await axios.get(endpoint);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  const handleInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const clearSearch = () => {
    setSearchKeyword('');
    setSearchResults([]);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const toggleSettingsBar = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div style={{ ...styles.pageContainer, backgroundColor: bgColor }}>
      <Navbar onSettingsClick={toggleSettingsBar} name={name} shopName={shopName}/>
      <div style={styles.searchBar}>
        <input type="text" placeholder="Search..."
          style={styles.searchInput}
          ref={searchInputRef}
          value={searchKeyword}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <img
          src={searchIcon}
          alt="Search"
          style={styles.searchIcon}
          onClick={handleSearch}
        />
        {searchKeyword && (
          <button onClick={clearSearch} style={styles.clearButton}>Clear</button>
        )}
      </div>
      <div style={styles.contentContainer}>
        {searchKeyword ? (
          <SearchProductList products={searchResults} />
        ) : (
          <ProductList id={id} role={role} />
        )}
        <SettingsBar isOpen={isSettingsOpen} onClose={toggleSettingsBar} shopName={shopName} id={id} role={role} name={name} />
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    transition: 'background-color 1s ease',
  },
  contentContainer: {
    flex: 1,
    paddingTop: '12vh',  // Ensures content starts below the navbar
  },
  searchBar: {
    position: 'fixed',
    top: '15vh',  // Positioned just under the navbar
    left: '50%',
    transform: 'translateX(-50%)',  // Centers the search bar horizontally
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    padding: '5px 10px',
    zIndex: 1000,
    width: '80%',
    maxWidth: '400px',
    transition: 'width 0.3s ease', // Smooth resizing for responsiveness
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    padding: '10px',
    borderRadius: '20px',
    width: '100%',
  },
  searchIcon: {
    height: '24px',
    marginLeft: '10px',
    cursor: 'pointer',
  },
  clearButton: {
    background: 'none',
    border: 'none',
    color: 'blue',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  '@media (min-width: 600px)': { // For mobile devices
    searchBar: {
      top: '50vh',  // Move the search bar below the navbar
      width: '30%',  // Smaller width for mobile devices
    },
  },
  '@media (min-width: 768px)': { // For tablets
    searchBar: {
      top: '10vh',  // Slightly lower on tablets for better spacing
      width: '60%',  // Adjust the width for larger screens
    },
  },
  '@media (min-width: 1024px)': { // For laptops/desktops
    searchBar: {
      top: '10vh',  // Positioned under the navbar
      width: '40%',  // More compact on larger screens
    },
  },
};

export default HomePage;
