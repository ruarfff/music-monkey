import { User } from 'mm-shared'

export default interface UserPlaylistRequest {
  limit: number
  offset: number
  user: User
}
