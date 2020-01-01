import client from 'mm-client'
import IVote from './IVote'

export const createVote = async (vote: IVote) => {
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
