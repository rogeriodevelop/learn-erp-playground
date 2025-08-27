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
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const products = [
  {
    id: 'PRD-001',
    name: 'Monitor LED 24" Full HD',
    category: 'Informática',
    stock: 45,
    minStock: 10,
    maxStock: 100,
    price: 'R$ 890,00',
    supplier: 'Tech Solutions',
    location: 'A-01-15',
    status: 'active'
  },
  {
    id: 'PRD-002',
    name: 'Teclado Mecânico Gamer',
    category: 'Periféricos',
    stock: 5,
    minStock: 15,
    maxStock: 50,
    price: 'R$ 350,00',
    supplier: 'Gaming Store',
    location: 'B-03-08',
    status: 'low_stock'
  },
  {
    id: 'PRD-003',
    name: 'Cadeira Ergonômica',
    category: 'Móveis',
    stock: 28,
    minStock: 5,
    maxStock: 30,
    price: 'R$ 1.200,00',
    supplier: 'Office Plus',
    location: 'C-05-22',
    status: 'active'
  },
  {
    id: 'PRD-004',
    name: 'Smartphone 128GB',
    category: 'Celulares',
    stock: 0,
    minStock: 10,
    maxStock: 25,
    price: 'R$ 2.100,00',
    supplier: 'Mobile Tech',
    location: 'D-02-10',
    status: 'out_of_stock'
  }
];

const stockMovements = [
  {
    id: 1,
    product: 'Monitor LED 24" Full HD',
    type: 'entrada',
    quantity: 20,
    date: '2024-01-15',
    reason: 'Compra - Pedido #PC-2024-001',
    user: 'Maria Santos'
  },
  {
    id: 2,
    product: 'Teclado Mecânico Gamer',
    type: 'saida',
    quantity: -3,
    date: '2024-01-15',
    reason: 'Venda - Pedido #PV-2024-045',
    user: 'João Silva'
  },
  {
    id: 3,
    product: 'Smartphone 128GB',
    type: 'saida',
    quantity: -8,
    date: '2024-01-14',
    reason: 'Venda - Pedido #PV-2024-044',
    user: 'Ana Costa'
  }
];

const inventoryMetrics = [
  {
    title: 'Total de Produtos',
    value: '1.247',
    change: '+23',
    color: 'primary',
    icon: Package
  },
  {
    title: 'Valor do Estoque',
    value: 'R$ 2.4M',
    change: '+5.2%',
    color: 'success',
    icon: TrendingUp
  },
  {
    title: 'Produtos em Falta',
    value: '12',
    change: '+3',
    color: 'danger',
    icon: AlertTriangle
  },
  {
    title: 'Giro de Estoque',
    value: '4.2x',
    change: '+0.3',
    color: 'success',
    icon: BarChart3
  }
];

export const InventoryModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getStatusBadge = (status: string, stock?: number, minStock?: number) => {
    let finalStatus = status;
    
    if (stock !== undefined && minStock !== undefined) {
      if (stock === 0) finalStatus = 'out_of_stock';
      else if (stock <= minStock) finalStatus = 'low_stock';
      else finalStatus = 'active';
    }

    const variants = {
      active: 'bg-success-light text-success border-success/20',
      low_stock: 'bg-warning-light text-warning border-warning/20',
      out_of_stock: 'bg-danger-light text-danger border-danger/20',
    };
    
    const labels = {
      active: 'Em Estoque',
      low_stock: 'Estoque Baixo',
      out_of_stock: 'Sem Estoque',
    };

    return (
      <Badge className={cn('border', variants[finalStatus as keyof typeof variants])}>
        {labels[finalStatus as keyof typeof labels]}
      </Badge>
    );
  };

  const getStockLevel = (current: number, min: number, max: number) => {
    const percentage = (current / max) * 100;
    let color = 'success';
    if (current === 0) color = 'danger';
    else if (current <= min) color = 'warning';
    
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className={cn(
              'h-full transition-all',
              color === 'success' && 'bg-success',
              color === 'warning' && 'bg-warning', 
              color === 'danger' && 'bg-danger'
            )}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground min-w-0">
          {current}/{max}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Módulo de Estoque</h1>
        <p className="text-muted-foreground">
          Controle completo do inventário e movimentações
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-secondary p-1 rounded-lg w-fit">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'products', label: 'Produtos' },
          { id: 'movements', label: 'Movimentações' },
          { id: 'reports', label: 'Relatórios' }
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
            {inventoryMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={cn(
                      'p-2 rounded-lg',
                      metric.color === 'success' && 'bg-success-light text-success',
                      metric.color === 'primary' && 'bg-primary-light text-primary',
                      metric.color === 'danger' && 'bg-danger-light text-danger'
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className={cn(
                      'text-xs font-medium',
                      metric.color === 'success' && 'text-success',
                      metric.color === 'primary' && 'text-primary',
                      metric.color === 'danger' && 'text-danger'
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

          {/* Stock Alerts */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Alertas de Estoque</h3>
            <div className="space-y-3">
              {products.filter(p => p.stock <= p.minStock).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Estoque atual: {product.stock} | Mínimo: {product.minStock}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(product.status, product.stock, product.minStock)}
                    <Button size="sm">
                      Repor Estoque
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar produtos..." 
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
                Novo Produto
              </Button>
            </div>
          </div>

          {/* Products Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Produto</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Categoria</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Estoque</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Preço</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Localização</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-secondary/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
                            <Package className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="font-medium">{product.stock} un.</div>
                          {getStockLevel(product.stock, product.minStock, product.maxStock)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{product.price}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{product.location}</div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(product.status, product.stock, product.minStock)}
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

      {/* Movements Tab */}
      {activeTab === 'movements' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar movimentações..." 
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
                Nova Movimentação
              </Button>
            </div>
          </div>

          {/* Movements List */}
          <div className="space-y-4">
            {stockMovements.map((movement) => (
              <Card key={movement.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      movement.type === 'entrada' ? 'bg-success-light text-success' : 'bg-danger-light text-danger'
                    )}>
                      {movement.type === 'entrada' ? (
                        <TrendingUp className="h-5 w-5" />
                      ) : (
                        <TrendingDown className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{movement.product}</div>
                      <div className="text-sm text-muted-foreground">{movement.reason}</div>
                      <div className="text-xs text-muted-foreground">
                        Por: {movement.user} • {movement.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      'text-lg font-bold',
                      movement.type === 'entrada' ? 'text-success' : 'text-danger'
                    )}>
                      {movement.type === 'entrada' ? '+' : ''}{movement.quantity}
                    </div>
                    <div className="text-sm text-muted-foreground">unidades</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">Relatórios de Estoque</h3>
            <p>Funcionalidade em desenvolvimento para análise de inventário e performance</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Gerar Relatório
          </Button>
        </div>
      )}
    </div>
  );
};