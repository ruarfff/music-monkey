// Trimmed down version of the user data that doesn't expose anything too bad
export interface SafeUser {
  country: string
  displayName: string
  image: string
  userId: string
  isGuest: boolean
}
