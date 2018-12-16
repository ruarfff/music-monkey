import client from 'music-monkey-client'

export const sendEmails = async (emails: string[]) => {
  const response = await client.post(
    '/share/email',
    { emails },
    { withCredentials: true }
  )
  return response
}
