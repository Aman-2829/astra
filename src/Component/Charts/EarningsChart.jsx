import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const EarningsChart = ({ timeRange }) => {
  // Sample data - replace with your actual data
  const generateData = (range) => {
    const data = [];
    const now = new Date();
    let days;
    
    switch(range) {
      case '7days':
        days = 7;
        break;
      case '30days':
        days = 30;
        break;
      case '90days':
        days = 90;
        break;
      case 'year':
        days = 365;
        break;
      default:
        days = 30;
    }
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      
      // Random earnings data (replace with your actual data)
      const earnings = Math.floor(Math.random() * 300) + 50;
      const fees = Math.floor(earnings * 0.1);
      const netEarnings = earnings - fees;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: date.toISOString().split('T')[0],
        earnings,
        fees,
        netEarnings
      });
    }
    
    return data;
  };

  const chartData = generateData(timeRange);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-sm">
            <span className="text-gray-500">Gross:</span> 
            <span className="ml-2 font-medium">${payload[0].value.toFixed(2)}</span>
          </p>
          <p className="text-sm">
            <span className="text-gray-500">Fees:</span> 
            <span className="ml-2 font-medium text-red-500">-${payload[1].value.toFixed(2)}</span>
          </p>
          <p className="text-sm">
            <span className="text-gray-500">Net:</span> 
            <span className="ml-2 font-medium text-green-600">${payload[2].value.toFixed(2)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorFees" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#51cf66" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#51cf66" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis 
          dataKey="date" 
          tick={{ fill: '#6b7280', fontSize: 12 }}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis 
          tick={{ fill: '#6b7280', fontSize: 12 }}
          tickFormatter={(value) => `$${value}`}
          axisLine={false}
          tickMargin={10}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          formatter={(value) => {
            switch(value) {
              case 'earnings': return 'Gross Earnings';
              case 'fees': return 'Fees';
              case 'netEarnings': return 'Net Earnings';
              default: return value;
            }
          }}
        />
        
        <Area
          type="monotone"
          dataKey="earnings"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorEarnings)"
          name="Gross Earnings"
        />
        <Area
          type="monotone"
          dataKey="fees"
          stroke="#ff6b6b"
          fillOpacity={1}
          fill="url(#colorFees)"
          name="Fees"
        />
        <Area
          type="monotone"
          dataKey="netEarnings"
          stroke="#51cf66"
          fillOpacity={1}
          fill="url(#colorNet)"
          name="Net Earnings"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default EarningsChart;