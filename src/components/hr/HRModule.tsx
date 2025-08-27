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
  DollarSign,
  Clock,
  Award,
  TrendingUp,
  Users,
  FileText,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const employees = [
  {
    id: 'EMP-001',
    name: 'Ana Silva Santos',
    position: 'Gerente de Vendas',
    department: 'Comercial',
    email: 'ana.silva@empresa.com',
    phone: '(11) 99999-0001',
    salary: 'R$ 8.500,00',
    hireDate: '2022-03-15',
    birthDate: '1988-07-20',
    status: 'active',
    cpf: '123.456.789-01'
  },
  {
    id: 'EMP-002',
    name: 'Carlos Oliveira',
    position: 'Desenvolvedor Senior',
    department: 'TI',
    email: 'carlos.oliveira@empresa.com',
    phone: '(11) 99999-0002',
    salary: 'R$ 9.200,00',
    hireDate: '2021-08-10',
    birthDate: '1985-12-03',
    status: 'active',
    cpf: '987.654.321-09'
  },
  {
    id: 'EMP-003',
    name: 'Maria Costa',
    position: 'Analista Financeiro',
    department: 'Financeiro',
    email: 'maria.costa@empresa.com',
    phone: '(11) 99999-0003',
    salary: 'R$ 6.800,00',
    hireDate: '2023-01-20',
    birthDate: '1990-04-15',
    status: 'active',
    cpf: '456.789.123-45'
  },
  {
    id: 'EMP-004',
    name: 'João Pereira',
    position: 'Assistente Administrativo',
    department: 'Administrativo',
    email: 'joao.pereira@empresa.com',
    phone: '(11) 99999-0004',
    salary: 'R$ 3.200,00',
    hireDate: '2023-06-01',
    birthDate: '1995-11-28',
    status: 'vacation',
    cpf: '321.654.987-12'
  }
];

const payroll = [
  {
    id: 'FOL-2024-01',
    employee: 'Ana Silva Santos',
    position: 'Gerente de Vendas',
    grossSalary: 8500.00,
    benefits: 850.00,
    deductions: 1700.00,
    netSalary: 7650.00,
    month: '2024-01',
    status: 'processed'
  },
  {
    id: 'FOL-2024-02',
    employee: 'Carlos Oliveira',
    position: 'Desenvolvedor Senior',
    grossSalary: 9200.00,
    benefits: 920.00,
    deductions: 1840.00,
    netSalary: 8280.00,
    month: '2024-01',
    status: 'processed'
  },
  {
    id: 'FOL-2024-03',
    employee: 'Maria Costa',
    position: 'Analista Financeiro',
    grossSalary: 6800.00,
    benefits: 680.00,
    deductions: 1360.00,
    netSalary: 6120.00,
    month: '2024-01',
    status: 'pending'
  }
];

const timeTracking = [
  {
    id: 'PT-001',
    employee: 'Ana Silva Santos',
    date: '2024-01-15',
    checkIn: '08:00',
    checkOut: '18:15',
    totalHours: '09:15',
    overtime: '01:15',
    status: 'completed'
  },
  {
    id: 'PT-002',
    employee: 'Carlos Oliveira',
    date: '2024-01-15',
    checkIn: '09:00',
    checkOut: '18:00',
    totalHours: '08:00',
    overtime: '00:00',
    status: 'completed'
  },
  {
    id: 'PT-003',
    employee: 'Maria Costa',
    date: '2024-01-15',
    checkIn: '08:30',
    checkOut: '17:30',
    totalHours: '08:00',
    overtime: '00:00',
    status: 'completed'
  }
];

const hrMetrics = [
  {
    title: 'Total Funcionários',
    value: '247',
    change: '+12',
    color: 'primary',
    icon: Users
  },
  {
    title: 'Folha de Pagamento',
    value: 'R$ 1.8M',
    change: '+3.2%',
    color: 'success',
    icon: DollarSign
  },
  {
    title: 'Absenteísmo',
    value: '2.1%',
    change: '-0.5%',
    color: 'success',
    icon: Clock
  },
  {
    title: 'Turnover',
    value: '8.5%',
    change: '-1.2%',
    color: 'success',
    icon: TrendingUp
  }
];

export const HRModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-success-light text-success border-success/20',
      vacation: 'bg-warning-light text-warning border-warning/20',
      inactive: 'bg-danger-light text-danger border-danger/20',
      processed: 'bg-success-light text-success border-success/20',
      pending: 'bg-warning-light text-warning border-warning/20',
      completed: 'bg-primary-light text-primary border-primary/20',
    };
    
    const labels = {
      active: 'Ativo',
      vacation: 'Férias',
      inactive: 'Inativo',
      processed: 'Processado',
      pending: 'Pendente',
      completed: 'Completo',
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
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Módulo de RH</h1>
        <p className="text-muted-foreground">
          Gestão completa de recursos humanos e folha de pagamento
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-secondary p-1 rounded-lg w-fit">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'employees', label: 'Funcionários' },
          { id: 'payroll', label: 'Folha de Pagamento' },
          { id: 'timesheet', label: 'Ponto Eletrônico' }
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
            {hrMetrics.map((metric, index) => {
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

          {/* Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Funcionários por Departamento</h3>
              <div className="space-y-4">
                {[
                  { dept: 'Comercial', count: 45, percentage: 18 },
                  { dept: 'TI', count: 38, percentage: 15 },
                  { dept: 'Financeiro', count: 32, percentage: 13 },
                  { dept: 'Administrativo', count: 28, percentage: 11 },
                  { dept: 'Outros', count: 104, percentage: 43 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.dept}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Aniversariantes do Mês</h3>
              <div className="space-y-3">
                {employees.filter((_, i) => i < 4).map((employee) => (
                  <div key={employee.id} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.position}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{employee.birthDate.split('-')[2]}/01</div>
                      <div className="text-xs text-muted-foreground">Janeiro</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Employees Tab */}
      {activeTab === 'employees' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar funcionários..." 
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
                Novo Funcionário
              </Button>
            </div>
          </div>

          {/* Employees Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Funcionário</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Cargo</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Departamento</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Contato</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Salário</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-secondary/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{employee.position}</div>
                        <div className="text-sm text-muted-foreground">Admissão: {employee.hireDate}</div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{employee.department}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {employee.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {employee.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{employee.salary}</div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(employee.status)}
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
                            <FileText className="h-4 w-4" />
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

      {/* Payroll Tab */}
      {activeTab === 'payroll' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <Input type="month" value="2024-01" className="w-40" />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Relatório
              </Button>
              <Button>
                Processar Folha
              </Button>
            </div>
          </div>

          {/* Payroll Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Salário Bruto</div>
              <div className="text-2xl font-bold">R$ 24.500</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Benefícios</div>
              <div className="text-2xl font-bold text-success">R$ 2.450</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Descontos</div>
              <div className="text-2xl font-bold text-danger">R$ 4.900</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Salário Líquido</div>
              <div className="text-2xl font-bold">R$ 22.050</div>
            </Card>
          </div>

          {/* Payroll Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Funcionário</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Salário Bruto</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Benefícios</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Descontos</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Salário Líquido</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {payroll.map((pay) => (
                    <tr key={pay.id} className="border-b hover:bg-secondary/50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{pay.employee}</div>
                          <div className="text-sm text-muted-foreground">{pay.position}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{formatCurrency(pay.grossSalary)}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-success font-medium">+{formatCurrency(pay.benefits)}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-danger font-medium">-{formatCurrency(pay.deductions)}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold">{formatCurrency(pay.netSalary)}</div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(pay.status)}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
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

      {/* Timesheet Tab */}
      {activeTab === 'timesheet' && (
        <div className="space-y-6">
          {/* Date Filter */}
          <div className="flex gap-4 items-center">
            <Input type="date" value="2024-01-15" className="w-40" />
            <Button variant="outline">
              Relatório Diário
            </Button>
            <Button variant="outline">
              Relatório Mensal
            </Button>
          </div>

          {/* Time Tracking Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {timeTracking.map((time) => (
              <Card key={time.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{time.employee}</div>
                      <div className="text-xs text-muted-foreground">{time.date}</div>
                    </div>
                  </div>
                  {getStatusBadge(time.status)}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Entrada:</span>
                    <span className="font-medium">{time.checkIn}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Saída:</span>
                    <span className="font-medium">{time.checkOut}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-medium">{time.totalHours}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Extras:</span>
                    <span className={cn(
                      'font-medium',
                      time.overtime !== '00:00' ? 'text-warning' : 'text-muted-foreground'
                    )}>
                      {time.overtime}
                    </span>
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