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

export async function listTeachers(search = ''): Promise<Teacher[]> {
  const term = search.trim()
  const query = term ? `?search=${encodeURIComponent(term)}` : ''
  const teachers = await apiFetch<ApiTeacher[]>(`/api/teachers${query}`)
  return teachers.map(toTeacher)
}
