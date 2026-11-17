import { createBrowserRouter, Navigate } from 'react-router'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { CreateStudentPage } from '@/features/students/pages/CreateStudentPage'
import { EditStudentPage } from '@/features/students/pages/EditStudentPage'
import { StudentProfilePage } from '@/features/students/pages/StudentProfilePage'
import { StudentsListPage } from '@/features/students/pages/StudentsListPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      {
        path: 'alunos',
        children: [
          { index: true, element: <StudentsListPage /> },
          { path: 'novo', element: <CreateStudentPage /> },
          { path: ':id', element: <StudentProfilePage /> },
          { path: ':id/editar', element: <EditStudentPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
