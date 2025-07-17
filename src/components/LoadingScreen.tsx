import { Loader2 } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">WIC Wholesale Management</h2>
          <p className="text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>
    </div>
  )
}