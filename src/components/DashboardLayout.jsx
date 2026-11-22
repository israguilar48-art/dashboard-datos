export default function DashboardLayout({ sidebar, metricas, grafico, tabla }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 1.5rem;
          max-width: 1280px;
          margin: 0 auto;
          padding: 1.5rem;
          align-items: start;
        }
        .dashboard-main {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          min-width: 0;
        }
        .metricas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
            padding: 1rem;
          }
        }
      `}</style>

      <div className="dashboard-grid">
        <aside
          aria-label="Navegación y filtros"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '1.25rem',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
          }}
        >
          {sidebar}
        </aside>

        <main className="dashboard-main">
          <section aria-label="Indicadores clave" className="metricas-grid">
            {metricas}
          </section>

          <section
            aria-label="Gráfico principal"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
              minWidth: 0,
            }}
          >
            {grafico}
          </section>

          <section
            aria-label="Tabla de datos"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
              minWidth: 0,
              overflowX: 'auto',
            }}
          >
            {tabla}
          </section>
        </main>
      </div>
    </div>
  );
}