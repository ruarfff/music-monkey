import React, { FunctionComponent, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { localStorage } from 'mm-shared'
import { inviteAnsweredKey, inviteIdKey } from 'invite/inviteConstants'

interface InviteLoaderProps {
  children: any
}

const InviteLoader: FunctionComponent<InviteLoaderProps> = ({ children }) => {
  const [redirect, setRedirect] = useState(false)
  const [inviteId, setInviteId] = useState('')
  const [inviteAnswered, setInviteAnswered] = useState(null)
  useEffect(() => {
    let storedInvite = localStorage.get(inviteIdKey, null)
    if (storedInvite === 'undefined') {
      storedInvite = null
    }
    setInviteId(storedInvite)
    setInviteAnswered(localStorage.get(inviteAnsweredKey, null))
  }, [])
  useEffect(() => {
    const shouldRedirect = !!(inviteId && inviteAnswered === 'false')
    if (shouldRedirect !== redirect) {
      setRedirect(shouldRedirect)
    }
  }, [inviteAnswered, inviteId, redirect])

  if (redirect && inviteId) {
    return <Redirect to={'/invite/' + inviteId} />
  }

  return children
}

export default InviteLoader
