import client from 'mm-client'
import { Vote } from './Vote'

export const saveVote = async (vote: Vote) => {
  const response = await client.post('/votes', vote, {
    withCredentials: true
  })
  return response.data
}

export const removeVote = async (voteId: string) => {
  const response = await client.delete('/votes/' + voteId, {
    withCredentials: true
  })
  return response.data
}

export const getEventVotes = async (eventId: string) => {
  const response = await client.get('/events/' + eventId + '/votes', {
    withCredentials: true
  })
  return response.data
}

export const getUserVotesWithTracks = async () => {
  const response = await client.get('/votes', {
    withCredentials: true
  })
  return response.data
}
