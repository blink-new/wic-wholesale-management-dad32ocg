import { Routes, Route, Navigate } from 'react-router-dom'
import { SidebarProvider } from '../../components/ui/sidebar'
import ClientSidebar from '../../components/client/ClientSidebar'
import ClientHeader from '../../components/client/ClientHeader'
import ClientDashboard from './ClientDashboard'
import ProductCatalog from './ProductCatalog'
import OrderHistory from './OrderHistory'
import AccountSettings from './AccountSettings'
import { type User } from '../../lib/blink'

interface ClientPortalProps {
  user: User
}

export default function ClientPortal({ user }: ClientPortalProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ClientSidebar user={user} />
        <div className="flex-1 flex flex-col">
          <ClientHeader user={user} />
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<ClientDashboard user={user} />} />
              <Route path="/catalog" element={<ProductCatalog user={user} />} />
              <Route path="/orders" element={<OrderHistory user={user} />} />
              <Route path="/account" element={<AccountSettings user={user} />} />
              <Route path="*" element={<Navigate to="/portal" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}