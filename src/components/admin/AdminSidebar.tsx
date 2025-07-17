import { Link, useLocation } from 'react-router-dom'
import { 
  Building2, 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign, 
  BarChart3, 
  Settings,
  Wrench,
  FileText
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

interface AdminSidebarProps {
  user: User
}

const getNavigationItems = (userRole: User['role']) => {
  const baseItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: Package, label: 'Inventory', href: '/admin/inventory' },
  ]

  const roleSpecificItems = []

  // Sales Manager and Super Admin can see clients
  if (userRole === 'super_admin' || userRole === 'sales_manager') {
    roleSpecificItems.push({ icon: Users, label: 'Clients', href: '/admin/clients' })
  }

  // Accountant and Super Admin can see finance
  if (userRole === 'super_admin' || userRole === 'accountant') {
    roleSpecificItems.push({ icon: DollarSign, label: 'Finance', href: '/admin/finance' })
  }

  // Warehouse staff can see RMA
  if (userRole === 'super_admin' || userRole === 'warehouse_staff') {
    roleSpecificItems.push({ icon: Wrench, label: 'RMA & Repairs', href: '/admin/rma' })
  }

  const endItems = [
    { icon: BarChart3, label: 'Reports', href: '/admin/reports' },
    { icon: FileText, label: 'Quality Control', href: '/admin/quality' },
  ]

  // Only Super Admin can see settings
  if (userRole === 'super_admin') {
    endItems.push({ icon: Settings, label: 'Settings', href: '/admin/settings' })
  }

  return [...baseItems, ...roleSpecificItems, ...endItems]
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const location = useLocation()
  const navigationItems = getNavigationItems(user.role)

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-6">
        <Link to="/admin" className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">WIC Wholesale</h2>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
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