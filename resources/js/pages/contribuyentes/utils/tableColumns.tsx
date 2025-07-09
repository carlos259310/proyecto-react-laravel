import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Contribuyente, Filters } from '../interfaces';
import FilterDropdown from '../components/FilterDropdown';
import ActionButtons from '../components/ActionButtons';

interface CreateColumnsOptions {
  filters: Filters;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }) => void;
  onView: (contribuyente: Contribuyente) => void;
  onEdit: (contribuyente: Contribuyente) => void;
  onDelete: (id: number) => void;
}

export const createTableColumns = (options: CreateColumnsOptions) => {
  const { filters, onFilterChange, onView, onEdit, onDelete } = options;

  return [
    {
      title: 'Tipo Documento',
      dataIndex: ['tipo_documento', 'documento'],
      key: 'tipo_documento',
      render: (_: any, record: Contribuyente) => record.tipo_documento_nombre || '',
      filterDropdown: () => (
        <FilterDropdown
          value={filters.tipo_documento}
          placeholder="Buscar tipo"
          name="tipo_documento"
          onChange={onFilterChange}
        />
      ),
      filterIcon: <SearchOutlined />
    },
    {
      title: 'Documento',
      dataIndex: 'documento',
      key: 'documento',
      filterDropdown: () => (
        <FilterDropdown
          value={filters.documento}
          placeholder="Buscar documento"
          name="documento"
          onChange={onFilterChange}
        />
      ),
      filterIcon: <SearchOutlined />
    },
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
      filterDropdown: () => (
        <FilterDropdown
          value={filters.nombres}
          placeholder="Buscar nombres"
          name="nombres"
          onChange={onFilterChange}
        />
      ),
      filterIcon: <SearchOutlined />
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
      filterDropdown: () => (
        <FilterDropdown
          value={filters.apellidos}
          placeholder="Buscar apellidos"
          name="apellidos"
          onChange={onFilterChange}
        />
      ),
      filterIcon: <SearchOutlined />
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      key: 'telefono',
      filterDropdown: () => (
        <FilterDropdown
          value={filters.telefono}
          placeholder="Buscar teléfono"
          name="telefono"
          onChange={onFilterChange}
        />
      ),
      filterIcon: <SearchOutlined />
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Contribuyente) => (
        <ActionButtons
          record={record}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];
};