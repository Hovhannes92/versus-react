import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', passwordConfirmation: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/signup`, formData);

      if (response.data) {
        // After successful signup, save the token if provided
        localStorage.setItem('token', response.data.access_token); // Assuming the token is returned from signup

        // Redirect to home page after successful signup
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Enter Your Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Enter Your Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="passwordConfirmation" placeholder="Confirm Password" value={formData.passwordConfirmation} onChange={handleChange} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}

export default Signup;
