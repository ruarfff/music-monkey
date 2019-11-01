import * as React from 'react'
import logo from 'assets/marvin.png'
import backgroundImg from 'assets/partycover.jpg'
import IEvent from 'event/IEvent'
import './EmailPreview.scss'

interface IEmailPreviewProps {
  event: IEvent
  emailText: string
}

export default ({ event, emailText }: IEmailPreviewProps) => {
  const bg = !event.imageUrl ? backgroundImg : event.imageUrl

  return (
    <div
      className="emailPreviewContainer"
      style={{ background: `url(${bg}) center`, backgroundSize: 'cover' }}
    >
      <div className="TopLine">
        <span>MusicMonkey</span>
      </div>
      <div className="emailPreviewContent">
        <div className="emailPreviewLogo">
          <img src={logo} alt="monkey logo" />
        </div>
        <div className="emailPreviewLink">click here for more details</div>
        <div className="emailPreviewEventName">{event.name}</div>
        <div className="emailPreviewDateWrapper">
          <div className="emailPreviewDateTop">
            {event.startDateTime.format('MMM')}
          </div>
          <div className="emailPreviewDateBot">
            {event.startDateTime.format('D')}
          </div>
        </div>
        <div className="emailPreviewText">{emailText}</div>
      </div>
    </div>
  )
}
