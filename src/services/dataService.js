import dataset from '../data/dataset.json';
import apiClient from './apiClient';

export async function obtenerDatosVisualizacion() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataset);
    }, 300);
  });
}

export function procesarDatos(datos) {
  if (!Array.isArray(datos)) return [];

  return datos.map((item) => ({
    id: item.id,
    etiqueta: String(item.etiqueta ?? ''),
    categoria: String(item.categoria ?? 'General'),
    registros: Number(item.registros) || 0,
    precision: Number(item.precision) || 0,
  }));
}

export async function obtenerSerieDeTiempo({
  latitude = 19.267,
  longitude = -98.898,
  pastDays = 7,
} = {}) {
  const response = await apiClient.get('/forecast', {
    params: {
      latitude,
      longitude,
      hourly: 'temperature_2m,relative_humidity_2m',
      past_days: pastDays,
      timezone: 'America/Mexico_City',
    },
  });

  const hourly = response.data?.hourly;
  const times = hourly?.time ?? [];
  const temperatures = hourly?.temperature_2m ?? [];
  const humidity = hourly?.relative_humidity_2m ?? [];

  return times.slice(0, 12).map((fecha, index) => {
    const temperatura = Number(temperatures[index] ?? 0);
    const humedad = Number(humidity[index] ?? 0);

    return {
      id: index + 1,
      etiqueta: String(fecha),
      categoria: 'Open-Meteo (°C / %HR)',
      registros: Math.round(humedad),
      precision: Number(temperatura.toFixed(1)),
      temperatura,
      humedad,
    };
  });
}

export function formatearParaGrafico(datosCrudos, campoValor = 'registros') {
  if (!Array.isArray(datosCrudos) || datosCrudos.length === 0) {
    return { labels: [], values: [] };
  }

  const labels = datosCrudos.map((item, index) =>
    String(item?.etiqueta ?? item?.categoria ?? `Registro ${index + 1}`)
  );

  const values = datosCrudos.map((item) => {
    const raw = item?.[campoValor] ?? item?.registros ?? item?.precision ?? 0;
    const num = Number(raw);
    return Number.isFinite(num) ? num : 0;
  });

  return { labels, values };
}