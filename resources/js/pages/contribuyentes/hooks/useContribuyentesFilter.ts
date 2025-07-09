import { useState, useMemo, useCallback } from 'react';
import { Contribuyente, Filters } from '../interfaces';
import { useDebounce } from './useDebounce';

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

  // Debounce filters to improve performance during typing
  const debouncedFilters = useDebounce(filters, 300);

  const filteredData = useMemo(() => {
    if (!contribuyentes.length) return [];

    return contribuyentes.filter(item => {
      // Apply all filters in a single pass for better performance
      const matchesTipoDocumento = !debouncedFilters.tipo_documento || 
        (item.tipo_documento_nombre || '').toLowerCase().includes(debouncedFilters.tipo_documento.toLowerCase());
      
      const matchesDocumento = !debouncedFilters.documento || 
        item.documento.toLowerCase().includes(debouncedFilters.documento.toLowerCase());
      
      const matchesNombres = !debouncedFilters.nombres || 
        item.nombres.toLowerCase().includes(debouncedFilters.nombres.toLowerCase());
      
      const matchesApellidos = !debouncedFilters.apellidos || 
        item.apellidos.toLowerCase().includes(debouncedFilters.apellidos.toLowerCase());
      
      const matchesTelefono = !debouncedFilters.telefono || 
        item.telefono.includes(debouncedFilters.telefono);

      return matchesTipoDocumento && matchesDocumento && matchesNombres && 
             matchesApellidos && matchesTelefono;
    });
  }, [contribuyentes, debouncedFilters]);

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