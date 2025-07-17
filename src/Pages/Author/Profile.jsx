import React, { useState } from 'react';
import { 
  FiUser, FiMail, FiLock, FiGlobe, FiCalendar, 
  FiMapPin, FiSettings, FiBook, FiStar, FiEdit, 
  FiTrash2, FiEye, FiEyeOff, FiCheck, FiX, 
  FiPlus
} from 'react-icons/fi';
import LoginLocationMap from '../../Component/Map/LoginLocationMap';
import AuthorLayout from '../../Component/Author/AuthorLayout';
import ChangePasswordModal from '../../Component/Modals/ChangePasswordModal';
import DeleteAccountModal from '../../Component/Modals/DeleteAccountModal';

const AuthorProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Mock Data
  const [profile, setProfile] = useState({
    name: 'Allen',
    bio: 'Bestselling author of fantasy novels with over 1 million copies sold worldwide.',
    email: 'allen.author@astrabook.com',
    website: 'www.allenauthor.com',
    joinDate: 'January 2020',
    location: 'Portland, OR'
  });

  const books = [
    { id: 1, title: 'The Silent Echo', published: '2023', sales: 1243, rating: 4.5, cover: 'https://via.placeholder.com/100x150' },
    { id: 2, title: 'Whispers in the Dark', published: '2022', sales: 892, rating: 4.2, cover: 'https://via.placeholder.com/100x150' },
    { id: 3, title: 'Shadows of the Past', published: '2021', sales: 1560, rating: 4.7, cover: 'https://via.placeholder.com/100x150' }
  ];

  const [loginSessions, setLoginSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro (Chrome)',
      ip: '192.168.1.1',
      location: 'San Francisco, CA',
      coordinates: [37.7749, -122.4194],
      time: '2023-05-15T10:30:00Z',
      current: true
    },
    {
      id: 2,
      device: 'iPhone 13 (Safari)',
      ip: '203.0.113.42',
      location: 'New York, NY',
      coordinates: [40.7128, -74.0060],
      time: '2023-05-14T15:45:00Z',
      current: false
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const terminateSession = (sessionId) => {
    setLoginSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  const handlePasswordChange = (newPassword) => {
    setShowPasswordModal(false);
  };

  const handleDeleteAccount = () => {
    // API call to delete account would go here
    setShowDeleteModal(false);
  };

  return (
    <AuthorLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <img src="https://randomuser.me/api/portraits/men/4.jpg"  className="text-3xl rounded-full text-indigo-600"/>
                  <button 
                    className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                    onClick={() => setEditMode(true)}
                  >
                    <FiEdit className="text-indigo-600 text-sm" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-center">{profile.name}</h2>
                <p className="text-sm text-gray-500 text-center">Author since {profile.joinDate}</p>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-md flex items-center transition-colors ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <FiUser className="mr-3" /> Profile
                </button>
                <button
                  onClick={() => setActiveTab('books')}
                  className={`w-full text-left px-4 py-3 rounded-md flex items-center transition-colors ${activeTab === 'books' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <FiBook className="mr-3" /> My Books
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-3 rounded-md flex items-center transition-colors ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <FiSettings className="mr-3" /> Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Section */}
            {activeTab === 'profile' && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Author Profile</h2>
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 flex items-center"
                    >
                      <FiEdit className="mr-2" /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 flex items-center"
                      >
                        <FiCheck className="mr-2" /> Save
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 flex items-center"
                      >
                        <FiX className="mr-2" /> Cancel
                      </button>
                    </div>
                  )}
                </div>

                {editMode ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={profile.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={profile.location}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <div className="flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            https://
                          </span>
                          <input
                            type="text"
                            name="website"
                            value={profile.website}
                            onChange={handleInputChange}
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <div className="bg-indigo-50 p-3 rounded-full mr-4">
                          <FiUser className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{profile.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-indigo-50 p-3 rounded-full mr-4">
                          <FiMail className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{profile.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-indigo-50 p-3 rounded-full mr-4">
                        <FiBook className="text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bio</p>
                        <p className="font-medium">{profile.bio}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <div className="bg-indigo-50 p-3 rounded-full mr-4">
                          <FiMapPin className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">{profile.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-indigo-50 p-3 rounded-full mr-4">
                          <FiGlobe className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Website</p>
                          <a 
                            href={`https://${profile.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium text-indigo-600 hover:underline"
                          >
                            {profile.website}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-indigo-50 p-3 rounded-full mr-4">
                        <FiCalendar className="text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Member since</p>
                        <p className="font-medium">{profile.joinDate}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Books Section */}
            {activeTab === 'books' && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">My Published Books</h2>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 flex items-center">
                    <FiPlus className="mr-2" /> Add New Book
                  </button>
                </div>
                
                <div className="space-y-6">
                  {books.map(book => (
                    <div key={book.id} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <img 
                        src={book.cover} 
                        alt={book.title} 
                        className="w-full md:w-24 h-32 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold">{book.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm">
                          <div className="flex items-center text-gray-600">
                            <FiCalendar className="mr-2" /> Published: {book.published}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FiUser className="mr-2" /> Sales: {book.sales.toLocaleString()}
                          </div>
                          <div className="flex items-center">
                            <FiStar className="text-yellow-400 mr-1" /> {book.rating}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 self-end md:self-center">
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                          View Stats
                        </button>
                        <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Section */}
            {activeTab === 'settings' && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                <div className="space-y-8">
                  {/* Security Section */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Security</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-2 md:mb-0">
                          <div className="bg-indigo-50 p-3 rounded-full mr-4">
                            <FiLock className="text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium">Password</p>
                            <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setShowPasswordModal(true)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 whitespace-nowrap"
                        >
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Login Activity Section */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Login Activity</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <LoginLocationMap locations={loginSessions} />
                      <div className="divide-y divide-gray-200">
                        {loginSessions.map(session => (
                          <div key={session.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between">
                            <div className="mb-2 md:mb-0">
                              <p className="font-medium">{session.device}</p>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                                <span>{session.ip}</span>
                                <span>{session.location}</span>
                                <span>{new Date(session.time).toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {session.current ? (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Current Session
                                </span>
                              ) : (
                                <button 
                                  onClick={() => terminateSession(session.id)}
                                  className="px-3 py-1 text-red-600 hover:text-red-800 text-sm flex items-center"
                                >
                                  <FiTrash2 className="mr-1" /> Terminate
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Account Deletion Section */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Account Deletion</h3>
                    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                      <p className="text-red-700 mb-3">
                        Warning: Deleting your account will permanently remove all your data including books, 
                        settings, and reading history. This action cannot be undone.
                      </p>
                      <button 
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 flex items-center"
                      >
                        <FiTrash2 className="mr-2" /> Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal 
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordChange}
      />

      {/* Delete Account Modal */}
      <DeleteAccountModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </AuthorLayout>
  );
};

export default AuthorProfilePage;