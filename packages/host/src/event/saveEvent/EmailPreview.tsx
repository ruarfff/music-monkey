import React from 'react'
import logo from 'assets/marvin.png'
import backgroundImg from 'assets/partycover.jpg'
import IEvent from 'event/IEvent'
import './EmailPreview.scss'

interface IEmailPreviewProps {
  event: IEvent
  emailText: string
}

const EmailPreview = ({ event, emailText }: IEmailPreviewProps) => {
  const bg = !event.imageUrl ? backgroundImg : event.imageUrl

  return (
    <div
      className="EmailPreview-root"
      style={{ background: `url(${bg}) center`, backgroundSize: 'cover' }}
    >
      <div className="EmailPreview-title">
        <span>MusicMonkey</span>
      </div>
      <div className="EmailPreview-content">
        <div className="EmailPreview-logo">
          <img src={logo} alt="monkey logo" />
        </div>
        <div className="EmailPreview-link">click here for more details</div>
        <div className="EmailPreview-event-name">{event.name}</div>
        <div className="EmailPreview-date-wrapper">
          <div className="EmailPreview-date-top">
            {event.startDateTime.format('MMM')}
          </div>
          <div className="EmailPreview-date-bot">
            {event.startDateTime.format('D')}
          </div>
        </div>
        <div className="EmailPreview-text">{emailText}</div>
      </div>
    </div>
  )
}

export default EmailPreview
