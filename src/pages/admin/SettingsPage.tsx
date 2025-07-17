import { type User } from '../../lib/blink'

interface SettingsPageProps {
  user: User
}

export default function SettingsPage({ user }: SettingsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and global settings</p>
      </div>
      
      <div className="bg-muted/50 border border-dashed border-border rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Settings Module</h3>
        <p className="text-muted-foreground">
          This section will include tax rates, shipping methods, email templates, and system configuration.
        </p>
      </div>
    </div>
  )
}