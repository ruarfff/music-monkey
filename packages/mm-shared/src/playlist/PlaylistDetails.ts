import { User } from '../user'

export default interface PlaylistDetails {
  user: User
  name: string
  description?: string
}
