import React, { useState } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiEdit2, 
  FiTrash2, 
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiUserCheck,
  FiUserX,
  FiX,
  FiDownload,
  FiPhone,
  FiMail,
  FiClock
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../Component/Admin/AdminDashboard';

const UsersPage = () => {
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '(555) 123-4567', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
    { id: 2, name: 'Michael Chen', email: 'michael@example.com', phone: '(555) 234-5678', role: 'Editor', status: 'active', joinDate: '2023-02-20' },
    { id: 3, name: 'Emma Wilson', email: 'emma@example.com', phone: '(555) 345-6789', role: 'Author', status: 'pending', joinDate: '2023-03-10' },
    { id: 4, name: 'David Kim', email: 'david@example.com', phone: '(555) 456-7890', role: 'Subscriber', status: 'active', joinDate: '2023-04-05' },
    { id: 5, name: 'Lisa Wong', email: 'lisa@example.com', phone: '(555) 567-8901', role: 'Author', status: 'inactive', joinDate: '2023-05-12' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Subscriber',
    status: 'active'
  });

  const usersPerPage = 5;

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Change status
  const toggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
  };

  // Delete user
  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Add new user
  const handleAddUser = () => {
    const userToAdd = {
      ...newUser,
      id: Math.max(...users.map(u => u.id)) + 1,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, userToAdd]);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'Subscriber',
      status: 'active'
    });
    setIsModalOpen(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  // View user details
  const viewUserDetails = (user) => {
    setSelectedUser(user);
  };

  return (
    <DashboardLayout>
      {/* Add User Modal */}
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
                  <h3 className="text-xl font-semibold text-gray-800">Add New User</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={newUser.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <select
                        name="role"
                        value={newUser.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3OGJhZCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Author">Author</option>
                        <option value="Subscriber">Subscriber</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        name="status"
                        value={newUser.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3OGJhZCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
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
                  onClick={handleAddUser}
                  disabled={!newUser.name || !newUser.email}
                  className={`px-5 py-2.5 text-sm font-medium text-white rounded-xl transition-colors
                    ${!newUser.name || !newUser.email ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm'}`}
                >
                  Add User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
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
                  <h3 className="text-xl font-semibold text-gray-800">User Details</h3>
                  <button 
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 h-16 w-16 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <FiUser className="text-indigo-600 text-2xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h4>
                    <span className={`px-2.5 py-1 text-xs rounded-full font-medium
                      ${selectedUser.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                         selectedUser.role === 'Editor' ? 'bg-blue-100 text-blue-800' :
                         selectedUser.role === 'Author' ? 'bg-green-100 text-green-800' :
                         'bg-gray-100 text-gray-800'}`}>
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-lg shadow-xs mr-3">
                      <FiMail className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-800">{selectedUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-lg shadow-xs mr-3">
                      <FiPhone className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-800">{selectedUser.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-lg shadow-xs mr-3">
                      {selectedUser.status === 'active' ? <FiUserCheck className="text-green-500" /> : 
                       selectedUser.status === 'pending' ? <FiUser className="text-yellow-500" /> : 
                       <FiUserX className="text-red-500" />}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-lg shadow-xs mr-3">
                      <FiClock className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Joined</p>
                      <p className="text-sm font-medium text-gray-800">
                        {new Date(selectedUser.joinDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end p-5 bg-gray-50 border-t">
                <button
                  onClick={() => setSelectedUser(null)}
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
            <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
            <p className="text-sm text-gray-500 mt-1">Manage all registered users in your platform</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
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
                <span>Add User</span>
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
          <button className="px-3 py-1.5 text-sm rounded-full hover:bg-gray-100">Admin</button>
          <button className="px-3 py-1.5 text-sm rounded-full hover:bg-gray-100">Editor</button>
          <button className="px-3 py-1.5 text-sm rounded-full hover:bg-gray-100">Author</button>
          <button className="px-3 py-1.5 text-sm rounded-full hover:bg-gray-100">Subscriber</button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <motion.tr 
                    key={user.id} 
                    className="hover:bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div 
                        className="flex items-center cursor-pointer"
                        onClick={() => viewUserDetails(user)}
                      >
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <FiUser className="text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-xs text-gray-500">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium
                        ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                           user.role === 'Editor' ? 'bg-blue-100 text-blue-800' :
                           user.role === 'Author' ? 'bg-green-100 text-green-800' :
                           'bg-gray-100 text-gray-800'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => toggleStatus(user.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-medium transition-colors
                          ${user.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                             user.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                             'bg-red-100 text-red-800 hover:bg-red-200'}`}
                      >
                        {user.status === 'active' ? <FiUserCheck size={14} /> : 
                         user.status === 'pending' ? <FiUser size={14} /> : 
                         <FiUserX size={14} />}
                        <span>{user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 p-1 transition-colors"
                          onClick={() => viewUserDetails(user)}
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button 
                          onClick={() => deleteUser(user.id)}
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
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <div className="text-gray-500 flex flex-col items-center justify-center">
                      <FiUserX size={48} className="text-gray-300 mb-3" />
                      <p className="text-lg font-medium">No users found</p>
                      <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t">
            <div className="text-sm text-gray-500 mb-4 sm:mb-0">
              Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to <span className="font-medium">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of <span className="font-medium">{filteredUsers.length}</span> users
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

export default UsersPage;