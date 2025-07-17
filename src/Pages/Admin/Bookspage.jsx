import React, { useState } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiEdit2, 
  FiTrash2, 
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiBook,
  FiBookOpen,
  FiDollarSign,
  FiCalendar,
  FiX,
  FiDownload,
  FiUser,
  FiStar
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../Component/Admin/AdminDashboard';

const BooksPage = () => {
  // Sample book data
  const [books, setBooks] = useState([
    { 
      id: 1, 
      title: 'The Great Gatsby', 
      author: 'F. Scott Fitzgerald', 
      isbn: '9780743273565', 
      genre: 'Classic', 
      price: 12.99, 
      stock: 45,
      rating: 4.5,
      publishedDate: '1925-04-10',
      status: 'published'
    },
    { 
      id: 2, 
      title: 'To Kill a Mockingbird', 
      author: 'Harper Lee', 
      isbn: '9780061120084', 
      genre: 'Fiction', 
      price: 10.50, 
      stock: 32,
      rating: 4.8,
      publishedDate: '1960-07-11',
      status: 'published'
    },
    { 
      id: 3, 
      title: '1984', 
      author: 'George Orwell', 
      isbn: '9780451524935', 
      genre: 'Dystopian', 
      price: 9.99, 
      stock: 28,
      rating: 4.7,
      publishedDate: '1949-06-08',
      status: 'published'
    },
    { 
      id: 4, 
      title: 'The Hobbit', 
      author: 'J.R.R. Tolkien', 
      isbn: '9780547928227', 
      genre: 'Fantasy', 
      price: 14.95, 
      stock: 0,
      rating: 4.6,
      publishedDate: '1937-09-21',
      status: 'out_of_stock'
    },
    { 
      id: 5, 
      title: 'Pride and Prejudice', 
      author: 'Jane Austen', 
      isbn: '9781503290563', 
      genre: 'Romance', 
      price: 8.75, 
      stock: 15,
      rating: 4.2,
      publishedDate: '1813-01-28',
      status: 'published'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: 'Fiction',
    price: '',
    stock: '',
    status: 'published'
  });

  const booksPerPage = 5;
  const genres = ['Fiction', 'Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Thriller', 'Biography', 'History', 'Classic', 'Dystopian'];

  // Filter books based on search term
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Delete book
  const deleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  // Add new book
  const handleAddBook = () => {
    const bookToAdd = {
      ...newBook,
      id: Math.max(...books.map(b => b.id)) + 1,
      rating: 0,
      publishedDate: new Date().toISOString().split('T')[0],
      price: parseFloat(newBook.price),
      stock: parseInt(newBook.stock)
    };
    setBooks([...books, bookToAdd]);
    setNewBook({
      title: '',
      author: '',
      isbn: '',
      genre: 'Fiction',
      price: '',
      stock: '',
      status: 'published'
    });
    setIsModalOpen(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value
    });
  };

  // View book details
  const viewBookDetails = (book) => {
    setSelectedBook(book);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <DashboardLayout>
      {/* Add Book Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">Add New Book</h3>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newBook.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                      placeholder="Book Title"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                      <input
                        type="text"
                        name="author"
                        value={newBook.author}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                        placeholder="Author Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ISBN</label>
                      <input
                        type="text"
                        name="isbn"
                        value={newBook.isbn}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                        placeholder="ISBN Number"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                      <select
                        name="genre"
                        value={newBook.genre}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3OGJhZCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                      >
                        {genres.map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        name="status"
                        value={newBook.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3OGJhZCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="out_of_stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                        <input
                          type="number"
                          name="price"
                          value={newBook.price}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={newBook.stock}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                        placeholder="Quantity"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-5 bg-gray-50 border-t">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBook}
                  disabled={!newBook.title || !newBook.author || !newBook.isbn}
                  className={`px-5 py-2.5 text-sm font-medium text-white rounded-xl transition-colors
                    ${!newBook.title || !newBook.author || !newBook.isbn ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm'}`}
                >
                  Add Book
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">Book Details</h3>
                  <button 
                    onClick={() => setSelectedBook(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 h-16 w-16 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <FiBook className="text-indigo-600 text-2xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{selectedBook.title}</h4>
                    <p className="text-sm text-gray-500">by {selectedBook.author}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-lg shadow-xs mr-3">
                      <FiBookOpen className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ISBN</p>
                      <p className="text-sm font-medium text-gray-800">{selectedBook.isbn}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-lg shadow-xs mr-3">
                      <FiUser className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Genre</p>
                      <p className="text-sm font-medium text-gray-800">{selectedBook.genre}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-lg shadow-xs mr-3">
                      <FiDollarSign className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-sm font-medium text-gray-800">{formatCurrency(selectedBook.price)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="bg-white p-2 rounded-lg shadow-xs mr-3">
                        <FiStar className="text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Rating</p>
                        <p className="text-sm font-medium text-gray-800">{selectedBook.rating}/5</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="bg-white p-2 rounded-lg shadow-xs mr-3">
                        <FiCalendar className="text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Published</p>
                        <p className="text-sm font-medium text-gray-800">
                          {new Date(selectedBook.publishedDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-lg shadow-xs mr-3">
                      {selectedBook.status === 'published' ? <FiBook className="text-green-500" /> : 
                       selectedBook.status === 'draft' ? <FiBook className="text-yellow-500" /> : 
                       <FiBook className="text-red-500" />}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="text-sm font-medium text-gray-800 capitalize">
                        {selectedBook.status.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end p-5 bg-gray-50 border-t">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header with actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Book Management</h2>
            <p className="text-sm text-gray-500 mt-1">Manage all books in your inventory</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search books..."
                className="pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                <FiDownload size={16} />
                <span>Export</span>
              </button>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FiPlus size={16} />
                <span>Add Book</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 p-6 border-b">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm">
            <FiFilter size={14} />
            <span>Filter:</span>
          </div>
          <button className="px-3 py-1.5 text-sm rounded-full bg-indigo-100 text-indigo-700 font-medium">All</button>
          {genres.slice(0, 5).map(genre => (
            <button key={genre} className="px-3 py-1.5 text-sm rounded-full hover:bg-gray-100">
              {genre}
            </button>
          ))}
        </div>

        {/* Books Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentBooks.length > 0 ? (
                currentBooks.map((book) => (
                  <motion.tr 
                    key={book.id} 
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div 
                        className="flex items-center cursor-pointer"
                        onClick={() => viewBookDetails(book)}
                      >
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <FiBook className="text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{book.title}</div>
                          <div className="text-xs text-gray-500">ISBN: {book.isbn}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{book.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium
                        ${book.genre === 'Fiction' ? 'bg-blue-100 text-blue-800' : 
                           book.genre === 'Fantasy' ? 'bg-purple-100 text-purple-800' :
                           book.genre === 'Classic' ? 'bg-amber-100 text-amber-800' :
                           'bg-gray-100 text-gray-800'}`}>
                        {book.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(book.price)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium
                        ${book.stock > 20 ? 'bg-green-100 text-green-800' : 
                           book.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                           'bg-red-100 text-red-800'}`}>
                        {book.stock} {book.stock === 1 ? 'copy' : 'copies'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 p-1 transition-colors"
                          onClick={() => viewBookDetails(book)}
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button 
                          onClick={() => deleteBook(book.id)}
                          className="text-red-600 hover:text-red-900 p-1 transition-colors"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <div className="text-gray-500 flex flex-col items-center justify-center">
                      <FiBook className="text-gray-300 text-4xl mb-3" />
                      <p className="text-lg font-medium">No books found</p>
                      <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredBooks.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t">
            <div className="text-sm text-gray-500 mb-4 sm:mb-0">
              Showing <span className="font-medium">{indexOfFirstBook + 1}</span> to <span className="font-medium">{Math.min(indexOfLastBook, filteredBooks.length)}</span> of <span className="font-medium">{filteredBooks.length}</span> books
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiChevronLeft size={20} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-md text-sm font-medium ${currentPage === page ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BooksPage;