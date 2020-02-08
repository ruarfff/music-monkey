import client from 'mm-client'
import { Suggestion } from '../'

export const getRequestsByEventId = async (eventId: string) => {
  const response = await client.get('/suggestions?eventId=' + eventId, {
    withCredentials: true
  })
  return response.data
}

export const acceptManyRequests = (eventId: string, requests: Suggestion[]) => {
  return client.post('/suggestions/event/' + eventId + '/accept', requests, {
    withCredentials: true
  })
}

export const acceptRequest = (request: Suggestion) => {
  return client.post(
    '/suggestions/' + request.suggestionId + '/accept',
    {},
    {
      withCredentials: true
    }
  )
}

export const rejectRequest = (request: Suggestion) => {
  return client.post(
    '/suggestions/' + request.suggestionId + '/reject',
    {},
    { withCredentials: true }
  )
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
