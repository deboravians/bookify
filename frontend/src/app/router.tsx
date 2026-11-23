import { createBrowserRouter, Navigate } from 'react-router'
import { AppLayout } from '@/components/layout/AppLayout/AppLayout'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { ClassificationsListPage } from '@/features/classifications/pages/ClassificationsListPage'
import { CreateClassificationPage } from '@/features/classifications/pages/CreateClassificationPage'
import { EditClassificationPage } from '@/features/classifications/pages/EditClassificationPage'
import { CreateStudentPage } from '@/features/students/pages/CreateStudentPage'
import { EditStudentPage } from '@/features/students/pages/EditStudentPage'
import { StudentProfilePage } from '@/features/students/pages/StudentProfilePage'
import { StudentsListPage } from '@/features/students/pages/StudentsListPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  {
    element: <AppLayout />,
    children: [
      { path: '/alunos', element: <StudentsListPage /> },
      { path: '/alunos/novo', element: <CreateStudentPage /> },
      { path: '/alunos/:id', element: <StudentProfilePage /> },
      { path: '/alunos/:id/editar', element: <EditStudentPage /> },
      { path: '/classificacoes', element: <ClassificationsListPage /> },
      { path: '/classificacoes/nova', element: <CreateClassificationPage /> },
      { path: '/classificacoes/:id/editar', element: <EditClassificationPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
