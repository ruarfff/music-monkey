import Pusher from 'pusher-js'

const pusher = new Pusher('d7c284d8f17d26f74047', {
  cluster: 'eu',
  encrypted: true
})

// TODO: Whole thing a terrible hack. Must make this subscription stuff smarter.

let subscribedToSuggestions = false
let subscribedToVoteCreate = false
let subscribedToRsvp = false
let subscribedToGuestUpdate = false

export const subscribeToSuggestionsAccepted = (
  eventId: string,
  callback: any
) => {
  if (!subscribedToSuggestions) {
    const channel = pusher.subscribe('mm-suggestions-' + eventId)
    channel.bind('suggestion-saved', data => callback(data))
    channel.bind('suggestions-accepted', data => callback('accepted'))
    channel.bind('suggestions-rejected', data => callback(data))
    channel.bind('suggestions-auto-accepted', data => callback('accepted'))

    subscribedToSuggestions = true
  }
}

export const subscribeToVotesModified = (eventId: string, callback: any) => {
  if (!subscribedToVoteCreate) {
    const channel = pusher.subscribe('mm-votes-' + eventId)
    channel.bind('vote-saved', callback)
    channel.bind('vote-deleted', callback)
    subscribedToVoteCreate = true
  }
}

export const onGuestUpdate = (eventId: string, callback: any) => {
  if (!subscribedToGuestUpdate) {
    const channel = pusher.subscribe('mm-rsvps-' + eventId)
    channel.bind('rsvp-saved', callback)
    channel.bind('rsvp-updated', callback)
    subscribedToGuestUpdate = true
  }
}

export const onRsvpSaved = (userId: string, callback: any) => {
  if (!subscribedToRsvp) {
    const channel = pusher.subscribe('mm-user-notifications-' + userId)
    channel.bind('notifications-saved', callback)
    subscribedToRsvp = true
  }
}
