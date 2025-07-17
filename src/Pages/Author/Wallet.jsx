import React , { useState } from 'react';
import { FiDollarSign, FiCreditCard, FiArrowUpRight, FiArrowDownLeft, FiClock, FiCheckCircle } from 'react-icons/fi';
import AuthorLayout from '../../Component/Author/AuthorLayout';

export default function WalletPage() {
  const [balance, setBalance] = useState(1245.50);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [activeTab, setActiveTab] = useState('transactions');
  const [payoutMethod, setPayoutMethod] = useState('bank');

  const transactions = [
    { id: 1, type: 'credit', amount: 245.00, description: 'Book Sales - The Silent Echo', date: '2023-06-15', status: 'completed' },
    { id: 2, type: 'debit', amount: 50.00, description: 'Withdrawal to Bank', date: '2023-06-10', status: 'completed' },
    { id: 3, type: 'credit', amount: 180.50, description: 'Book Sales - Whispers in Dark', date: '2023-06-05', status: 'completed' },
    { id: 4, type: 'credit', amount: 320.00, description: 'Royalty Payment', date: '2023-05-28', status: 'completed' },
    { id: 5, type: 'pending', amount: 150.75, description: 'Pending Sales - Untitled Project', date: '2023-06-18', status: 'pending' },
  ];

  const handleWithdrawal = (e) => {
    e.preventDefault();
    if (withdrawAmount && parseFloat(withdrawAmount) <= balance) {
      setBalance(prev => prev - parseFloat(withdrawAmount));
      setWithdrawAmount('');
      alert(`Successfully withdrew $${withdrawAmount}`);
    }
  };

  return (
    <AuthorLayout>
            <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Wallet</h1>
      
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 shadow-lg mb-8">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm opacity-80">Available Balance</p>
            <p className="text-3xl font-bold mt-1">${balance.toFixed(2)}</p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <FiDollarSign className="text-xl" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'transactions' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'withdraw' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('withdraw')}
        >
          Withdraw Funds
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'transactions' ? (
        <div className="space-y-4">
          {transactions.map((txn) => (
            <div key={txn.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${txn.type === 'credit' ? 'bg-green-100 text-green-600' : txn.type === 'debit' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {txn.type === 'credit' ? <FiArrowDownLeft /> : txn.type === 'debit' ? <FiArrowUpRight /> : <FiClock />}
                  </div>
                  <div>
                    <p className="font-medium">{txn.description}</p>
                    <p className="text-sm text-gray-500">{txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {txn.type === 'credit' ? '+' : '-'}${txn.amount.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-end space-x-1 text-sm text-gray-500">
                    {txn.status === 'completed' ? (
                      <>
                        <FiCheckCircle className="text-green-500" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <span className="text-yellow-600">Pending</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Withdraw Funds</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Payout Method</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPayoutMethod('bank')}
                className={`p-4 border rounded-lg flex items-center ${payoutMethod === 'bank' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}`}
              >
                <FiCreditCard className="mr-2" />
                <span>Bank Transfer</span>
              </button>
              <button
                onClick={() => setPayoutMethod('paypal')}
                className={`p-4 border rounded-lg flex items-center ${payoutMethod === 'paypal' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}`}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#003087">
                  <path d="M7.5 11.5c0 2.485 1.567 4.5 3.5 4.5h1c1.933 0 3.5-2.015 3.5-4.5s-1.567-4.5-3.5-4.5h-1c-1.933 0-3.5 2.015-3.5 4.5z"/>
                  <path d="M12 8c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>PayPal</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleWithdrawal}>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount to Withdraw (Available: ${balance.toFixed(2)})
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  min="10"
                  max={balance}
                  step="0.01"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 py-2 border-gray-300 rounded-md"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
            </div>

            {payoutMethod === 'bank' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Details</label>
                <input
                  type="text"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 border-gray-300 rounded-md mb-2"
                  placeholder="Account Holder Name"
                />
                <input
                  type="text"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 border-gray-300 rounded-md mb-2"
                  placeholder="Account Number"
                />
                <input
                  type="text"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 border-gray-300 rounded-md"
                  placeholder="Routing Number"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={!withdrawAmount || parseFloat(withdrawAmount) < 10 || parseFloat(withdrawAmount) > balance}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                !withdrawAmount || parseFloat(withdrawAmount) < 10 || parseFloat(withdrawAmount) > balance
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              Withdraw Funds
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Minimum withdrawal amount: $10.00. Processing time: 3-5 business days.
            </p>
          </form>
        </div>
      )}
    </div>
    </AuthorLayout>
  );
}