import Pusher from 'pusher-js';
const pusher = new Pusher('d7c284d8f17d26f74047', {
  cluster: 'eu',
  encrypted: true
})
// TODO: Whole thing a terrible hack. Must make this subscription stuff smarter.
let subscribedToSuggestions = false
let subscribedToVoteCreate = false
export const subscribeToSuggestionsAccepted = (
  eventId: string,
  callback: any
) => {
  if (!subscribedToSuggestions) {
    const channel = pusher.subscribe('mm-suggestions-' + eventId)

    channel.bind('suggestion-saved', (data) => callback(data))
    channel.bind('suggestions-accepted',  (data) => callback(data))
    channel.bind('suggestions-rejected',  (data) => callback(data))
    channel.bind('suggestions-auto-accepted',  (data) => callback(data))

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