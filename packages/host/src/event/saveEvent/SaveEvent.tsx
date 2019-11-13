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
import saveEventFlow from './saveEventFlow'
import FormValidationSchema from './FormValidationSchema'
import TabPanel from './TabPanel'
import getInitialFormValues from './getInitialFormValues'
import eventWillBeModified from './eventWillBeModified'
import LinkButton from 'components/LinkButton'
import updateEventFlow from './updateEventFlow'
import EventInitializeDialog from './EventInitializeDialog'

import './SaveEvent.scss'

interface SaveEventProps extends RouteComponentProps {
  user: IUser
}

const SaveEvent = ({ user, location, match, history }: SaveEventProps) => {
  const [savingEvent, setSavingEvent] = useState<IEvent>()
  const [tabIndex, setTabIndex] = useState(0)
  const [openInitDialog, setOpenInitDialog] = useState(true)
  const hasEvent = !isEmpty(savingEvent)
  const isEditing =
    location.pathname.startsWith('/events') &&
    location.pathname.includes('/edit')
  const eventIdFromPath = match.params['eventId']

  useEffect(() => {
    const getEventIfEditing = async () => {
      if (isEditing) {
        const event = await getEventById(eventIdFromPath)
        setSavingEvent(event)
      }
    }
    getEventIfEditing()
    // eslint-disable-next-line
  }, [eventIdFromPath])

  if (isEditing && isEmpty(savingEvent)) {
    return <LoadingSpinner />
  }

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue)
  }

  const handleSubmit = async (
    values: SaveEventFormValues,
    { setSubmitting }: FormikHelpers<SaveEventFormValues>
  ) => {
    setSubmitting(true)
    try {
      let event: IEvent
      if (isEmpty(savingEvent)) {
        event = await saveEventFlow(values)
        setTabIndex(1)
      } else {
        event = await updateEventFlow(savingEvent!, values)
      }
      setSubmitting(false)
      setSavingEvent(event)
    } catch (err) {
      console.error(err)
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
      enableReinitialize
      initialValues={getInitialFormValues(user, savingEvent!)}
      validationSchema={FormValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        submitForm,
        errors,
        values
      }: FormikProps<SaveEventFormValues>) => {
        const hasTracks = !isUndefined(values.tracks)
        const eventInitValid = !errors.eventName && hasTracks
        const shouldSave = eventWillBeModified(savingEvent!, values)
        return (
          <div className="SaveEvent-root">
            <EventInitializeDialog
              open={openInitDialog}
              isValid={!errors.eventName}
              onCancel={() => {
                history.goBack()
              }}
              onContinue={() => {
                setOpenInitDialog(false)
              }}
            />
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
              in={!isEmpty(savingEvent) && !shouldSave && !isSubmitting}
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
            <Slide
              direction="right"
              in={shouldSave && !isSubmitting}
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
                  endIcon={<SaveAltIcon />}
                  onClick={submitForm}
                >
                  Save
                </Button>
              </ButtonGroup>
            </Slide>
            <Slide
              direction="right"
              in={eventInitValid && !hasEvent && !isSubmitting}
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
                <Summary event={savingEvent!} />
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
