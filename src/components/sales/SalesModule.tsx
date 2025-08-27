import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Calendar,
  ShoppingCart
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const customers = [
  {
    id: 1,
    name: 'João Silva Santos',
    email: 'joao@empresa.com',
    phone: '(11) 99999-9999',
    company: 'Empresa ABC Ltda',
    totalPurchases: 'R$ 125.430',
    lastPurchase: '2024-01-15',
    status: 'active'
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria@xyz.com',
    phone: '(11) 88888-8888',
    company: 'XYZ Comércio',
    totalPurchases: 'R$ 89.250',
    lastPurchase: '2024-01-10',
    status: 'active'
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro@costa.com',
    phone: '(11) 77777-7777',
    company: 'Costa & Associados',
    totalPurchases: 'R$ 45.890',
    lastPurchase: '2023-12-28',
    status: 'inactive'
  }
];

const salesOrders = [
  {
    id: 'PED-2024-001',
    customer: 'João Silva Santos',
    date: '2024-01-15',
    value: 'R$ 15.430',
    status: 'confirmed',
    items: 5
  },
  {
    id: 'PED-2024-002',
    customer: 'Maria Oliveira',
    date: '2024-01-14',
    value: 'R$ 8.250',
    status: 'pending',
    items: 3
  },
  {
    id: 'PED-2024-003',
    customer: 'Pedro Costa',
    date: '2024-01-12',
    value: 'R$ 22.890',
    status: 'delivered',
    items: 8
  }
];

const salesMetrics = [
  {
    title: 'Vendas Hoje',
    value: 'R$ 12.450',
    change: '+8.2%',
    color: 'success'
  },
  {
    title: 'Meta do Mês',
    value: '68%',
    change: '+5.1%',
    color: 'primary'
  },
  {
    title: 'Novos Clientes',
    value: '15',
    change: '+12%',
    color: 'success'
  },
  {
    title: 'Pedidos Pendentes',
    value: '23',
    change: '-3',
    color: 'warning'
  }
];

export const SalesModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-success-light text-success border-success/20',
      inactive: 'bg-danger-light text-danger border-danger/20',
      confirmed: 'bg-primary-light text-primary border-primary/20',
      pending: 'bg-warning-light text-warning border-warning/20',
      delivered: 'bg-success-light text-success border-success/20',
    };
    
    const labels = {
      active: 'Ativo',
      inactive: 'Inativo',
      confirmed: 'Confirmado',
      pending: 'Pendente',
      delivered: 'Entregue',
    };

    return (
      <Badge className={cn('border', variants[status as keyof typeof variants])}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Módulo de Vendas</h1>
        <p className="text-muted-foreground">
          Gerencie clientes, pedidos e oportunidades de venda
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-secondary p-1 rounded-lg w-fit">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'customers', label: 'Clientes' },
          { id: 'orders', label: 'Pedidos' },
          { id: 'opportunities', label: 'Oportunidades' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-md transition-colors',
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {salesMetrics.map((metric, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">{metric.title}</div>
                  <div className={cn(
                    'text-xs font-medium',
                    metric.color === 'success' && 'text-success',
                    metric.color === 'primary' && 'text-primary',
                    metric.color === 'warning' && 'text-warning'
                  )}>
                    {metric.change}
                  </div>
                </div>
                <div className="text-2xl font-bold">{metric.value}</div>
              </Card>
            ))}
          </div>

          {/* Recent Orders */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Pedidos Recentes</h3>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Ver Todos
              </Button>
            </div>
            <div className="space-y-3">
              {salesOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{order.value}</div>
                    <div className="text-sm text-muted-foreground">{order.date}</div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Customers Tab */}
      {activeTab === 'customers' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar clientes..." 
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Cliente
              </Button>
            </div>
          </div>

          {/* Customers Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Cliente</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Contato</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Empresa</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Total Compras</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-secondary/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">ID: {customer.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{customer.company}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{customer.totalPurchases}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {customer.lastPurchase}
                        </div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(customer.status)}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar pedidos..." 
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Pedido
              </Button>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {salesOrders.map((order) => (
              <Card key={order.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.customer}</div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Valor:</span>
                    <span className="font-medium">{order.value}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data:</span>
                    <span>{order.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Itens:</span>
                    <span>{order.items}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Opportunities Tab */}
      {activeTab === 'opportunities' && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">Módulo de Oportunidades</h3>
            <p>Funcionalidade em desenvolvimento para gerenciar o funil de vendas</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Oportunidade
          </Button>
        </div>
      )}
    </div>
  );
};