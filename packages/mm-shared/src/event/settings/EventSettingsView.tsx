import React from 'react'
import { ChevronLeft } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { RouteComponentProps, withRouter } from 'react-router'
import { User } from 'user'
import { Event } from 'event'

interface EventSettingsViewProps extends RouteComponentProps<any> {
  isHost?: boolean
  user: User
  event: Event
}

const EventSettingsView = ({ history }: EventSettingsViewProps) => (
  <div>
    <div className="EventHeader-top-menu">
      <ChevronLeft
        className="EventHeader-back-arrow"
        onClick={() => {
          history.goBack()
        }}
      />
    </div>
    <h1>Settings</h1>
  </div>
)

export default withRouter(EventSettingsView)
