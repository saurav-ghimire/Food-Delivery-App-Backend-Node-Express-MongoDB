'use client'
import { assets } from '@/app/assets/assets';
import './Navbar.css';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { clearToken } from '@/app/store/tokenSlice';
import { useRouter } from 'next/navigation';

function Navbar() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    console.log('Logging out...');
    Cookies.remove('token', { path: '/' }); // Ensure the path matches
    dispatch(clearToken());
    console.log('Token cleared from Redux and cookies.');
    router.push('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Image src={assets.logo} alt="Logo" width={100} height={40} />
      </div>
      <div className="navbar-profile">
        
          <button className='logout' onClick={logout}>Logout</button>
        
      </div>
    </header>
  );
}

export default Navbar;
