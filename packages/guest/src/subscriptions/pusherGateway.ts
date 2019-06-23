import Pusher from 'pusher-js'
const pusher = new Pusher('d7c284d8f17d26f74047', {
  cluster: 'eu',
  encrypted: true
})
// TODO: Whole thing a terrible hack. Must make this subscription stuff smarter.
let subscribedToSuggestions: string = ''
let subscribedToVotes: string = ''
let subscribedToPlaylists: string = ''
let subscribedToEvent: string = ''
let subscribedToGuestUpdate = false

export const subscribeToSuggestionsModified = (
  eventId: string,
  callback: any
) => {
  if (subscribedToSuggestions !== eventId) {
    const channel = pusher.subscribe('mm-suggestions-' + eventId)

    channel.bind('suggestion-saved', data => callback(data))
    channel.bind('suggestions-accepted', data => callback(data))
    channel.bind('suggestions-rejected', data => callback(data))
    channel.bind('suggestions-auto-accepted', data => callback(data))

    subscribedToSuggestions = eventId
  }
}

export const unSubscribeToSuggestionsModified = (eventId: string) => {
  try {
    pusher.unsubscribe('mm-suggestions-' + eventId)
    subscribedToSuggestions = ''
  } catch (err) {
    console.error(err)
  }
}

export const subscribeToRSVPModified = (eventId: string, callback: any) => {
  if (!subscribedToGuestUpdate) {
    const channel = pusher.subscribe('mm-rsvps-' + eventId)
    channel.bind('rsvp-saved', callback)
    channel.bind('rsvp-updated', callback)
    subscribedToGuestUpdate = true
  }
}

export const unSubscribeToRSVPModified = (eventId: string) => {
  if (!subscribedToGuestUpdate) {
    pusher.unsubscribe('mm-rsvps-' + eventId)
    subscribedToGuestUpdate = false
  }
}

export const subscribeToVotesModified = (eventId: string, callback: any) => {
  if (subscribedToVotes !== eventId) {
    const channel = pusher.subscribe('mm-votes-' + eventId)

    channel.bind('vote-saved', callback)
    channel.bind('vote-deleted', callback)

    subscribedToVotes = eventId
  }
}

export const unSubscribeToVotesModified = (eventId: string) => {
  try {
    pusher.unsubscribe('mm-votes-' + eventId)
    subscribedToVotes = ''
  } catch (err) {
    console.error(err)
  }
}

export const subscribeToPlaylistModified = (
  playlistId: string,
  callback: any
) => {
  if (subscribedToPlaylists !== playlistId) {
    const channel = pusher.subscribe('mm-playlists-' + playlistId)

    channel.bind('playlist-updated', callback)

    subscribedToPlaylists = playlistId
  }
}

export const unSubscribeToPlaylistModified = (playlistId: string) => {
  try {
    pusher.unsubscribe('mm-playlists-' + playlistId)
    subscribedToPlaylists = ''
  } catch (err) {
    console.error(err)
  }
}

export const subscribeToEventUpdated = (eventId: string, callback: any) => {
  if (subscribedToEvent !== eventId) {
    const channel = pusher.subscribe('mm-events-' + eventId)

    channel.bind('event-updated', callback)

    subscribedToEvent = eventId
  }
}

export const unSubscribeToEventUpdated = (eventId: string) => {
  try {
    pusher.unsubscribe('mm-events-' + eventId)
    subscribedToEvent = ''
  } catch (err) {
    console.error(err)
  }
}
