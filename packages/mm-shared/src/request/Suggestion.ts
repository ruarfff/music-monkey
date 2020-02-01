export interface Suggestion {
  suggestionId?: string
  eventId: string
  userId: string
  type: string
  trackUri: string
  playlistUri?: string
  accepted: boolean
  rejected: boolean
}
