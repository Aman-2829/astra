import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function RevenueChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [12500, 19000, 14200, 25000, 20300, 17200, 23400],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'New Subscriptions',
        data: [320, 450, 280, 510, 390, 420, 580],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderRadius: 6,
        borderSkipped: false,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.raw.toLocaleString();
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
  };

  return <Bar data={data} options={options} height={300} />;
}