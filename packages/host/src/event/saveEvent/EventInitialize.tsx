import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import IPlaylist from 'playlist/IPlaylist'
import EventTextInput from './EventTextInput'
import SeedPlaylist from './SeedPlaylistContainer'
import AddTracks from './AddTracksContainer'

import './EventInitialize.scss'

interface EventInitializeProps {
  hasTracks: boolean
}

const EventInitialize = ({ hasTracks }: EventInitializeProps) => {
  const [seedPlaylist, setSeedPlaylist] = useState<IPlaylist>()
  return (
    <Grid container className="EventInitialize-root">
      <Grid item xs={12}>
        <EventTextInput name="eventName" label="Name" autoFocus={true} />
      </Grid>
      <Grid item xs={12}>
        <EventTextInput
          name="eventDescription"
          multiline={true}
          label="Description"
        />
      </Grid>
      <Grid item xs={12} className="EventInitialize-playlist">
        {isEmpty(seedPlaylist) && !hasTracks ? (
          <SeedPlaylist onPlaylistSelected={setSeedPlaylist} />
        ) : (
          <AddTracks seedPlaylist={seedPlaylist} />
        )}
      </Grid>
    </Grid>
  )
}

export default EventInitialize
