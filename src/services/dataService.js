import dataset from '../data/dataset.json';

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