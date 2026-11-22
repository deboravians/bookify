export type Address = {
  city: string
  neighborhood: string
  street: string
  number: string
  complement: string
}

export type Student = {
  id: string
  registration: string
  name: string
  phone: string
  address: Address
  active: boolean
}

export type StudentInput = Omit<Student, 'id' | 'active'>
