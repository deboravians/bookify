export type Address = {
  city: string
  neighborhood: string
  street: string
  number: string
  complement: string
}

export type Teacher = {
  id: string
  cpf: string
  name: string
  phone: string
  address: Address
  active: boolean
}

export type TeacherInput = Omit<Teacher, 'id' | 'active'>
