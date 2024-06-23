// components/sidebar/Sidebar.js
import { assets } from '@/app/assets/assets';
import './Sidebar.css';
import Image from 'next/image';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-item">
        <Image src={assets.add_icon} alt="Add" width={24} height={24} />
        <span>Add Item</span>
      </div>
      <div className="sidebar-item">
        <Image src={assets.order_icon} alt="Order" width={24} height={24} />
        <span>Order List</span>
      </div>
      <div className="sidebar-item">
        <Image src={assets.parcel_icon} alt="Parcel" width={24} height={24} />
        <span>Parcel</span>
      </div>
      <div className="sidebar-item">
        <Image src={assets.upload_area} alt="Upload" width={24} height={24} />
        <span>Upload Area</span>
      </div>
    </aside>
  );
}

export default Sidebar;
