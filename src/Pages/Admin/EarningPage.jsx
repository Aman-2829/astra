import React, { useState, lazy, Suspense } from 'react';
import { 
  FiDollarSign,
  FiCreditCard,
  FiPieChart,
  FiTrendingUp,
  FiCalendar,
  FiDownload,
  FiRefreshCw,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiAlertCircle,
  FiCheckCircle,
  FiClock
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../Component/Admin/AdminDashboard.jsx';

// Lazy load charts
const EarningsChart = lazy(() => import('../../Component/Charts/EarningsChart.jsx'));

const EarningsPage = () => {
  // Earnings Summary
  const [earningsSummary, setEarningsSummary] = useState({
    totalEarnings: 2845.50,
    availableBalance: 1245.30,
    pendingClearance: 600.20,
    lifetimeEarnings: 12845.75,
    currency: 'USD'
  });

  // Payout Settings
  const [payoutSettings, setPayoutSettings] = useState({
    payoutMethod: 'paypal',
    paypalEmail: 'user@example.com',
    bankDetails: {
      accountName: '',
      accountNumber: '',
      routingNumber: '',
      bankName: ''
    },
    minimumPayout: 50.00,
    payoutSchedule: 'weekly'
  });

  // Transaction History
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '2023-06-15T10:30:00Z',
      description: 'Freelance Project - Website Redesign',
      amount: 1200.00,
      status: 'paid',
      payoutMethod: 'paypal'
    },
    {
      id: 2,
      date: '2023-06-10T15:45:00Z',
      description: 'Consultation Services',
      amount: 450.50,
      status: 'paid',
      payoutMethod: 'bank'
    },
    {
      id: 3,
      date: '2023-06-05T08:20:00Z',
      description: 'Affiliate Commission',
      amount: 195.00,
      status: 'pending',
      payoutMethod: 'paypal'
    },
    {
      id: 4,
      date: '2023-05-28T14:10:00Z',
      description: 'Monthly Subscription',
      amount: 300.00,
      status: 'paid',
      payoutMethod: 'bank'
    }
  ]);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('summary');
  const [tempSettings, setTempSettings] = useState({});
  const [timeRange, setTimeRange] = useState('30days');

  // Toggle section
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Start editing
  const startEditing = (section) => {
    setTempSettings({
      payout: {...payoutSettings}
    });
    setIsEditing(true);
    setActiveSection(section);
  };

  // Cancel editing
  const cancelEditing = () => {
    setIsEditing(false);
    setActiveSection(null);
  };

  // Save changes
  const saveChanges = () => {
    if (activeSection === 'payout') {
      setPayoutSettings(tempSettings.payout);
    }
    setIsEditing(false);
  };

  // Handle input change
  const handleInputChange = (section, field, value) => {
    setTempSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle nested input change (for bank details)
  const handleNestedInputChange = (section, parentField, field, value) => {
    setTempSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentField]: {
          ...prev[section][parentField],
          [field]: value
        }
      }
    }));
  };

  // Request payout
  const requestPayout = () => {
    if (earningsSummary.availableBalance >= payoutSettings.minimumPayout) {
      alert(`Payout request for $${earningsSummary.availableBalance} submitted!`);
    } else {
      alert(`Minimum payout amount is $${payoutSettings.minimumPayout}`);
    }
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
      currency: earningsSummary.currency
    }).format(amount);
  };

  // Earnings sections
  const earningsSections = [
    {
      id: 'summary',
      icon: <FiDollarSign className="text-indigo-500" />,
      title: 'Earnings Summary',
      stats: [
        { label: 'Total Earnings', value: formatCurrency(earningsSummary.totalEarnings) },
        { label: 'Available Balance', value: formatCurrency(earningsSummary.availableBalance) },
        { label: 'Pending Clearance', value: formatCurrency(earningsSummary.pendingClearance) },
        { label: 'Lifetime Earnings', value: formatCurrency(earningsSummary.lifetimeEarnings) }
      ]
    },
    {
      id: 'payout',
      icon: <FiCreditCard className="text-indigo-500" />,
      title: 'Payout Settings',
      fields: [
        { 
          label: 'Payout Method', 
          type: 'select', 
          value: payoutSettings.payoutMethod, 
          field: 'payoutMethod',
          options: [
            { value: 'paypal', label: 'PayPal' },
            { value: 'bank', label: 'Bank Transfer' }
          ]
        },
        payoutSettings.payoutMethod === 'paypal' ? 
          { 
            label: 'PayPal Email', 
            type: 'email', 
            value: payoutSettings.paypalEmail, 
            field: 'paypalEmail',
            required: true
          } : null,
        payoutSettings.payoutMethod === 'bank' ? 
          { 
            label: 'Bank Account Name', 
            type: 'text', 
            value: payoutSettings.bankDetails.accountName, 
            field: 'accountName',
            parentField: 'bankDetails',
            required: true
          } : null,
        payoutSettings.payoutMethod === 'bank' ? 
          { 
            label: 'Account Number', 
            type: 'text', 
            value: payoutSettings.bankDetails.accountNumber, 
            field: 'accountNumber',
            parentField: 'bankDetails',
            required: true
          } : null,
        payoutSettings.payoutMethod === 'bank' ? 
          { 
            label: 'Routing Number', 
            type: 'text', 
            value: payoutSettings.bankDetails.routingNumber, 
            field: 'routingNumber',
            parentField: 'bankDetails',
            required: true
          } : null,
        payoutSettings.payoutMethod === 'bank' ? 
          { 
            label: 'Bank Name', 
            type: 'text', 
            value: payoutSettings.bankDetails.bankName, 
            field: 'bankName',
            parentField: 'bankDetails',
            required: true
          } : null,
        { 
          label: 'Minimum Payout Amount', 
          type: 'number', 
          value: payoutSettings.minimumPayout, 
          field: 'minimumPayout',
          prefix: earningsSummary.currency
        },
        { 
          label: 'Payout Schedule', 
          type: 'select', 
          value: payoutSettings.payoutSchedule, 
          field: 'payoutSchedule',
          options: [
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'manual', label: 'Manual Request' }
          ]
        }
      ].filter(Boolean) // Remove null fields
    }
  ];

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-6 border-b">
          <FiTrendingUp className="text-indigo-600 text-2xl mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Earnings</h2>
            <p className="text-sm text-gray-500">Track your earnings and manage payout settings</p>
          </div>
        </div>

        {/* Earnings Summary Section (always visible) */}
        <div className="p-6 border-b">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {earningsSections[0].stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Earnings Overview</h3>
            <div className="flex items-center space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="year">This Year</option>
              </select>
              <button className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200">
                <FiRefreshCw className="text-gray-600" />
              </button>
              <button className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200">
                <FiDownload className="text-gray-600" />
              </button>
            </div>
          </div>

          <div className="h-64 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
            <Suspense fallback={<div className="flex items-center justify-center h-full">Loading chart...</div>}>
              <EarningsChart timeRange={timeRange} />
            </Suspense>
          </div>
        </div>

        {/* Payout Settings Section */}
        <div className="divide-y divide-gray-200">
          {earningsSections.slice(1).map((section) => (
            <div key={section.id} className="p-6">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-lg bg-indigo-50">
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                </div>
                {activeSection === section.id ? (
                  <FiChevronUp className="text-gray-400" />
                ) : (
                  <FiChevronDown className="text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {activeSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-4 pl-14">
                      {section.fields.map((field) => (
                        <div key={field.field} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="sm:w-1/3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                          </div>
                          <div className="sm:w-2/3">
                            {field.type === 'select' ? (
                              <select
                                value={isEditing ? 
                                  (field.parentField ? 
                                    tempSettings[section.id][field.parentField][field.field] : 
                                    tempSettings[section.id][field.field]) : 
                                  (field.parentField ? 
                                    payoutSettings[field.parentField][field.field] : 
                                    payoutSettings[field.field])}
                                onChange={(e) => 
                                  field.parentField ? 
                                    handleNestedInputChange(section.id, field.parentField, field.field, e.target.value) :
                                    handleInputChange(section.id, field.field, e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                                disabled={!isEditing}
                              >
                                {field.options.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <div className="relative">
                                {field.prefix && (
                                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    {field.prefix}
                                  </span>
                                )}
                                <input
                                  type={field.type}
                                  value={isEditing ? 
                                    (field.parentField ? 
                                      tempSettings[section.id][field.parentField][field.field] : 
                                      tempSettings[section.id][field.field]) : 
                                    (field.parentField ? 
                                      payoutSettings[field.parentField][field.field] : 
                                      payoutSettings[field.field])}
                                  onChange={(e) => 
                                    field.parentField ? 
                                      handleNestedInputChange(section.id, field.parentField, field.field, e.target.value) :
                                      handleInputChange(section.id, field.field, e.target.value)}
                                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 ${field.prefix ? 'pl-10' : ''}`}
                                  disabled={!isEditing}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-end gap-3 pt-4">
                        {!isEditing ? (
                          <>
                            <button
                              onClick={() => startEditing(section.id)}
                              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                              Edit Payout Settings
                            </button>
                            <button
                              onClick={requestPayout}
                              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                              disabled={earningsSummary.availableBalance < payoutSettings.minimumPayout}
                            >
                              Request Payout
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={cancelEditing}
                              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={saveChanges}
                              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                              Save Changes
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Transaction History Section */}
          <div className="p-6">
            <button
              onClick={() => toggleSection('transactions')}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center">
                <div className="mr-3 p-2 rounded-lg bg-indigo-50">
                  <FiPieChart className="text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Transaction History</h3>
              </div>
              {activeSection === 'transactions' ? (
                <FiChevronUp className="text-gray-400" />
              ) : (
                <FiChevronDown className="text-gray-400" />
              )}
            </button>

            <AnimatePresence>
              {activeSection === 'transactions' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pl-14">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                          <FiFilter className="inline mr-1" /> Filter
                        </button>
                        <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                          <FiDownload className="inline mr-1" /> Export
                        </button>
                      </div>
                      <div className="text-sm text-gray-500">
                        Showing {transactions.length} transactions
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Payout Method
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(transaction.date)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {transaction.description}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(transaction.amount)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  transaction.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {transaction.status === 'paid' ? (
                                    <FiCheckCircle className="mr-1" />
                                  ) : (
                                    <FiClock className="mr-1" />
                                  )}
                                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {transaction.payoutMethod === 'paypal' ? 'PayPal' : 'Bank Transfer'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EarningsPage;