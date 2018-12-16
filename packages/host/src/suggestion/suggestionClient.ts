import http from '../http'
import ISuggestion from './ISuggestion'

export const getEventSuggestions = async (eventId: string) => {
  const response = await http.get('/suggestions?eventId=' + eventId, {
    withCredentials: true
  })
  return response.data
}

export const acceptSuggestions = (
  eventId: string,
  suggestions: ISuggestion[]
) => {
  return http.post('/suggestions/' + eventId + '/accept', suggestions, {
    withCredentials: true
  })
}

export const rejectSuggestion = (suggestion: ISuggestion) => {
  return http.post(
    '/suggestions/' + suggestion.suggestionId + '/reject',
    {},
    { withCredentials: true }
  )
}
