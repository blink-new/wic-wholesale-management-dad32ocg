import { 
  ShoppingCart, 
  Package, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Truck,
  Star,
  Plus,
  Eye,
  Download,
  RefreshCw,
  Heart,
  Bell
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Progress } from '../../components/ui/progress'
import { Separator } from '../../components/ui/separator'
import { type User } from '../../lib/blink'

interface ClientDashboardProps {
  user: User
}

interface Order {
  id: string
  orderNumber: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered'
  total: number
  items: number
  orderDate: string
  estimatedDelivery: string
  trackingNumber?: string
}

interface RecentProduct {
  id: string
  name: string
  sku: string
  image: string
  lastOrdered: string
  price: number
  inStock: boolean
}

interface Notification {
  id: string
  type: 'order' | 'payment' | 'shipping' | 'promotion'
  title: string
  message: string
  time: string
  read: boolean
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    status: 'shipped',
    total: 2450.00,
    items: 12,
    orderDate: '2024-01-15',
    estimatedDelivery: '2024-01-22',
    trackingNumber: 'TRK123456789'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    status: 'processing',
    total: 1890.00,
    items: 8,
    orderDate: '2024-01-18',
    estimatedDelivery: '2024-01-25'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    status: 'delivered',
    total: 3200.00,
    items: 25,
    orderDate: '2024-01-10',
    estimatedDelivery: '2024-01-18'
  }
]

const mockRecentProducts: RecentProduct[] = [
  {
    id: '1',
    name: 'Widget Pro X1',
    sku: 'WDG-PRO-X1',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=200',
    lastOrdered: '2024-01-15',
    price: 89.99,
    inStock: true
  },
  {
    id: '2',
    name: 'USB-C Cable 2m',
    sku: 'CAB-USB-C',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
    lastOrdered: '2024-01-12',
    price: 12.99,
    inStock: true
  },
  {
    id: '3',
    name: 'Power Bank 10000mAh',
    sku: 'PWR-BANK-10K',
    image: 'https://images.unsplash.com/photo-1609592806955-d0ae3d1b9b6e?w=200',
    lastOrdered: '2024-01-08',
    price: 39.99,
    inStock: true
  }
]

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'shipping',
    title: 'Order Shipped',
    message: 'Your order ORD-2024-001 has been shipped and is on its way.',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'promotion',
    title: 'New Volume Discount',
    message: 'Save 15% on orders over $5,000 this month.',
    time: '1 day ago',
    read: false
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Received',
    message: 'Payment for invoice INV-2024-045 has been processed.',
    time: '2 days ago',
    read: true
  }
]

export default function ClientDashboard({ user }: ClientDashboardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200'
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle
      case 'shipped': return Truck
      case 'processing': return Clock
      case 'confirmed': return CheckCircle
      case 'pending': return AlertCircle
      default: return Clock
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'shipping': return Truck
      case 'payment': return DollarSign
      case 'promotion': return Star
      case 'order': return ShoppingCart
      default: return Bell
    }
  }

  const stats = {
    totalOrders: mockOrders.length,
    pendingOrders: mockOrders.filter(o => o.status === 'pending' || o.status === 'processing').length,
    totalSpent: mockOrders.reduce((sum, order) => sum + order.total, 0),
    averageOrder: mockOrders.reduce((sum, order) => sum + order.total, 0) / mockOrders.length
  }

  const unreadNotifications = mockNotifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user.displayName || user.email.split('@')[0]}
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your account and recent activity.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              All time orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Orders
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Pending & processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${stats.totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              All time purchases
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Order
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${stats.averageOrder.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Per order value
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest order activity</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status)
                  return (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                          <StatusIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{order.orderNumber}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.items} items • Ordered {new Date(order.orderDate).toLocaleDateString()}
                          </div>
                          {order.trackingNumber && (
                            <div className="text-xs text-muted-foreground">
                              Tracking: {order.trackingNumber}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">${order.total.toLocaleString()}</div>
                        <Badge className={`${getStatusColor(order.status)} border text-xs`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Notifications
                  {unreadNotifications > 0 && (
                    <Badge className="bg-red-100 text-red-800">
                      {unreadNotifications}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>Recent updates</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockNotifications.slice(0, 4).map((notification) => {
                const NotificationIcon = getNotificationIcon(notification.type)
                return (
                  <div key={notification.id} className={`p-3 rounded-lg border ${
                    notification.read ? 'bg-background' : 'bg-muted/50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <NotificationIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground text-sm">
                          {notification.title}
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {notification.message}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {notification.time}
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Notifications
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Products */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create New Order
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reorder Previous
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Invoices
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                View Favorites
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recently Ordered Products */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recently Ordered</CardTitle>
                  <CardDescription>Products you've ordered recently</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Browse Catalog
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {mockRecentProducts.map((product) => (
                  <div key={product.id} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">{product.sku}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-medium text-foreground">${product.price}</span>
                        <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" className="w-full" disabled={!product.inStock}>
                      <Plus className="h-3 w-3 mr-2" />
                      Reorder
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Account Status */}
      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
          <CardDescription>Your account health and credit information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Credit Limit</span>
                <span className="text-sm font-bold text-foreground">$50,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Available Credit</span>
                <span className="text-sm font-bold text-green-600">$42,350</span>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground">85% credit available</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Payment Terms</span>
                <span className="text-sm font-bold text-foreground">Net 30</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Outstanding Balance</span>
                <span className="text-sm font-bold text-foreground">$7,650</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Next Payment Due</span>
                <span className="text-sm font-bold text-foreground">Jan 25, 2024</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Account Status</span>
                <Badge className="bg-green-100 text-green-800">Good Standing</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Customer Since</span>
                <span className="text-sm font-bold text-foreground">March 2023</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Tier Level</span>
                <Badge className="bg-blue-100 text-blue-800">Premium</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}