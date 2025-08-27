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
  Factory,
  Package,
  Clock,
  Calendar,
  Users,
  Settings,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Zap,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const productionOrders = [
  {
    id: 'OP-2024-001',
    product: 'Cadeira Ergonômica Premium',
    quantity: 50,
    quantityProduced: 35,
    startDate: '2024-01-10',
    endDate: '2024-01-20',
    priority: 'high',
    status: 'in_progress',
    machine: 'Linha A - Montagem',
    responsible: 'Carlos Santos'
  },
  {
    id: 'OP-2024-002',
    product: 'Mesa de Escritório 120cm',
    quantity: 25,
    quantityProduced: 25,
    startDate: '2024-01-05',
    endDate: '2024-01-15',
    priority: 'normal',
    status: 'completed',
    machine: 'Linha B - Marcenaria',
    responsible: 'Ana Costa'
  },
  {
    id: 'OP-2024-003',
    product: 'Estante Modular 5 Prateleiras',
    quantity: 30,
    quantityProduced: 0,
    startDate: '2024-01-20',
    endDate: '2024-01-30',
    priority: 'normal',
    status: 'planned',
    machine: 'Linha C - Montagem',
    responsible: 'João Silva'
  },
  {
    id: 'OP-2024-004',
    product: 'Armário Executivo',
    quantity: 15,
    quantityProduced: 8,
    startDate: '2024-01-12',
    endDate: '2024-01-25',
    priority: 'low',
    status: 'delayed',
    machine: 'Linha A - Montagem',
    responsible: 'Maria Oliveira'
  }
];

const machines = [
  {
    id: 'MAQ-001',
    name: 'Linha A - Montagem',
    type: 'Linha de Montagem',
    status: 'operating',
    efficiency: 85,
    lastMaintenance: '2024-01-01',
    nextMaintenance: '2024-02-01',
    currentOrder: 'OP-2024-001',
    operatorCount: 4
  },
  {
    id: 'MAQ-002',
    name: 'Linha B - Marcenaria',
    type: 'Centro de Usinagem',
    status: 'maintenance',
    efficiency: 0,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-02-15',
    currentOrder: null,
    operatorCount: 2
  },
  {
    id: 'MAQ-003',
    name: 'Linha C - Montagem',
    type: 'Linha de Montagem',
    status: 'idle',
    efficiency: 0,
    lastMaintenance: '2023-12-20',
    nextMaintenance: '2024-01-20',
    currentOrder: null,
    operatorCount: 3
  },
  {
    id: 'MAQ-004',
    name: 'Prensa Hidráulica',
    type: 'Equipamento Especial',
    status: 'operating',
    efficiency: 92,
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-02-10',
    currentOrder: 'OP-2024-004',
    operatorCount: 1
  }
];

const qualityControl = [
  {
    id: 'QC-001',
    order: 'OP-2024-001',
    product: 'Cadeira Ergonômica Premium',
    inspector: 'Pedro Alves',
    date: '2024-01-15',
    tested: 10,
    approved: 9,
    rejected: 1,
    defects: ['Acabamento irregular'],
    status: 'partial'
  },
  {
    id: 'QC-002',
    order: 'OP-2024-002',
    product: 'Mesa de Escritório 120cm',
    inspector: 'Laura Silva',
    date: '2024-01-15',
    tested: 25,
    approved: 25,
    rejected: 0,
    defects: [],
    status: 'approved'
  }
];

const productionMetrics = [
  {
    title: 'Ordens Ativas',
    value: '12',
    change: '+3',
    color: 'primary',
    icon: Factory
  },
  {
    title: 'Eficiência Geral',
    value: '87.5%',
    change: '+2.1%',
    color: 'success',
    icon: Zap
  },
  {
    title: 'Produtos Finalizados',
    value: '245',
    change: '+18',
    color: 'success',
    icon: Package
  },
  {
    title: 'Tempo Médio',
    value: '2.3h',
    change: '-0.2h',
    color: 'success',
    icon: Clock
  }
];

export const ProductionModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getStatusBadge = (status: string) => {
    const variants = {
      planned: 'bg-secondary text-secondary-foreground border-secondary',
      in_progress: 'bg-primary-light text-primary border-primary/20',
      completed: 'bg-success-light text-success border-success/20',
      delayed: 'bg-danger-light text-danger border-danger/20',
      operating: 'bg-success-light text-success border-success/20',
      maintenance: 'bg-warning-light text-warning border-warning/20',
      idle: 'bg-secondary text-secondary-foreground border-secondary',
      approved: 'bg-success-light text-success border-success/20',
      partial: 'bg-warning-light text-warning border-warning/20',
      rejected: 'bg-danger-light text-danger border-danger/20',
    };
    
    const labels = {
      planned: 'Planejado',
      in_progress: 'Em Andamento',
      completed: 'Finalizado',
      delayed: 'Atrasado',
      operating: 'Operando',
      maintenance: 'Manutenção',
      idle: 'Parado',
      approved: 'Aprovado',
      partial: 'Parcial',
      rejected: 'Rejeitado',
    };

    return (
      <Badge className={cn('border', variants[status as keyof typeof variants])}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
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
      <Badge className={cn('border text-xs', variants[priority as keyof typeof variants])}>
        {labels[priority as keyof typeof labels]}
      </Badge>
    );
  };

  const getProgressBar = (current: number, total: number) => {
    const percentage = (current / total) * 100;
    return (
      <div className="flex items-center gap-2">
        <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {current}/{total}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Módulo de Produção</h1>
        <p className="text-muted-foreground">
          Controle completo de ordens de produção e máquinas
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-secondary p-1 rounded-lg w-fit">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'orders', label: 'Ordens de Produção' },
          { id: 'machines', label: 'Máquinas' },
          { id: 'quality', label: 'Controle de Qualidade' }
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
            {productionMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={cn(
                      'p-2 rounded-lg',
                      metric.color === 'success' && 'bg-success-light text-success',
                      metric.color === 'primary' && 'bg-primary-light text-primary'
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className={cn(
                      'text-xs font-medium',
                      metric.color === 'success' && 'text-success',
                      metric.color === 'primary' && 'text-primary'
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

          {/* Production Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Ordens em Andamento</h3>
              <div className="space-y-3">
                {productionOrders.filter(o => o.status === 'in_progress').map((order) => (
                  <div key={order.id} className="p-3 bg-secondary/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium text-sm">{order.id}</div>
                        <div className="text-xs text-muted-foreground">{order.product}</div>
                      </div>
                      {getPriorityBadge(order.priority)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progresso</span>
                        <span>{Math.round((order.quantityProduced / order.quantity) * 100)}%</span>
                      </div>
                      {getProgressBar(order.quantityProduced, order.quantity)}
                      <div className="text-xs text-muted-foreground">
                        Responsável: {order.responsible}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Status das Máquinas</h3>
              <div className="space-y-3">
                {machines.map((machine) => (
                  <div key={machine.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center',
                        machine.status === 'operating' && 'bg-success-light text-success',
                        machine.status === 'maintenance' && 'bg-warning-light text-warning',
                        machine.status === 'idle' && 'bg-secondary text-secondary-foreground'
                      )}>
                        <Factory className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{machine.name}</div>
                        <div className="text-xs text-muted-foreground">{machine.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{machine.efficiency}%</div>
                      {getStatusBadge(machine.status)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
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

          {/* Orders Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Ordem</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Produto</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Progresso</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Período</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Prioridade</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {productionOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-secondary/50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">{order.machine}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{order.product}</div>
                        <div className="text-sm text-muted-foreground">Resp: {order.responsible}</div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {order.quantityProduced}/{order.quantity} un.
                          </div>
                          {getProgressBar(order.quantityProduced, order.quantity)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div>{order.startDate}</div>
                          <div className="text-muted-foreground">até {order.endDate}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        {getPriorityBadge(order.priority)}
                      </td>
                      <td className="p-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {order.status === 'planned' && (
                            <Button variant="ghost" size="sm">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          {order.status === 'in_progress' && (
                            <Button variant="ghost" size="sm">
                              <Pause className="h-4 w-4" />
                            </Button>
                          )}
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

      {/* Machines Tab */}
      {activeTab === 'machines' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Programar Manutenção
              </Button>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Máquina
            </Button>
          </div>

          {/* Machines Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {machines.map((machine) => (
              <Card key={machine.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center',
                      machine.status === 'operating' && 'bg-success-light text-success',
                      machine.status === 'maintenance' && 'bg-warning-light text-warning',
                      machine.status === 'idle' && 'bg-secondary text-secondary-foreground'
                    )}>
                      <Factory className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-semibold">{machine.name}</div>
                      <div className="text-sm text-muted-foreground">{machine.type}</div>
                    </div>
                  </div>
                  {getStatusBadge(machine.status)}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Eficiência</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            'h-full transition-all',
                            machine.efficiency >= 80 ? 'bg-success' : 
                            machine.efficiency >= 60 ? 'bg-warning' : 'bg-danger'
                          )}
                          style={{ width: `${machine.efficiency}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{machine.efficiency}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Operadores:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <Users className="h-3 w-3" />
                        <span>{machine.operatorCount}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Próx. Manutenção:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{machine.nextMaintenance}</span>
                      </div>
                    </div>
                  </div>

                  {machine.currentOrder && (
                    <div className="p-2 bg-primary-light/30 rounded border border-primary/20">
                      <div className="text-xs text-muted-foreground">Ordem Atual:</div>
                      <div className="text-sm font-medium">{machine.currentOrder}</div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="h-3 w-3 mr-1" />
                      Configurar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Histórico
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Quality Tab */}
      {activeTab === 'quality' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar inspeções..." 
                  className="pl-10 w-80"
                />
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Inspeção
            </Button>
          </div>

          {/* Quality Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {qualityControl.map((qc) => (
              <Card key={qc.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-semibold">{qc.id}</div>
                    <div className="text-sm text-muted-foreground">{qc.order} - {qc.product}</div>
                  </div>
                  {getStatusBadge(qc.status)}
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-2 bg-secondary/50 rounded">
                      <div className="text-lg font-bold">{qc.tested}</div>
                      <div className="text-xs text-muted-foreground">Testados</div>
                    </div>
                    <div className="p-2 bg-success-light/30 rounded">
                      <div className="text-lg font-bold text-success">{qc.approved}</div>
                      <div className="text-xs text-muted-foreground">Aprovados</div>
                    </div>
                    <div className="p-2 bg-danger-light/30 rounded">
                      <div className="text-lg font-bold text-danger">{qc.rejected}</div>
                      <div className="text-xs text-muted-foreground">Rejeitados</div>
                    </div>
                  </div>

                  {qc.defects.length > 0 && (
                    <div className="p-2 bg-warning-light/20 rounded border border-warning/20">
                      <div className="text-xs text-muted-foreground mb-1">Defeitos Encontrados:</div>
                      {qc.defects.map((defect, index) => (
                        <div key={index} className="text-sm text-warning">• {defect}</div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Inspetor:</span>
                    <span>{qc.inspector}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data:</span>
                    <span>{qc.date}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Detalhes
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};