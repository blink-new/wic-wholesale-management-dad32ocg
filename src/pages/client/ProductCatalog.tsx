import { useState } from 'react'
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Plus, 
  Minus,
  Star,
  Package,
  Truck,
  Shield,
  Info,
  Heart,
  Grid3X3,
  List,
  SlidersHorizontal
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'
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
import { Separator } from '../../components/ui/separator'
import { Slider } from '../../components/ui/slider'
import { Checkbox } from '../../components/ui/checkbox'
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
  brand: string
  images: string[]
  basePrice: number
  tierPrices: {
    tier1: { minQty: number; price: number }
    tier2: { minQty: number; price: number }
    tier3: { minQty: number; price: number }
  }
  inStock: boolean
  stockLevel: number
  minimumOrder: number
  leadTime: string
  specifications: Record<string, string>
  features: string[]
  rating: number
  reviewCount: number
  isFavorite: boolean
  tags: string[]
}

const mockProducts: Product[] = [
  {
    id: '1',
    sku: 'WDG-PRO-X1',
    name: 'Widget Pro X1',
    description: 'Professional grade widget with advanced features for industrial applications. Built with premium materials and backed by our comprehensive warranty.',
    category: 'Electronics',
    brand: 'TechCorp',
    images: [
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
    ],
    basePrice: 89.99,
    tierPrices: {
      tier1: { minQty: 1, price: 89.99 },
      tier2: { minQty: 10, price: 79.99 },
      tier3: { minQty: 50, price: 69.99 }
    },
    inStock: true,
    stockLevel: 245,
    minimumOrder: 1,
    leadTime: '2-3 business days',
    specifications: {
      'Dimensions': '10" x 8" x 2"',
      'Weight': '2.5 lbs',
      'Material': 'Aluminum alloy',
      'Warranty': '2 years',
      'Certification': 'CE, FCC, RoHS'
    },
    features: [
      'Advanced processing capabilities',
      'Durable construction',
      'Easy installation',
      'Energy efficient',
      'Compatible with standard systems'
    ],
    rating: 4.8,
    reviewCount: 124,
    isFavorite: false,
    tags: ['bestseller', 'premium']
  },
  {
    id: '2',
    sku: 'CAB-USB-C',
    name: 'USB-C Cable 2m',
    description: 'High-speed USB-C cable with fast charging support. Perfect for data transfer and device charging with reinforced connectors.',
    category: 'Cables',
    brand: 'ConnectPro',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      'https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?w=400'
    ],
    basePrice: 12.99,
    tierPrices: {
      tier1: { minQty: 1, price: 12.99 },
      tier2: { minQty: 25, price: 10.99 },
      tier3: { minQty: 100, price: 8.99 }
    },
    inStock: true,
    stockLevel: 1250,
    minimumOrder: 1,
    leadTime: '1-2 business days',
    specifications: {
      'Length': '2 meters',
      'Connector': 'USB-C to USB-C',
      'Data Speed': 'Up to 10 Gbps',
      'Power': 'Up to 100W',
      'Color': 'Black'
    },
    features: [
      'Fast charging support',
      'High-speed data transfer',
      'Reinforced connectors',
      'Tangle-free design',
      'Universal compatibility'
    ],
    rating: 4.6,
    reviewCount: 89,
    isFavorite: true,
    tags: ['popular', 'fast-shipping']
  },
  {
    id: '3',
    sku: 'PWR-BANK-10K',
    name: 'Power Bank 10000mAh',
    description: 'Compact portable power bank with multiple charging ports. Features LED indicator and fast charging technology.',
    category: 'Electronics',
    brand: 'PowerTech',
    images: [
      'https://images.unsplash.com/photo-1609592806955-d0ae3d1b9b6e?w=400',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400'
    ],
    basePrice: 39.99,
    tierPrices: {
      tier1: { minQty: 1, price: 39.99 },
      tier2: { minQty: 12, price: 34.99 },
      tier3: { minQty: 48, price: 29.99 }
    },
    inStock: true,
    stockLevel: 78,
    minimumOrder: 1,
    leadTime: '2-3 business days',
    specifications: {
      'Capacity': '10000mAh',
      'Input': 'USB-C, Micro-USB',
      'Output': '2x USB-A, 1x USB-C',
      'Dimensions': '5.5" x 2.7" x 0.6"',
      'Weight': '8.5 oz'
    },
    features: [
      'Fast charging technology',
      'Multiple device support',
      'LED power indicator',
      'Compact design',
      'Safety protection'
    ],
    rating: 4.4,
    reviewCount: 156,
    isFavorite: false,
    tags: ['portable', 'bestseller']
  },
  {
    id: '4',
    sku: 'TLK-PREM-001',
    name: 'Tool Kit Premium',
    description: 'Professional tool kit with premium tools and carrying case. Perfect for maintenance and repair work.',
    category: 'Tools',
    brand: 'ToolMaster',
    images: [
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400'
    ],
    basePrice: 179.99,
    tierPrices: {
      tier1: { minQty: 1, price: 179.99 },
      tier2: { minQty: 5, price: 159.99 },
      tier3: { minQty: 20, price: 139.99 }
    },
    inStock: false,
    stockLevel: 0,
    minimumOrder: 1,
    leadTime: '7-10 business days',
    specifications: {
      'Tools Included': '45 pieces',
      'Case Material': 'Heavy-duty plastic',
      'Tool Material': 'Chrome vanadium steel',
      'Warranty': '5 years',
      'Weight': '12 lbs'
    },
    features: [
      'Professional grade tools',
      'Organized carrying case',
      'Lifetime warranty on tools',
      'Ergonomic handles',
      'Complete tool set'
    ],
    rating: 4.9,
    reviewCount: 67,
    isFavorite: false,
    tags: ['premium', 'professional']
  }
]

interface CartItem {
  productId: string
  quantity: number
  price: number
}

export default function ProductCatalog({ user }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [brandFilter, setBrandFilter] = useState<string>('all')
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const categories = [...new Set(mockProducts.map(p => p.category))]
  const brands = [...new Set(mockProducts.map(p => p.brand))]

  const getPrice = (product: Product, quantity: number) => {
    if (quantity >= product.tierPrices.tier3.minQty) return product.tierPrices.tier3.price
    if (quantity >= product.tierPrices.tier2.minQty) return product.tierPrices.tier2.price
    return product.tierPrices.tier1.price
  }

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    const matchesBrand = brandFilter === 'all' || product.brand === brandFilter
    const matchesPrice = product.basePrice >= priceRange[0] && product.basePrice <= priceRange[1]
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.basePrice - b.basePrice
      case 'price-high': return b.basePrice - a.basePrice
      case 'rating': return b.rating - a.rating
      case 'name': return a.name.localeCompare(b.name)
      default: return 0
    }
  })

  const addToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1
    const price = getPrice(product, quantity)
    
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id)
      if (existing) {
        return prev.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + quantity, price }
            : item
        )
      }
      return [...prev, { productId: product.id, quantity, price }]
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setQuantities(prev => ({ ...prev, [productId]: Math.max(1, quantity) }))
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Product Catalog</h1>
          <p className="text-muted-foreground">Browse our wholesale product selection with tiered pricing</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart ({cartItemCount})
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {cartItemCount}
              </Badge>
            )}
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Favorites
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, SKU, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <Label>Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>Brand</Label>
                  <Select value={brandFilter} onValueChange={setBrandFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Grid/List */}
      <div className={viewMode === 'grid' 
        ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
        : "space-y-4"
      }>
        {filteredProducts.map((product) => {
          const quantity = quantities[product.id] || 1
          const currentPrice = getPrice(product, quantity)
          
          if (viewMode === 'list') {
            return (
              <Card key={product.id} className="overflow-hidden">
                <div className="flex">
                  <div className="w-48 h-32 bg-muted flex-shrink-0">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{product.name}</h3>
                          <Badge variant="outline">{product.sku}</Badge>
                          {product.tags.includes('bestseller') && (
                            <Badge className="bg-orange-100 text-orange-800">Bestseller</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                          </div>
                          <Badge variant={product.inStock ? "default" : "destructive"}>
                            {product.inStock ? `${product.stockLevel} in stock` : 'Out of stock'}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground mb-2">
                          ${currentPrice.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground mb-4">
                          Tier pricing available
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            disabled={quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-medium">{quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button 
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          className="w-full"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          }

          return (
            <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-muted relative overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.tags.includes('bestseller') && (
                  <Badge className="absolute top-2 left-2 bg-orange-100 text-orange-800">
                    Bestseller
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                >
                  <Heart className={`h-4 w-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
                      <Badge variant="outline" className="text-xs">{product.sku}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                    </div>
                    <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-foreground">
                      ${currentPrice.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Qty {product.tierPrices.tier2.minQty}+: ${product.tierPrices.tier2.price} • 
                      Qty {product.tierPrices.tier3.minQty}+: ${product.tierPrices.tier3.price}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Info className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>{product.name}</DialogTitle>
                          <DialogDescription>{product.sku}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Specifications</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {Object.entries(product.specifications).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-muted-foreground">{key}:</span>
                                  <span className="font-medium">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Tier Pricing</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>1-{product.tierPrices.tier2.minQty - 1} units:</span>
                                <span className="font-medium">${product.tierPrices.tier1.price}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>{product.tierPrices.tier2.minQty}-{product.tierPrices.tier3.minQty - 1} units:</span>
                                <span className="font-medium">${product.tierPrices.tier2.price}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>{product.tierPrices.tier3.minQty}+ units:</span>
                                <span className="font-medium">${product.tierPrices.tier3.price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      size="sm"
                      className="flex-1"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Cart Summary */}
      {cartItemCount > 0 && (
        <Card className="fixed bottom-4 right-4 w-80 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Cart Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Items: {cartItemCount}</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full">
                Proceed to Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}