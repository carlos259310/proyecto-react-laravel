export interface Contribuyente {
  id_contribuyente?: number;
  id_tipo_documento: number;
  documento: string;
  nombres: string;
  apellidos: string;
  nombre_completo: string;
  direccion: string;
  telefono: string;
  celular?: string;
  email: string;
  usuario: string;
  id_ciudad: string;
  id_departamento: string;
  tipo_documento?: {
    id: number;
    documento: string;
  };
  ciudad?: {
    id_ciudad: string;
    ciudad: string;
  };
  departamento?: {
    id_departamento: string;
    departamento: string;
  };
}

export interface TipoDocumento {
  id: number;
  documento: string;
  codigo: string;
}

export interface Ciudad {
  id_ciudad: string;
  ciudad: string;
  id_departamento: string;
}

export interface Departamento {
  id_departamento: string;
  departamento: string;
}

export interface Filters {
  tipo_documento: string;
  documento: string;
  nombres: string;
  apellidos: string;
  telefono: string;
}