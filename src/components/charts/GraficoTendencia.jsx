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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function GraficoTendencia({
  labels = [],
  values = [],
  titulo = 'Tendencia de valores',
  etiquetaSerie = 'Registros',
}) {
  if (!Array.isArray(labels) || !Array.isArray(values) || labels.length === 0 || values.length === 0) {
    return (
      <p style={{ color: '#64748b', margin: '0.5rem 0' }}>
        No hay datos disponibles para mostrar en el gráfico de tendencia.
      </p>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: etiquetaSerie,
        data: values,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        tension: 0.3,
        fill: true,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: titulo },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', minWidth: 0, height: '280px' }}>
      <Line data={data} options={options} />
    </div>
  );
}