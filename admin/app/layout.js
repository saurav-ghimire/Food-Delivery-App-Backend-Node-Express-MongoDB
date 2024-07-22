import { Inter } from "next/font/google";
import "./globals.css";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Page",
  description: "Welcome to Admin Page",
};

export default function RootLayout({ children }) {
  console.log("Main layout loaded");

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}  

        <ToastContainer />      
      </body>
    </html>
  );
}
