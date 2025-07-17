import { 
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Progress } from '../../components/ui/progress'
import { type User } from '../../lib/blink'

interface DashboardOverviewProps {
  user: User
}

export default function DashboardOverview({ user }: DashboardOverviewProps) {
  // Mock data - in real app this would come from API
  const stats = [
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: ShoppingCart,
      description: 'This month'
    },
    {
      title: 'Active Products',
      value: '3,842',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: Package,
      description: 'In inventory'
    },
    {
      title: 'Active Clients',
      value: '156',
      change: '+8.3%',
      changeType: 'positive' as const,
      icon: Users,
      description: 'This quarter'
    },
    {
      title: 'Revenue',
      value: '$284,592',
      change: '+15.2%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'This month'
    }
  ]

  const recentOrders = [
    { id: 'ORD-001', client: 'Acme Corp', amount: '$2,450', status: 'processing', time: '2 hours ago' },
    { id: 'ORD-002', client: 'TechStart Inc', amount: '$1,890', status: 'shipped', time: '4 hours ago' },
    { id: 'ORD-003', client: 'Global Solutions', amount: '$3,200', status: 'delivered', time: '6 hours ago' },
    { id: 'ORD-004', client: 'Innovation Labs', amount: '$1,650', status: 'pending', time: '8 hours ago' },
  ]

  const lowStockItems = [
    { name: 'Widget Pro X1', current: 12, minimum: 50, category: 'Electronics' },
    { name: 'Component Set A', current: 8, minimum: 25, category: 'Parts' },
    { name: 'Tool Kit Premium', current: 3, minimum: 15, category: 'Tools' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'shipped': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle
      case 'shipped': return TrendingUp
      case 'processing': return Clock
      case 'pending': return AlertTriangle
      default: return Clock
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user.displayName || user.email.split('@')[0]}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your wholesale operations today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs">
                <span className={`font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest order activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status)
                return (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">{order.id}</div>
                        <div className="text-sm text-muted-foreground">{order.client}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground">{order.amount}</div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{order.time}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Low Stock Alerts</span>
            </CardTitle>
            <CardDescription>Items that need restocking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => {
                const percentage = (item.current / item.minimum) * 100
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">
                          {item.current} / {item.minimum}
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2"
                    />
                  </div>
                )
              })}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage Inventory
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}