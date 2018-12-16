import ITrack from '../track/ITrack'

export default interface ISearch {
  href: string
  items: ITrack[]
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}