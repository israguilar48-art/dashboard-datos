import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import DashboardLayout from './components/DashboardLayout';
import PanelFiltros from './components/PanelFiltros';
import TarjetaMetrica from './components/TarjetaMetrica';
import TablaDatos from './components/TablaDatos';
import {
  obtenerDatosVisualizacion,
  procesarDatos,
  obtenerSerieDeTiempo,
} from './services/dataService';

function App() {
  const [datosBase, setDatosBase] = useState([]);
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [filtros, setFiltros] = useState({
    categoria: 'todas',
    fecha: '',
  });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    async function cargarTodo() {
      setCargando(true);
      setError(null);

      try {
        const [rawLocal, serieClima] = await Promise.all([
          obtenerDatosVisualizacion(),
          obtenerSerieDeTiempo({
            latitude: 19.267,
            longitude: -98.898,
            pastDays: 7,
          }).catch(() => []),
        ]);

        if (!activo) return;

        const localesNormalizados = procesarDatos(rawLocal);
        const combinados = [...localesNormalizados, ...serieClima];

        setDatosBase(combinados);
        setDatosFiltrados(combinados);
      } catch (err) {
        if (!activo) return;
        setError(err?.message || 'Error al cargar los datos del dashboard.');
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarTodo();

    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    const resultado = datosBase.filter((item) => {
      const cumpleCategoria =
        filtros.categoria === 'todas' || item.categoria === filtros.categoria;

      const cumpleFecha =
        !filtros.fecha || String(item.etiqueta ?? '').startsWith(filtros.fecha);

      return cumpleCategoria && cumpleFecha;
    });

    setDatosFiltrados(resultado);
  }, [datosBase, filtros]);

  const categoriasDisponibles = useMemo(() => {
    const setCats = new Set(datosBase.map((d) => d.categoria).filter(Boolean));
    return Array.from(setCats);
  }, [datosBase]);

  const totalElementos = datosFiltrados.length;
  const totalRegistros = datosFiltrados.reduce(
    (acc, item) => acc + (Number(item.registros) || 0),
    0
  );
  const promedioValor =
    totalElementos > 0
      ? (
          datosFiltrados.reduce(
            (acc, item) => acc + (Number(item.precision) || 0),
            0
          ) / totalElementos
        ).toFixed(1)
      : '0.0';

  const maxValorGrafico = Math.max(
    ...datosFiltrados.map((d) => Number(d.registros) || 0),
    1
  );

  const sidebarContenido = (
    <>
      <h2
        style={{
          marginTop: 0,
          marginBottom: '0.75rem',
          fontSize: '1.1rem',
          color: '#0f172a',
        }}
      >
        Filtros y control
      </h2>
      <PanelFiltros
        filtros={filtros}
        setFiltros={setFiltros}
        categorias={categoriasDisponibles}
      />
    </>
  );

  const metricasContenido = (
    <>
      <TarjetaMetrica
        titulo="Elementos visibles"
        valor={totalElementos}
        subtitulo={
          filtros.categoria === 'todas' ? 'Todas las categorías' : filtros.categoria
        }
      />
      <TarjetaMetrica
        titulo="Total registros / %HR"
        valor={totalRegistros.toLocaleString()}
        subtitulo="Acumulado filtrado"
      />
      <TarjetaMetrica
        titulo="Promedio precisión / °C"
        valor={promedioValor}
        subtitulo="Sincronizado con filtros"
      />
    </>
  );

  const graficoContenido = (
    <>
      <h2
        style={{
          marginTop: 0,
          marginBottom: '1rem',
          fontSize: '1.1rem',
          color: '#0f172a',
        }}
      >
        Visualización comparativa (Registros / Humedad)
      </h2>

      {datosFiltrados.length === 0 ? (
        <p style={{ color: '#64748b', margin: 0 }}>
          No hay datos que coincidan con los filtros seleccionados.
        </p>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '0.5rem',
            height: '180px',
            paddingTop: '1rem',
            overflowX: 'auto',
          }}
        >
          {datosFiltrados.map((item) => {
            const val = Number(item.registros) || 0;
            const alturaPct = Math.max(8, Math.round((val / maxValorGrafico) * 100));

            return (
              <div
                key={`${item.categoria}-${item.id}-${item.etiqueta}`}
                title={`${item.etiqueta}: ${val}`}
                style={{
                  flex: '1 1 36px',
                  minWidth: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                <span style={{ fontSize: '0.7rem', color: '#334155', marginBottom: '4px' }}>
                  {val}
                </span>
                <div
                  style={{
                    width: '100%',
                    height: `${alturaPct}%`,
                    backgroundColor: '#2563eb',
                    borderRadius: '4px 4px 0 0',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.65rem',
                    color: '#64748b',
                    marginTop: '4px',
                    maxWidth: '64px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.etiqueta}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  const tablaContenido = (
    <>
      <h2
        style={{
          marginTop: 0,
          marginBottom: '0.75rem',
          fontSize: '1.1rem',
          color: '#0f172a',
        }}
      >
        Detalle de registros
      </h2>
      <TablaDatos datos={datosFiltrados} />
    </>
  );

  return (
    <>
      <Navbar />
      {cargando ? (
        <p style={{ padding: '2rem', color: '#475569' }}>
          Cargando dashboard interactivo...
        </p>
      ) : error ? (
        <p style={{ padding: '2rem', color: '#b91c1c' }}>{error}</p>
      ) : (
        <DashboardLayout
          sidebar={sidebarContenido}
          metricas={metricasContenido}
          grafico={graficoContenido}
          tabla={tablaContenido}
        />
      )}
    </>
  );
}

export default App;