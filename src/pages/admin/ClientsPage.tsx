import { type User } from '../../lib/blink'

interface ClientsPageProps {
  user: User
}

export default function ClientsPage({ user }: ClientsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Client Management</h1>
        <p className="text-muted-foreground">Manage client accounts, pricing tiers, and relationships</p>
      </div>
      
      <div className="bg-muted/50 border border-dashed border-border rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Clients Module</h3>
        <p className="text-muted-foreground">
          This section will include client profiles, custom pricing, and account management tools.
        </p>
      </div>
    </div>
  )
}