import React, { useEffect, useState } from 'react'
import { Formik, FormikProps, FormikHelpers } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import {
  AppBar,
  Tabs,
  Tab,
  Slide,
  ButtonGroup,
  Button,
  Icon
} from '@material-ui/core'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import isEmpty from 'lodash/isEmpty'
import isUndefined from 'lodash/isUndefined'
import IUser from 'user/IUser'
import LoadingSpinner from 'loading/LoadingSpinner'
import { getEventById } from 'event/eventClient'
import IEvent from 'event/IEvent'
import EventInitialize from './EventInitialize'
import EventDetails from './EventDetails'
import Summary from './Summary'
import SaveEventFormValues from './SaveEventFormValues'
import saveEventFlow from './mockSaveEvent'
import FormValidationSchema from './FormValidationSchema'
import TabPanel from './TabPanel'
import getInitialFormValues from './getInitialFormValues'
import eventWillBeModified from './eventWillBeModified'

import './SaveEvent.scss'
import LinkButton from 'components/LinkButton'

interface SaveEventProps extends RouteComponentProps {
  user: IUser
}

const SaveEvent = ({ user, location, match }: SaveEventProps) => {
  const [savingEvent, setSavingEvent] = useState<IEvent>()
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
      const event = saveEventFlow(values)
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
      initialValues={getInitialFormValues(user, savingEvent!)}
      validationSchema={FormValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        submitForm,
        errors,
        status = {},
        values
      }: FormikProps<SaveEventFormValues>) => {
        const hasTracks = !isUndefined(values.tracks)
        const eventInitValid = !errors.eventName && hasTracks
        const shouldSave = eventWillBeModified(savingEvent!, values)
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
                <Tab label="1 Music" {...a11yProps(0)} />
                <Tab label="2 Details" {...a11yProps(1)} disabled={!hasEvent} />
                <Tab label="3 Share" {...a11yProps(2)} disabled={!hasEvent} />
              </Tabs>
            </AppBar>
            {isSubmitting && (
              <div className="SaveEvent-loading">
                <LoadingSpinner />
              </div>
            )}
            <Slide
              direction="right"
              in={!isEmpty(savingEvent) && !shouldSave}
              mountOnEnter
              unmountOnExit
            >
              <ButtonGroup
                fullWidth
                aria-label="event edit actions"
                className="SaveEvent-actions"
              >
                <LinkButton
                  to={`/events/${hasEvent ? savingEvent!.eventId : ''}`}
                  endIcon={<NavigateNextIcon />}
                >
                  Go to event
                </LinkButton>
              </ButtonGroup>
            </Slide>
            <Slide direction="right" in={shouldSave} mountOnEnter unmountOnExit>
              <ButtonGroup
                fullWidth
                aria-label="event edit actions"
                className="SaveEvent-actions"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  endIcon={<SaveAltIcon />}
                  onClick={submitForm}
                >
                  Save
                </Button>
              </ButtonGroup>
            </Slide>
            <Slide
              direction="right"
              in={eventInitValid && !hasEvent}
              mountOnEnter
              unmountOnExit
            >
              <ButtonGroup
                fullWidth
                aria-label="event edit actions"
                className="SaveEvent-actions"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  endIcon={<Icon>send</Icon>}
                  onClick={submitForm}
                >
                  Save & Continue
                </Button>
              </ButtonGroup>
            </Slide>

            {tabIndex === 0 && (
              <TabPanel value={tabIndex} index={0}>
                <EventInitialize
                  hasSavedEvent={hasEvent}
                  hasTracks={hasTracks}
                />
              </TabPanel>
            )}
            {tabIndex === 1 && (
              <TabPanel value={tabIndex} index={1}>
                <EventDetails />
              </TabPanel>
            )}
            {tabIndex === 2 && (
              <TabPanel value={tabIndex} index={2}>
                <Summary event={status.event} />
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
