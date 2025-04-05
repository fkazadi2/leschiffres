'use client';

import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useTheme } from '@/contexts/ThemeContext';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Types pour les données
interface DataPoint {
  label: string;
  value: number;
}

interface DataSeries {
  id: string;
  name: string;
  color: string;
  data: DataPoint[];
}

interface DataChartProps {
  title: string;
  description?: string;
  series: DataSeries[];
  defaultType?: 'line' | 'bar';
}

export default function DataChart({ 
  title, 
  description, 
  series, 
  defaultType = 'line' 
}: DataChartProps) {
  // État pour le type de graphique
  const [chartType, setChartType] = useState<'line' | 'bar'>(defaultType);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Couleurs adaptatives pour le thème
  const textColor = isDark ? '#e2e2e8' : '#1a1a24';
  const textMutedColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(26, 26, 36, 0.6)';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const tooltipBgColor = isDark ? 'rgba(26, 26, 36, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const tooltipTextColor = isDark ? '#fff' : '#1a1a24';
  const tooltipBodyColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(26, 26, 36, 0.8)';
  const tooltipBorderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  // Préparer les données pour Chart.js
  const labels = series.length > 0 ? series[0].data.map((point) => point.label) : [];
  
  const chartData = {
    labels,
    datasets: series.map((s) => ({
      label: s.name,
      data: s.data.map((point) => point.value),
      backgroundColor: s.color,
      borderColor: s.color,
      borderWidth: 2,
      tension: 0.4,
      pointBackgroundColor: isDark ? '#fff' : '#fff',
      pointBorderColor: s.color,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: chartType === 'line' ? {
        target: 'origin',
        above: s.color + '20' // 20 = 12% d'opacité en hex
      } : false
    })),
  };

  // Options du graphique
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: textColor,
          font: {
            size: 12
          },
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: tooltipBgColor,
        titleColor: tooltipTextColor,
        bodyColor: tooltipBodyColor,
        borderColor: tooltipBorderColor,
        borderWidth: 1,
        padding: 10,
        cornerRadius: 4,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 12
        },
        displayColors: true,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          color: gridColor,
          tickLength: 8
        },
        ticks: {
          color: textMutedColor,
          font: {
            size: 10
          }
        },
        border: {
          dash: [2, 4]
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor,
          tickLength: 8
        },
        ticks: {
          color: textMutedColor,
          font: {
            size: 10
          },
          callback: function(value: any) {
            return value + (series[0] && series[0].id === 'gdp' || series[0].id === 'inflation' ? '%' : '');
          }
        },
        border: {
          dash: [2, 4]
        }
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    elements: {
      line: {
        borderWidth: 2,
        tension: 0.4
      },
      point: {
        hoverRadius: 6,
        hoverBorderWidth: 2
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart' as const
    }
  };

  return (
    <div className="bg-[var(--card-bg)] rounded-xl overflow-hidden h-full cyberpunk-border card-glow">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-color)]">{title}</h3>
            {description && <p className="text-[var(--text-muted)] text-xs mt-1">{description}</p>}
          </div>
          <div className="flex space-x-1">
            <button
              className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                chartType === 'line'
                  ? 'bg-[var(--primary)] text-[var(--card-bg)]'
                  : 'bg-[rgba(var(--text-color-rgb),0.05)] text-[var(--text-muted)] hover:bg-[rgba(var(--text-color-rgb),0.1)]'
              }`}
              onClick={() => setChartType('line')}
            >
              Ligne
            </button>
            <button
              className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                chartType === 'bar'
                  ? 'bg-[var(--primary)] text-[var(--card-bg)]'
                  : 'bg-[rgba(var(--text-color-rgb),0.05)] text-[var(--text-muted)] hover:bg-[rgba(var(--text-color-rgb),0.1)]'
              }`}
              onClick={() => setChartType('bar')}
            >
              Barres
            </button>
          </div>
        </div>

        <div className="h-60 relative">
          {/* Éléments décoratifs */}
          <div className="absolute top-2 right-2 w-16 h-16 z-0">
            <div className="absolute left-0 top-0 w-3 h-px bg-[var(--primary)]"></div>
            <div className="absolute left-0 top-0 w-px h-3 bg-[var(--primary)]"></div>
          </div>
          
          {/* Le graphique */}
          <div className="relative z-10">
            {chartType === 'line' ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <Bar data={chartData} options={chartOptions} />
            )}
          </div>
        </div>
        
        {/* Footnote */}
        <div className="mt-3 flex justify-between items-center">
          <div className="text-[10px] text-[var(--text-muted)]">
            Source: Banque Centrale
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-[var(--text-muted)]">MAJ: 02/04/2024</span>
            <button className="w-5 h-5 rounded-full flex items-center justify-center bg-[rgba(var(--text-color-rgb),0.05)] hover:bg-[rgba(var(--text-color-rgb),0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 