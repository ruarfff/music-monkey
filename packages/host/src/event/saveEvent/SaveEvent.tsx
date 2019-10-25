import React, { useState } from 'react'
import { Formik, FormikProps, Form } from 'formik'
import * as Yup from 'yup'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import { Hidden, Grid, FormGroup, Button } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import IPlaylist from 'playlist/IPlaylist'
import EventInitialize from './EventInitialize'
import SeedPlaylist from './SeedPlaylistContainer'
import AddTracks from './AddTracks'
import EventDetails from './EventDetails'
import Summary from './Summary'
import ITrack from 'track/ITrack'
import LinkButton from 'components/LinkButton'
import IEventSettings from 'event/IEventSettings'
import ILocation from 'location/ILocation'
import './SaveEvent.scss'

export interface SaveEventFormValues {
  eventName: string
  eventDescription: string
  organizer: string
  tracks: ITrack[]
  imageUrl: string
  genre: string
  location: ILocation
  settings: IEventSettings
  startDateTime: Date
  endDateTime: Date
}

interface SaveEventProps extends RouteComponentProps {
  isDesktop: boolean
}

const ValidationSchema = Yup.object().shape({
  eventName: Yup.string().required('Event name is required'),
  eventDescription: Yup.string().required('Event description is required'),
  organizer: Yup.string().required('Event organizer is required'),
  tracks: Yup.array(),
  imageUrl: Yup.string(),
  genre: Yup.string(),
  location: Yup.object(),
  settings: Yup.object(),
  startDateTime: Yup.date(),
  endDateTime: Yup.date()
})

const steps = [
  'Setup Event',
  'Playlist',
  'Add Tracks',
  'Event Details',
  'Summary'
]

const SaveEvent = ({ isDesktop, location }: SaveEventProps) => {
  const [seedPlaylist, setSeedPlaylist] = useState()
  const [seedTracks, setSeedTracks] = useState()
  const path = '/create-event'
  const pathToStep = {
    [path]: 0,
    [path + '/playlist']: 1,
    [path + '/tracks']: 2,
    [path + '/details']: 3,
    [path + '/summary']: 4
  }
  const activeStep = pathToStep[location.pathname] || 0

  return (
    <Formik
      initialValues={{
        eventName: '',
        eventDescription: '',
        organizer: '',
        tracks: [] as ITrack[],
        imageUrl: '',
        genre: 'none',
        location: { address: 'Nowhere', latLng: { lat: 0, lng: 0 } },
        settings: {
          dynamicVotingEnabled: false,
          autoAcceptSuggestionsEnabled: false,
          suggestingPlaylistsEnabled: false
        },
        startDateTime: new Date(),
        endDateTime: new Date()
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values: SaveEventFormValues, actions) => {
        console.log({ values, actions })
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }}
      render={({ isSubmitting, errors }: FormikProps<SaveEventFormValues>) => (
        <div className="SaveEvent-root">
          <Hidden smDown implementation="css">
            <Stepper activeStep={activeStep}>
              {steps.map(label => {
                const stepProps: { completed?: boolean } = {}
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          </Hidden>
          <Form className="SaveEvent-form">
            <Switch>
              <Route path={path} exact={true}>
                <EventInitialize nextPath={path + '/playlist'} />
              </Route>
              <Route path={path + '/playlist'} exact={true}>
                <SeedPlaylist
                  nextPath={path + '/tracks'}
                  backPath={path}
                  seedPlaylist={seedPlaylist}
                  onPlaylistSelected={(playlist: IPlaylist) => {
                    setSeedPlaylist(playlist)
                    if (!!playlist) {
                      setSeedTracks(
                        playlist.tracks.items.map(item => item.track)
                      )
                    } else {
                      setSeedTracks([])
                    }
                  }}
                />
              </Route>
              <Route path={path + '/tracks'} exact={true}>
                <AddTracks
                  isDesktop={isDesktop}
                  nextPath={path + '/details'}
                  backPath={path + '/playlist'}
                  seedTracks={seedTracks}
                  setSeedTracks={setSeedTracks}
                />
              </Route>
              <Route path={path + '/details'} exact={true}>
                <Grid container>
                  <EventDetails />
                  <Grid item xs={12}>
                    <p>{errors.eventName}</p>
                    <p>{errors.eventDescription}</p>
                    <p>{errors.organizer}</p>
                    <p>{errors.tracks}</p>
                    <p>{errors.genre}</p>
                    <p>{errors.imageUrl}</p>
                    <p>{errors.location}</p>
                    <p>{errors.settings}</p>
                    <p>{errors.endDateTime}</p>
                    <p>{errors.startDateTime}</p>
                    <FormGroup className="SaveEvent-form-actions">
                      <LinkButton
                        to={path + '/tracks'}
                        variant="contained"
                        color="secondary"
                      >
                        Back
                      </LinkButton>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Create Event
                      </Button>
                    </FormGroup>
                  </Grid>
                </Grid>
              </Route>
              <Route path={path + '/summary'} exact={true}>
                <Summary backPath={path + '/details'} />
              </Route>
            </Switch>
          </Form>
        </div>
      )}
    />
  )
}

export default SaveEvent
