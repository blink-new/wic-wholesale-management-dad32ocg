import { type User } from '../../lib/blink'

interface AccountSettingsProps {
  user: User
}

export default function AccountSettings({ user }: AccountSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile and company information</p>
      </div>
      
      <div className="bg-muted/50 border border-dashed border-border rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Account Settings</h3>
        <p className="text-muted-foreground">
          This section will include profile management, billing addresses, and preferences.
        </p>
      </div>
    </div>
  )
}