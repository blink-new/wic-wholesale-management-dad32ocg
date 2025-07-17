import { type User } from '../../lib/blink'

interface ReportsPageProps {
  user: User
}

export default function ReportsPage({ user }: ReportsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">Business intelligence and performance metrics</p>
      </div>
      
      <div className="bg-muted/50 border border-dashed border-border rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Reports Module</h3>
        <p className="text-muted-foreground">
          This section will include sales analytics, inventory reports, and business KPIs.
        </p>
      </div>
    </div>
  )
}