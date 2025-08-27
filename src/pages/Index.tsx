import React, { useState } from 'react';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { SalesModule } from '@/components/sales/SalesModule';
import { InventoryModule } from '@/components/inventory/InventoryModule';

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'sales':
        return <SalesModule />;
      case 'inventory':
        return <InventoryModule />;
      case 'purchases':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Módulo de Compras</h2>
            <p className="text-muted-foreground">Em desenvolvimento - Gestão de fornecedores e ordens de compra</p>
          </div>
        );
      case 'financial':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Módulo Financeiro</h2>
            <p className="text-muted-foreground">Em desenvolvimento - Contas a pagar/receber e fluxo de caixa</p>
          </div>
        );
      case 'hr':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Módulo de RH</h2>
            <p className="text-muted-foreground">Em desenvolvimento - Gestão de funcionários e folha de pagamento</p>
          </div>
        );
      case 'production':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Módulo de Produção</h2>
            <p className="text-muted-foreground">Em desenvolvimento - Ordens de produção e planejamento</p>
          </div>
        );
      case 'reports':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Módulo de Relatórios</h2>
            <p className="text-muted-foreground">Em desenvolvimento - Analytics e relatórios gerenciais</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <ERPLayout activeModule={activeModule} onModuleChange={setActiveModule}>
      {renderModule()}
    </ERPLayout>
  );
};

export default Index;
