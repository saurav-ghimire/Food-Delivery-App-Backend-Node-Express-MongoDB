
export const metadata = {
  title: "Admin Page",
  description: "Welcome to Admin Page",
};

import { Inter } from "next/font/google";
import "./globals.css";


import Navbar from "./component/navbar/Navbar";
import Sidebar from "./component/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="layout">
          <Navbar />
          <div className="main-content">
            <Sidebar />
            <div className="page-content">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
