import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AdminSessionProvider, RequireAdmin } from '@/features/admin'
import { BookConsultationPage } from '@/pages/BookConsultationPage'
import { DietPlanPage } from '@/pages/DietPlanPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProductsPage } from '@/pages/ProductsPage'
import { RouteErrorPage } from '@/pages/RouteErrorPage'
import { AdminAppointmentsPage, AdminProductsPage, AdminSchedulePage } from '@/pages/admin/AdminPages'
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage'
import { HomePage } from '@/pages/home/HomePage'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'book', element: <BookConsultationPage /> },
      { path: 'diet-plan', element: <DietPlanPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: 'admin',
    errorElement: <RouteErrorPage />,
    element: (
      <AdminSessionProvider>
        <Outlet />
      </AdminSessionProvider>
    ),
    children: [
      { path: 'login', element: <AdminLoginPage /> },
      {
        element: (
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        ),
        children: [
          { index: true, element: <Navigate to="appointments" replace /> },
          { path: 'appointments', element: <AdminAppointmentsPage /> },
          { path: 'schedule', element: <AdminSchedulePage /> },
          { path: 'products', element: <AdminProductsPage /> },
        ],
      },
    ],
  },
])
