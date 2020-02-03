import React from 'react'
import { Music } from 'mm-shared'
import EventSelect from 'event/select/EventSelectContainer'

const MusicView = () => {
  return (
    <div>
      <EventSelect />
      <Music />
    </div>
  )
}

export default MusicView
