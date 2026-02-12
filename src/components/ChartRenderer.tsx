import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register required chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

type GraphType = 'Bar' | 'Line' | 'Donut';

interface Props {
  type: GraphType;
  labels: string[];
  values: number[];
  title: string;
  showTitle?: boolean;
}

export default function ChartRenderer({
  type,
  labels,
  values,
  title,
  showTitle = true,
}: Props) {
  const palette = [
    '#3b82f6',
    '#10b981',
    '#fbbf24',
    '#ef4444',
    '#8b5cf6',
    '#06b6d4',
    '#d946ef',
    '#f97316',
  ];

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#ffffff' },
      },
      title: {
        display: false, // ❌ remove internal chart title
      },
    },
    scales: {
      x: {
        ticks: { color: '#ffffff' },
        grid: { color: '#333333' },
      },
      y: {
        ticks: { color: '#ffffff' },
        grid: { color: '#333333' },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: palette.slice(0, values.length),
        borderColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1,
      },
    ],
  };

  const renderChart = () => {
    if (type === 'Bar') return <Bar options={commonOptions} data={data} />;
    if (type === 'Line') return <Line options={commonOptions} data={data} />;
    return <Doughnut options={commonOptions} data={data} />;
  };

  return (
    <div style={{ width: '100%', marginBottom: showTitle ? '50px' : '0px' }}>
      {/* Show heading only for full-size charts */}
      {showTitle && (
        <h2
          style={{
            color: '#ffffff',
            fontSize: '22px',
            marginBottom: '20px',
            textAlign: 'left',
          }}
        >
          {title}
        </h2>
      )}

      {/* Height changes depending on usage */}
      <div style={{ width: '100%', height: showTitle ? '480px' : '150px'}}>
        {renderChart()}
      </div>
    </div>
  );
}
