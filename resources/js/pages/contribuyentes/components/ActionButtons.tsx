import React, { memo } from 'react';
import { Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Contribuyente } from '../interfaces';

interface ActionButtonsProps {
  record: Contribuyente;
  onView: (contribuyente: Contribuyente) => void;
  onEdit: (contribuyente: Contribuyente) => void;
  onDelete: (id: number) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = memo(({ 
  record, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  const handleView = () => onView(record);
  const handleEdit = () => onEdit(record);
  const handleDelete = () => onDelete(record.id_contribuyente!);

  return (
    <Space size="middle">
      <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={handleView}
        title="Ver detalles"
      />
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={handleEdit}
        title="Editar"
      />
      <Popconfirm
        title="¿Estás seguro de eliminar este contribuyente?"
        onConfirm={handleDelete}
        okText="Sí"
        cancelText="No"
      >
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />}
          title="Eliminar"
        />
      </Popconfirm>
    </Space>
  );
});

ActionButtons.displayName = 'ActionButtons';

export default ActionButtons;