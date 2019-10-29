import ITrack from 'track/ITrack'

export default interface TrackSearchResult {
  href: string
  items: ITrack[]
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}