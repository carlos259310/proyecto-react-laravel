import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Space, notification, Popconfirm } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import ContribuyenteForm from './ContribuyenteForm';
import ContribuyenteView from './ContribuyenteView';
import { Contribuyente, TipoDocumento, Ciudad, Departamento, Filters } from './interfaces';

const { Option } = Select;

const ContribuyentesList: React.FC = () => {
  const [contribuyentes, setContribuyentes] = useState<Contribuyente[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Contribuyente[]>([]);
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [viewVisible, setViewVisible] = useState<boolean>(false);
  const [currentContribuyente, setCurrentContribuyente] = useState<Contribuyente | null>(null);
  const [filters, setFilters] = useState<Filters>({
    tipo_documento: '',
    documento: '',
    nombres: '',
    apellidos: '',
    telefono: ''
  });

  useEffect(() => {
    fetchData();
    fetchTiposDocumento();
    fetchCiudades();
    fetchDepartamentos();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [contribuyentes, filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/contribuyentes');
      setContribuyentes(response.data.data);
      setLoading(false);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'No se pudo cargar la lista de contribuyentes'
      });
      setLoading(false);
    }
  };

  const fetchTiposDocumento = async () => {
    try {
      const response = await axios.get('/api/tipos-documento');
      setTiposDocumento(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'No se pudo cargar los tipos de documento'
      });
    }
  };

  const fetchCiudades = async () => {
    try {
      const response = await axios.get('/api/ciudades');
      setCiudades(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'No se pudo cargar las ciudades'
      });
    }
  };

  const fetchDepartamentos = async () => {
    try {
      const response = await axios.get('/api/departamentos');
      setDepartamentos(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'No se pudo cargar los departamentos'
      });
    }
  };

  const applyFilters = () => {
    let result = [...contribuyentes];

    if (filters.tipo_documento) {
      result = result.filter(item =>
        item.tipo_documento?.documento.toLowerCase().includes(filters.tipo_documento.toLowerCase())
      );
    }

    if (filters.documento) {
      result = result.filter(item =>
        item.documento.toLowerCase().includes(filters.documento.toLowerCase())
      );
    }

    if (filters.nombres) {
      result = result.filter(item =>
        item.nombres.toLowerCase().includes(filters.nombres.toLowerCase())
      );
    }

    if (filters.apellidos) {
      result = result.filter(item =>
        item.apellidos.toLowerCase().includes(filters.apellidos.toLowerCase())
      );
    }

    if (filters.telefono) {
      result = result.filter(item =>
        item.telefono.includes(filters.telefono)
      );
    }

    setFilteredData(result);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }) => {
    const { name, value } = 'target' in e ? e.target : e;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (contribuyente: Contribuyente) => {
    setCurrentContribuyente(contribuyente);
    setFormVisible(true);
  };

  const handleView = (contribuyente: Contribuyente) => {
    setCurrentContribuyente(contribuyente);
    setViewVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/contribuyentes/${id}`);
      notification.success({
        message: 'Éxito',
        description: 'Contribuyente eliminado correctamente'
      });
      fetchData();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'No se pudo eliminar el contribuyente'
      });
    }
  };

  const handleFormSubmit = () => {
    setFormVisible(false);
    fetchData();
  };

  const columns = [
    {
      title: 'Tipo Documento',
      dataIndex: ['tipo_documento', 'documento'],
      key: 'tipo_documento',
      render: (_: any, record: Contribuyente) => record.tipo_documento?.documento || '',
      filterDropdown: () => (
        <Input
          placeholder="Buscar tipo"
          value={filters.tipo_documento}
          onChange={(e) => handleFilterChange({ name: 'tipo_documento', value: e.target.value })}
        />
      ),
      filterIcon: <SearchOutlined />
    },
    {
      title: 'Documento',
      dataIndex: 'documento',
      key: 'documento',
      filterDropdown: () => (
        <Input
          placeholder="Buscar documento"
          value={filters.documento}
          onChange={(e) => handleFilterChange({ name: 'documento', value: e.target.value })}
        />
      ),
      filterIcon: <SearchOutlined />
    },
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
      filterDropdown: () => (
        <Input
          placeholder="Buscar nombres"
          value={filters.nombres}
          onChange={(e) => handleFilterChange({ name: 'nombres', value: e.target.value })}
        />
      ),
      filterIcon: <SearchOutlined />
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
      filterDropdown: () => (
        <Input
          placeholder="Buscar apellidos"
          value={filters.apellidos}
          onChange={(e) => handleFilterChange({ name: 'apellidos', value: e.target.value })}
        />
      ),
      filterIcon: <SearchOutlined />
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      key: 'telefono',
      filterDropdown: () => (
        <Input
          placeholder="Buscar teléfono"
          value={filters.telefono}
          onChange={(e) => handleFilterChange({ name: 'telefono', value: e.target.value })}
        />
      ),
      filterIcon: <SearchOutlined />
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Contribuyente) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="¿Estás seguro de eliminar este contribuyente?"
            onConfirm={() => handleDelete(record.id_contribuyente!)}
            okText="Sí"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setCurrentContribuyente(null);
            setFormVisible(true);
          }}
        >
          Nuevo Contribuyente
        </Button>
      </div>

      <Table
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
  );
};

export default ContribuyentesList;