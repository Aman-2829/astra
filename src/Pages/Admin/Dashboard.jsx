import React from 'react';
import DashboardLayout from '../../Component/Admin/AdminDashboard';
import { 
  LiaBookSolid, 
  LiaBookReaderSolid 
} from "react-icons/lia";
import { 
  SiLibreofficewriter 
} from "react-icons/si";
import { 
  RiMoneyDollarCircleLine,
  RiUser3Line,
  RiBook2Line,
  RiBarChart2Line
} from "react-icons/ri";
import { 
  FiArrowUpRight,
  FiCalendar,
  FiDownload
} from "react-icons/fi";
import RevenueChart from '../../Component/Charts/RevenueChart'; 
import UserPieChart from '../../Component/Charts/UserPieChart';
import ReadingTrendChart from '../../Component/Charts/ReadingTrendChart';
import TopGenresChart from '../../Component/Charts/TopGenresChart';

export default function Dashboard() {
  const stats = [
    { 
      title: 'Readers', 
      value: '50 Lakh +', 
      change: '+20%', 
      icon: <LiaBookReaderSolid className="text-indigo-600" size={24} />,
      bgColor: 'bg-indigo-50'
    },
    { 
      title: 'Writers', 
      value: '1,500', 
      change: '+8%', 
      icon: <SiLibreofficewriter className="text-emerald-600" size={24} />,
      bgColor: 'bg-emerald-50'
    },
    { 
      title: 'Books', 
      value: '2 Lakh +', 
      change: '+5%', 
      icon: <LiaBookSolid className="text-amber-600" size={24} />,
      bgColor: 'bg-amber-50'
    },
    { 
      title: 'Earnings', 
      value: '$505,679', 
      change: '+23%', 
      icon: <RiMoneyDollarCircleLine className="text-rose-600" size={24} />,
      bgColor: 'bg-rose-50'
    },
  ];

  const recentActivities = [
    { id: 1, action: 'New book published', author: 'Jane Cooper', time: '2 mins ago', icon: <RiBook2Line /> },
    { id: 2, action: 'Writer registered', author: 'John Smith', time: '15 mins ago', icon: <SiLibreofficewriter /> },
    { id: 3, action: 'Payment processed', amount: '$1,250', time: '1 hour ago', icon: <RiMoneyDollarCircleLine /> },
    { id: 4, action: 'Content update', section: 'Fantasy category', time: '3 hours ago', icon: <RiBarChart2Line /> },
  ];

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
            <p className="opacity-90">Here's what's happening with your platform today.</p>
          </div>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all">
            <FiCalendar size={18} />
            <span>Last 30 Days</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.bgColor} rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</p>
                <div className="flex items-center text-sm font-medium">
                  <span className="text-green-600 flex items-center">
                    <FiArrowUpRight className="mr-1" /> {stat.change}
                  </span>
                  <span className="text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white shadow-xs">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Revenue Overview</h3>
            <div className="flex gap-2">
              <select className="text-sm border rounded-md px-3 py-1 bg-gray-50">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
              <button className="flex items-center gap-1 text-sm border rounded-md px-3 py-1 bg-gray-50 hover:bg-gray-100">
                <FiDownload size={14} />
                <span>Export</span>
              </button>
            </div>
          </div>
          <div className="h-64">
            <RevenueChart />
          </div>
        </div>

        {/* User Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Distribution</h3>
          <div className="h-64">
            <UserPieChart />
          </div>
        </div>
      </div>

      {/* Secondary Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Reading Trends */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Reading Trends</h3>
          <div className="h-64">
            <ReadingTrendChart />
          </div>
        </div>

        {/* Top Genres */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Genres</h3>
          <div className="h-64">
            <TopGenresChart />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            <span>View All</span>
            <FiArrowUpRight size={16} />
          </button>
        </div>
        <div className="divide-y">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="py-3 flex items-start">
              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-3
                ${activity.id % 2 === 0 ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.action} {activity.author && <span className="text-indigo-600">by {activity.author}</span>} 
                  {activity.amount && <span className="text-emerald-600"> of {activity.amount}</span>}
                  {activity.section && <span> in {activity.section}</span>}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}