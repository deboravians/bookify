export type Classification = {
  id: string
  code: string
  title: string
  bookCount: number
}

export type ClassificationInput = Pick<Classification, 'code' | 'title'>
