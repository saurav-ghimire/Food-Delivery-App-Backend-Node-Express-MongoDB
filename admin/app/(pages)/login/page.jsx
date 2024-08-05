'use client'
import { useEffect, useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { storeToken } from '@/app/store/tokenSlice';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(storeToken);
  const router = useRouter();

  useEffect(() => {
    if (token?.payload?.token) {
      router.push('/dashboard');
    }
  }, [token, router]);

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

    setLoading(true); // Start loading

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/user/login/admin`, {
        email,
        password,
      });

      if (!response.data.success) {
        setError(response.data.message);
        toast.error(response.data.message);
      } else {
        const token = response.data.token;
        console.log(response.data);
        dispatch(storeToken(token));
        Cookies.set('token', token, { expires: 7 }); // Set token in cookies for 7 days
        router.push('/dashboard'); 
      }
    } catch (error) {
      setError("Login failed");
      toast.error("Login failed");
    } finally {
      setLoading(false); // Stop loading
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
              value={email}
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
              value={password}
            />
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
