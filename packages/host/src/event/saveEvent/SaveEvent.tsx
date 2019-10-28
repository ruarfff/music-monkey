import React, { useState } from 'react'
import { Formik, FormikProps, Form } from 'formik'
import * as Yup from 'yup'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import { Hidden, Grid, FormGroup, Button } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import IUser from 'user/IUser'
import IPlaylist from 'playlist/IPlaylist'
import EventInitialize from './EventInitialize'
import SeedPlaylist from './SeedPlaylistContainer'
import AddTracks from './AddTracks'
import EventDetails from './EventDetails'
import Summary from './Summary'
import ITrack from 'track/ITrack'
import LinkButton from 'components/LinkButton'
import backgroundImg from 'assets/partycover.jpg'
import SaveEventFormValues from './SaveEventFormValues'
import saveEventFlow from './saveEventFlow'
import './SaveEvent.scss'

export interface EventImage {
  name: string
  url: string
  data: any
}
interface SaveEventProps extends RouteComponentProps {
  user: IUser
  isDesktop: boolean
}

const ValidationSchema = Yup.object().shape({
  eventName: Yup.string().required('Event name is required'),
  eventDescription: Yup.string().required('Event description is required'),
  organizer: Yup.string().required('Event organizer is required'),
  tracks: Yup.array(),
  image: Yup.object(),
  genre: Yup.string(),
  location: Yup.object(),
  settings: Yup.object(),
  startDateTime: Yup.date().required('Please specify a start date'),
  endDateTime: Yup.date().required('Please specify an end date')
})

const steps = [
  'Setup Event',
  'Playlist',
  'Add Tracks',
  'Event Details',
  'Summary'
]

const SaveEvent = ({ user, isDesktop, location, history }: SaveEventProps) => {
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
        user,
        eventName: '',
        eventDescription: '',
        organizer: user.displayName,
        tracks: [] as ITrack[],
        image: { name: 'event.jpg', data: null, url: backgroundImg },
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
      onSubmit={async (
        values: SaveEventFormValues,
        { setSubmitting, setStatus }
      ) => {
        setSubmitting(true)
        try {
          const event = await saveEventFlow(values)
          setStatus({ formState: 'success', event })
        } catch (err) {
          console.error(err)
          setStatus({ formState: 'error' })
        }
        setSubmitting(false)
        history.push(path + '/summary')
      }}
      render={({
        isSubmitting,
        errors,
        status = {}
      }: FormikProps<SaveEventFormValues>) => (
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
                <EventInitialize
                  nextPath={path + '/playlist'}
                  formValid={!errors.eventName && !errors.eventDescription}
                />
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
                    <p>{errors.image}</p>
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
                <Summary
                  backPath={path + '/details'}
                  status={status.formStatus}
                  event={status.event}
                />
              </Route>
            </Switch>
          </Form>
        </div>
      )}
    />
  )
}

export default SaveEvent
