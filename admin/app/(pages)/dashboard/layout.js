import { Inter } from "next/font/google";
import "@/app/globals.css";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/app/component/navbar/Navbar";
import Sidebar from "@/app/component/sidebar/Sidebar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Page",
  description: "Welcome to Admin Page",
};

export default function RootLayout({ children }) {
  console.log("Main layout loaded");

  return (
    
        <div className="layout">
          <Navbar />
          <div className="main-content">
            <Sidebar />
            <div className="page-content">
              {children}
            </div>
          </div>
        </div>
        
      
  );
}
