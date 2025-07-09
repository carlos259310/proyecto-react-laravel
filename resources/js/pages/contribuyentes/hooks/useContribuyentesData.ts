import { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'antd';
import { Contribuyente, TipoDocumento, Ciudad, Departamento } from '../interfaces';

interface UseContribuyentesDataReturn {
  contribuyentes: Contribuyente[];
  tiposDocumento: TipoDocumento[];
  ciudades: Ciudad[];
  departamentos: Departamento[];
  loading: boolean;
  error: string | null;
  refetchContribuyentes: () => Promise<void>;
}

export const useContribuyentesData = (): UseContribuyentesDataReturn => {
  const [contribuyentes, setContribuyentes] = useState<Contribuyente[]>([]);
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (message: string, description: string) => {
    setError(description);
    notification.error({
      message,
      description
    });
  };

  const fetchContribuyentes = async (): Promise<void> => {
    try {
      const response = await axios.get('/api/contribuyentes');
      setContribuyentes(response.data.data);
    } catch (error) {
      handleError('Error', 'No se pudo cargar la lista de contribuyentes');
      throw error;
    }
  };

  const fetchAllData = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all data in parallel for better performance
      const [
        contribuyentesResponse,
        tiposDocumentoResponse,
        ciudadesResponse,
        departamentosResponse
      ] = await Promise.all([
        axios.get('/api/contribuyentes'),
        axios.get('/api/tipos-documento'),
        axios.get('/api/ciudades'),
        axios.get('/api/departamentos')
      ]);

      setContribuyentes(contribuyentesResponse.data.data);
      setTiposDocumento(tiposDocumentoResponse.data);
      setCiudades(ciudadesResponse.data);
      setDepartamentos(departamentosResponse.data);
    } catch (error) {
      handleError('Error', 'No se pudo cargar los datos necesarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    contribuyentes,
    tiposDocumento,
    ciudades,
    departamentos,
    loading,
    error,
    refetchContribuyentes: fetchContribuyentes
  };
};