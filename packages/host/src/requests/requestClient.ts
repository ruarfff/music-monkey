import client from 'mm-client'
import { Suggestion } from 'mm-shared'

export const getRequestsByEventId = async (eventId: string) => {
  const response = await client.get('/suggestions?eventId=' + eventId, {
    withCredentials: true
  })
  return response.data
}

export const acceptRequests = (eventId: string, requests: Suggestion[]) => {
  return client.post('/suggestions/' + eventId + '/accept', requests, {
    withCredentials: true
  })
}

export const rejectRequest = (request: Suggestion) => {
  return client.post(
    '/suggestions/' + request.suggestionId + '/reject',
    {},
    { withCredentials: true }
  )
}
