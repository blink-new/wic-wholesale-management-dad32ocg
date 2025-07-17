import { useState } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  FileText,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Send,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Progress } from '../../components/ui/progress'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { type User } from '../../lib/blink'

interface FinancePageProps {
  user: User
}

interface Invoice {
  id: string
  invoiceNumber: string
  client: string
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  dueDate: string
  issueDate: string
  paymentMethod?: string
  paidDate?: string
}

interface Payment {
  id: string
  invoiceNumber: string
  client: string
  amount: number
  method: 'credit_card' | 'bank_transfer' | 'check' | 'stripe' | 'paypal'
  status: 'completed' | 'pending' | 'failed'
  date: string
  reference?: string
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    client: 'Acme Corporation',
    amount: 24500.00,
    status: 'paid',
    dueDate: '2024-01-25',
    issueDate: '2024-01-15',
    paymentMethod: 'Bank Transfer',
    paidDate: '2024-01-23'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    client: 'TechStart Industries',
    amount: 18900.00,
    status: 'sent',
    dueDate: '2024-01-28',
    issueDate: '2024-01-18',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    client: 'Global Solutions Ltd',
    amount: 32000.00,
    status: 'paid',
    dueDate: '2024-01-20',
    issueDate: '2024-01-10',
    paymentMethod: 'Credit Card',
    paidDate: '2024-01-19'
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    client: 'Innovation Labs',
    amount: 16500.00,
    status: 'overdue',
    dueDate: '2024-01-15',
    issueDate: '2024-01-05',
  },
  {
    id: '5',
    invoiceNumber: 'INV-2024-005',
    client: 'Metro Supplies Inc',
    amount: 28750.00,
    status: 'draft',
    dueDate: '2024-02-05',
    issueDate: '2024-01-20',
  }
]

const mockPayments: Payment[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    client: 'Acme Corporation',
    amount: 24500.00,
    method: 'bank_transfer',
    status: 'completed',
    date: '2024-01-23',
    reference: 'TXN-789123'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-003',
    client: 'Global Solutions Ltd',
    amount: 32000.00,
    method: 'credit_card',
    status: 'completed',
    date: '2024-01-19',
    reference: 'CARD-456789'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-006',
    client: 'Digital Dynamics',
    amount: 12300.00,
    method: 'stripe',
    status: 'pending',
    date: '2024-01-20',
    reference: 'STRIPE-123456'
  }
]

export default function FinancePage({ user }: FinancePageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'payments'>('overview')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getInvoiceStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return CheckCircle
      case 'sent': return Send
      case 'overdue': return AlertTriangle
      case 'draft': return FileText
      case 'cancelled': return AlertTriangle
      default: return Clock
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card': return CreditCard
      case 'bank_transfer': return DollarSign
      case 'stripe': return CreditCard
      case 'paypal': return CreditCard
      default: return DollarSign
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredInvoices = mockInvoices.filter(invoice => 
    statusFilter === 'all' || invoice.status === statusFilter
  )

  // Calculate financial metrics
  const totalRevenue = mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)
  const pendingAmount = mockInvoices.filter(inv => inv.status === 'sent').reduce((sum, inv) => sum + inv.amount, 0)
  const overdueAmount = mockInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)
  const totalOutstanding = pendingAmount + overdueAmount

  const invoiceStats = {
    total: mockInvoices.length,
    paid: mockInvoices.filter(inv => inv.status === 'paid').length,
    sent: mockInvoices.filter(inv => inv.status === 'sent').length,
    overdue: mockInvoices.filter(inv => inv.status === 'overdue').length,
    draft: mockInvoices.filter(inv => inv.status === 'draft').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Finance & Payments</h1>
          <p className="text-muted-foreground">Manage invoices, payments, and financial reporting</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'overview' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </Button>
        <Button
          variant={activeTab === 'invoices' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('invoices')}
        >
          Invoices
        </Button>
        <Button
          variant={activeTab === 'payments' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('payments')}
        >
          Payments
        </Button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Financial Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Outstanding</p>
                    <p className="text-2xl font-bold text-blue-600">${totalOutstanding.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Pending + Overdue</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                    <p className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Needs attention</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
                    <p className="text-2xl font-bold text-foreground">94.2%</p>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Status Breakdown</CardTitle>
                <CardDescription>Current invoice distribution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Paid</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{invoiceStats.paid}</span>
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(invoiceStats.paid / invoiceStats.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Sent</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{invoiceStats.sent}</span>
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(invoiceStats.sent / invoiceStats.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Overdue</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{invoiceStats.overdue}</span>
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${(invoiceStats.overdue / invoiceStats.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Draft</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{invoiceStats.draft}</span>
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="bg-gray-500 h-2 rounded-full" 
                          style={{ width: `${(invoiceStats.draft / invoiceStats.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Latest payment activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPayments.slice(0, 4).map((payment) => {
                    const PaymentIcon = getPaymentMethodIcon(payment.method)
                    return (
                      <div key={payment.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <PaymentIcon className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-foreground">{payment.invoiceNumber}</div>
                            <div className="text-sm text-muted-foreground">{payment.client}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-foreground">${payment.amount.toLocaleString()}</div>
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${getPaymentStatusColor(payment.status)}`}>
                              {payment.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(payment.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Management</CardTitle>
              <CardDescription>Create, send, and track invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => {
                      const StatusIcon = getInvoiceStatusIcon(invoice.status)
                      const isOverdue = invoice.status === 'overdue'
                      
                      return (
                        <TableRow key={invoice.id}>
                          <TableCell>
                            <div className="font-medium text-foreground">{invoice.invoiceNumber}</div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{invoice.client}</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">${invoice.amount.toLocaleString()}</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getInvoiceStatusColor(invoice.status)} border`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{new Date(invoice.issueDate).toLocaleDateString()}</span>
                          </TableCell>
                          <TableCell>
                            <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : ''}`}>
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Invoice
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download PDF
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Reminder
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Track all incoming payments and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reference</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayments.map((payment) => {
                      const PaymentIcon = getPaymentMethodIcon(payment.method)
                      
                      return (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <div className="font-medium text-foreground">{payment.invoiceNumber}</div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{payment.client}</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">${payment.amount.toLocaleString()}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <PaymentIcon className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm capitalize">
                                {payment.method.replace('_', ' ')}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPaymentStatusColor(payment.status)}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{new Date(payment.date).toLocaleDateString()}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-mono text-muted-foreground">
                              {payment.reference || '-'}
                            </span>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}