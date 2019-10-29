import React, { useState, useEffect } from 'react'
import { Formik, FormikProps, Form } from 'formik'
import * as Yup from 'yup'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import { Hidden, Grid, FormGroup, Button } from '@material-ui/core'
import MobileStepper from '@material-ui/core/MobileStepper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import moment from 'moment'
import isEmpty from 'lodash/isEmpty'
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
import IEvent from 'event/IEvent'
import IAction from 'IAction'
import LoadingSpinner from 'loading/LoadingSpinner'
import locationResolver from './locationResolver'
import './SaveEvent.scss'

export interface EventImage {
  name: string
  url: string
  data: any
}
interface SaveEventProps extends RouteComponentProps {
  user: IUser
  event: IEvent
  isDesktop: boolean
  getEventById(id: string): IAction
}

const ValidationSchema = Yup.object().shape({
  eventName: Yup.string().required('Event name is required'),
  eventDescription: Yup.string(),
  organizer: Yup.string().required('Event organizer is required'),
  tracks: Yup.array(),
  image: Yup.object(),
  genre: Yup.string(),
  location: Yup.object(),
  settings: Yup.object()
})

const steps = ['Setup Event', 'Playlist', 'Add Tracks', 'Event Details']

const SaveEvent = ({
  user,
  isDesktop,
  location,
  history,
  match,
  getEventById,
  event = {} as IEvent
}: SaveEventProps) => {
  const isEditing =
    location.pathname.startsWith('/events') &&
    location.pathname.includes('/edit')
  const [seedPlaylist, setSeedPlaylist] = useState()
  const [seedTracks, setSeedTracks] = useState()

  useEffect(() => {
    if (isEditing) {
      const eventIdFromPath = match.params['eventId']
      if (event.eventId !== eventIdFromPath) {
        getEventById(eventIdFromPath)
      }
    }
    // eslint-disable-next-line
  }, [event])

  let initialValues =
    isEditing && !!event
      ? {
          user,
          eventName: event.name,
          eventDescription: event.description,
          organizer: event.organizer,
          tracks: [] as ITrack[],
          image: { name: 'event.jpg', data: null, url: event.imageUrl },
          genre: event.genre,
          location: event.location,
          settings: event.settings,
          startDateTime: event.startDateTime,
          endDateTime: event.endDateTime
        }
      : {
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
          startDateTime: moment()
            .utc()
            .add(2, 'hours')
            .startOf('hour'),
          endDateTime: moment()
            .utc()
            .add(3, 'hours')
            .startOf('hour')
        }

  if (isEditing && isEmpty(event.eventId)) {
    return <LoadingSpinner />
  }

  const paths = isEditing ? locationResolver(event) : locationResolver()

  const pathToStep = {
    [paths[0]]: 0,
    [paths[1]]: 1,
    [paths[2]]: 2,
    [paths[3]]: 3
  }
  const activeStep = pathToStep[location.pathname] || 0

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={async (
        values: SaveEventFormValues,
        { setSubmitting, setStatus }
      ) => {
        setSubmitting(true)
        try {
          const event = await saveEventFlow(values, isEditing)
          setStatus({ formState: 'success', event })
          setSubmitting(false)
          history.push(`/events/${event.eventId}`)
        } catch (err) {
          console.error(err)
          setStatus({ formState: 'error' })
        }
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
              <Route path={paths[0]} exact={true}>
                <EventInitialize
                  nextPath={paths[1]}
                  formValid={!errors.eventName && !errors.eventDescription}
                />
              </Route>
              <Route path={paths[1]} exact={true}>
                <SeedPlaylist
                  nextPath={paths[2]}
                  backPath={paths[0]}
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
              <Route path={paths[2]} exact={true}>
                <AddTracks
                  isDesktop={isDesktop}
                  nextPath={paths[3]}
                  backPath={paths[1]}
                  seedTracks={seedTracks}
                  setSeedTracks={setSeedTracks}
                />
              </Route>
              <Route path={paths[3]} exact={true}>
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
                      <Hidden smDown implementation="js">
                        <LinkButton
                          to={paths[2]}
                          variant="contained"
                          color="secondary"
                        >
                          Back
                        </LinkButton>
                      </Hidden>
                      {isSubmitting ? (
                        <div className="SaveEvent-loading">
                          <LoadingSpinner />
                        </div>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isEditing ? 'Save Event' : 'Create Event'}
                        </Button>
                      )}
                    </FormGroup>
                  </Grid>
                </Grid>
              </Route>
              <Route path={paths[4]} exact={true}>
                <Summary
                  backPath={paths[3]}
                  status={status.formStatus}
                  event={status.event}
                />
              </Route>
            </Switch>
          </Form>
          <Hidden smUp implementation="css">
            <MobileStepper
              steps={steps.length}
              position="bottom"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <LinkButton
                  to={
                    activeStep < steps.length - 1
                      ? paths[activeStep + 1]
                      : paths[steps.length - 1]
                  }
                  size="small"
                  disabled={
                    activeStep === steps.length - 1 ||
                    (activeStep === 0 &&
                      !!errors.eventName &&
                      !!errors.eventDescription)
                  }
                >
                  Next
                  <KeyboardArrowRight />
                </LinkButton>
              }
              backButton={
                <LinkButton
                  to={activeStep > 0 ? paths[activeStep - 1] : paths[0]}
                  size="small"
                  disabled={activeStep === 0}
                >
                  <KeyboardArrowLeft />
                  Back
                </LinkButton>
              }
            />
          </Hidden>
        </div>
      )}
    />
  )
}

export default SaveEvent
