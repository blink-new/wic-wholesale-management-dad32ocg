import { type User } from '../../lib/blink'

interface OrderHistoryProps {
  user: User
}

export default function OrderHistory({ user }: OrderHistoryProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Order History</h1>
        <p className="text-muted-foreground">Track your orders and reorder previous purchases</p>
      </div>
      
      <div className="bg-muted/50 border border-dashed border-border rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Order History</h3>
        <p className="text-muted-foreground">
          This section will include order tracking, status updates, and reorder functionality.
        </p>
      </div>
    </div>
  )
}