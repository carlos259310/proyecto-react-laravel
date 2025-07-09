import React, { useState, useCallback, useMemo } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { notification } from 'antd';
import ContribuyenteForm from './ContribuyenteForm';
import ContribuyenteView from './ContribuyenteView';
import VirtualizedTable from './components/VirtualizedTable';
import ContribuyentesErrorBoundary from './components/ContribuyentesErrorBoundary';
import { Contribuyente } from './interfaces';
import { useContribuyentesData } from './hooks/useContribuyentesData';
import { useContribuyentesFilter } from './hooks/useContribuyentesFilter';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';
import { createTableColumns } from './utils/tableColumns';

const ContribuyentesList: React.FC = () => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [viewVisible, setViewVisible] = useState<boolean>(false);
  const [currentContribuyente, setCurrentContribuyente] = useState<Contribuyente | null>(null);

  // Use custom hooks for data fetching and filtering
  const {
    contribuyentes,
    tiposDocumento,
    ciudades,
    departamentos,
    loading,
    refetchContribuyentes
  } = useContribuyentesData();

  const {
    filters,
    filteredData,
    handleFilterChange
  } = useContribuyentesFilter(contribuyentes);

  // Performance monitoring in development
  usePerformanceMonitor('ContribuyentesList', filteredData.length, contribuyentes.length);

  // Memoized event handlers to prevent unnecessary re-renders
  const handleEdit = useCallback((contribuyente: Contribuyente) => {
    setCurrentContribuyente(contribuyente);
    setFormVisible(true);
  }, []);

  const handleView = useCallback((contribuyente: Contribuyente) => {
    setCurrentContribuyente(contribuyente);
    setViewVisible(true);
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await axios.delete(`/api/contribuyentes/${id}`);
      notification.success({
        message: 'Éxito',
        description: 'Contribuyente eliminado correctamente'
      });
      await refetchContribuyentes();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'No se pudo eliminar el contribuyente'
      });
    }
  }, [refetchContribuyentes]);

  const handleFormSubmit = useCallback(() => {
    setFormVisible(false);
    refetchContribuyentes();
  }, [refetchContribuyentes]);

  const handleNewContribuyente = useCallback(() => {
    setCurrentContribuyente(null);
    setFormVisible(true);
  }, []);

  // Memoized table columns to prevent unnecessary re-renders
  const columns = useMemo(() => createTableColumns({
    filters,
    onFilterChange: handleFilterChange,
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete
  }), [filters, handleFilterChange, handleView, handleEdit, handleDelete]);

  return (
    <ContribuyentesErrorBoundary>
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleNewContribuyente}
          >
            Nuevo Contribuyente
          </Button>
        </div>

        <VirtualizedTable
          columns={columns}
          dataSource={filteredData}
          rowKey="id_contribuyente"
          loading={loading}
          bordered
        />

        <ContribuyenteForm
          visible={formVisible}
          onCancel={() => setFormVisible(false)}
          onSubmit={handleFormSubmit}
          contribuyente={currentContribuyente}
          tiposDocumento={tiposDocumento}
          ciudades={ciudades}
          departamentos={departamentos}
        />

        <ContribuyenteView
          visible={viewVisible}
          onCancel={() => setViewVisible(false)}
          contribuyente={currentContribuyente}
        />
      </div>
    </ContribuyentesErrorBoundary>
  );
};

export default React.memo(ContribuyentesList);