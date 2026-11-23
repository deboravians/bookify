import { apiFetch } from '@/lib/api'
import type { Address, Loan, Student, StudentInput } from '../types'

type ApiStudent = {
  _id: string
  registration: string
  name: string
  phone: string
  address: Omit<Address, 'complement'> & { complement?: string }
  status: 'ATIVO' | 'INATIVO'
}

function toStudent({ _id, status, address, ...rest }: ApiStudent): Student {
  return {
    ...rest,
    id: _id,
    address: { ...address, complement: address.complement ?? '' },
    active: status === 'ATIVO',
  }
}

const loans: Loan[] = [
  {
    id: '1',
    studentId: '1',
    bookTitle: 'O Alquimista',
    loanDate: '2024-02-10',
    returnDate: '2024-02-24',
    status: 'devolvido',
  },
  {
    id: '2',
    studentId: '1',
    bookTitle: 'Dom Casmurro',
    loanDate: '2024-03-01',
    returnDate: '2024-03-15',
    status: 'devolvido',
  },
  {
    id: '3',
    studentId: '1',
    bookTitle: 'Cem Anos de Solidão',
    loanDate: '2024-03-20',
    returnDate: '2024-04-03',
    status: 'em_atraso',
  },
  {
    id: '4',
    studentId: '2',
    bookTitle: 'Memórias Póstumas de Brás Cubas',
    loanDate: '2024-04-02',
    returnDate: '2024-04-16',
    status: 'em_andamento',
  },
]

export async function listStudents(): Promise<Student[]> {
  const students = await apiFetch<ApiStudent[]>('/api/students')
  return students.map(toStudent)
}

export async function getStudent(id: string): Promise<Student> {
  const students = await listStudents()
  const student = students.find((s) => s.id === id)
  if (!student) throw new Error('Aluno não encontrado.')
  return student
}

export async function createStudent(data: StudentInput): Promise<Student> {
  const response = await apiFetch<{ student: ApiStudent }>('/api/students', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return toStudent(response.student)
}

export async function updateStudent(id: string, data: StudentInput): Promise<Student> {
  const response = await apiFetch<{ student: ApiStudent }>(`/api/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  return toStudent(response.student)
}

export async function setStudentActive(id: string, active: boolean): Promise<Student> {
  const response = await apiFetch<{ student: ApiStudent }>(`/api/students/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status: active ? 'ATIVO' : 'INATIVO' }),
  })
  return toStudent(response.student)
}

export async function getStudentLoans(studentId: string): Promise<Loan[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return loans.filter((loan) => loan.studentId === studentId)
}
