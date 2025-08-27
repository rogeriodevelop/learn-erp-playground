import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for demonstration
const kpis = [
  {
    title: 'Vendas do Mês',
    value: 'R$ 847.230',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'success'
  },
  {
    title: 'Pedidos Pendentes',
    value: '156',
    change: '+8',
    trend: 'up',
    icon: ShoppingCart,
    color: 'warning'
  },
  {
    title: 'Produtos em Estoque',
    value: '2.847',
    change: '-5.2%',
    trend: 'down',
    icon: Package,
    color: 'primary'
  },
  {
    title: 'Clientes Ativos',
    value: '1.234',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'success'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'sale',
    title: 'Nova venda realizada',
    description: 'Pedido #12345 - Cliente: João Silva',
    time: '2 minutos atrás',
    status: 'success'
  },
  {
    id: 2,
    type: 'inventory',
    title: 'Estoque baixo',
    description: 'Produto: Monitor LED 24" - Qtd: 5 unidades',
    time: '15 minutos atrás',
    status: 'warning'
  },
  {
    id: 3,
    type: 'purchase',
    title: 'Compra aprovada',
    description: 'Ordem de compra #OC-2024-001',
    time: '1 hora atrás',
    status: 'success'
  },
  {
    id: 4,
    type: 'hr',
    title: 'Novo funcionário',
    description: 'Maria Santos - Analista de Vendas',
    time: '2 horas atrás',
    status: 'info'
  }
];

const salesChart = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  data: [650000, 720000, 580000, 830000, 750000, 847230]
};

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do sistema ERP - Dados atualizados em tempo real
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className={cn(
                  'p-2 rounded-lg',
                  kpi.color === 'success' && 'bg-success-light text-success',
                  kpi.color === 'warning' && 'bg-warning-light text-warning',
                  kpi.color === 'primary' && 'bg-primary-light text-primary'
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  kpi.trend === 'up' ? 'text-success' : 'text-danger'
                )}>
                  <TrendIcon className="h-4 w-4" />
                  {kpi.change}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {kpi.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {kpi.title}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Vendas por Mês</h3>
          <div className="space-y-4">
            {salesChart.labels.map((month, index) => (
              <div key={month} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground w-12">{month}</span>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary-hover transition-all duration-500"
                      style={{ 
                        width: `${(salesChart.data[index] / Math.max(...salesChart.data)) * 100}%` 
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium w-20 text-right">
                  R$ {(salesChart.data[index] / 1000).toFixed(0)}K
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <div className={cn(
                  'p-1 rounded-full mt-0.5',
                  activity.status === 'success' && 'bg-success text-success-foreground',
                  activity.status === 'warning' && 'bg-warning text-warning-foreground',
                  activity.status === 'info' && 'bg-primary text-primary-foreground'
                )}>
                  {activity.status === 'success' && <CheckCircle className="h-3 w-3" />}
                  {activity.status === 'warning' && <AlertTriangle className="h-3 w-3" />}
                  {activity.status === 'info' && <CheckCircle className="h-3 w-3" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">{activity.title}</div>
                  <div className="text-sm text-muted-foreground">{activity.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};