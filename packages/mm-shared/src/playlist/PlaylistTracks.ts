import { PlaylistItem } from './PlaylistItem'

export interface PlaylistTracks {
  href: string
  total: number
  items: PlaylistItem[]
}
