export interface RecordsPagesResponse {
  count: number
  totalPages: number
  currentPage: number
}

export interface RecordsPagesDto {
  page: number
  limit: number
  sort?: string
  order?: string
}

export interface decodedToken {
  id: string
}
