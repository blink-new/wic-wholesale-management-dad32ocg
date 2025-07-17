import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'wic-wholesale-management-dad32ocg',
  authRequired: true
})

export type User = {
  id: string
  email: string
  displayName?: string
  role: 'super_admin' | 'sales_manager' | 'warehouse_staff' | 'accountant' | 'client'
  companyId?: string
  createdAt: string
  updatedAt: string
}

export type UserRole = User['role']