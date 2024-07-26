"use client";
import { useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { storeToken, isToken } from '@/app/store/tokenSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePass = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Email is empty');
      return;
    }
    if (!password) {
      toast.error('Password is empty');
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/user/login`, {
        email,
        password,
      });

      if (!response.data.success) {
        setError(response.data.message);
      } else {
        const token = response.data.token;
        dispatch(storeToken(token));
        Cookies.set('token', token, { expires: 7 }); // Set token in cookies for 7 days
        toast.success("Login successful");
      }
    } catch (error) {
      setError("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="title">Login</h2>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              placeholder="Enter your email"
              onChange={handleEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              onChange={handlePass}
              name="password"
              className="input"
              placeholder="Enter your password"
            />
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
}