import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { blink, type User } from './lib/blink'
import { Toaster } from './components/ui/toaster'

// Components
import LoadingScreen from './components/LoadingScreen'
import LoginPage from './pages/auth/LoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import ClientPortal from './pages/client/ClientPortal'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user as User | null)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster />
      </Router>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        {(user.role === 'super_admin' || user.role === 'sales_manager' || 
          user.role === 'warehouse_staff' || user.role === 'accountant') && (
          <Route path="/admin/*" element={<AdminDashboard user={user} />} />
        )}
        
        {/* Client Routes */}
        {user.role === 'client' && (
          <Route path="/portal/*" element={<ClientPortal user={user} />} />
        )}
        
        {/* Default redirects based on role */}
        <Route 
          path="/" 
          element={
            <Navigate 
              to={user.role === 'client' ? '/portal' : '/admin'} 
              replace 
            />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App