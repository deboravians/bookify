import { apiFetch } from '@/lib/api'
import type { Address, Teacher } from '../types'

type ApiTeacher = {
  _id: string
  cpf: string
  name: string
  phone: string
  address: Omit<Address, 'complement'> & { complement?: string }
  status: 'ATIVO' | 'INATIVO'
}

function toTeacher({ _id, status, address, ...rest }: ApiTeacher): Teacher {
  return {
    ...rest,
    id: _id,
    address: { ...address, complement: address.complement ?? '' },
    active: status === 'ATIVO',
  }
}

export async function listTeachers(): Promise<Teacher[]> {
  const teachers = await apiFetch<ApiTeacher[]>('/api/teachers')
  return teachers.map(toTeacher)
}
