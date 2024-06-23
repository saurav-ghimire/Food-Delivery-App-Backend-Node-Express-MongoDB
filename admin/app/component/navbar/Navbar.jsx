// components/navbar/Navbar.js
import { assets } from '@/app/assets/assets';
import './Navbar.css';
import Image from 'next/image';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Image src={assets.logo} alt="Logo" width={100} height={40} />
      </div>
      <div className="navbar-profile">
        <Image src={assets.profile_image} alt="Profile" width={40} height={40} className="navbar-profile-img" />
      </div>
    </header>
  );
}

export default Navbar;
