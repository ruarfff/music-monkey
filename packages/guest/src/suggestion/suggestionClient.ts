import client from 'music-monkey-client'
import ISuggestion from './ISuggestion'

export const getSuggestions = async (eventId: string) => {
  const response = await client.get('/users/suggestions?eventId=' + eventId, {
    withCredentials: true
  })
  return response.data
}

export const getUsersSuggestions = async () => {
  const response = await client.get('/users/suggestions', {
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
