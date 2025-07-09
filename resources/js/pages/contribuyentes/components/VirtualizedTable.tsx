import React, { memo } from 'react';
import { Table, TableProps } from 'antd';
import { Contribuyente } from '../interfaces';

interface VirtualizedTableProps extends Omit<TableProps<Contribuyente>, 'scroll'> {
  height?: number;
}

const VirtualizedTable: React.FC<VirtualizedTableProps> = memo(({
  height = 600,
  dataSource = [],
  ...props
}) => {
  // For large datasets (>1000 items), enable virtual scrolling
  const shouldVirtualize = dataSource.length > 1000;

  return (
    <Table
      {...props}
      dataSource={dataSource}
      scroll={shouldVirtualize ? { y: height, x: 'max-content' } : undefined}
      pagination={
        shouldVirtualize
          ? false // Disable pagination for virtualized tables
          : {
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} de ${total} contribuyentes`,
              pageSizeOptions: ['10', '20', '50', '100'],
              defaultPageSize: 20,
            }
      }
    />
  );
});

VirtualizedTable.displayName = 'VirtualizedTable';

export default VirtualizedTable;