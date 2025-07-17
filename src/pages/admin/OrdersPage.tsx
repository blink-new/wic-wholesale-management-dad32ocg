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
  CheckCircle,
  Clock,
  AlertTriangle,
  X
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { type User } from '../../lib/blink'

interface OrdersPageProps {
  user: User
}

// Mock data - in real app this would come from API
const mockOrders = [
  {
    id: 'ORD-001',
    orderNumber: 'WIC-2024-001',
    client: 'Acme Corporation',
    clientId: 'acme-corp',
    status: 'processing',
    orderDate: '2024-01-15',
    requiredDate: '2024-01-20',
    shippedDate: null,
    total: 2450.00,
    items: 5,
    assignedTo: 'John Smith'
  },
  {
    id: 'ORD-002',
    orderNumber: 'WIC-2024-002',
    client: 'TechStart Inc',
    clientId: 'techstart',
    status: 'shipped',
    orderDate: '2024-01-14',
    requiredDate: '2024-01-19',
    shippedDate: '2024-01-18',
    total: 1890.00,
    items: 3,
    assignedTo: 'Sarah Johnson'
  },
  {
    id: 'ORD-003',
    orderNumber: 'WIC-2024-003',
    client: 'Global Solutions Ltd',
    clientId: 'global-solutions',
    status: 'delivered',
    orderDate: '2024-01-12',
    requiredDate: '2024-01-17',
    shippedDate: '2024-01-16',
    total: 3200.00,
    items: 8,
    assignedTo: 'Mike Wilson'
  },
  {
    id: 'ORD-004',
    orderNumber: 'WIC-2024-004',
    client: 'Innovation Labs',
    clientId: 'innovation-labs',
    status: 'pending',
    orderDate: '2024-01-16',
    requiredDate: '2024-01-22',
    shippedDate: null,
    total: 1650.00,
    items: 4,
    assignedTo: null
  },
  {
    id: 'ORD-005',
    orderNumber: 'WIC-2024-005',
    client: 'Metro Distributors',
    clientId: 'metro-dist',
    status: 'cancelled',
    orderDate: '2024-01-10',
    requiredDate: '2024-01-15',
    shippedDate: null,
    total: 980.00,
    items: 2,
    assignedTo: null
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending': return AlertTriangle
    case 'processing': return Clock
    case 'shipped': return Truck
    case 'delivered': return CheckCircle
    case 'cancelled': return X
    default: return Clock
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'delivered': return 'bg-green-100 text-green-800 border-green-200'
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export default function OrdersPage({ user }: OrdersPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedTab, setSelectedTab] = useState('all')

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesTab = selectedTab === 'all' || order.status === selectedTab
    
    return matchesSearch && matchesStatus && matchesTab
  })

  const orderStats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    shipped: mockOrders.filter(o => o.status === 'shipped').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">Manage and track all customer orders</p>
        </div>
        <div className="flex items-center space-x-3">
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
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{orderStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{orderStats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{orderStats.processing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Shipped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{orderStats.shipped}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{orderStats.delivered}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>View and manage all customer orders</CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab} className="mt-6">
              <div className="border border-border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead>Required Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => {
                      const StatusIcon = getStatusIcon(order.status)
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.orderNumber}
                          </TableCell>
                          <TableCell>{order.client}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1 w-fit`}>
                              <StatusIcon className="h-3 w-3" />
                              <span className="capitalize">{order.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>{order.orderDate}</TableCell>
                          <TableCell>{order.requiredDate}</TableCell>
                          <TableCell className="font-medium">
                            ${order.total.toLocaleString()}
                          </TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>
                            {order.assignedTo ? (
                              <span className="text-sm">{order.assignedTo}</span>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Unassigned
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Order
                                </DropdownMenuItem>
                                {order.status === 'pending' && (
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Confirm Order
                                  </DropdownMenuItem>
                                )}
                                {order.status === 'processing' && (
                                  <DropdownMenuItem>
                                    <Truck className="mr-2 h-4 w-4" />
                                    Mark as Shipped
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <X className="mr-2 h-4 w-4" />
                                  Cancel Order
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}