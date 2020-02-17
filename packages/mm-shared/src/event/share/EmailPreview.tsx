import React from 'react'
import logo from '../../assets/marvin.png'
import { isEmpty } from 'lodash'
import { Event } from '../'
import './EmailPreview.scss'

interface IEmailPreviewProps {
  event: Event
}

const EmailPreview = ({ event }: IEmailPreviewProps) => {
  const bgStyle = `no-repeat url('${event.imageUrl ||
    'https://musicmonkey.io/img/music-monkey.jpg'}') center`
  if (isEmpty(event)) {
    return null
  }
  return (
    <div
      className="EmailPreview-root"
      style={{
        background: bgStyle,
        backgroundSize: 'cover'
      }}
    >
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
        <div className="EmailPreview-text">{event.description}</div>
      </div>
    </div>
  )
}

export default EmailPreview
