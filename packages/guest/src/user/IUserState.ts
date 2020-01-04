import { User } from 'mm-shared'

export default interface IUserState {
  data: User
  error: Error
  isLoading: boolean
  isUpdating: boolean
}
