import client from 'mm-client'
import { Vote } from './Vote'

export const createVote = async (vote: Vote) => {
  const response = await client.post('/votes', vote, {
    withCredentials: true
  })
  return response.data
}

export const deleteVote = async (voteId: string) => {
  const response = await client.delete('/votes/' + voteId, {
    withCredentials: true
  })
  return response.data
}

export const fetchEventVotes = async (eventId: string) => {
  const response = await client.get('/events/' + eventId + '/votes', {
    withCredentials: true
  })
  return response.data
}
