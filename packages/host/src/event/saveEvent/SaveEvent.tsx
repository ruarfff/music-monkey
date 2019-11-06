import React, { useEffect, useState } from 'react'
import { Formik, FormikProps, FormikHelpers } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import {
  AppBar,
  Tabs,
  Tab,
  Fab,
  Slide,
  ButtonGroup,
  Button
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import isEmpty from 'lodash/isEmpty'
import isUndefined from 'lodash/isUndefined'
import IUser from 'user/IUser'
import LoadingSpinner from 'loading/LoadingSpinner'
import { getEventById } from 'event/eventClient'
import LinkButton from 'components/LinkButton'
import EventInitialize from './EventInitialize'
import EventDetails from './EventDetails'
import Summary from './Summary'
import SaveEventFormValues from './SaveEventFormValues'
import saveEventFlow from './saveEventFlow'
import FormValidationSchema from './FormValidationSchema'
import TabPanel from './TabPanel'
import getInitialFormValues from './getInitialFormValues'

import './SaveEvent.scss'

interface SaveEventProps extends RouteComponentProps {
  user: IUser
}

const SaveEvent = ({ user, location, match }: SaveEventProps) => {
  const [savingEvent, setSavingEvent] = useState()
  const hasEvent = !isEmpty(savingEvent)
  const isEditing =
    location.pathname.startsWith('/events') &&
    location.pathname.includes('/edit')
  const eventIdFromPath = match.params['eventId']
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    const getEventIfEditing = async () => {
      if (
        isEditing &&
        (!!savingEvent && savingEvent.eventId !== eventIdFromPath)
      ) {
        const event = await getEventById(eventIdFromPath)
        setSavingEvent(event)
      }
    }
    getEventIfEditing()
    // eslint-disable-next-line
  }, [event, eventIdFromPath])

  if (isEditing && isEmpty(savingEvent)) {
    return <LoadingSpinner />
  }

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue)
  }

  const handleSubmit = async (
    values: SaveEventFormValues,
    { setSubmitting, setStatus }: FormikHelpers<SaveEventFormValues>
  ) => {
    setSubmitting(true)
    try {
      const event = await saveEventFlow(values)
      setStatus({ formState: 'success', event })
      setSubmitting(false)
      setSavingEvent(event)
      setTabIndex(1)
    } catch (err) {
      console.error(err)
      setStatus({ formState: 'error' })
    }
  }

  function a11yProps(index: any) {
    return {
      id: `save-event-tab-${index}`,
      'aria-controls': `save-event-tabpanel-${index}`
    }
  }

  return (
    <Formik
      initialValues={getInitialFormValues(user, savingEvent, isEditing)}
      validationSchema={FormValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        submitForm,
        isValid,
        errors,
        status = {},
        values
      }: FormikProps<SaveEventFormValues>) => {
        const hasTracks = !isUndefined(values.tracks)
        const eventInitValid = !errors.eventName && hasTracks
        return (
          <div className="SaveEvent-root">
            <AppBar position="static" color="default">
              <Tabs
                value={tabIndex}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="save event"
              >
                <Tab label="Playlist" {...a11yProps(0)} />
                <Tab label="Details" {...a11yProps(1)} disabled={!hasEvent} />
                <Tab label="Invite" {...a11yProps(2)} disabled={!hasEvent} />
              </Tabs>
            </AppBar>
            {eventInitValid && hasEvent && (
              <ButtonGroup
                fullWidth
                aria-label="full width outlined button group"
              >
                <LinkButton
                  to={'/events/' + savingEvent.eventId}
                  color="secondary"
                >
                  Go to Event
                </LinkButton>
                {tabIndex !== 2 && <Button color="primary">Save</Button>}
              </ButtonGroup>
            )}
            {tabIndex === 0 && (
              <TabPanel value={tabIndex} index={0}>
                <EventInitialize hasTracks={hasTracks} />

                {isSubmitting ? (
                  <div className="SaveEvent-loading">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <Slide
                    direction="up"
                    in={eventInitValid && !hasEvent}
                    mountOnEnter
                    unmountOnExit
                  >
                    <Fab
                      size="large"
                      color="secondary"
                      variant="extended"
                      aria-label="Save and Continue"
                      className="SaveEvent-save-button"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      onClick={submitForm}
                    >
                      <AddIcon />
                      Save & Continue
                    </Fab>
                  </Slide>
                )}
              </TabPanel>
            )}
            {tabIndex === 1 && (
              <TabPanel value={tabIndex} index={1}>
                <EventDetails />
              </TabPanel>
            )}
            {tabIndex === 2 && (
              <TabPanel value={tabIndex} index={2}>
                <Summary status={status.formStatus} event={status.event} />
                <p>{errors.eventName}</p>
                <p>{errors.eventDescription}</p>
                <p>{errors.organizer}</p>
                <p>{errors.tracks}</p>
                <p>{errors.genre}</p>
                <p>{errors.image}</p>
                <p>{errors.location}</p>
                <p>{errors.settings}</p>
              </TabPanel>
            )}
          </div>
        )
      }}
    </Formik>
  )
}

export default SaveEvent
