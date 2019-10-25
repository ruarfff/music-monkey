import React, { useState } from 'react'
import { Hidden } from '@material-ui/core'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Field, FieldProps } from 'formik'
import remove from 'lodash/remove'
import isEmpty from 'lodash/isEmpty'
import differenceBy from 'lodash/differenceBy'
import LinkButton from 'components/LinkButton'
import ITrack from 'track/ITrack'
import SelectTracks from './SelectTracksContainer'
import Playlist from './Playlist'

interface AddTracksProps {
  isDesktop: boolean
  seedTracks: ITrack[]
  nextPath: string
  backPath: string
  setSeedTracks(seedTracks: ITrack[]): void
}

const AddTracks = ({
  isDesktop,
  seedTracks = [],
  setSeedTracks,
  nextPath,
  backPath
}: AddTracksProps) => {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = (_: any, index: number) => {
    setTabIndex(index)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormGroup className="SaveEvent-form-actions">
          <LinkButton to={backPath} variant="contained" color="secondary">
            Back
          </LinkButton>
          <LinkButton to={nextPath} variant="contained" color="primary">
            Next
          </LinkButton>
        </FormGroup>
      </Grid>
      <Hidden smUp>
        <Grid item xs={12}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Playlist" />
            <Tab label="Add Tracks" />
          </Tabs>
        </Grid>
      </Hidden>

      <Field name="tracks" value={seedTracks}>
        {({ field: { value }, form: { setFieldValue } }: FieldProps) => {
          if (!isEmpty(differenceBy(value, seedTracks, 'id'))) {
            setFieldValue('tracks', seedTracks)
          }
          return (
            <>
              {(isDesktop || tabIndex === 0) && (
                <Grid item xs={isDesktop ? 6 : 12}>
                  <Playlist
                    tracks={seedTracks}
                    onTrackOrderChanged={(tracks: ITrack[]) => {
                      setSeedTracks(tracks)
                    }}
                    onTrackRemoved={(track: ITrack) => {
                      setSeedTracks(
                        remove(seedTracks, seedTrack => {
                          return seedTrack.id !== track.id
                        })
                      )
                    }}
                  />
                </Grid>
              )}

              {(isDesktop || tabIndex === 1) && (
                <Grid item xs={isDesktop ? 6 : 12}>
                  <SelectTracks
                    onTrackSelected={(track: ITrack) => {
                      setSeedTracks([...seedTracks, track])
                    }}
                    filterList={seedTracks}
                  />
                </Grid>
              )}
            </>
          )
        }}
      </Field>
    </Grid>
  )
}

export default AddTracks
