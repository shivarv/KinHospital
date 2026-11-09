import type { ReactNode } from 'react'
import { AppointmentsPanel, ProductsPanel, SchedulePanel } from '@/features/admin'

function AdminPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl">{title}</h1>
      <div className="mt-8">{children}</div>
    </div>
  )
}

export const AdminAppointmentsPage = () => (
  <AdminPage title="Appointments"><AppointmentsPanel /></AdminPage>
)

export const AdminSchedulePage = () => (
  <AdminPage title="Doctor's schedule"><SchedulePanel /></AdminPage>
)

export const AdminProductsPage = () => (
  <AdminPage title="Products"><ProductsPanel /></AdminPage>
)
