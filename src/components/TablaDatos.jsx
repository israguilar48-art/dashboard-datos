function TablaDatos({ datos }) {
  if (!Array.isArray(datos) || datos.length === 0) {
    return <p style={{ color: '#475569' }}>No hay datos disponibles para mostrar.</p>;
  }

  return (
    <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 6px rgba(15, 23, 42, 0.06)',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#1e293b', color: '#ffffff', textAlign: 'left' }}>
            <th style={{ padding: '0.75rem 1rem' }}>ID</th>
            <th style={{ padding: '0.75rem 1rem' }}>Modelo / Etiqueta</th>
            <th style={{ padding: '0.75rem 1rem' }}>Categoría</th>
            <th style={{ padding: '0.75rem 1rem' }}>Registros</th>
            <th style={{ padding: '0.75rem 1rem' }}>Precisión (%)</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila) => (
            <tr key={fila.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem 1rem' }}>{fila.id}</td>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{fila.etiqueta}</td>
              <td style={{ padding: '0.75rem 1rem' }}>{fila.categoria}</td>
              <td style={{ padding: '0.75rem 1rem' }}>{fila.registros.toLocaleString()}</td>
              <td style={{ padding: '0.75rem 1rem' }}>{fila.precision}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaDatos;