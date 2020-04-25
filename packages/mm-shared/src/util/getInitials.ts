export const getInitials = (name: string) => {
  let initials: any = 'G'
  if (name) {
    initials = name.match(/\b\w/g) || []
    initials = (initials.shift() || '').toUpperCase()
  }
  return initials
}
