import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  ShoppingCart, 
  Heart,
  Star,
  Plus,
  Minus,
  Eye,
  Package,
  Truck,
  CheckCircle
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Separator } from '../../components/ui/separator'
import { type User } from '../../lib/blink'

interface ProductCatalogProps {
  user: User
}

interface Product {
  id: string
  sku: string
  name: string
  description: string
  category: string
  price: number
  listPrice: number
  discount?: number
  minQuantity: number
  stockLevel: number
  image: string
  rating: number
  reviews: number
  features: string[]
  inStock: boolean
  isFavorite: boolean
  isNew?: boolean
  isBestSeller?: boolean
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    sku: 'WDG-PRO-X1',
    name: 'Widget Pro X1 Professional',
    description: 'High-performance widget with advanced features for professional use. Includes premium materials and extended warranty.',
    category: 'Electronics',
    price: 89.99,
    listPrice: 109.99,
    discount: 18,
    minQuantity: 1,
    stockLevel: 150,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400',
    rating: 4.8,
    reviews: 124,
    features: ['Professional Grade', 'Extended Warranty', 'Premium Materials'],
    inStock: true,
    isFavorite: true,
    isBestSeller: true
  },
  {
    id: '2',
    sku: 'CAB-USB-C-2M',
    name: 'USB-C Cable 2 Meter',
    description: 'High-speed USB-C cable with fast charging and data transfer capabilities. Durable braided design.',
    category: 'Accessories',
    price: 12.99,
    listPrice: 15.99,
    discount: 19,
    minQuantity: 5,
    stockLevel: 500,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    rating: 4.6,
    reviews: 89,
    features: ['Fast Charging', 'Data Transfer', 'Braided Design'],
    inStock: true,
    isFavorite: false,
    isNew: true
  },
  {
    id: '3',
    sku: 'PWR-BANK-20K',
    name: 'Power Bank 20000mAh',
    description: 'High-capacity portable power bank with multiple charging ports and LED display.',
    category: 'Electronics',
    price: 39.99,
    listPrice: 49.99,
    discount: 20,
    minQuantity: 1,
    stockLevel: 75,
    image: 'https://images.unsplash.com/photo-1609592806955-d0ae3d1b9b6e?w=400',
    rating: 4.7,
    reviews: 156,
    features: ['20000mAh Capacity', 'Multiple Ports', 'LED Display'],
    inStock: true,
    isFavorite: false
  },
  {
    id: '4',
    sku: 'TLK-BASIC',
    name: 'Basic Tool Kit',
    description: 'Essential tools for basic maintenance and repairs. Compact and portable design.',
    category: 'Tools',
    price: 24.99,
    listPrice: 29.99,
    discount: 17,
    minQuantity: 1,
    stockLevel: 0,
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400',
    rating: 4.3,
    reviews: 67,
    features: ['Essential Tools', 'Compact Design', 'Portable'],
    inStock: false,
    isFavorite: false
  },
  {
    id: '5',
    sku: 'SPK-BT-MINI',
    name: 'Bluetooth Speaker Mini',
    description: 'Compact wireless speaker with excellent sound quality and long battery life.',
    category: 'Electronics',
    price: 29.99,
    listPrice: 39.99,
    discount: 25,
    minQuantity: 2,
    stockLevel: 200,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    rating: 4.5,
    reviews: 203,
    features: ['Wireless', 'Long Battery', 'Compact'],
    inStock: true,
    isFavorite: true,
    isNew: true
  },
  {
    id: '6',
    sku: 'MNT-ARM-DUAL',
    name: 'Dual Monitor Arm',
    description: 'Adjustable dual monitor mounting arm with full articulation and cable management.',
    category: 'Accessories',
    price: 79.99,
    listPrice: 99.99,
    discount: 20,
    minQuantity: 1,
    stockLevel: 45,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    rating: 4.9,
    reviews: 78,
    features: ['Dual Monitor', 'Full Articulation', 'Cable Management'],
    inStock: true,
    isFavorite: false,
    isBestSeller: true
  }
]

const categories = ['All Categories', 'Electronics', 'Accessories', 'Tools', 'Parts']

export default function ProductCatalog({ user }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [cart, setCart] = useState<Record<string, number>>({})

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'All Categories' || product.category === categoryFilter
    
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'rating': return b.rating - a.rating
      case 'name': return a.name.localeCompare(b.name)
      default: return 0
    }
  })

  const addToCart = (productId: string, quantity: number = 1) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity
    }))
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => {
        const newCart = { ...prev }
        delete newCart[productId]
        return newCart
      })
    } else {
      setCart(prev => ({
        ...prev,
        [productId]: quantity
      }))
    }
  }

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = mockProducts.find(p => p.id === productId)
      return total + (product ? product.price * quantity : 0)
    }, 0)
  }

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  }

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-green-100 text-green-800 text-xs">New</Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-orange-100 text-orange-800 text-xs">Best Seller</Badge>
          )}
          {product.discount && (
            <Badge className="bg-red-100 text-red-800 text-xs">-{product.discount}%</Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className={`h-4 w-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">{product.category}</Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground line-clamp-1">{product.name}</h3>
            <p className="text-xs text-muted-foreground">{product.sku}</p>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-foreground">${product.price}</span>
                {product.discount && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.listPrice}
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Min qty: {product.minQuantity}
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              {product.inStock ? (
                <Badge className="bg-green-100 text-green-800 text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  In Stock
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800 text-xs">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            {cart[product.id] ? (
              <div className="flex items-center space-x-2 flex-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateCartQuantity(product.id, cart[product.id] - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium min-w-[2rem] text-center">
                  {cart[product.id]}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateCartQuantity(product.id, cart[product.id] + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="flex-1"
                disabled={!product.inStock}
                onClick={() => addToCart(product.id, product.minQuantity)}
              >
                <ShoppingCart className="h-3 w-3 mr-2" />
                Add to Cart
              </Button>
            )}
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ProductListItem = ({ product }: { product: Product }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.discount && (
              <Badge className="absolute -top-1 -right-1 bg-red-100 text-red-800 text-xs">
                -{product.discount}%
              </Badge>
            )}
          </div>
          
          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.sku}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-foreground">${product.price}</span>
                  {product.discount && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.listPrice}
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">Min qty: {product.minQuantity}</div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-xs">{product.category}</Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
                </div>
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    In Stock
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 text-xs">
                    Out of Stock
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {cart[product.id] ? (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateCartQuantity(product.id, cart[product.id] - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium min-w-[2rem] text-center">
                      {cart[product.id]}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateCartQuantity(product.id, cart[product.id] + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    disabled={!product.inStock}
                    onClick={() => addToCart(product.id, product.minQuantity)}
                  >
                    <ShoppingCart className="h-3 w-3 mr-2" />
                    Add to Cart
                  </Button>
                )}
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Eye className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Heart className={`h-3 w-3 ${product.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Product Catalog</h1>
          <p className="text-muted-foreground">Browse and order from our complete product range</p>
        </div>
        {getCartItemCount() > 0 && (
          <Card className="p-4">
            <div className="flex items-center space-x-4">
              <div>
                <div className="font-medium text-foreground">Cart: {getCartItemCount()} items</div>
                <div className="text-sm text-muted-foreground">Total: ${getCartTotal().toFixed(2)}</div>
              </div>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Cart
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product Search & Filters</CardTitle>
              <CardDescription>Find the products you need</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, SKUs, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {mockProducts.length} products
          </p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}