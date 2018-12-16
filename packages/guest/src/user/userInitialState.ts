import IUser from './IUser'
import IUserState from './IUserState'

export const emptyUser = {
  data: {} as IUser,
  error: undefined,
  isLoading: false
} as IUserState
