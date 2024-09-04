import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');

      // If the token is missing, handle the error
      if (!token) {
        console.error('No token found, redirecting to login.');
        navigate('/login');
        return;
      }

      // Make a logout request to the backend
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token is correctly formatted with Bearer
          },
        }
      );

      // Remove the token from local storage
      localStorage.removeItem('token');

      // Redirect to login page
      navigate('/login');
    } catch (err) {
      console.error('Error during logout:', err);
      if (err.response && err.response.status === 401) {
        // If unauthorized, remove token and redirect to login
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        // Handle other errors if needed
        console.error('Unexpected error:', err);
      }
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
