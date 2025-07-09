import React from 'react';
import { Modal, Descriptions, Typography } from 'antd';
import { Contribuyente } from './interfaces';

const { Text } = Typography;

interface ContribuyenteViewProps {
  visible: boolean;
  onCancel: () => void;
  contribuyente: Contribuyente | null;
}

const ContribuyenteView: React.FC<ContribuyenteViewProps> = ({
  visible,
  onCancel,
  contribuyente
}) => {
  return (
    <Modal
      visible={visible}
      title="Detalles del Contribuyente"
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      {contribuyente && (
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Tipo Documento" span={2}>
            <Text strong>{contribuyente.tipo_documento?.documento}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Documento">
            <Text>{contribuyente.documento}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Nombre Completo">
            <Text>{contribuyente.nombre_completo}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Dirección">
            <Text>{contribuyente.direccion}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Teléfono">
            <Text>{contribuyente.telefono}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Celular">
            <Text>{contribuyente.celular || 'N/A'}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            <Text>{contribuyente.email}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Usuario">
            <Text>{contribuyente.usuario}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Departamento">
            <Text>{contribuyente.departamento?.departamento}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Ciudad">
            <Text>{contribuyente.ciudad?.ciudad}</Text>
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default React.memo(ContribuyenteView);