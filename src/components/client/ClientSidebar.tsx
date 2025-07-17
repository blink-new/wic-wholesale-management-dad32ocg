import { Link, useLocation } from 'react-router-dom'
import { 
  Building2, 
  LayoutDashboard, 
  ShoppingBag, 
  History, 
  User,
  CreditCard,
  FileText,
  Headphones
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '../ui/sidebar'
import { type User } from '../../lib/blink'

interface ClientSidebarProps {
  user: User
}

const navigationItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/portal' },
  { icon: ShoppingBag, label: 'Product Catalog', href: '/portal/catalog' },
  { icon: History, label: 'Order History', href: '/portal/orders' },
  { icon: FileText, label: 'Invoices', href: '/portal/invoices' },
  { icon: CreditCard, label: 'Payment Center', href: '/portal/payments' },
  { icon: User, label: 'Account Settings', href: '/portal/account' },
  { icon: Headphones, label: 'Support', href: '/portal/support' },
]

export default function ClientSidebar({ user }: ClientSidebarProps) {
  const location = useLocation()

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-6">
        <Link to="/portal" className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">WIC Wholesale</h2>
            <p className="text-xs text-muted-foreground">Client Portal</p>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarMenu>
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}