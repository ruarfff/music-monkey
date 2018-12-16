import http from '../http'

export const sendEmails = async (emails: string[]) => {
  const response = await http.post(
    '/share/email',
    { emails },
    { withCredentials: true }
  )
  return response
}
