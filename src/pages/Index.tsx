import React, { useState } from 'react';
import { ERPLayout } from '@/components/layout/ERPLayout';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { SalesModule } from '@/components/sales/SalesModule';
import { InventoryModule } from '@/components/inventory/InventoryModule';
import { PurchasesModule } from '@/components/purchases/PurchasesModule';
import { FinancialModule } from '@/components/financial/FinancialModule';
import { HRModule } from '@/components/hr/HRModule';
import { ProductionModule } from '@/components/production/ProductionModule';
import { ReportsModule } from '@/components/reports/ReportsModule';

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
        return <PurchasesModule />;
      case 'financial':
        return <FinancialModule />;
      case 'hr':
        return <HRModule />;
      case 'production':
        return <ProductionModule />;
      case 'reports':
        return <ReportsModule />;
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
