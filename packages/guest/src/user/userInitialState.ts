import { User } from 'mm-shared'
import IUserState from './IUserState'

export const emptyUser = {
  data: {} as User,
  error: undefined,
  isLoading: false
} as IUserState
