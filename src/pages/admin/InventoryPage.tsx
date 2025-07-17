import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal,
  Eye,
  Edit,
  AlertTriangle,
  Package,
  Barcode,
  TrendingUp,
  TrendingDown,
  Minus
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
import { Progress } from '../../components/ui/progress'
import { type User } from '../../lib/blink'

interface InventoryPageProps {
  user: User
}

// Mock data - in real app this would come from API
const mockProducts = [
  {
    id: 'PROD-001',
    sku: 'WDG-PRO-X1',
    name: 'Widget Pro X1',
    category: 'Electronics',
    currentStock: 12,
    minStock: 50,
    maxStock: 200,
    unitPrice: 45.99,
    costPrice: 28.50,
    lastRestocked: '2024-01-10',
    supplier: 'TechSupply Co',
    location: 'A1-B2',
    barcode: '123456789012'
  },
  {
    id: 'PROD-002',
    sku: 'CMP-SET-A',
    name: 'Component Set A',
    category: 'Parts',
    currentStock: 8,
    minStock: 25,
    maxStock: 100,
    unitPrice: 12.75,
    costPrice: 7.80,
    lastRestocked: '2024-01-08',
    supplier: 'Parts Direct',
    location: 'B3-C1',
    barcode: '123456789013'
  },
  {
    id: 'PROD-003',
    sku: 'TLK-PREM',
    name: 'Tool Kit Premium',
    category: 'Tools',
    currentStock: 3,
    minStock: 15,
    maxStock: 50,
    unitPrice: 89.99,
    costPrice: 55.00,
    lastRestocked: '2024-01-05',
    supplier: 'ToolMaster Inc',
    location: 'C2-D3',
    barcode: '123456789014'
  },
  {
    id: 'PROD-004',
    sku: 'CAB-USB-C',
    name: 'USB-C Cable 6ft',
    category: 'Accessories',
    currentStock: 150,
    minStock: 100,
    maxStock: 500,
    unitPrice: 8.99,
    costPrice: 4.25,
    lastRestocked: '2024-01-12',
    supplier: 'Cable Solutions',
    location: 'D1-A2',
    barcode: '123456789015'
  },
  {
    id: 'PROD-005',
    sku: 'PWR-BANK-20K',
    name: 'Power Bank 20000mAh',
    category: 'Electronics',
    currentStock: 45,
    minStock: 30,
    maxStock: 120,
    unitPrice: 34.99,
    costPrice: 21.50,
    lastRestocked: '2024-01-14',
    supplier: 'PowerTech Ltd',
    location: 'A3-B1',
    barcode: '123456789016'
  }
]

const getStockStatus = (current: number, min: number, max: number) => {
  const percentage = (current / max) * 100
  if (current <= min) return { status: 'critical', color: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle }
  if (current <= min * 1.5) return { status: 'low', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: TrendingDown }
  if (current >= max * 0.8) return { status: 'high', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: TrendingUp }
  return { status: 'normal', color: 'bg-green-100 text-green-800 border-green-200', icon: Package }
}

export default function InventoryPage({ user }: InventoryPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [stockFilter, setStockFilter] = useState('all')
  const [selectedTab, setSelectedTab] = useState('all')

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    
    let matchesStock = true
    if (stockFilter === 'low') {
      matchesStock = product.currentStock <= product.minStock * 1.5
    } else if (stockFilter === 'critical') {
      matchesStock = product.currentStock <= product.minStock
    } else if (stockFilter === 'normal') {
      matchesStock = product.currentStock > product.minStock * 1.5 && product.currentStock < product.maxStock * 0.8
    } else if (stockFilter === 'high') {
      matchesStock = product.currentStock >= product.maxStock * 0.8
    }
    
    return matchesSearch && matchesCategory && matchesStock
  })

  const inventoryStats = {
    totalProducts: mockProducts.length,
    totalValue: mockProducts.reduce((sum, p) => sum + (p.currentStock * p.costPrice), 0),
    lowStock: mockProducts.filter(p => p.currentStock <= p.minStock).length,
    criticalStock: mockProducts.filter(p => p.currentStock <= p.minStock * 0.5).length,
    categories: [...new Set(mockProducts.map(p => p.category))].length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Track stock levels and manage product inventory</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Barcode className="h-4 w-4 mr-2" />
            Scan Barcode
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{inventoryStats.totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${inventoryStats.totalValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{inventoryStats.categories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{inventoryStats.lowStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{inventoryStats.criticalStock}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>Monitor stock levels and manage product details</CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Parts">Parts</SelectItem>
                  <SelectItem value="Tools">Tools</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Stock Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Stock Status</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Restocked</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stockInfo = getStockStatus(product.currentStock, product.minStock, product.maxStock)
                  const stockPercentage = (product.currentStock / product.maxStock) * 100
                  const StatusIcon = stockInfo.icon
                  
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{product.name}</div>
                          <div className="text-sm text-muted-foreground">{product.supplier}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{product.currentStock}</span>
                            <span className="text-muted-foreground">/ {product.maxStock}</span>
                          </div>
                          <Progress value={stockPercentage} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            Min: {product.minStock}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${stockInfo.color} flex items-center space-x-1 w-fit`}>
                          <StatusIcon className="h-3 w-3" />
                          <span className="capitalize">{stockInfo.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${product.unitPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="font-mono text-sm">{product.location}</TableCell>
                      <TableCell className="text-sm">{product.lastRestocked}</TableCell>
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
                              Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Plus className="mr-2 h-4 w-4" />
                              Adjust Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <TrendingUp className="mr-2 h-4 w-4" />
                              Reorder
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Minus className="mr-2 h-4 w-4" />
                              Deactivate
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
  )
}