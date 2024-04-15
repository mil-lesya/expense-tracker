export interface RecordsPagesResponse {
  count: number
  totalPages: number
  currentPage: string
}

export interface RecordsPagesDto {
  page: number
  limit: number
  sort?: string
  order?: boolean
}

export interface decodedToken {
  id: string
}
