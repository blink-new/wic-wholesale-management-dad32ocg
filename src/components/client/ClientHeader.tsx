import { Bell, Search, LogOut, User, ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { blink, type User } from '../../lib/blink'

interface ClientHeaderProps {
  user: User
}

export default function ClientHeader({ user }: ClientHeaderProps) {
  const handleLogout = () => {
    blink.auth.logout()
  }

  const userInitials = user.displayName 
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email.substring(0, 2).toUpperCase()

  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 bg-background"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3 px-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="text-sm font-medium text-foreground">
                    {user.displayName || user.email}
                  </div>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                    Client
                  </Badge>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}