import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function GraficoComparativo({
  labels = [],
  values = [],
  titulo = 'Comparativa de registros',
  etiquetaSerie = 'Registros',
}) {
  if (!Array.isArray(labels) || !Array.isArray(values) || labels.length === 0 || values.length === 0) {
    return (
      <p style={{ color: '#64748b', margin: '0.5rem 0' }}>
        No hay datos disponibles para mostrar en el gráfico comparativo.
      </p>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: etiquetaSerie,
        data: values,
        backgroundColor: 'rgba(16, 185, 129, 0.72)',
        borderColor: '#059669',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
      <Bar data={data} options={options} />
    </div>
  );
}