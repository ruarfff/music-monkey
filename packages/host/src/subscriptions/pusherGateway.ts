import Pusher from 'pusher-js'
const pusher = new Pusher('d7c284d8f17d26f74047', {
  cluster: 'eu',
  encrypted: true
})
// TODO: Whole thing a terrible hack. Must make this subscription stuff smarter.
let subscribedToSuggestions = ''
let subscribedToVotes = ''
let subscribedToRSVPUpdate = ''

export const subscribeToSuggestionsModified = (
  eventId: string,
  callback: any
) => {
  if (subscribedToSuggestions !== eventId) {
    const channel = pusher.subscribe('mm-suggestions-' + eventId)

    channel.bind('suggestion-saved', data => callback(data))
    channel.bind('suggestions-accepted', data => callback('accepted'))
    channel.bind('suggestions-rejected', data => callback(data))
    channel.bind('suggestions-auto-accepted', data => callback('accepted'))

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
  if (subscribedToRSVPUpdate !== eventId) {
    const channel = pusher.subscribe('mm-rsvps-' + eventId)
    channel.bind('rsvp-saved', callback)
    channel.bind('rsvp-updated', callback)
    subscribedToRSVPUpdate = eventId
  }
}

export const unSubscribeToRSVPModified = (eventId: string) => {
  try {
    pusher.unsubscribe('mm-rsvps-' + eventId)
    subscribedToRSVPUpdate = ''
  } catch (err) {
    console.error(err)
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
