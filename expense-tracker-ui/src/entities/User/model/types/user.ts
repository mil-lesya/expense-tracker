import { CurrencyCode } from 'shared/const/common';

export interface User {
  id: string
  username: string
  email: string
  defaultCurrency: CurrencyCode
}

export interface UserSchema {
  authData?: User
  isAuth: boolean
  isLoading: boolean
}

export interface UserLoginResponseDto {
  user: User
  accessToken: string
}
