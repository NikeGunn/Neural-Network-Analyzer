import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import type { InputData } from '../types/neural-network';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DataVisualizerProps {
  data: InputData[];
}

export const DataVisualizer: React.FC<DataVisualizerProps> = ({ data }) => {
  const chartData = useMemo(() => ({
    labels: data.map((d) => d.label),
    datasets: data[0]?.values.map((_, valueIndex) => ({
      label: `Input ${valueIndex + 1}`,
      data: data.map(d => d.values[valueIndex]),
      borderColor: `rgba(255, 255, 255, 0.6)`,  // Light borders, to keep it neutral
      backgroundColor: `rgba(255, 255, 255, 0.2)`,  // Soft background for the fills
      borderWidth: 3,
      fill: true,
      tension: 0.6,
      pointRadius: 8,
      pointHoverRadius: 10,
      pointBackgroundColor: `rgba(255, 255, 255, 0.6)`,  // Light point colors
      pointBorderColor: '#fff',
      pointBorderWidth: 3,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: `rgba(255, 255, 255, 0.6)`,
      pointHoverBorderWidth: 3,
    })) || []
  }), [data]);

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          font: {
            size: 16,
            weight: 'bold' as const,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: true,
        text: 'Neural Network Input Patterns',
        font: {
          size: 22,
          weight: 'bold' as const,
        },
        padding: { bottom: 20 }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark tooltips for clarity
        titleFont: {
          size: 15,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        padding: 18,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y.toFixed(3);
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',  // Subtle grid lines
        },
        ticks: {
          padding: 10,
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
      },
    },
    animation: {
      duration: 1200,
      easing: 'easeInOutCubic' as const,
    },
  };

  const calculateStats = () => {
    const stats = data[0]?.values.map((_, index) => {
      const values = data.map(d => d.values[index]);
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      const min = Math.min(...values);
      const max = Math.max(...values);
      const stdDev = Math.sqrt(
        values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / values.length
      );
      return { avg, min, max, stdDev };
    });
    return stats;
  };

  const generateSummary = () => {
    const summaries = stats.map((stat, index) => {
      const isLowVariation = stat.stdDev < 1;
      return `
      Input ${index + 1}:
      - The average is like the "middle value" (${stat.avg.toFixed(2)}), helping us see what most numbers look like.
      - The standard deviation is ${stat.stdDev.toFixed(2)}. ${
        isLowVariation
          ? "This means the numbers are close to each other, like students in a group photo."
          : "This means the numbers are spread out, like students in different parts of a classroom."
      }
      - The range (${stat.min.toFixed(2)} to ${stat.max.toFixed(2)}) shows the smallest and largest values.
      `;
    });
    return summaries;
  };

  const stats = calculateStats();
  const summaries = generateSummary();

  const neonColors = {
    cyberBlue: '#00FFFF',
    neonPink: '#FF10F0',
    ultraViolet: '#7B61FF',
    plasmaGreen: '#00FF94'
  };

  return (
    <motion.div className="space-y-6">
      {/* Data Analysis Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-8 w-1 bg-gradient-to-b from-[#00FFFF] to-[#FF10F0]" />
        <h2 className="text-2xl font-bold text-white/90">Neural Network Analysis</h2>
      </div>

      {/* Chart Section */}
      <motion.div 
        className="relative bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10
                   shadow-[0_0_30px_rgba(0,255,255,0.15)] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Ambient Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FFFF] rounded-full blur-[100px] opacity-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF10F0] rounded-full blur-[100px] opacity-10" />
          <div className="absolute inset-0 bg-[url('/neural-grid.svg')] opacity-5" />
        </div>

        <Line data={chartData} options={options} className="relative z-10" />
      </motion.div>

      {/* Analysis Results Grid */}
      <div className="grid grid-cols-2 gap-6">
        {stats?.map((stat, index) => (
          <motion.div
            key={index}
            className="relative bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10
                       hover:border-white/20 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Stat Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex space-x-1.5">
                {Object.values(neonColors).map((color, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-4 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={{ height: ['16px', '8px', '16px'] }}
                    transition={{ 
                      duration: 1.5,
                      delay: i * 0.2,
                      repeat: Infinity 
                    }}
                  />
                ))}
              </div>
              <h3 className="text-lg font-semibold text-white/80">Input {index + 1} Statistics</h3>
            </div>

            {/* Stat Values */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/60">Average</span>
                  <span className="font-mono text-[#00FFFF]">{stat.avg.toFixed(3)}</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00FFFF] to-[#FF10F0]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.avg / 10) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/60">Std Deviation</span>
                  <span className="font-mono text-[#7B61FF]">{stat.stdDev.toFixed(3)}</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#7B61FF] to-[#00FF94]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.stdDev / 2) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Range</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#00FF94]">{stat.min.toFixed(3)}</span>
                    <div className="w-4 h-[1px] bg-white/20" />
                    <span className="font-mono text-[#FF10F0]">{stat.max.toFixed(3)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute -top-px -right-px w-16 h-16">
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 rounded-tr-lg
                             border-[#00FFFF]/30" />
            </div>
            <div className="absolute -bottom-px -left-px w-16 h-16">
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 rounded-bl-lg
                             border-[#FF10F0]/30" />
            </div>
          </motion.div>
        ))}

        {/* Summary Section */}
        <motion.div 
          className="col-span-2 bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-white/80 mb-4">Analysis Summary</h3>
          <div className="space-y-4 text-white/60">
            {summaries.map((summary, index) => (
              <p key={index} className="leading-relaxed">{summary}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
