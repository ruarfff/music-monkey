import client from 'mm-client'
import IEvent from 'event/IEvent'

export const sendEmails = async (
  emails: string[],
  emailText: string,
  event: IEvent
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
