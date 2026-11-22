export default function PanelFiltros({ filtros, setFiltros, categorias = [] }) {
  const handleCategoriaChange = (e) => {
    const nuevaCategoria = e.target.value;
    setFiltros((prev) => ({
      ...prev,
      categoria: nuevaCategoria,
    }));
  };

  const handleFechaChange = (e) => {
    const nuevaFecha = e.target.value;
    setFiltros((prev) => ({
      ...prev,
      fecha: nuevaFecha,
    }));
  };

  const handleLimpiar = () => {
    setFiltros({
      categoria: 'todas',
      fecha: '',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label
          htmlFor="filtro-categoria"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#334155',
            marginBottom: '0.35rem',
          }}
        >
          Categoría
        </label>
        <select
          id="filtro-categoria"
          value={filtros.categoria}
          onChange={handleCategoriaChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            color: '#0f172a',
          }}
        >
          <option value="todas">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="filtro-fecha"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#334155',
            marginBottom: '0.35rem',
          }}
        >
          Fecha (desde / coincidencia)
        </label>
        <input
          id="filtro-fecha"
          type="date"
          value={filtros.fecha}
          onChange={handleFechaChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            color: '#0f172a',
          }}
        />
      </div>

      <button
        type="button"
        onClick={handleLimpiar}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '6px',
          border: '1px solid #cbd5e1',
          backgroundColor: '#f8fafc',
          color: '#0f172a',
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        Limpiar filtros
      </button>
    </div>
  );
}