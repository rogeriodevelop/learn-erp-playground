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
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Package,
  Factory,
  Clock,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for reports
const reportCategories = [
  {
    id: 'sales',
    title: 'Relatórios de Vendas',
    description: 'Análises de performance comercial',
    icon: DollarSign,
    color: 'success',
    reports: [
      { name: 'Vendas por Período', description: 'Análise temporal das vendas', lastGenerated: '2024-01-15' },
      { name: 'Ranking de Produtos', description: 'Produtos mais vendidos', lastGenerated: '2024-01-14' },
      { name: 'Performance de Vendedores', description: 'Análise individual de vendedores', lastGenerated: '2024-01-13' },
      { name: 'Funil de Vendas', description: 'Conversão de oportunidades', lastGenerated: '2024-01-12' }
    ]
  },
  {
    id: 'financial',
    title: 'Relatórios Financeiros',
    description: 'Análises financeiras e fluxo de caixa',
    icon: BarChart3,
    color: 'primary',
    reports: [
      { name: 'Fluxo de Caixa', description: 'Entradas e saídas detalhadas', lastGenerated: '2024-01-15' },
      { name: 'Contas a Receber', description: 'Análise de recebimentos', lastGenerated: '2024-01-14' },
      { name: 'Contas a Pagar', description: 'Controle de pagamentos', lastGenerated: '2024-01-13' },
      { name: 'DRE Gerencial', description: 'Demonstrativo de resultados', lastGenerated: '2024-01-10' }
    ]
  },
  {
    id: 'inventory',
    title: 'Relatórios de Estoque',
    description: 'Controle e movimentação de inventário',
    icon: Package,
    color: 'warning',
    reports: [
      { name: 'Posição de Estoque', description: 'Situação atual do inventário', lastGenerated: '2024-01-15' },
      { name: 'Movimentações', description: 'Entradas e saídas detalhadas', lastGenerated: '2024-01-14' },
      { name: 'Produtos em Falta', description: 'Itens com estoque baixo', lastGenerated: '2024-01-13' },
      { name: 'Giro de Estoque', description: 'Análise de rotatividade', lastGenerated: '2024-01-12' }
    ]
  },
  {
    id: 'hr',
    title: 'Relatórios de RH',
    description: 'Gestão de pessoas e folha de pagamento',
    icon: Users,
    color: 'primary',
    reports: [
      { name: 'Folha de Pagamento', description: 'Detalhamento salarial', lastGenerated: '2024-01-01' },
      { name: 'Ponto Eletrônico', description: 'Controle de frequência', lastGenerated: '2024-01-15' },
      { name: 'Absenteísmo', description: 'Análise de faltas', lastGenerated: '2024-01-10' },
      { name: 'Turnover', description: 'Rotatividade de funcionários', lastGenerated: '2024-01-05' }
    ]
  },
  {
    id: 'production',
    title: 'Relatórios de Produção',
    description: 'Eficiência e controle de qualidade',
    icon: Factory,
    color: 'success',
    reports: [
      { name: 'Ordens de Produção', description: 'Status das ordens ativas', lastGenerated: '2024-01-15' },
      { name: 'Eficiência das Máquinas', description: 'Performance dos equipamentos', lastGenerated: '2024-01-14' },
      { name: 'Controle de Qualidade', description: 'Inspeções e aprovações', lastGenerated: '2024-01-13' },
      { name: 'Tempo de Setup', description: 'Análise de preparação', lastGenerated: '2024-01-12' }
    ]
  }
];

const dashboardData = {
  salesChart: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    sales: [650000, 720000, 580000, 830000, 750000, 847230],
    profit: [95000, 115000, 87000, 145000, 125000, 152000]
  },
  topProducts: [
    { name: 'Monitor LED 24"', sales: 145, revenue: 'R$ 129.050' },
    { name: 'Cadeira Ergonômica', sales: 89, revenue: 'R$ 106.800' },
    { name: 'Mesa de Escritório', sales: 67, revenue: 'R$ 80.400' },
    { name: 'Notebook i5', sales: 23, revenue: 'R$ 92.000' }
  ],
  departmentMetrics: [
    { dept: 'Vendas', performance: 95, target: 100 },
    { dept: 'Produção', performance: 87, target: 90 },
    { dept: 'Qualidade', performance: 98, target: 95 },
    { dept: 'Entrega', performance: 92, target: 95 }
  ]
};

export const ReportsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Módulo de Relatórios</h1>
        <p className="text-muted-foreground">
          Analytics completos e relatórios gerenciais do sistema
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-secondary p-1 rounded-lg w-fit">
        {[
          { id: 'dashboard', label: 'Dashboard Analytics' },
          { id: 'reports', label: 'Relatórios' },
          { id: 'scheduled', label: 'Agendados' },
          { id: 'custom', label: 'Personalizados' }
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

      {/* Dashboard Analytics Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-success-light text-success">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div className="text-xs font-medium text-success">+12.5%</div>
              </div>
              <div className="text-2xl font-bold">R$ 2.4M</div>
              <div className="text-sm text-muted-foreground">Receita Total</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-primary-light text-primary">
                  <Users className="h-4 w-4" />
                </div>
                <div className="text-xs font-medium text-primary">+8.3%</div>
              </div>
              <div className="text-2xl font-bold">1.234</div>
              <div className="text-sm text-muted-foreground">Clientes Ativos</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-warning-light text-warning">
                  <Package className="h-4 w-4" />
                </div>
                <div className="text-xs font-medium text-warning">-2.1%</div>
              </div>
              <div className="text-2xl font-bold">2.847</div>
              <div className="text-sm text-muted-foreground">Produtos Estoque</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-success-light text-success">
                  <Factory className="h-4 w-4" />
                </div>
                <div className="text-xs font-medium text-success">+5.7%</div>
              </div>
              <div className="text-2xl font-bold">87.5%</div>
              <div className="text-sm text-muted-foreground">Eficiência Produção</div>
            </Card>
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Vendas vs Lucro (6 meses)</h3>
              <div className="space-y-4">
                {dashboardData.salesChart.labels.map((month, index) => (
                  <div key={month} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{month}</span>
                      <div className="text-right">
                        <div className="text-success">R$ {(dashboardData.salesChart.sales[index] / 1000).toFixed(0)}K</div>
                        <div className="text-primary text-xs">Lucro: R$ {(dashboardData.salesChart.profit[index] / 1000).toFixed(0)}K</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-success"
                          style={{ width: `${(dashboardData.salesChart.sales[index] / Math.max(...dashboardData.salesChart.sales)) * 100}%` }}
                        />
                      </div>
                      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${(dashboardData.salesChart.profit[index] / Math.max(...dashboardData.salesChart.profit)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Products */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Produtos Mais Vendidos</h3>
              <div className="space-y-3">
                {dashboardData.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center text-xs font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{product.name}</div>
                        <div className="text-xs text-muted-foreground">{product.sales} unidades</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-success">{product.revenue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Department Performance */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance por Departamento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardData.departmentMetrics.map((dept, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-medium mb-2">{dept.dept}</div>
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-secondary"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${dept.performance}, 100`}
                        className={cn(
                          dept.performance >= dept.target ? 'text-success' : 'text-warning'
                        )}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">{dept.performance}%</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Meta: {dept.target}%</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Buscar relatórios..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Report Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className="p-6 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center',
                      category.color === 'success' && 'bg-success-light text-success',
                      category.color === 'primary' && 'bg-primary-light text-primary',
                      category.color === 'warning' && 'bg-warning-light text-warning'
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {category.reports.slice(0, 3).map((report, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{report.name}</span>
                        <Badge variant="outline" className="text-xs">{category.reports.length}</Badge>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Ver Todos os Relatórios
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto p-4 flex flex-col items-center gap-2">
                <FileText className="h-8 w-8" />
                <div className="text-center">
                  <div className="font-medium">Relatório Completo</div>
                  <div className="text-xs opacity-80">Todos os módulos</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <PieChart className="h-8 w-8" />
                <div className="text-center">
                  <div className="font-medium">Dashboard Executivo</div>
                  <div className="text-xs opacity-80">KPIs principais</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <TrendingUp className="h-8 w-8" />
                <div className="text-center">
                  <div className="font-medium">Análise Comparativa</div>
                  <div className="text-xs opacity-80">Períodos anteriores</div>
                </div>
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Scheduled Reports Tab */}
      {activeTab === 'scheduled' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Relatórios Agendados</h2>
              <p className="text-muted-foreground">Configurar envios automáticos</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              {
                name: 'Relatório Diário de Vendas',
                frequency: 'Diário às 08:00',
                recipients: ['gerencia@empresa.com'],
                status: 'active',
                nextRun: '2024-01-16 08:00'
              },
              {
                name: 'Relatório Semanal Financeiro',
                frequency: 'Segunda-feira às 09:00',
                recipients: ['financeiro@empresa.com', 'diretoria@empresa.com'],
                status: 'active',
                nextRun: '2024-01-22 09:00'
              },
              {
                name: 'Relatório Mensal de Estoque',
                frequency: 'Primeiro dia útil do mês',
                recipients: ['estoque@empresa.com'],
                status: 'paused',
                nextRun: '2024-02-01 10:00'
              }
            ].map((scheduled, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{scheduled.name}</h4>
                    <p className="text-sm text-muted-foreground">{scheduled.frequency}</p>
                  </div>
                  <Badge variant={scheduled.status === 'active' ? 'default' : 'secondary'}>
                    {scheduled.status === 'active' ? 'Ativo' : 'Pausado'}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{scheduled.recipients.length} destinatário(s)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Próximo envio: {scheduled.nextRun}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Configurar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    {scheduled.status === 'active' ? 'Pausar' : 'Ativar'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Custom Reports Tab */}
      {activeTab === 'custom' && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">Relatórios Personalizados</h3>
            <p>Construtor de relatórios com campos customizáveis e filtros avançados</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Criar Relatório Personalizado
          </Button>
        </div>
      )}
    </div>
  );
};