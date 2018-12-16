import IUser from './IUser'

export default interface IUserState {
  data: IUser
  error?: Error
  isLoading: boolean
}
