import { useState, useMemo, useCallback } from 'react';
import { Contribuyente, Filters } from '../interfaces';

interface UseContribuyentesFilterReturn {
  filters: Filters;
  filteredData: Contribuyente[];
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }) => void;
}

export const useContribuyentesFilter = (contribuyentes: Contribuyente[]): UseContribuyentesFilterReturn => {
  const [filters, setFilters] = useState<Filters>({
    tipo_documento: '',
    documento: '',
    nombres: '',
    apellidos: '',
    telefono: ''
  });

  const filteredData = useMemo(() => {
    if (!contribuyentes.length) return [];

    return contribuyentes.filter(item => {
      // Apply all filters in a single pass for better performance
      const matchesTipoDocumento = !filters.tipo_documento || 
        (item.tipo_documento_nombre || '').toLowerCase().includes(filters.tipo_documento.toLowerCase());
      
      const matchesDocumento = !filters.documento || 
        item.documento.toLowerCase().includes(filters.documento.toLowerCase());
      
      const matchesNombres = !filters.nombres || 
        item.nombres.toLowerCase().includes(filters.nombres.toLowerCase());
      
      const matchesApellidos = !filters.apellidos || 
        item.apellidos.toLowerCase().includes(filters.apellidos.toLowerCase());
      
      const matchesTelefono = !filters.telefono || 
        item.telefono.includes(filters.telefono);

      return matchesTipoDocumento && matchesDocumento && matchesNombres && 
             matchesApellidos && matchesTelefono;
    });
  }, [contribuyentes, filters]);

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }) => {
    const { name, value } = 'target' in e ? e.target : e;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  return {
    filters,
    filteredData,
    handleFilterChange
  };
};