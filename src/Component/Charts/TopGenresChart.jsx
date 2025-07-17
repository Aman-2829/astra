import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function TopGenresChart() {
  const data = {
    labels: ['Fantasy', 'Romance', 'Sci-Fi', 'Mystery', 'Biography'],
    datasets: [
      {
        label: 'Books',
        data: [1250, 980, 750, 620, 480],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderRadius: 6,
      }
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.raw.toLocaleString() + ' books';
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
          display: false,
        },
      }
    },
  };

  return <Bar data={data} options={options} />;
}