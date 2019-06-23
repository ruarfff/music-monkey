import client from 'music-monkey-client'
import ISuggestion from './ISuggestion'

export const getSuggestions = async (eventId: string) => {
  const response = await client.get('/suggestions?eventId=' + eventId, {
    withCredentials: true
  })
  return response.data
}

export const saveSuggestion = (suggestion: ISuggestion) => {
  return client.post('/suggestions', suggestion, {
    withCredentials: true
  })
}

export const bulkSaveSuggestions = (suggestions: ISuggestion[]) => {
  return client.post('/suggestions', suggestions, {
    withCredentials: true
  })
}

export const deleteSuggestion = (suggestion: ISuggestion) => {
  return client.delete('/suggestions/' + suggestion.suggestionId, {
    withCredentials: true
  })
}
