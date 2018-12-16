import http from '../http'
import IVote from './IVote'

export const createVote = async (vote: IVote) => {
  const response = await http.post('/votes', vote, {
    withCredentials: true
  })
  return response.data
}

export const deleteVote = async (voteId: string) => {
  const response = await http.delete('/votes/' + voteId, {
    withCredentials: true
  })
  return response.data
}

export const fetchEventVotes = async (eventId: string) => {
  const response = await http.get('/events/' + eventId + '/votes', {
    withCredentials: true
  })
  return response.data
}
