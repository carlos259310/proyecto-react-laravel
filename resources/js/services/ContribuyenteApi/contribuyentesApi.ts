import axios from 'axios';

export interface Contribuyente {
  id_contribuyente: number;
  id_tipo_documento: number;
  documento: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  celular: string;
  email: string;
  usuario: string;
  id_ciudad: string;
  id_departamento: string;
  nombre_completo: string;
  created_at?: string;
  updated_at?: string;
}


//ciudades




export interface Departamento {
  id: string;
  nombre: string;
}

export interface TipoDocumento {
  id: number | string;
  nombre: string;
}


export const getContribuyentes = () =>
  axios.get<{ data: Contribuyente[] }>('/api/contribuyentes');

export const getContribuyente = (id: number) =>
  axios.get<Contribuyente>(`/api/contribuyentes/${id}`);

export const createContribuyente = (data: Partial<Contribuyente>) =>
  axios.post('/api/contribuyentes', data);

export const updateContribuyente = (id: number, data: Partial<Contribuyente>) =>
  axios.put(`/api/contribuyentes/${id}`, data);

export const deleteContribuyente = (id: number) =>
      axios.delete(`/api/contribuyentes/${id}`);



// Departamentos
export const getDepartamentos = () =>
  axios.get<Departamento[]>('/api/departamentos');

// Tipos de documento
export const getTiposDocumento = () =>
  axios.get<TipoDocumento[]>('/api/tipos-documento');