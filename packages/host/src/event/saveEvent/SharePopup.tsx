import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import IAction from 'IAction'
import IEvent from 'event/IEvent'
import ShareEventByEmail from './ShareEventByEmailContainer'
import './SharePopup.scss'

interface SharePopupProps {
  message: string
  inviteId: string
  event: IEvent
  onCopyEventInvite(): void
  clearMessage(): IAction
}

const SharePopup = ({
  inviteId,
  event,
  onCopyEventInvite,
  clearMessage,
  message
}: SharePopupProps) => {
  const [showPopup, setShowPopup] = useState(false)

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const closePopup = (e: any) => {
    if (e.target.classList.contains('SharePopupWrapper')) {
      setShowPopup(false)
    }
  }

  return (
    <>
      <Button onClick={togglePopup} color="secondary" variant="contained">
        SHARE EVENT
      </Button>
      {showPopup && (
        <div className="SharePopup-root" onClick={closePopup}>
          <div className="SharePopup-content">
            <ShareEventByEmail
              message={message}
              clearMessage={clearMessage}
              event={event}
              togglePopup={togglePopup}
              inviteId={inviteId}
              onCopyEventInvite={onCopyEventInvite}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default SharePopup
