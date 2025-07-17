import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  FiUsers, 
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiBell,
  FiSearch
} from 'react-icons/fi';
import { RiBookShelfLine, RiDashboardLine } from 'react-icons/ri';
import { GiTakeMyMoney } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { IoIosCreate } from "react-icons/io";
export default function AuthorLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] =useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: <RiDashboardLine size={20} />, path: '/astra/author/'},
    { name: 'My Book', icon: <RiBookShelfLine size={20} />, path: '/astra/author/my book'},
    { name: 'Create Book', icon: <IoIosCreate  size={20} />, path: '/astra/author/book create'},
    { name: 'Wallets', icon: <GiTakeMyMoney size={20} />, path: '/astra/author/wallet'},
    { name: 'Profile', icon: <CgProfile size={20} />, path: '/astra/author/profile'},
  ];
  return (
    <div className="flex font-sans bg-gray-50">
      <div 
        className={`
          ${sidebarOpen ? 'w-64' : 'w-20'} 
          bg-indigo-700 text-white transition-all duration-300 ease-in-out
          flex flex-col fixed h-full z-50
        `}
      >
        <div className="p-4 flex items-center justify-between h-16 border-b border-indigo-600">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold whitespace-nowrap">Astra Book</h1>
          ) : (
            <div className="w-6"></div> 
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md hover:bg-indigo-600 transition-colors"
          >
            {sidebarOpen ? (
              <FiChevronLeft size={20} />
            ) : (
              <FiChevronRight size={20} />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex items-center p-3 mx-2 my-1 rounded-md
                transition-colors duration-200
                ${location.pathname === item.path 
                  ? 'bg-indigo-600 text-white' 
                  : 'hover:bg-indigo-600/80 text-white/90 hover:text-white'}
              `}
            >
              <span className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`}>
                {React.cloneElement(item.icon, {
                  className: location.pathname === item.path ? 'text-white' : 'text-white/90'
                })}
              </span>
              {sidebarOpen && (
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {!sidebarOpen && (
          <div className="p-2 border-t border-indigo-600">
            <div className="flex justify-center">
              <FiChevronRight size={18} className="text-white/70" />
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Fixed Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6 fixed w-full z-40" style={{
          width: sidebarOpen ? 'calc(100% - 16rem)' : 'calc(100% - 5rem)',
          left: sidebarOpen ? '16rem' : '5rem',
        }}>
          <div className="flex-1 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              ASTRA BOOK
            </h2>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 w-64"
                />
              </div>
              
              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <FiBell size={18} className="text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="flex items-center space-x-2">
                <img 
                  src="https://randomuser.me/api/portraits/men/4.jpg" 
                  alt="User" 
                  className="w-8 h-8 rounded-full object-cover"
                />
                {sidebarOpen && (
                  <div className="text-sm">
                    <p className="font-medium">Allen</p>
                    <p className="text-gray-500 text-xs">Author</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 mt-16">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}