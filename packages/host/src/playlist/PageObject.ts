export default interface PageObject<T> {
  href: string
  items: T[]
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}
