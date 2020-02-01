import client from 'mm-client'
import { Suggestion } from 'mm-shared'

export const getEventSuggestions = async (eventId: string) => {
  const response = await client.get('/suggestions?eventId=' + eventId, {
    withCredentials: true
  })
  return response.data
}

export const saveSuggestion = (suggestion: Suggestion) => {
  return client.post('/suggestions', suggestion, {
    withCredentials: true
  })
}

export const bulkSaveSuggestions = (suggestions: Suggestion[]) => {
  return client.post('/suggestions', suggestions, {
    withCredentials: true
  })
}

export const deleteSuggestion = (suggestion: Suggestion) => {
  return client.delete('/suggestions/' + suggestion.suggestionId, {
    withCredentials: true
  })
}
