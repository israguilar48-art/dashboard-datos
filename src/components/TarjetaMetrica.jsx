function TarjetaMetrica({ titulo, valor, subtitulo }) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '10px',
        padding: '1rem 1.25rem',
        boxShadow: '0 2px 6px rgba(15, 23, 42, 0.06)',
        minWidth: '180px',
        flex: '1 1 200px',
      }}
    >
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
        {titulo}
      </p>
      <h3 style={{ margin: '0.35rem 0', fontSize: '1.6rem', color: '#0f172a' }}>
        {valor}
      </h3>
      {subtitulo && (
        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
          {subtitulo}
        </span>
      )}
    </div>
  );
}

export default TarjetaMetrica;