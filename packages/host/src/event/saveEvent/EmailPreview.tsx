import React from 'react'
import logo from 'assets/marvin.png'
import IEvent from 'event/IEvent'
import './EmailPreview.scss'

interface IEmailPreviewProps {
  event: IEvent
  emailText: string
}

const EmailPreview = ({ event, emailText }: IEmailPreviewProps) => {
  return (
    <div
      className="EmailPreview-root"
      style={{
        background: `no-repeat url(${event.imageUrl ||
          'https://musicmonkey.io/img/music-monkey.jpg'}) center`,
        backgroundSize: 'cover'
      }}
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
