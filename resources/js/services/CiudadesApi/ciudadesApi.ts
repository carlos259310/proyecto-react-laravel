import axios from 'axios';
// Interfaces para ciudades, departamentos y tipos de documento
export interface Ciudad {
  id: string;
  ciudad: string;
  id_departamento: string;
}

// Ciudades
export const getCiudades = () =>
  axios.get<Ciudad[]>('/api/ciudades');