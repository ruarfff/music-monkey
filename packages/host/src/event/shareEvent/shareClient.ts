import client from 'mm-client'
import { Event } from 'mm-shared'

export const sendEmails = async (
  emails: string[],
  emailText: string,
  event: Event
) => {
  const response = await client.post(
    '/share/email',
    {
      emails,
      emailText,
      event
    },
    { withCredentials: true }
  )
  return response
}
