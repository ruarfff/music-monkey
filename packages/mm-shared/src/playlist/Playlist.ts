import ExternalUrls from './ExternalUrls'
import Followers from './Followers'
import { PlaylistImage } from './PlaylistImage'
import PlaylistOwner from './PlaylistOwner'
import { PlaylistTracks } from './PlaylistTracks'

export interface Playlist {
  collaborative: boolean
  external_urls: ExternalUrls
  href: string
  id: string
  description?: string
  images: PlaylistImage[]
  name: string
  owner: PlaylistOwner
  primary_color?: string
  public: boolean
  snapshot_id: string
  tracks: PlaylistTracks
  type: string
  uri: string
  followers?: Followers
  eventId: string
}
