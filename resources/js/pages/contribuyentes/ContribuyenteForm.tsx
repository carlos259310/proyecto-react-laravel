import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, notification } from 'antd';
import axios from 'axios';
import { Contribuyente, TipoDocumento, Ciudad, Departamento } from './interfaces';

const { Option } = Select;

interface ContribuyenteFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  contribuyente: Contribuyente | null;
  tiposDocumento: TipoDocumento[];
  ciudades: Ciudad[];
  departamentos: Departamento[];
}


const ContribuyenteForm: React.FC<ContribuyenteFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  contribuyente,
  tiposDocumento,
  ciudades,
  departamentos
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedDepartamento, setSelectedDepartamento] = useState<string>('');

  useEffect(() => {
    if (visible && contribuyente) {
      form.setFieldsValue({
        ...contribuyente,
        id_departamento: contribuyente.id_departamento
      });
      setSelectedDepartamento(contribuyente.id_departamento);
    } else if (visible) {
      form.resetFields();
      setSelectedDepartamento('');
    }
  }, [visible, contribuyente, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (contribuyente?.id_contribuyente) {
        await axios.put(`/api/contribuyentes/${contribuyente.id_contribuyente}`, values);
        notification.success({
          message: 'Éxito',
          description: 'Contribuyente actualizado correctamente'
        });
      } else {
        await axios.post('/api/contribuyentes', values);
        notification.success({
          message: 'Éxito',
          description: 'Contribuyente creado correctamente'
        });
      }

      setLoading(false);
      onSubmit();
    } catch (error) {
      setLoading(false);
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        (error as any).response &&
        (error as any).response.data &&
        (error as any).response.data.errors
      ) {
        const errors = (error as any).response.data.errors;
        Object.keys(errors).forEach(key => {
          notification.error({
            message: 'Error',
            description: errors[key][0]
          });
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'Ocurrió un error al procesar la solicitud'
        });
      }
    }
  };

  const handleDepartamentoChange = (value: string) => {
    setSelectedDepartamento(value);
    form.setFieldsValue({ id_ciudad: undefined });
  };

  const filteredCiudades = ciudades.filter(
    ciudad => ciudad.id_departamento === selectedDepartamento
  );

  return (
    <Modal
      visible={visible}
      title={contribuyente ? 'Editar Contribuyente' : 'Nuevo Contribuyente'}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          loading={loading} 
          onClick={handleSubmit}
        >
          Guardar
        </Button>,
      ]}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="id_tipo_documento"
          label="Tipo de Documento"
          rules={[{ required: true, message: 'Por favor seleccione el tipo de documento' }]}
        >
          <Select placeholder="Seleccione tipo de documento">
            {tiposDocumento.map(tipo => (
              <Option key={tipo.id} value={tipo.id}>
                {tipo.documento}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="documento"
          label="Documento"
          rules={[{ required: true, message: 'Por favor ingrese el documento' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="nombres"
          label="Nombres"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="apellidos"
          label="Apellidos"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="direccion"
          label="Dirección"
          rules={[{ required: true, message: 'Por favor ingrese la dirección' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="telefono"
          label="Teléfono"
          rules={[{ required: true, message: 'Por favor ingrese el teléfono' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="celular"
          label="Celular"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Por favor ingrese el email' },
            { type: 'email', message: 'Por favor ingrese un email válido' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="usuario"
          label="Usuario"
          rules={[{ required: true, message: 'Por favor ingrese el usuario' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="id_departamento"
          label="Departamento"
          rules={[{ required: true, message: 'Por favor seleccione el departamento' }]}
        >
          <Select 
            placeholder="Seleccione departamento" 
            onChange={handleDepartamentoChange}
          >
            {departamentos.map(depto => (
              <Option key={depto.id_departamento} value={depto.id_departamento}>
                {depto.departamento}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="id_ciudad"
          label="Ciudad"
          rules={[{ required: true, message: 'Por favor seleccione la ciudad' }]}
        >
          <Select 
            placeholder="Seleccione ciudad" 
            disabled={!selectedDepartamento}
          >
            {filteredCiudades.map(ciudad => (
              <Option key={ciudad.id_ciudad} value={ciudad.id_ciudad}>
                {ciudad.ciudad}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ContribuyenteForm;