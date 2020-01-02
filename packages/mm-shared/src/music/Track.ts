import { Album } from './Album'

export interface Track {
  disc_number: number
  duration_ms: number
  explicit: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
  album: Album
  href: string
  id: string
}
