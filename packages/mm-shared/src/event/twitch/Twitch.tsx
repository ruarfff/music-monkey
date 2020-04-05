import React, { useEffect } from 'react'
import { Event } from 'mm-shared'
import './Twitch.scss'

interface TwitchProps {
  event: Event
}

const Twitch = ({ event }: TwitchProps) => {
  console.log(event.hostData)
  useEffect(() => {
    new window.Twitch.Embed('twitch-embed', {
      width: 380,
      height: 480,
      channel: event.hostData.twitchId
    })
  }, [event.hostData.twitchId])
  return (
    <div className="Twitch-root">
      <div id="twitch-embed"></div>
    </div>
  )
}

export default Twitch
