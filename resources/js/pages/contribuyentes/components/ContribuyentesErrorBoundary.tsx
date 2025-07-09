import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Result, Button } from 'antd';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ContribuyentesErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ContribuyentesErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Result
          status="error"
          title="Error en el módulo de contribuyentes"
          subTitle="Ha ocurrido un error inesperado. Por favor, intenta nuevamente."
          extra={[
            <Button type="primary" key="retry" onClick={this.handleRetry}>
              Reintentar
            </Button>,
            <Button key="refresh" onClick={() => window.location.reload()}>
              Recargar página
            </Button>,
          ]}
        />
      );
    }

    return this.props.children;
  }
}

export default ContribuyentesErrorBoundary;