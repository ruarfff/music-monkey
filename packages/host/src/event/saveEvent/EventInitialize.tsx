import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import IPlaylist from 'playlist/IPlaylist'
import EventTextInput from './EventTextInput'
import SeedPlaylist from './SeedPlaylistContainer'
import EventSettings from './EventSettings'
import AddTracks from './AddTracksContainer'

import './EventInitialize.scss'

interface EventInitializeProps {
  hasSavedEvent: boolean
  hasTracks: boolean
}

const EventInitialize = ({
  hasSavedEvent,
  hasTracks
}: EventInitializeProps) => {
  const [seedPlaylist, setSeedPlaylist] = useState<IPlaylist>()
  const noPlaylist = isEmpty(seedPlaylist) && !hasTracks

  return (
    <Grid container className="EventInitialize-root">
      <Grid item xs={12}>
        <EventTextInput
          name="eventName"
          label="Name"
          autoFocus={!hasSavedEvent}
        />
        <EventTextInput
          name="eventDescription"
          multiline={true}
          label="Description"
        />
      </Grid>
      <Grid item xs={12}>
        <EventSettings />
      </Grid>
      <Grid container item xs={12}>
        {noPlaylist ? (
          <SeedPlaylist onPlaylistSelected={setSeedPlaylist} />
        ) : (
          <AddTracks seedPlaylist={seedPlaylist} />
        )}
      </Grid>
    </Grid>
  )
}

export default EventInitialize
