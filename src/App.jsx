import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import TarjetaMetrica from './components/TarjetaMetrica';
import TablaDatos from './components/TablaDatos';
import PanelAnalitico from './components/PanelAnalitico';
import { obtenerDatosVisualizacion, procesarDatos } from './services/dataService';

function App() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    obtenerDatosVisualizacion()
      .then((raw) => {
        if (!activo) return;
        const limpios = procesarDatos(raw);
        setDatos(limpios);
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  const totalModelos = datos.length;
  const totalRegistros = datos.reduce((acc, item) => acc + item.registros, 0);
  const precisionPromedio =
    totalModelos > 0
      ? (datos.reduce((acc, item) => acc + item.precision, 0) / totalModelos).toFixed(1)
      : '0.0';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Navbar />
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem' }}>
        {cargando ? (
          <p style={{ color: '#475569' }}>Cargando datos de visualización...</p>
        ) : (
          <>
            <section
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                marginTop: '0.5rem',
              }}
            >
              <TarjetaMetrica
                titulo="Modelos evaluados"
                valor={totalModelos}
                subtitulo="Registros en dataset"
              />
              <TarjetaMetrica
                titulo="Total de registros"
                valor={totalRegistros.toLocaleString()}
                subtitulo="Suma procesada"
              />
              <TarjetaMetrica
                titulo="Precisión promedio"
                valor={`${precisionPromedio}%`}
                subtitulo="Métrica general"
              />
            </section>
            <TablaDatos datos={datos} />
          </>
        )}

        <PanelAnalitico />
      </main>
    </div>
  );
}

export default App;