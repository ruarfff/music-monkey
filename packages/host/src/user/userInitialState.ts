import IUser from './IUser'
import IUserState from './IUserState'

export const emptyUser = {
  data: {} as IUser,
  error: {} as Error,
  isLoading: false,
  isUpdating: false
} as IUserState
