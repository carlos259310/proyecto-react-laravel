import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ContribuyentesList from './ContribuyentesList';

const ContribuyentesPage: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Gestión de Contribuyentes',
        breadcrumb: {
          routes: [
            {
              path: '/',
              breadcrumbName: 'Inicio',
            },
            {
              path: '/contribuyentes',
              breadcrumbName: 'Contribuyentes',
            },
          ],
        },
      }}
    >
      <ContribuyentesList />
    </PageContainer>
  );
};

export default ContribuyentesPage;