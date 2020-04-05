import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { User } from 'user'
import { Event, EventTopMenu } from '..'
import Twitch from './Twitch'
import './TwitchView.scss'

interface TwitchViewProps extends RouteComponentProps<any> {
  isHost: boolean
  user: User
  event: Event
}

const TwitchView = ({ isHost, event }: TwitchViewProps) => {
  console.log(event.hostData)
  return (
    <div className="TwitchView-root">
      <EventTopMenu isHost={isHost} event={event} />
      <div className="TwitchView-content">
        {event.hostData && event.hostData.twitchId && <Twitch event={event} />}
      </div>
    </div>
  )
}

export default withRouter(TwitchView)
