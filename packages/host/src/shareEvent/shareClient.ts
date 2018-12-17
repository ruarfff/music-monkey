import client from 'music-monkey-client'
import IEvent from '../event/IEvent'

export const sendEmails = async (emails: string[], event: IEvent) => {
  const response = await client.post(
    '/share/email',
    {
      emails,
      event,
    },
    { withCredentials: true }
  )
  return response
}
