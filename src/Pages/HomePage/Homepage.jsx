import React, { useState } from 'react';
import { FiBook, FiSearch, FiStar, FiDownload, FiArrowRight, FiUser, FiMenu, FiX, FiLock, FiAward, FiEdit } from 'react-icons/fi';
import { Link } from 'react-router';

const HomePage = () => {
  // Featured books data
  const featuredBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: 4.5,
      category: "Fiction",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=450&q=80"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      rating: 4.8,
      category: "Self-Help",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=450&q=80"
    },
    {
      id: 3,
      title: "Dune",
      author: "Frank Herbert",
      rating: 4.7,
      category: "Sci-Fi",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=450&q=80"
    },
    {
      id: 4,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      rating: 4.6,
      category: "Fiction",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=450&q=80"
    }
  ];

  // New releases
  const newReleases = [
    {
      id: 5,
      title: "Project Hail Mary",
      author: "Andy Weir",
      rating: 4.9,
      category: "Sci-Fi",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=450&q=80"
    },
    {
      id: 6,
      title: "The Four Winds",
      author: "Kristin Hannah",
      rating: 4.7,
      category: "Historical Fiction",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=450&q=80"
    },
    {
      id: 7,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      rating: 4.4,
      category: "Literary Fiction",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=450&q=80"
    },
    {
      id: 8,
      title: "The Code Breaker",
      author: "Walter Isaacson",
      rating: 4.6,
      category: "Biography",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=450&q=80"
    }
  ];

  // Categories data
  const categories = [
    { name: "Fiction", icon: "📚" },
    { name: "Science Fiction", icon: "🚀" },
    { name: "Biography", icon: "👤" },
    { name: "Self-Help", icon: "💪" },
    { name: "Business", icon: "💼" },
    { name: "History", icon: "🏛️" }
  ];

  // Popular authors
  const popularAuthors = [
    {
      name: "Stephen King",
      books: 65,
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "J.K. Rowling",
      books: 24,
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Brandon Sanderson",
      books: 42,
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      name: "Margaret Atwood",
      books: 18,
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "James Patterson",
      books: 200,
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [activeRole, setActiveRole] = useState(null);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
    setActiveRole(null);
    document.body.style.overflow = 'auto';
  };

  const selectRole = (role) => {
    setActiveRole(role);
    setTimeout(() => {
      alert(`Redirecting to ${role} login...`);
      closeLoginModal();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <FiBook className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">AstraBook</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Browse
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Categories
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button 
                onClick={openLoginModal}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center"
              >
                <FiUser className="inline mr-1" /> Login / Register
              </button>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {mobileMenuOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a href="#" className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Home
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Browse
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Categories
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                About
              </a>
              <a 
                href="#" 
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={openLoginModal}
              >
                Login / Register
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
  {/* Login Modal */}
{/* Login Modal */}
{loginModalOpen && (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      {/* Background overlay */}
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeLoginModal}></div>
      </div>

      {/* Modal content */}
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-6 text-center">
                Login to AstraBook
              </h3>
              
              <form className="space-y-6" action={'admin'} >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('email').value = 'admin@astrabook.com';
                      document.getElementById('password').value = 'passwofdgrd1fg23';
                      window.location.replace('/astra/admin')
                    }}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('email').value = 'author@astrabook.com';
                      document.getElementById('password').value = 'password12dgh3';
                      window.location.replace('/astra/author')

                    }}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Author
                  </button>
                  {/* <button
                    type="button"
                    onClick={() => {
                      document.getElementById('email').value = 'Reader@astrabook.com';
                      document.getElementById('password').value = 'passworfdgdgd12fdg3';
                    }}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Reader
                  </button> */}
                </div>
              </form>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Don't have an account? <a href="#" className="text-indigo-600 hover:text-indigo-800">Register here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={closeLoginModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Discover Your Next <span className="text-yellow-300">Favorite Book</span>
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
            AstraBook offers unlimited access to thousands of eBooks across all genres. 
            Read anytime, anywhere on any device.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors transform hover:scale-105">
              Start Reading Free
            </button>
            <button className="bg-indigo-800 bg-opacity-60 text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-70 transition-colors transform hover:scale-105">
              Browse Catalog
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-center border-2 border-indigo-100">
          <FiSearch className="text-gray-400 mr-3 text-lg" />
          <input 
            type="text" 
            placeholder="Search for books, authors, or categories..."
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors transform hover:scale-105">
            Search
          </button>
        </div>
      </div>

      {/* Featured Books */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Featured Books</h2>
          <button className="text-indigo-600 hover:text-indigo-800 flex items-center group">
            View all <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1">
              <div className="h-64 bg-gray-200 relative">
                <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
                <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded flex items-center">
                  <FiStar className="mr-1" /> {book.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 text-lg">{book.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{book.author}</p>
                <div className="mt-3 flex items-center">
                  <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">{book.category}</span>
                </div>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Releases */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">New Releases</h2>
            <button className="text-indigo-600 hover:text-indigo-800 flex items-center group">
              View all <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newReleases.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1">
                <div className="h-64 bg-gray-200 relative">
                  <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded flex items-center">
                    <FiStar className="mr-1" /> {book.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-lg">{book.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{book.author}</p>
                  <div className="mt-3 flex items-center">
                    <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">{book.category}</span>
                  </div>
                  <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Browse Categories</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer transform hover:-translate-y-1"
              >
                <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-3 text-2xl">
                  {category.icon}
                </div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{Math.floor(Math.random() * 1000) + 500} books</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Authors */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Popular Authors</h2>
            <button className="text-indigo-600 hover:text-indigo-800 flex items-center group">
              View all <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {popularAuthors.map((author, index) => (
              <div key={index} className="text-center group">
                <div className="mx-auto h-32 w-32 rounded-full bg-gray-300 overflow-hidden mb-4 border-4 border-white shadow-md group-hover:border-indigo-300 transition-colors">
                  <img src={author.image} alt={author.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">{author.name}</h3>
                <p className="text-sm text-gray-500">{author.books} books</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">What Our Readers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="User" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <FiStar className="text-yellow-400 mr-1" />
                    <FiStar className="text-yellow-400 mr-1" />
                    <FiStar className="text-yellow-400 mr-1" />
                    <FiStar className="text-yellow-400" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"AstraBook has completely changed my reading habits. I can access thousands of books from my phone or tablet anytime I want."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">Michael Chen</h4>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <FiStar className="text-yellow-400 mr-1" />
                    <FiStar className="text-yellow-400 mr-1" />
                    <FiStar className="text-yellow-400 mr-1" />
                    <FiStar className="text-yellow-400" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"The selection is incredible and the app is so easy to use. I've discovered so many new authors I wouldn't have found otherwise."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="User" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">David Rodriguez</h4>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <FiStar className="text-yellow-400 mr-1" />
                    <FiStar className="text-yellow-400 mr-1" />
                    <FiStar className="text-yellow-400 mr-1" />
                    <FiStar className="text-gray-300" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"Perfect for commuting. I read 3-4 books a month now just during my train rides. The offline reading feature is a lifesaver."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to start your reading journey?
          </h2>
          <p className="mt-4 text-lg text-indigo-100 max-w-3xl mx-auto">
            Join thousands of readers enjoying unlimited access to our vast library of eBooks.
          </p>
          <button 
            onClick={openLoginModal}
            className="mt-8 bg-white text-indigo-600 px-8 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors transform hover:scale-105"
          >
            Sign Up Now - It's Free
          </button>
        </div>
      </div>

      {/* Footer */}
     {/* Footer */}
<footer className="bg-gray-800 text-gray-300">
  <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center">
          <FiBook className="h-6 w-6 text-indigo-400" />
          <span className="ml-2 text-xl font-bold text-white">AstraBook</span>
        </div>
        <p className="text-sm mt-4">Your gateway to unlimited reading. Discover, read, and enjoy books from anywhere.</p>
        <div className="mt-4 flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <span className="sr-only">Instagram</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Explore</h3>
        <ul className="mt-4 space-y-2">
          <li><a href="#" className="text-sm hover:text-white">Featured Books</a></li>
          <li><a href="#" className="text-sm hover:text-white">New Releases</a></li>
          <li><a href="#" className="text-sm hover:text-white">Popular Authors</a></li>
          <li><a href="#" className="text-sm hover:text-white">Categories</a></li>
          <li><a href="#" className="text-sm hover:text-white">Best Sellers</a></li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h3>
        <ul className="mt-4 space-y-2">
          <li><a href="#" className="text-sm hover:text-white">About Us</a></li>
          <li><a href="#" className="text-sm hover:text-white">Careers</a></li>
          <li><a href="#" className="text-sm hover:text-white">Blog</a></li>
          <li><a href="#" className="text-sm hover:text-white">Press</a></li>
          <li><a href="#" className="text-sm hover:text-white">Contact</a></li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
        <ul className="mt-4 space-y-2">
          <li><a href="#" className="text-sm hover:text-white">Terms of Service</a></li>
          <li><a href="#" className="text-sm hover:text-white">Privacy Policy</a></li>
          <li><a href="#" className="text-sm hover:text-white">Cookie Policy</a></li>
          <li><a href="#" className="text-sm hover:text-white">Copyright</a></li>
          <li><a href="#" className="text-sm hover:text-white">DMCA</a></li>
        </ul>
      </div>
    </div>
    
    <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm text-gray-400">© 2023 AstraBook. All rights reserved.</p>
      <div className="mt-4 md:mt-0 flex space-x-6">
        <a href="#" className="text-sm text-gray-400 hover:text-white">Terms</a>
        <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy</a>
        <a href="#" className="text-sm text-gray-400 hover:text-white">Cookies</a>
      </div>
    </div>
  </div>
</footer>
</div>

)
}
export default HomePage
