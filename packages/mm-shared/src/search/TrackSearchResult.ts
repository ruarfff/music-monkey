import { Track } from '../'

export interface TrackSearchResult {
  href: string
  items: Track[]
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}
