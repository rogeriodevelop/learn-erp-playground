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
  Building,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const suppliers = [
  {
    id: 'FORN-001',
    name: 'Tech Solutions Ltda',
    cnpj: '12.345.678/0001-90',
    contact: 'Carlos Silva',
    email: 'carlos@techsolutions.com',
    phone: '(11) 3456-7890',
    category: 'Informática',
    rating: 4.8,
    totalPurchases: 'R$ 2.450.890',
    paymentTerm: '30 dias',
    status: 'active'
  },
  {
    id: 'FORN-002',
    name: 'Office Plus Móveis',
    cnpj: '98.765.432/0001-10',
    contact: 'Ana Santos',
    email: 'ana@officeplus.com',
    phone: '(11) 2345-6789',
    category: 'Móveis',
    rating: 4.5,
    totalPurchases: 'R$ 1.250.450',
    paymentTerm: '45 dias',
    status: 'active'
  },
  {
    id: 'FORN-003',
    name: 'Material Escritório SA',
    cnpj: '11.222.333/0001-44',
    contact: 'Pedro Costa',
    email: 'pedro@materialescritorio.com',
    phone: '(11) 4567-8901',
    category: 'Material de Escritório',
    rating: 3.9,
    totalPurchases: 'R$ 890.230',
    paymentTerm: '21 dias',
    status: 'pending'
  }
];

const purchaseOrders = [
  {
    id: 'OC-2024-001',
    supplier: 'Tech Solutions Ltda',
    date: '2024-01-15',
    deliveryDate: '2024-01-22',
    value: 'R$ 45.890',
    items: 12,
    status: 'approved',
    urgency: 'normal'
  },
  {
    id: 'OC-2024-002',
    supplier: 'Office Plus Móveis',
    date: '2024-01-14',
    deliveryDate: '2024-01-28',
    value: 'R$ 28.450',
    items: 5,
    status: 'pending',
    urgency: 'high'
  },
  {
    id: 'OC-2024-003',
    supplier: 'Material Escritório SA',
    date: '2024-01-12',
    deliveryDate: '2024-01-20',
    value: 'R$ 12.340',
    items: 8,
    status: 'delivered',
    urgency: 'normal'
  },
  {
    id: 'OC-2024-004',
    supplier: 'Tech Solutions Ltda',
    date: '2024-01-10',
    deliveryDate: '2024-01-25',
    value: 'R$ 67.200',
    items: 15,
    status: 'rejected',
    urgency: 'low'
  }
];

const purchaseMetrics = [
  {
    title: 'Compras no Mês',
    value: 'R$ 856.340',
    change: '+18.5%',
    color: 'success',
    icon: DollarSign
  },
  {
    title: 'Ordens Pendentes',
    value: '23',
    change: '+3',
    color: 'warning',
    icon: Clock
  },
  {
    title: 'Fornecedores Ativos',
    value: '147',
    change: '+12',
    color: 'primary',
    icon: Building
  },
  {
    title: 'Economias Obtidas',
    value: 'R$ 125.450',
    change: '+8.3%',
    color: 'success',
    icon: Package
  }
];

export const PurchasesModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-success-light text-success border-success/20',
      pending: 'bg-warning-light text-warning border-warning/20',
      approved: 'bg-primary-light text-primary border-primary/20',
      delivered: 'bg-success-light text-success border-success/20',
      rejected: 'bg-danger-light text-danger border-danger/20',
    };
    
    const labels = {
      active: 'Ativo',
      pending: 'Pendente',
      approved: 'Aprovado',
      delivered: 'Entregue',
      rejected: 'Rejeitado',
    };

    return (
      <Badge className={cn('border', variants[status as keyof typeof variants])}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getUrgencyBadge = (urgency: string) => {
    const variants = {
      low: 'bg-secondary text-secondary-foreground border-secondary',
      normal: 'bg-primary-light text-primary border-primary/20',
      high: 'bg-danger-light text-danger border-danger/20',
    };
    
    const labels = {
      low: 'Baixa',
      normal: 'Normal',
      high: 'Alta',
    };

    return (
      <Badge className={cn('border text-xs', variants[urgency as keyof typeof variants])}>
        {labels[urgency as keyof typeof labels]}
      </Badge>
    );
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className={cn(
              'w-3 h-3 rounded-full',
              star <= rating ? 'bg-warning' : 'bg-secondary'
            )}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Módulo de Compras</h1>
        <p className="text-muted-foreground">
          Gestão completa de fornecedores e ordens de compra
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-secondary p-1 rounded-lg w-fit">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'suppliers', label: 'Fornecedores' },
          { id: 'orders', label: 'Ordens de Compra' },
          { id: 'cotations', label: 'Cotações' }
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
            {purchaseMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={cn(
                      'p-2 rounded-lg',
                      metric.color === 'success' && 'bg-success-light text-success',
                      metric.color === 'primary' && 'bg-primary-light text-primary',
                      metric.color === 'warning' && 'bg-warning-light text-warning'
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
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
                  <div className="text-sm text-muted-foreground">{metric.title}</div>
                </Card>
              );
            })}
          </div>

          {/* Recent Orders */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Ordens Recentes</h3>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Ver Todas
              </Button>
            </div>
            <div className="space-y-3">
              {purchaseOrders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.supplier}</div>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(order.status)}
                      {getUrgencyBadge(order.urgency)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{order.value}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {order.deliveryDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pending Approvals */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Aguardando Aprovação</h3>
            <div className="space-y-3">
              {purchaseOrders.filter(o => o.status === 'pending').map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-warning-light/30 rounded-lg border border-warning/20">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <div>
                      <div className="font-medium">{order.id} - {order.supplier}</div>
                      <div className="text-sm text-muted-foreground">
                        Valor: {order.value} • {order.items} itens
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Rejeitar
                    </Button>
                    <Button size="sm">
                      Aprovar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Suppliers Tab */}
      {activeTab === 'suppliers' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar fornecedores..." 
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
                Novo Fornecedor
              </Button>
            </div>
          </div>

          {/* Suppliers Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Fornecedor</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Contato</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Categoria</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Avaliação</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Total Compras</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id} className="border-b hover:bg-secondary/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
                            <Building className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{supplier.name}</div>
                            <div className="text-sm text-muted-foreground">CNPJ: {supplier.cnpj}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{supplier.contact}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {supplier.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {supplier.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{supplier.category}</Badge>
                      </td>
                      <td className="p-4">
                        {getRatingStars(supplier.rating)}
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{supplier.totalPurchases}</div>
                        <div className="text-sm text-muted-foreground">Prazo: {supplier.paymentTerm}</div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(supplier.status)}
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
                  placeholder="Buscar ordens..." 
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
                Nova Ordem
              </Button>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {purchaseOrders.map((order) => (
              <Card key={order.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.supplier}</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {getStatusBadge(order.status)}
                    {getUrgencyBadge(order.urgency)}
                  </div>
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
                    <span className="text-muted-foreground">Entrega:</span>
                    <span>{order.deliveryDate}</span>
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

      {/* Cotations Tab */}
      {activeTab === 'cotations' && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">Módulo de Cotações</h3>
            <p>Funcionalidade para comparar preços e condições de fornecedores</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Cotação
          </Button>
        </div>
      )}
    </div>
  );
};