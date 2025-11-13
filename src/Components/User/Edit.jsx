import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Edit() {
  const [id, setId] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Refs for form inputs
  const nameRef = useRef(null);
  const addressRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get('id');
    const roleParam = params.get('role');

    setId(idParam || '');
    setRole(roleParam || '');
    // Debugging: Print the parameters
    console.log('ID:', idParam);
    console.log('Role:', roleParam);
  }, [location.search]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect form data using refs
    const formData = {
      name: nameRef.current.value,
      address: addressRef.current.value,
    };

    // Check if all fields are filled
    if (!formData.name || !formData.address) {
      setError('All fields are mandatory');
      return;
    }

    if (role === 'BUYER') {
      try {
        const response = await axios.put(`${API_BASE_URL}/api/users/${id}`, formData);
        setSuccessMessage('User details updated successfully');
        setTimeout(() => {
          navigate(`/user-home?id=${id}&name=${encodeURIComponent(formData.name)}&role=${role}`, { replace: true });
        }, 2000);
      } catch (error) {
        console.error('Error updating user details:', error);
        setError('Failed to update user details');
      }
    } else if (role === 'SELLER') {
      setSuccessMessage('You are a seller, and this form cannot be used for updating seller details.');
    } else {
      setError('Invalid role.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Edit User Details</h1>
      {error && <p style={styles.errorMessage}>{error}</p>}
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      {role === 'BUYER' ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            ref={nameRef}
            style={styles.input}
            required
          />
          <textarea
            name="address"
            placeholder="Address"
            ref={addressRef}
            style={styles.textarea}
            required
          />
          <button type="submit" style={styles.button}>Update</button>
        </form>
      ) : (
        <p style={styles.message}>You cannot update details because you are a seller.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '1.2em',
    marginBottom: '20px',
  },
  successMessage: {
    color: 'green',
    fontSize: '1.2em',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    fontSize: '1em',
    padding: '10px',
    margin: '10px',
    width: '80%',
  },
  textarea: {
    fontSize: '1em',
    padding: '10px',
    margin: '10px',
    width: '80%',
    height: '100px', // Adjust height as needed
  },
  button: {
    fontSize: '1.2em',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  message: {
    fontSize: '1.2em',
    margin: '20px',
  },
};

export default Edit;
