import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import Dashboard from './Pages/Admin/Dashboard.jsx';
import UsersPage from './Pages/Admin/UserPage.jsx';
import BooksPage from './Pages/Admin/Bookspage.jsx';
import SettingsPage from './Pages/Admin/Setting.jsx';
import EarningsPage from './Pages/Admin/EarningPage.jsx';
import DisputeListPage from './Pages/Admin/Dispute.jsx';
import HomePage from './Pages/HomePage/Homepage.jsx';
import AuthorDashboard from './Pages/Author/Dashbord.jsx';
import BookCreator from './Pages/Author/CreateBook.jsx';
import BookPage from './Pages/Author/BookPage.jsx';
import WalletPage from './Pages/Author/Wallet.jsx';
import AuthorProfilePage from './Pages/Author/Profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: '/astra/', element: <HomePage /> },
      { path: '/astra/admin', element: <Dashboard /> },
      { path: '/astra/author', element: <AuthorDashboard /> },
      { path: '/astra/author/book create', element: <BookCreator/> },
      { path: '/astra/admin/users list', element: <UsersPage /> },
      { path: '/astra/author/my book', element: <BookPage/> },
      { path: '/astra/admin/books list', element: <BooksPage /> },
      { path: '/astra/admin/setting', element: <SettingsPage /> },
      { path: '/astra/admin/earning', element: <EarningsPage /> },
      { path: '/astra/admin/dispute list', element: <DisputeListPage /> },
      { path: '/astra/author/wallet', element: <WalletPage/> },
      { path: '/astra/author/profile', element: <AuthorProfilePage /> },
      <Route path="/astra/book/:id" element={<BookPage />} />
    
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />

);
