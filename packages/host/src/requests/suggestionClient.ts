import client from 'mm-client'
import ISuggestion from './ISuggestion'

export const getEventSuggestions = async (eventId: string) => {
  const response = await client.get('/suggestions?eventId=' + eventId, {
    withCredentials: true
  })
  return response.data
}

export const acceptSuggestions = (
  eventId: string,
  suggestions: ISuggestion[]
) => {
  return client.post('/suggestions/' + eventId + '/accept', suggestions, {
    withCredentials: true
  })
}

export const rejectSuggestion = (suggestion: ISuggestion) => {
  return client.post(
    '/suggestions/' + suggestion.suggestionId + '/reject',
    {},
    { withCredentials: true }
  )
}
