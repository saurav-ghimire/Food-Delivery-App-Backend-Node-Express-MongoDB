
"use client"
import { assets } from '@/app/assets/assets';
import './Sidebar.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


function Sidebar() {
  const path  = usePathname();
  return (
    <aside className="sidebar">
      
      <Link href="/dashboard/add">
        <div className={`sidebar-item ${path === '/add' ? 'active' : ''}`}>
          <Image src={assets.add_icon} alt="Add" width={24} height={24} />
          <span>Add Item</span>
        </div>
      </Link>
      <Link href="/dashboard/list">
      <div className={`sidebar-item ${path === '/list' ? 'active' : ''}`}>
        <Image src={assets.order_icon} alt="Order" width={24} height={24} />
        <span>Food List</span>
      </div>
      </Link>
      <Link href="/dashboard/order">
      <div className="sidebar-item">
        <Image src={assets.parcel_icon} alt="Order List" width={24} height={24} />
        <span>Order List</span>
      </div>
      </Link>
      <Link href="/dashboard/allcategories">
      <div className="sidebar-item">
        <Image src={assets.upload_area} alt="Upload" width={24} height={24} />
        <span>Categories</span>
      </div>
      </Link>
      <Link href="/dashboard/categories">
      <div className="sidebar-item">
        <Image src={assets.upload_area} alt="Upload" width={24} height={24} />
        <span>Add Categories</span>
      </div>
      </Link>
    </aside>
  );
}

export default Sidebar;
