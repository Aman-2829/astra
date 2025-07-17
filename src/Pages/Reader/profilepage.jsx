import React, { useState } from 'react';
import { FiEdit, FiBook, FiBookmark, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import AuthorLayout from '../../Component/Author/AuthorLayout';

// Mock data - in a real app, this would come from an API
const mockUserData = {
  id: 1,
  name: "Alex Johnson",
  username: "alexwriter",
  email: "alex.johnson@example.com",
  bio: "Fantasy author and avid reader. Writing my next epic adventure!",
  avatar: "https://via.placeholder.com/150",
  joinDate: "January 2022",
  stats: {
    booksPublished: 3,
    followers: 1245,
    following: 86,
    wordsWritten: 125000,
  },
  readingProgress: [
    {
      bookId: 1,
      title: "The Great Adventure",
      cover: "https://via.placeholder.com/100x150",
      progress: 65,
      lastRead: "2 days ago"
    },
    {
      bookId: 2,
      title: "Mystery of the Old Library",
      cover: "https://via.placeholder.com/100x150",
      progress: 23,
      lastRead: "1 week ago"
    }
  ],
  authoredBooks: [
    {
      id: 1,
      title: "The Great Adventure",
      cover: "https://via.placeholder.com/150x225",
      publishedDate: "2023-10-15",
      views: 12450,
      chapters: 12
    },
    {
      id: 2,
      title: "Whispers in the Dark",
      cover: "https://via.placeholder.com/150x225",
      publishedDate: "2023-05-22",
      views: 8765,
      chapters: 8
    },
    {
      id: 3,
      title: "The Last Mage",
      cover: "https://via.placeholder.com/150x225",
      publishedDate: "2022-11-30",
      views: 21500,
      chapters: 15
    }
  ],
  bookmarks: [
    {
      bookId: 4,
      title: "Ocean's End",
      cover: "https://via.placeholder.com/100x150",
      author: "Maria Chen",
      lastRead: "3 days ago"
    }
  ]
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('authored');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(mockUserData.bio);
  const user = mockUserData;

  const handleBioSave = () => {
    setIsEditingBio(false);
    // In real app, would save to API
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'authored':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.authoredBooks.map(book => (
              <div key={book.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{book.title}</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{book.chapters} chapters</span>
                    <span>{book.views.toLocaleString()} views</span>
                  </div>
                  <div className="text-sm text-gray-500">Published: {book.publishedDate}</div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'reading':
        return (
          <div className="space-y-4">
            {user.readingProgress.map(book => (
              <div key={book.bookId} className="bg-white p-4 rounded-lg shadow flex items-start">
                <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover mr-4" />
                <div className="flex-1">
                  <h3 className="font-bold">{book.title}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${book.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{book.progress}% complete</span>
                    <span>Last read: {book.lastRead}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'bookmarks':
        return (
          <div className="space-y-4">
            {user.bookmarks.map(book => (
              <div key={book.bookId} className="bg-white p-4 rounded-lg shadow flex items-start">
                <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover mr-4" />
                <div className="flex-1">
                  <h3 className="font-bold">{book.title}</h3>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                  <div className="text-sm text-gray-500 mt-2">Last read: {book.lastRead}</div>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AuthorLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-indigo-100 h-32"></div>
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row md:items-end">
              <div className="relative -mt-16 mr-6 mb-4">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
                <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                  <FiEdit className="text-indigo-600" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-600">@{user.username}</p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                    <FiEdit className="mr-2" /> Edit Profile
                  </button>
                </div>
                
                {isEditingBio ? (
                  <div className="mt-4">
                    <textarea
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)}
                      className="w-full p-3 border rounded-md"
                      rows="3"
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button 
                        onClick={() => setIsEditingBio(false)}
                        className="px-3 py-1 border border-gray-300 rounded-md"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleBioSave}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p 
                    className="mt-4 text-gray-700 cursor-text" 
                    onClick={() => setIsEditingBio(true)}
                  >
                    {bioText || "Click to add a bio..."}
                  </p>
                )}
                
                <div className="flex space-x-6 mt-4 text-sm">
                  <div>
                    <span className="font-semibold">{user.stats.booksPublished}</span>
                    <span className="text-gray-600 ml-1">Books</span>
                  </div>
                  <div>
                    <span className="font-semibold">{user.stats.followers.toLocaleString()}</span>
                    <span className="text-gray-600 ml-1">Followers</span>
                  </div>
                  <div>
                    <span className="font-semibold">{user.stats.following}</span>
                    <span className="text-gray-600 ml-1">Following</span>
                  </div>
                  <div>
                    <span className="font-semibold">{Math.floor(user.stats.wordsWritten / 1000)}k</span>
                    <span className="text-gray-600 ml-1">Words</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="bg-white rounded-lg shadow mt-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('authored')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center ${activeTab === 'authored' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <FiBook className="mr-2" /> Authored Books
              </button>
              <button
                onClick={() => setActiveTab('reading')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center ${activeTab === 'reading' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <FiUser className="mr-2" /> Reading Progress
              </button>
              <button
                onClick={() => setActiveTab('bookmarks')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center ${activeTab === 'bookmarks' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <FiBookmark className="mr-2" /> Bookmarks
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center ${activeTab === 'settings' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <FiSettings className="mr-2" /> Settings
              </button>
            </nav>
          </div>
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white p-4 rounded-lg shadow flex items-center hover:bg-gray-50">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <FiBook className="text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium">Start New Book</h3>
              <p className="text-sm text-gray-600">Begin your next writing project</p>
            </div>
          </button>
          <button className="bg-white p-4 rounded-lg shadow flex items-center hover:bg-gray-50">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FiUser className="text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Invite Friends</h3>
              <p className="text-sm text-gray-600">Share your profile with others</p>
            </div>
          </button>a
          <button className="bg-white p-4 rounded-lg shadow flex items-center hover:bg-gray-50">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <FiLogOut className="text-red-600" />
            </div>
            <div>
              <h3 className="font-medium">Log Out</h3>
              <p className="text-sm text-gray-600">Sign out of your account</p>
            </div>
          </button>
        </div>
      </div>
    </AuthorLayout>
  );
};

export default ProfilePage;