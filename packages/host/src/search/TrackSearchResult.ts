import { Track } from 'mm-shared'

export default interface TrackSearchResult {
  href: string
  items: Track[]
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}