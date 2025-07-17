import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal,
  Eye,
  Edit,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  QrCode,
  Scan,
  RefreshCw,
  Archive,
  ShoppingCart
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Progress } from '../../components/ui/progress'
import { type User } from '../../lib/blink'

interface InventoryPageProps {
  user: User
}

type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued'

interface Product {
  id: string
  sku: string
  name: string
  description: string
  category: string
  brand: string
  currentStock: number
  minimumStock: number
  maximumStock: number
  unitCost: number
  sellingPrice: number
  location: string
  barcode: string
  status: StockStatus
  lastRestocked: string
  supplier: string
  leadTime: number // days
  reorderPoint: number
  averageMonthlySales: number
}

const mockProducts: Product[] = [
  {
    id: '1',
    sku: 'WDG-PRO-X1',
    name: 'Widget Pro X1',
    description: 'Professional grade widget with advanced features',
    category: 'Electronics',
    brand: 'TechCorp',
    currentStock: 12,
    minimumStock: 50,
    maximumStock: 500,
    unitCost: 45.00,
    sellingPrice: 89.99,
    location: 'A1-B2-C3',
    barcode: '1234567890123',
    status: 'low_stock',
    lastRestocked: '2024-01-10',
    supplier: 'TechCorp Supplies',
    leadTime: 14,
    reorderPoint: 25,
    averageMonthlySales: 85
  },
  {
    id: '2',
    sku: 'CMP-SET-A',
    name: 'Component Set A',
    description: 'Essential component set for assembly',
    category: 'Parts',
    brand: 'ComponentCo',
    currentStock: 8,
    minimumStock: 25,
    maximumStock: 200,
    unitCost: 12.50,
    sellingPrice: 24.99,
    location: 'B2-C1-D4',
    barcode: '2345678901234',
    status: 'low_stock',
    lastRestocked: '2024-01-08',
    supplier: 'ComponentCo Ltd',
    leadTime: 7,
    reorderPoint: 15,
    averageMonthlySales: 45
  },
  {
    id: '3',
    sku: 'TLK-PREM-001',
    name: 'Tool Kit Premium',
    description: 'Premium tool kit with carrying case',
    category: 'Tools',
    brand: 'ToolMaster',
    currentStock: 3,
    minimumStock: 15,
    maximumStock: 100,
    unitCost: 89.00,
    sellingPrice: 179.99,
    location: 'C3-D2-E1',
    barcode: '3456789012345',
    status: 'out_of_stock',
    lastRestocked: '2024-01-05',
    supplier: 'ToolMaster Inc',
    leadTime: 21,
    reorderPoint: 8,
    averageMonthlySales: 12
  },
  {
    id: '4',
    sku: 'CAB-USB-C',
    name: 'USB-C Cable 2m',
    description: 'High-speed USB-C cable, 2 meter length',
    category: 'Cables',
    brand: 'ConnectPro',
    currentStock: 245,
    minimumStock: 100,
    maximumStock: 1000,
    unitCost: 3.50,
    sellingPrice: 12.99,
    location: 'D1-A3-B2',
    barcode: '4567890123456',
    status: 'in_stock',
    lastRestocked: '2024-01-12',
    supplier: 'ConnectPro Supplies',
    leadTime: 5,
    reorderPoint: 150,
    averageMonthlySales: 320
  },
  {
    id: '5',
    sku: 'PWR-BANK-10K',
    name: 'Power Bank 10000mAh',
    description: 'Portable power bank with fast charging',
    category: 'Electronics',
    brand: 'PowerTech',
    currentStock: 78,
    minimumStock: 30,
    maximumStock: 300,
    unitCost: 18.00,
    sellingPrice: 39.99,
    location: 'A2-B1-C4',
    barcode: '5678901234567',
    status: 'in_stock',
    lastRestocked: '2024-01-14',
    supplier: 'PowerTech Ltd',
    leadTime: 10,
    reorderPoint: 45,
    averageMonthlySales: 65
  }
]

export default function InventoryPage({ user }: InventoryPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isStockAdjustOpen, setIsStockAdjustOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const getStatusColor = (status: StockStatus) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800 border-green-200'
      case 'low_stock': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'out_of_stock': return 'bg-red-100 text-red-800 border-red-200'
      case 'discontinued': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: StockStatus) => {
    switch (status) {
      case 'in_stock': return Package
      case 'low_stock': return AlertTriangle
      case 'out_of_stock': return AlertTriangle
      case 'discontinued': return Archive
      default: return Package
    }
  }

  const getStockLevel = (product: Product) => {
    if (product.currentStock === 0) return 'out_of_stock'
    if (product.currentStock <= product.reorderPoint) return 'low_stock'
    return 'in_stock'
  }

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    const actualStatus = getStockLevel(product)
    const matchesStatus = statusFilter === 'all' || actualStatus === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const inventoryStats = {
    totalProducts: mockProducts.length,
    inStock: mockProducts.filter(p => getStockLevel(p) === 'in_stock').length,
    lowStock: mockProducts.filter(p => getStockLevel(p) === 'low_stock').length,
    outOfStock: mockProducts.filter(p => getStockLevel(p) === 'out_of_stock').length,
    totalValue: mockProducts.reduce((sum, p) => sum + (p.currentStock * p.unitCost), 0)
  }

  const categories = [...new Set(mockProducts.map(p => p.category))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Track stock levels, manage products, and monitor warehouse operations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <QrCode className="h-4 w-4 mr-2" />
            Scan Barcode
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Add a new product to your inventory system
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" placeholder="e.g., WDG-PRO-X2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input id="barcode" placeholder="1234567890123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="Enter product name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Product description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input id="brand" placeholder="Brand name" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="unitCost">Unit Cost</Label>
                    <Input id="unitCost" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellingPrice">Selling Price</Label>
                    <Input id="sellingPrice" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initialStock">Initial Stock</Label>
                    <Input id="initialStock" type="number" placeholder="0" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddProductOpen(false)}>
                  Add Product
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold text-foreground">{inventoryStats.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Stock</p>
                <p className="text-2xl font-bold text-green-600">{inventoryStats.inStock}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{inventoryStats.lowStock}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{inventoryStats.outOfStock}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-foreground">${inventoryStats.totalValue.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Manage your product stock levels and details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, SKU, or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const actualStatus = getStockLevel(product)
                  const StatusIcon = getStatusIcon(actualStatus)
                  const stockPercentage = (product.currentStock / product.maximumStock) * 100
                  
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{product.name}</div>
                          <div className="text-sm text-muted-foreground">{product.brand}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">{product.sku}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{product.currentStock}</span>
                            <span className="text-xs text-muted-foreground">
                              / {product.maximumStock}
                            </span>
                          </div>
                          <Progress value={stockPercentage} className="h-1" />
                          <div className="text-xs text-muted-foreground">
                            Min: {product.minimumStock} | Reorder: {product.reorderPoint}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(actualStatus)} border`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {actualStatus.replace('_', ' ').charAt(0).toUpperCase() + actualStatus.replace('_', ' ').slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">{product.location}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">${product.unitCost.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">${product.sellingPrice.toFixed(2)}</span>
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
                              Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => {
                                setSelectedProduct(product)
                                setIsStockAdjustOpen(true)
                              }}
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Adjust Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Reorder
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">
                {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Add your first product to get started'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stock Adjustment Dialog */}
      <Dialog open={isStockAdjustOpen} onOpenChange={setIsStockAdjustOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock Level</DialogTitle>
            <DialogDescription>
              {selectedProduct && `Update stock for ${selectedProduct.name} (${selectedProduct.sku})`}
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Current Stock</Label>
                  <div className="text-2xl font-bold">{selectedProduct.currentStock}</div>
                </div>
                <div>
                  <Label>Location</Label>
                  <div className="text-sm font-mono">{selectedProduct.location}</div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adjustment">Stock Adjustment</Label>
                <Input 
                  id="adjustment" 
                  type="number" 
                  placeholder="Enter quantity (+ to add, - to remove)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="received">Stock Received</SelectItem>
                    <SelectItem value="sold">Stock Sold</SelectItem>
                    <SelectItem value="damaged">Damaged/Defective</SelectItem>
                    <SelectItem value="lost">Lost/Stolen</SelectItem>
                    <SelectItem value="returned">Customer Return</SelectItem>
                    <SelectItem value="correction">Inventory Correction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" placeholder="Additional notes..." />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStockAdjustOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsStockAdjustOpen(false)}>
              Update Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}