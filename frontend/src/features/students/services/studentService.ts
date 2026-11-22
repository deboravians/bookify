import type { Loan, Student, StudentInput } from '../types'

let students: Student[] = [
  {
    id: '1',
    registration: '2024001',
    name: 'Ana Beatriz Ramos',
    phone: '(11) 98765-4321',
    address: {
      city: 'São Paulo',
      neighborhood: 'Bairro Verde',
      street: 'Rua das Oliveiras',
      number: '45',
      complement: '',
    },
    active: true,
  },
  {
    id: '2',
    registration: '2024002',
    name: 'Carlos Eduardo Santos',
    phone: '(11) 98888-1111',
    address: {
      city: 'São Paulo',
      neighborhood: 'Centro',
      street: 'Rua Augusta',
      number: '120',
      complement: 'Apto 32',
    },
    active: true,
  },
  {
    id: '3',
    registration: '2024003',
    name: 'Gabriel Henrique Lima',
    phone: '(11) 97777-2222',
    address: {
      city: 'São Paulo',
      neighborhood: 'Mooca',
      street: 'Rua da Mooca',
      number: '890',
      complement: '',
    },
    active: false,
  },
  {
    id: '4',
    registration: '2024004',
    name: 'Julia Mendonça',
    phone: '(11) 96666-3333',
    address: {
      city: 'São Paulo',
      neighborhood: 'Pinheiros',
      street: 'Rua dos Pinheiros',
      number: '310',
      complement: 'Bloco B',
    },
    active: true,
  },
  {
    id: '5',
    registration: '2024005',
    name: 'Mariana Souza Oliveira',
    phone: '(11) 95555-4444',
    address: {
      city: 'São Paulo',
      neighborhood: 'Vila Mariana',
      street: 'Rua Domingos de Morais',
      number: '1500',
      complement: '',
    },
    active: true,
  },
]

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

function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function listStudents(): Promise<Student[]> {
  await delay()
  return students
}

export async function getStudent(id: string): Promise<Student> {
  await delay()
  const student = students.find((s) => s.id === id)
  if (!student) throw new Error('Aluno não encontrado.')
  return student
}

export async function createStudent(data: StudentInput): Promise<Student> {
  await delay()
  if (students.some((s) => s.registration === data.registration)) {
    throw new Error('Já existe um aluno com essa matrícula.')
  }

  const newStudent: Student = { ...data, id: crypto.randomUUID(), active: true }
  students = [...students, newStudent]
  return newStudent
}

export async function updateStudent(id: string, data: StudentInput): Promise<Student> {
  const student = await getStudent(id)
  if (students.some((s) => s.registration === data.registration && s.id !== id)) {
    throw new Error('Já existe um aluno com essa matrícula.')
  }

  const updated: Student = { ...student, ...data }
  students = students.map((s) => (s.id === id ? updated : s))
  return updated
}

export async function setStudentActive(id: string, active: boolean): Promise<Student> {
  const student = await getStudent(id)
  const updated: Student = { ...student, active }
  students = students.map((s) => (s.id === id ? updated : s))
  return updated
}

export async function getStudentLoans(studentId: string): Promise<Loan[]> {
  await delay()
  return loans.filter((loan) => loan.studentId === studentId)
}
