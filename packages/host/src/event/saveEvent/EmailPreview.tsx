import React from 'react'
import { Event } from 'mm-shared'
import { isEmpty } from 'lodash'
import { Grid } from '@material-ui/core'
import Img from 'react-image'
import logo from 'assets/logo-home.png'
import backgroundImage from 'assets/music-monkey.jpg'
import './EmailPreview.scss'

interface IEmailPreviewProps {
  event: Event
}

const EmailPreview = ({ event }: IEmailPreviewProps) => {
  if (isEmpty(event)) {
    return null
  }
  return (
    <Grid container className="EmailPreview-root">
      <Grid item xs={6}>
        <div className="EmailPreview-content">
          <div className="EmailPreview-logo">
            <img src={logo} alt="monkey logo" />
          </div>
          <div className="EmailPreview-link">click here for more details</div>
          <div className="EmailPreview-event-name">{event.name}</div>
          <div className="EmailPreview-date-wrapper">
            <div className="EmailPreview-date-top">
              {event.startDateTime.format('MMM')}{' '}
              {event.startDateTime.format('D')}{' '}
              {event.startDateTime.format('YYYY')}
            </div>
            <div className="EmailPreview-date-bot">
              {event.location.address}
            </div>
          </div>
          <div className="EmailPreview-text">{event.description}</div>
        </div>
      </Grid>
      <Grid item xs={6}>
        <span className="EventPreview-img-helper" />
        <Img
          className="EventPreview-img"
          alt={event.name}
          src={[event.imageUrl, backgroundImage]}
        />
      </Grid>
    </Grid>
  )
}

export default EmailPreview
