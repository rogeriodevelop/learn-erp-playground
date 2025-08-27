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
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Building,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const accountsReceivable = [
  {
    id: 'CR-2024-001',
    customer: 'João Silva Santos',
    company: 'Empresa ABC Ltda',
    invoice: 'NF-12345',
    value: 'R$ 15.430',
    dueDate: '2024-01-25',
    issueDate: '2024-01-15',
    status: 'pending',
    overdue: 0
  },
  {
    id: 'CR-2024-002',
    customer: 'Maria Oliveira',
    company: 'XYZ Comércio',
    invoice: 'NF-12346',
    value: 'R$ 8.250',
    dueDate: '2024-01-20',
    issueDate: '2024-01-10',
    status: 'overdue',
    overdue: 5
  },
  {
    id: 'CR-2024-003',
    customer: 'Pedro Costa',
    company: 'Costa & Associados',
    invoice: 'NF-12347',
    value: 'R$ 22.890',
    dueDate: '2024-01-18',
    issueDate: '2024-01-08',
    status: 'paid',
    overdue: 0
  }
];

const accountsPayable = [
  {
    id: 'CP-2024-001',
    supplier: 'Tech Solutions Ltda',
    description: 'Equipamentos de informática',
    value: 'R$ 45.890',
    dueDate: '2024-01-30',
    issueDate: '2024-01-15',
    status: 'pending',
    category: 'Equipamentos'
  },
  {
    id: 'CP-2024-002',
    supplier: 'Office Plus Móveis',
    description: 'Mobiliário escritório',
    value: 'R$ 28.450',
    dueDate: '2024-01-22',
    issueDate: '2024-01-12',
    status: 'approved',
    category: 'Móveis'
  },
  {
    id: 'CP-2024-003',
    supplier: 'Energia Elétrica SP',
    description: 'Conta de energia elétrica',
    value: 'R$ 3.240',
    dueDate: '2024-01-19',
    issueDate: '2024-01-05',
    status: 'overdue',
    category: 'Utilidades'
  }
];

const cashFlow = [
  {
    date: '2024-01-15',
    description: 'Venda - Pedido #PV-001',
    type: 'entrada',
    value: 15430,
    category: 'Vendas',
    balance: 125430
  },
  {
    date: '2024-01-15',
    description: 'Compra - Fornecedor Tech Solutions',
    type: 'saida',
    value: -45890,
    category: 'Compras',
    balance: 79540
  },
  {
    date: '2024-01-14',
    description: 'Pagamento salários',
    type: 'saida',
    value: -85000,
    category: 'Pessoal',
    balance: 125430
  },
  {
    date: '2024-01-14',
    description: 'Venda - Pedido #PV-002',
    type: 'entrada',
    value: 22890,
    category: 'Vendas',
    balance: 210430
  }
];

const financialMetrics = [
  {
    title: 'Saldo Atual',
    value: 'R$ 1.245.630',
    change: '+5.2%',
    color: 'success',
    icon: DollarSign
  },
  {
    title: 'A Receber',
    value: 'R$ 856.340',
    change: '+12.3%',
    color: 'primary',
    icon: TrendingUp
  },
  {
    title: 'A Pagar',
    value: 'R$ 234.580',
    change: '-8.1%',
    color: 'warning',
    icon: TrendingDown
  },
  {
    title: 'Títulos Vencidos',
    value: '8',
    change: '+2',
    color: 'danger',
    icon: AlertTriangle
  }
];

export const FinancialModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-warning-light text-warning border-warning/20',
      approved: 'bg-primary-light text-primary border-primary/20',
      paid: 'bg-success-light text-success border-success/20',
      overdue: 'bg-danger-light text-danger border-danger/20',
    };
    
    const labels = {
      pending: 'Pendente',
      approved: 'Aprovado',
      paid: 'Pago',
      overdue: 'Vencido',
    };

    return (
      <Badge className={cn('border', variants[status as keyof typeof variants])}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Math.abs(value));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Módulo Financeiro</h1>
        <p className="text-muted-foreground">
          Controle completo do fluxo de caixa e contas a pagar/receber
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-secondary p-1 rounded-lg w-fit">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'receivables', label: 'Contas a Receber' },
          { id: 'payables', label: 'Contas a Pagar' },
          { id: 'cashflow', label: 'Fluxo de Caixa' }
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
            {financialMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={cn(
                      'p-2 rounded-lg',
                      metric.color === 'success' && 'bg-success-light text-success',
                      metric.color === 'primary' && 'bg-primary-light text-primary',
                      metric.color === 'warning' && 'bg-warning-light text-warning',
                      metric.color === 'danger' && 'bg-danger-light text-danger'
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className={cn(
                      'text-xs font-medium',
                      metric.color === 'success' && 'text-success',
                      metric.color === 'primary' && 'text-primary',
                      metric.color === 'warning' && 'text-warning',
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

          {/* Cash Flow Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Fluxo de Caixa - Últimos Dias</h3>
              <div className="space-y-3">
                {cashFlow.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center',
                        item.type === 'entrada' ? 'bg-success-light text-success' : 'bg-danger-light text-danger'
                      )}>
                        {item.type === 'entrada' ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.description}</div>
                        <div className="text-xs text-muted-foreground">{item.category} • {item.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        'font-medium',
                        item.type === 'entrada' ? 'text-success' : 'text-danger'
                      )}>
                        {formatCurrency(item.value)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Saldo: {formatCurrency(item.balance)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Overdue Items */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Títulos Vencidos</h3>
              <div className="space-y-3">
                {[...accountsReceivable, ...accountsPayable]
                  .filter(item => item.status === 'overdue')
                  .slice(0, 4)
                  .map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-danger-light/20 rounded-lg border border-danger/20">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-danger" />
                      <div>
                        <div className="font-medium text-sm">{item.id}</div>
                        <div className="text-xs text-muted-foreground">
                          {'customer' in item ? item.customer : item.supplier}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-danger">{item.value}</div>
                      <div className="text-xs text-muted-foreground">
                        Venc: {item.dueDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Receivables Tab */}
      {activeTab === 'receivables' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar contas a receber..." 
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
                Novo Título
              </Button>
            </div>
          </div>

          {/* Receivables Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Cliente</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Nota Fiscal</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Valor</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Vencimento</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {accountsReceivable.map((account) => (
                    <tr key={account.id} className="border-b hover:bg-secondary/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{account.customer}</div>
                            <div className="text-sm text-muted-foreground">{account.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{account.invoice}</div>
                        <div className="text-sm text-muted-foreground">Emissão: {account.issueDate}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{account.value}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className={cn(
                            'text-sm',
                            account.status === 'overdue' && 'text-danger font-medium'
                          )}>
                            {account.dueDate}
                          </span>
                        </div>
                        {account.overdue > 0 && (
                          <div className="text-xs text-danger">
                            {account.overdue} dias em atraso
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        {getStatusBadge(account.status)}
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

      {/* Payables Tab */}
      {activeTab === 'payables' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar contas a pagar..." 
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
                Nova Conta
              </Button>
            </div>
          </div>

          {/* Payables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {accountsPayable.map((account) => (
              <Card key={account.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-warning-light rounded-lg flex items-center justify-center">
                      <Building className="h-4 w-4 text-warning" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{account.id}</div>
                      <div className="text-xs text-muted-foreground">{account.supplier}</div>
                    </div>
                  </div>
                  {getStatusBadge(account.status)}
                </div>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-muted-foreground">{account.description}</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Valor:</span>
                    <span className="font-medium">{account.value}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vencimento:</span>
                    <span className={cn(
                      account.status === 'overdue' && 'text-danger font-medium'
                    )}>
                      {account.dueDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Categoria:</span>
                    <Badge variant="outline" className="text-xs">{account.category}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    Ver
                  </Button>
                  <Button size="sm" className="flex-1">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Pagar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Cash Flow Tab */}
      {activeTab === 'cashflow' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Movimentações Financeiras</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Movimentação
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              {cashFlow.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      item.type === 'entrada' ? 'bg-success-light text-success' : 'bg-danger-light text-danger'
                    )}>
                      {item.type === 'entrada' ? (
                        <TrendingUp className="h-5 w-5" />
                      ) : (
                        <TrendingDown className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{item.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.category} • {item.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      'text-lg font-bold',
                      item.type === 'entrada' ? 'text-success' : 'text-danger'
                    )}>
                      {item.type === 'entrada' ? '+' : '-'}{formatCurrency(item.value)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Saldo: {formatCurrency(item.balance)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};