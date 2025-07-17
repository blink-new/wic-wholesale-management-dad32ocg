import { useState } from 'react'
import { Building2, Shield, Users, Package } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { blink } from '../../lib/blink'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      blink.auth.login()
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center">
                <Building2 className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">WIC Wholesale</h1>
                <p className="text-muted-foreground">Management Platform</p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-md">
              Streamline your wholesale operations with our comprehensive management solution.
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-4">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                <Package className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Inventory Management</h3>
                <p className="text-sm text-muted-foreground">Real-time stock tracking and automated reorder alerts</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 bg-accent/10 rounded-lg flex items-center justify-center mt-1">
                <Users className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Client Portal</h3>
                <p className="text-sm text-muted-foreground">Self-service ordering and account management</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Secure & Compliant</h3>
                <p className="text-sm text-muted-foreground">Role-based access control and audit trails</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login */}
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to access your wholesale management dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <div className="font-medium text-foreground">Admin Roles</div>
                    <div className="text-muted-foreground mt-1">
                      Super Admin, Sales Manager,<br />
                      Warehouse Staff, Accountant
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <div className="font-medium text-foreground">Client Access</div>
                    <div className="text-muted-foreground mt-1">
                      Self-service portal with<br />
                      ordering and account tools
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full h-11 text-base"
                size="lg"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Secure authentication powered by Blink
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}