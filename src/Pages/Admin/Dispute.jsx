import React, { useState } from 'react';
import { 
  FiAlertTriangle,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiMessageSquare,
  FiArchive,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../Component/Admin/AdminDashboard';

const DisputeListPage = () => {
  // Dispute status filter
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDispute, setExpandedDispute] = useState(null);

  // Sample dispute data
  const disputes = [
    {
      id: 'DP-1001',
      customer: 'John Smith',
      bookTitle: 'The Midnight Library',
      bookId: 'BK-2045',
      date: '2023-07-15T10:30:00Z',
      type: 'Refund Request',
      status: 'open',
      amount: 12.99,
      messages: [
        {
          sender: 'John Smith',
          date: '2023-07-15T10:30:00Z',
          text: "I accidentally purchased this book twice. Can I get a refund for the second purchase?"
        },
        {
          sender: 'Support Agent',
          date: '2023-07-15T11:45:00Z',
          text: "We've received your request. We'll process your refund within 3-5 business days."
        }
      ]
    },
    {
      id: 'DP-1002',
      customer: 'Emily Johnson',
      bookTitle: 'Atomic Habits',
      bookId: 'BK-1987',
      date: '2023-07-14T15:20:00Z',
      type: 'Content Issue',
      status: 'in_progress',
      amount: 14.99,
      messages: [
        {
          sender: 'Emily Johnson',
          date: '2023-07-14T15:20:00Z',
          text: "Chapter 5 appears to be missing pages in the eBook version. The content cuts off abruptly."
        }
      ]
    },
    {
      id: 'DP-1003',
      customer: 'Michael Brown',
      bookTitle: 'Dune',
      bookId: 'BK-1567',
      date: '2023-07-12T09:15:00Z',
      type: 'Unauthorized Purchase',
      status: 'resolved',
      amount: 9.99,
      messages: [
        {
          sender: 'Michael Brown',
          date: '2023-07-12T09:15:00Z',
          text: "My child made this purchase without my permission. I would like to request a refund."
        },
        {
          sender: 'Support Agent',
          date: '2023-07-12T14:30:00Z',
          text: "We've processed your refund. The amount should appear in your account within 5-7 business days."
        },
        {
          sender: 'Michael Brown',
          date: '2023-07-13T10:45:00Z',
          text: "Thank you for your quick response. The refund has been received."
        }
      ]
    },
    {
      id: 'DP-1004',
      customer: 'Sarah Williams',
      bookTitle: 'Where the Crawdads Sing',
      bookId: 'BK-2134',
      date: '2023-07-10T18:40:00Z',
      type: 'Technical Issue',
      status: 'closed',
      amount: 11.49,
      messages: [
        {
          sender: 'Sarah Williams',
          date: '2023-07-10T18:40:00Z',
          text: "I can't download the book to my device. I keep getting an error message."
        },
        {
          sender: 'Support Agent',
          date: '2023-07-11T10:15:00Z',
          text: "We've identified the issue and fixed it. Please try downloading again."
        }
      ]
    },
    {
      id: 'DP-1005',
      customer: 'David Lee',
      bookTitle: 'The Hobbit',
      bookId: 'BK-1876',
      date: '2023-07-08T12:10:00Z',
      type: 'Refund Request',
      status: 'rejected',
      amount: 14.95,
      messages: [
        {
          sender: 'David Lee',
          date: '2023-07-08T12:10:00Z',
          text: "I didn't enjoy this book and would like to request a refund."
        },
        {
          sender: 'Support Agent',
          date: '2023-07-09T09:30:00Z',
          text: "We're sorry you didn't enjoy the book. However, as per our policy, we don't offer refunds for dissatisfaction after the book has been fully accessed."
        }
      ]
    }
  ];

  // Filter disputes based on status and search query
  const filteredDisputes = disputes.filter(dispute => {
    const matchesStatus = statusFilter === 'all' || dispute.status === statusFilter;
    const matchesSearch = 
      dispute.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.bookTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Toggle dispute expansion
  const toggleDisputeExpansion = (disputeId) => {
    setExpandedDispute(expandedDispute === disputeId ? null : disputeId);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch(status) {
      case 'open':
        return { color: 'bg-yellow-100 text-yellow-800', icon: <FiAlertTriangle className="mr-1" /> };
      case 'in_progress':
        return { color: 'bg-blue-100 text-blue-800', icon: <FiClock className="mr-1" /> };
      case 'resolved':
        return { color: 'bg-green-100 text-green-800', icon: <FiCheckCircle className="mr-1" /> };
      case 'closed':
        return { color: 'bg-gray-100 text-gray-800', icon: <FiArchive className="mr-1" /> };
      case 'rejected':
        return { color: 'bg-red-100 text-red-800', icon: <FiXCircle className="mr-1" /> };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: <FiAlertTriangle className="mr-1" /> };
    }
  };

  // Resolve dispute
  const resolveDispute = (disputeId) => {
    // In a real app, this would call an API
    console.log(`Resolving dispute ${disputeId}`);
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header with actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dispute Management</h2>
            <p className="text-sm text-gray-500 mt-1">Review and resolve customer disputes</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <FiRefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 border-b">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search disputes..."
              className="pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm">
              <FiFilter size={14} />
              <span>Status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Disputes List */}
        <div className="divide-y divide-gray-200">
          {filteredDisputes.length > 0 ? (
            filteredDisputes.map((dispute) => (
              <div key={dispute.id} className="hover:bg-gray-50 transition-colors">
                <div 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 cursor-pointer"
                  onClick={() => toggleDisputeExpansion(dispute.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${getStatusInfo(dispute.status).color}`}>
                      <FiAlertTriangle className="text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{dispute.id}</h3>
                      <p className="text-sm text-gray-500">{dispute.customer}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:items-end mt-3 sm:mt-0">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusInfo(dispute.status).color}`}>
                        {getStatusInfo(dispute.status).icon}
                        {dispute.status.replace('_', ' ')}
                      </span>
                      {expandedDispute === dispute.id ? (
                        <FiChevronUp className="text-gray-400" />
                      ) : (
                        <FiChevronDown className="text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{formatDate(dispute.date)}</p>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedDispute === dispute.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2">
                            <h4 className="font-medium text-gray-900 mb-3">Dispute Details</h4>
                            
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-xs text-gray-500">Book Title</p>
                                  <p className="text-sm font-medium text-gray-900">{dispute.bookTitle}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Book ID</p>
                                  <p className="text-sm font-medium text-gray-900">{dispute.bookId}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Type</p>
                                  <p className="text-sm font-medium text-gray-900">{dispute.type}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Amount</p>
                                  <p className="text-sm font-medium text-gray-900">{formatCurrency(dispute.amount)}</p>
                                </div>
                              </div>
                            </div>
                            
                            <h4 className="font-medium text-gray-900 mt-6 mb-3">Conversation</h4>
                            <div className="space-y-4">
                              {dispute.messages.map((message, index) => (
                                <div 
                                  key={index} 
                                  className={`p-4 rounded-lg ${message.sender === 'Support Agent' ? 'bg-indigo-50' : 'bg-gray-50'}`}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <p className="font-medium text-gray-900">{message.sender}</p>
                                    <p className="text-xs text-gray-500">{formatDate(message.date)}</p>
                                  </div>
                                  <p className="text-sm text-gray-700">{message.text}</p>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-4">
                              <textarea
                                placeholder="Type your response here..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                                rows="3"
                              ></textarea>
                              <div className="flex justify-end mt-2">
                                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                                  Send Response
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Resolution Actions</h4>
                            <div className="space-y-3">
                              {dispute.status === 'open' || dispute.status === 'in_progress' ? (
                                <>
                                  <button 
                                    onClick={() => resolveDispute(dispute.id)}
                                    className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                                  >
                                    Mark as Resolved
                                  </button>
                                  <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                    Request More Information
                                  </button>
                                  <button className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                                    Reject Dispute
                                  </button>
                                </>
                              ) : (
                                <div className="p-4 bg-gray-50 rounded-lg text-center">
                                  <p className="text-sm text-gray-500">This dispute has been {dispute.status.replace('_', ' ')}</p>
                                  {dispute.status === 'resolved' && (
                                    <button className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                                      Reopen Dispute
                                    </button>
                                  )}
                                </div>
                              )}
                              
                              <div className="pt-4 border-t border-gray-200">
                                <h5 className="text-sm font-medium text-gray-900 mb-2">Dispute History</h5>
                                <ul className="text-xs text-gray-500 space-y-2">
                                  <li className="flex items-start">
                                    <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-1 mr-2"></span>
                                    Created on {formatDate(dispute.date)}
                                  </li>
                                  {dispute.status === 'in_progress' && (
                                    <li className="flex items-start">
                                      <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-1 mr-2"></span>
                                      In progress since {formatDate(dispute.date)}
                                    </li>
                                  )}
                                  {dispute.status === 'resolved' && (
                                    <li className="flex items-start">
                                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full mt-1 mr-2"></span>
                                      Resolved on {formatDate(dispute.date)}
                                    </li>
                                  )}
                                  {dispute.status === 'rejected' && (
                                    <li className="flex items-start">
                                      <span className="inline-block w-2 h-2 bg-red-400 rounded-full mt-1 mr-2"></span>
                                      Rejected on {formatDate(dispute.date)}
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="text-gray-500 flex flex-col items-center justify-center">
                <FiMessageSquare className="text-gray-300 text-4xl mb-3" />
                <p className="text-lg font-medium">No disputes found</p>
                <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredDisputes.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t">
            <div className="text-sm text-gray-500 mb-4 sm:mb-0">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredDisputes.length}</span> of{' '}
              <span className="font-medium">{disputes.length}</span> disputes
            </div>
            <div className="flex gap-1">
              <button className="p-2 rounded-md text-gray-300 cursor-not-allowed">
                <FiChevronLeft size={20} />
              </button>
              <button className="w-10 h-10 rounded-md text-sm font-medium bg-indigo-600 text-white">
                1
              </button>
              <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DisputeListPage;