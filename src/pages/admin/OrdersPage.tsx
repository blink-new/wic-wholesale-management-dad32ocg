import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal,
  Eye,
  Edit,
  Truck,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
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

interface OrdersPageProps {
  user: User
}

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

interface Order {
  id: string
  orderNumber: string
  client: string
  clientEmail: string
  items: number
  total: number
  status: OrderStatus
  paymentStatus: 'pending' | 'paid' | 'overdue'
  orderDate: string
  requiredDate: string
  shippedDate?: string
  deliveredDate?: string
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    client: 'Acme Corporation',
    clientEmail: 'orders@acme.com',
    items: 12,
    total: 24500.00,
    status: 'processing',
    paymentStatus: 'paid',
    orderDate: '2024-01-15',
    requiredDate: '2024-01-25',
    shippedDate: undefined,
    deliveredDate: undefined
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    client: 'TechStart Industries',
    clientEmail: 'procurement@techstart.com',
    items: 8,
    total: 18900.00,
    status: 'shipped',
    paymentStatus: 'paid',
    orderDate: '2024-01-14',
    requiredDate: '2024-01-22',
    shippedDate: '2024-01-20',
    deliveredDate: undefined
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    client: 'Global Solutions Ltd',
    clientEmail: 'orders@globalsolutions.com',
    items: 25,
    total: 32000.00,
    status: 'delivered',
    paymentStatus: 'paid',
    orderDate: '2024-01-12',
    requiredDate: '2024-01-20',
    shippedDate: '2024-01-18',
    deliveredDate: '2024-01-21'
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    client: 'Innovation Labs',
    clientEmail: 'purchasing@innovationlabs.com',
    items: 6,
    total: 16500.00,
    status: 'pending',
    paymentStatus: 'pending',
    orderDate: '2024-01-16',
    requiredDate: '2024-01-28',
    shippedDate: undefined,
    deliveredDate: undefined
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    client: 'Metro Supplies Inc',
    clientEmail: 'orders@metrosupplies.com',
    items: 15,
    total: 28750.00,
    status: 'confirmed',
    paymentStatus: 'paid',
    orderDate: '2024-01-16',
    requiredDate: '2024-01-30',
    shippedDate: undefined,
    deliveredDate: undefined
  }
]

export default function OrdersPage({ user }: OrdersPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentFilter, setPaymentFilter] = useState<string>('all')

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return AlertTriangle
      case 'confirmed': return CheckCircle
      case 'processing': return Clock
      case 'shipped': return Truck
      case 'delivered': return Package
      case 'cancelled': return X
      default: return Clock
    }
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'shipped': return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter
    
    return matchesSearch && matchesStatus && matchesPayment
  })

  const orderStats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    processing: mockOrders.filter(o => o.status === 'processing' || o.status === 'confirmed').length,
    shipped: mockOrders.filter(o => o.status === 'shipped').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders Management</h1>
          <p className="text-muted-foreground">Manage all customer orders and fulfillment</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">{orderStats.total}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold text-blue-600">{orderStats.processing}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shipped</p>
                <p className="text-2xl font-bold text-indigo-600">{orderStats.shipped}</p>
              </div>
              <Truck className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold text-green-600">{orderStats.delivered}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>View and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders, clients, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Required Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status)
                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{order.orderNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{order.client}</div>
                          <div className="text-sm text-muted-foreground">{order.clientEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{order.items}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">${order.total.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(order.status)} border`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                          {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{new Date(order.orderDate).toLocaleDateString()}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{new Date(order.requiredDate).toLocaleDateString()}</span>
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
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Order
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Truck className="h-4 w-4 mr-2" />
                              Update Status
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

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' || paymentFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Create your first order to get started'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}