import { User } from 'mm-shared'
import IUserState from './IUserState'

export const emptyUser = {
  data: {} as User,
  error: {} as Error,
  isLoading: false,
  isUpdating: false
} as IUserState
