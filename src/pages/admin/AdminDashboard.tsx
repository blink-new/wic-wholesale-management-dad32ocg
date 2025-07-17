import { Routes, Route, Navigate } from 'react-router-dom'
import { SidebarProvider } from '../../components/ui/sidebar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import DashboardOverview from './DashboardOverview'
import OrdersPage from './OrdersPage'
import InventoryPage from './InventoryPage'
import ClientsPage from './ClientsPage'
import FinancePage from './FinancePage'
import ReportsPage from './ReportsPage'
import SettingsPage from './SettingsPage'
import { type User } from '../../lib/blink'

interface AdminDashboardProps {
  user: User
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar user={user} />
        <div className="flex-1 flex flex-col">
          <AdminHeader user={user} />
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<DashboardOverview user={user} />} />
              <Route path="/orders" element={<OrdersPage user={user} />} />
              <Route path="/inventory" element={<InventoryPage user={user} />} />
              <Route path="/clients" element={<ClientsPage user={user} />} />
              <Route path="/finance" element={<FinancePage user={user} />} />
              <Route path="/reports" element={<ReportsPage user={user} />} />
              <Route path="/settings" element={<SettingsPage user={user} />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}