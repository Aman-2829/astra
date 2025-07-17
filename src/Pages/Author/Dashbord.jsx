import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import AuthorLayout from '../../Component/Author/AuthorLayout';
import { FiBell } from 'react-icons/fi';
Chart.register(...registerables);

export default function AuthorDashboard() {
  // Sample data for charts
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Book Sales',
      data: [120, 190, 300, 250, 180, 400],
      backgroundColor: 'rgba(99, 102, 241, 0.6)',
      borderColor: 'rgba(99, 102, 241, 1)',
      borderWidth: 1
    }]
  };

  const impressionData = {
    labels: ['Book 1', 'Book 2', 'Book 3', 'Book 4'],
    datasets: [{
      data: [1200, 1900, 800, 1500],
      backgroundColor: [
        'rgba(99, 102, 241, 0.6)',
        'rgba(16, 185, 129, 0.6)',
        'rgba(245, 158, 11, 0.6)',
        'rgba(239, 68, 68, 0.6)'
      ],
      borderWidth: 1
    }]
  };

  const rankData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Bestseller Rank',
      data: [15, 8, 5, 3],
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.3,
      fill: true
    }]
  };

  return (
    <AuthorLayout>
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
          <p className="text-2xl font-bold mt-1">1,240</p>
          <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Impressions</h3>
          <p className="text-2xl font-bold mt-1">5,428</p>
          <p className="text-green-600 text-sm mt-2">↑ 8% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Best Rank</h3>
          <p className="text-2xl font-bold mt-1">#3</p>
          <p className="text-green-600 text-sm mt-2">in Fiction Category</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Sales</h3>
          <Bar 
            data={salesData} 
            options={{ 
              responsive: true,
              plugins: { legend: { display: false } }
            }} 
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Book Impressions</h3>
          <Pie 
            data={impressionData} 
            options={{ 
              responsive: true,
              plugins: { legend: { position: 'right' } }
            }} 
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Bestseller Rank Trend</h3>
          <Line 
            data={rankData} 
            options={{ 
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { reverse: true, beginAtZero: false } }
            }} 
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {['New review on "The Silent Echo"', 'Payment received $245', 'Book "Whispers" reached #5 in category'].map((item, i) => (
            <div key={i} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
              <div className="bg-indigo-100 p-2 rounded-full mr-3">
                <FiBell className="text-indigo-600" />
              </div>
              <div>
                <p className="font-medium">{item}</p>
                <p className="text-gray-500 text-sm">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </AuthorLayout>

  );
}