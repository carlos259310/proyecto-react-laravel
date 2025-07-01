import React, { useEffect, useState } from 'react';
import { getContribuyentes, Contribuyente } from '@/services/ContribuyenteApi/contribuyentesApi';

// Simulación de usuario autenticado (reemplaza con tu lógica real)
const user = {
  rol: 'Súper Usuario', // Cambia a otro valor para probar permisos
};

export default function ListaContribuyentes() {
  const [contribuyentes, setContribuyentes] = useState<Contribuyente[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    id_tipo_documento: '',
    documento: '',
    nombres: '',
    apellidos: '',
    telefono: '',
  });

  useEffect(() => {
    fetchContribuyentes();
  }, []);

  const fetchContribuyentes = () => {
    getContribuyentes()
      .then(res => {
        setContribuyentes(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleFiltrar = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchContribuyentes();
  };

  if (loading) return <div className="text-center py-5">Cargando...</div>;

  return (
  <div className="container py-4">
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="mb-4">Contribuyentes</h2>
            {/* Filtros */}
            <form className="row g-2 mb-4" onSubmit={handleFiltrar}>
              {/* ...filtros aquí... */}
            </form>
            {/* Botón crear solo para Súper Usuario */}
            {user.rol === 'Súper Usuario' && (
              <div className="mb-3 text-end">
                <button className="btn btn-success">
                  <i className="bi bi-plus-circle"></i> Crear nuevo
                </button>
              </div>
            )}
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Tipo Doc.</th>
                    <th>Nombre completo</th>
                    <th>Documento</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {contribuyentes.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-muted">
                        No hay contribuyentes.
                      </td>
                    </tr>
                  ) : (
                    contribuyentes.map(c => (
                      <tr key={c.id_contribuyente}>
                        <td>{c.id_contribuyente}</td>
                        <td>{c.id_tipo_documento}</td>
                        <td>{c.nombre_completo}</td>
                        <td>{c.documento}</td>
                        <td>{c.telefono}</td>
                        <td>
                          <button className="btn btn-sm btn-info me-1">Ver</button>
                          {user.rol === 'Súper Usuario' && (
                            <>
                              <button className="btn btn-sm btn-warning me-1">Editar</button>
                              <button className="btn btn-sm btn-danger">Eliminar</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}