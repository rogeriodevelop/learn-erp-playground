import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  CreditCard,
  UserCheck,
  Factory,
  BarChart3,
  Menu,
  X,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ERPLayoutProps {
  children: React.ReactNode;
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const modules = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Visão geral do sistema'
  },
  {
    id: 'sales',
    name: 'Vendas',
    icon: ShoppingCart,
    description: 'CRM e gestão de vendas'
  },
  {
    id: 'purchases',
    name: 'Compras',
    icon: Package,
    description: 'Fornecedores e compras'
  },
  {
    id: 'inventory',
    name: 'Estoque',
    icon: Package,
    description: 'Controle de inventário'
  },
  {
    id: 'financial',
    name: 'Financeiro',
    icon: CreditCard,
    description: 'Contas e fluxo de caixa'
  },
  {
    id: 'hr',
    name: 'RH',
    icon: UserCheck,
    description: 'Recursos humanos'
  },
  {
    id: 'production',
    name: 'Produção',
    icon: Factory,
    description: 'Ordens de produção'
  },
  {
    id: 'reports',
    name: 'Relatórios',
    icon: BarChart3,
    description: 'Analytics e relatórios'
  }
];

export const ERPLayout: React.FC<ERPLayoutProps> = ({ 
  children, 
  activeModule, 
  onModuleChange 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full bg-sidebar transition-all duration-300 border-r border-sidebar-border',
          sidebarOpen ? 'w-64' : 'w-16'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className={cn('flex items-center gap-3', !sidebarOpen && 'justify-center')}>
            <Building2 className="h-8 w-8 text-sidebar-primary" />
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">ERP Acadêmico</h1>
                <p className="text-xs text-sidebar-foreground/70">Sistema Didático</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            
            return (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all text-left',
                  'hover:bg-sidebar-accent group',
                  isActive 
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                    : 'text-sidebar-foreground'
                )}
                title={!sidebarOpen ? module.name : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && (
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{module.name}</div>
                    <div className={cn(
                      'text-xs opacity-70',
                      isActive ? 'text-sidebar-primary-foreground/80' : 'text-sidebar-foreground/60'
                    )}>
                      {module.description}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={cn(
        'transition-all duration-300 min-h-screen',
        sidebarOpen ? 'ml-64' : 'ml-16'
      )}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};