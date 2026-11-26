import { useEffect, useMemo, useState } from 'react';
import {
  obtenerSerieDeTiempo,
  formatearParaGrafico,
} from '../services/dataService';
import TarjetaMetrica from './TarjetaMetrica';
import TablaDatos from './TablaDatos';
import GraficoTendencia from './charts/GraficoTendencia';
import GraficoComparativo from './charts/GraficoComparativo';

export default function PanelAnalitico() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const cargarDatos = async () => {
    setCargando(true);
    setError(null);

    try {
      const resultado = await obtenerSerieDeTiempo({
        latitude: 19.267,
        longitude: -98.898,
        pastDays: 7,
      });
      setDatos(resultado);
    } catch (err) {
      setError(
        err?.message || 'No se pudieron obtener los datos de la API externa.'
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const graficoTemperatura = useMemo(
    () => formatearParaGrafico(datos, 'temperatura'),
    [datos]
  );

  const graficoHumedad = useMemo(
    () => formatearParaGrafico(datos, 'humedad'),
    [datos]
  );

  const tempPromedio =
    datos.length > 0
      ? (
          datos.reduce((acc, item) => acc + item.temperatura, 0) / datos.length
        ).toFixed(1)
      : '0.0';

  const humedadPromedio =
    datos.length > 0
      ? (
          datos.reduce((acc, item) => acc + item.humedad, 0) / datos.length
        ).toFixed(1)
      : '0.0';

  return (
    <section style={{ marginTop: '2rem', minWidth: 0 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1rem',
        }}
      >
        <h2 style={{ margin: 0, color: '#0f172a' }}>
          Panel Analítico — API Externa (Open-Meteo)
        </h2>
        <button
          type="button"
          onClick={cargarDatos}
          disabled={cargando}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            cursor: cargando ? 'not-allowed' : 'pointer',
          }}
        >
          {cargando ? 'Consultando API...' : 'Actualizar datos'}
        </button>
      </div>

      {cargando && (
        <p style={{ color: '#475569' }}>
          Consultando servicio externo y procesando serie de tiempo...
        </p>
      )}

      {error && (
        <div
          role="alert"
          style={{
            color: '#b91c1c',
            backgroundColor: '#fee2e2',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            marginBottom: '1rem',
          }}
        >
          Error al consumir la API: {error}
        </div>
      )}

      {!cargando && !error && datos.length > 0 && (
        <>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginTop: '0.5rem',
            }}
          >
            <TarjetaMetrica
              titulo="Temperatura promedio"
              valor={`${tempPromedio} °C`}
              subtitulo="Open-Meteo (serie horaria)"
            />
            <TarjetaMetrica
              titulo="Humedad promedio"
              valor={`${humedadPromedio} %`}
              subtitulo="Humedad relativa"
            />
            <TarjetaMetrica
              titulo="Registros obtenidos"
              valor={datos.length}
              subtitulo="Muestras normalizadas"
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              marginTop: '1.25rem',
              minWidth: 0,
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                padding: '1rem',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
                minWidth: 0,
              }}
            >
              <GraficoTendencia
                labels={graficoTemperatura.labels}
                values={graficoTemperatura.values}
                titulo="Tendencia de Temperatura (°C)"
                etiquetaSerie="Temperatura (°C)"
              />
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                padding: '1rem',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
                minWidth: 0,
              }}
            >
              <GraficoComparativo
                labels={graficoHumedad.labels}
                values={graficoHumedad.values}
                titulo="Comparativa de Humedad (%HR)"
                etiquetaSerie="Humedad (%)"
              />
            </div>
          </div>

          <TablaDatos datos={datos} />
        </>
      )}
    </section>
  );
}