import IUser from '../../../host/src/user/IUser'

export default interface IPlaylistDetails {
  user: IUser
  name: string
  description?: string
}
