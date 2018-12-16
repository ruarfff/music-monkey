import http from '../http'
import ISuggestion from './ISuggestion'

export const getSuggestions = async (eventId: string) => {
  const response = await http.get('/users/suggestions?eventId=' + eventId, {
    withCredentials: true
  })
  return response.data
}

export const getUsersSuggestions = async () => {
  const response = await http.get('/users/suggestions', {
    withCredentials: true
  })
  try {
    if (response.data.length > 200) {
      return response.data.slice(0, 200)
    } else {
      return response.data
    }
  } catch (err) {
    console.log('err', err)
  }
}

export const saveSuggestion = (suggestion: ISuggestion) => {
  return http.post('/suggestions', suggestion, {
    withCredentials: true
  })
}

export const bulkSaveSuggestions = (suggestions: ISuggestion[]) => {
  return http.post('/suggestions', suggestions, {
    withCredentials: true
  })
}

export const deleteSuggestion = (suggestion: ISuggestion) => {
  return http.delete('/suggestions/' + suggestion.suggestionId, {
    withCredentials: true
  })
}
