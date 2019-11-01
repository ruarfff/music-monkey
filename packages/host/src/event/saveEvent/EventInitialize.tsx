import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import IPlaylist from 'playlist/IPlaylist'
import EventTextInput from './EventTextInput'
import SeedPlaylist from './SeedPlaylistContainer'
import AddTracks from './AddTracks'

const EventInitialize = () => {
  const [seedPlaylist, setSeedPlaylist] = useState<IPlaylist>()

  console.log(seedPlaylist)
  return (
    <Grid container>
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
      <Grid item xs={12}>
        {isEmpty(seedPlaylist) ? (
          <SeedPlaylist onPlaylistSelected={setSeedPlaylist} />
        ) : (
          <AddTracks seedPlaylist={seedPlaylist} />
        )}
      </Grid>
    </Grid>
  )
}

export default EventInitialize
