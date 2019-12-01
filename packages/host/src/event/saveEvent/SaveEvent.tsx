import React, { useEffect, useState } from 'react'
import { Formik, FormikProps, FormikHelpers } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import IUser from 'user/IUser'
import LoadingSpinner from 'loading/LoadingSpinner'
import { getEventById } from 'event/eventClient'
import IEvent from 'event/IEvent'
import IAction from 'IAction'
import IPlaylist from 'playlist/IPlaylist'
import EventDetails from './EventDetails'
import Summary from './Summary'
import SaveEventFormValues from './SaveEventFormValues'
import FormValidationSchema from './FormValidationSchema'
import TabPanel from './TabPanel'
import saveEventInitialFormValues from './saveEventInitialFormValues'
import eventWillBeModified from './eventWillBeModified'
import updateEventFlow from './updateEventFlow'
import AddTracks from './AddTracksContainer'

import './SaveEvent.scss'

interface SaveEventProps extends RouteComponentProps {
  user: IUser
  deleteEvent(eventId: string): IAction
}

const SaveEvent = ({ user, deleteEvent, match, history }: SaveEventProps) => {
  const [eventToEdit, setEventToEdit] = useState<IEvent>()
  const [tabIndex, setTabIndex] = useState(0)
  const eventIdFromPath = match.params['eventId']

  useEffect(() => {
    const getEventIfEditing = async () => {
      const event = await getEventById(eventIdFromPath)
      setEventToEdit(event)
    }
    getEventIfEditing()
    // eslint-disable-next-line
  }, [eventIdFromPath])

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue)
  }

  const handleSubmit = async (
    values: SaveEventFormValues,
    { setSubmitting }: FormikHelpers<SaveEventFormValues>
  ) => {
    try {
      if (eventWillBeModified(eventToEdit!, values)) {
        setSubmitting(true)
        const event = await updateEventFlow(eventToEdit!, values)
        setEventToEdit(event)
        setSubmitting(false)
      }
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
      initialValues={saveEventInitialFormValues(user, eventToEdit!)}
      validationSchema={FormValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }: FormikProps<SaveEventFormValues>) => {
        return (
          <div className="SaveEvent-root">
            <AppBar position="static" color="default">
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="save event"
              >
                <Tab label="1 Music" {...a11yProps(0)} />
                <Tab label="2 Details" {...a11yProps(1)} />
                <Tab label="3 Share" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            {isSubmitting && (
              <div className="SaveEvent-loading">
                <LoadingSpinner />
              </div>
            )}
            {/* <ButtonGroup
              fullWidth
              aria-label="event edit actions"
              className="SaveEvent-actions"
            >
              <LinkButton
                to={`/events/${hasEvent ? eventToEdit!.eventId : ''}`}
                endIcon={<NavigateNextIcon />}
              >
                Go to event
              </LinkButton>
              <Button
                onClick={() => {
                  deleteEvent(eventIdFromPath)
                  history.push('/catalogue/all-events')
                }}
              >
                Delete
              </Button>
            </ButtonGroup> */}

            {tabIndex === 0 && (
              <TabPanel value={tabIndex} index={0}>
                <AddTracks
                  playlist={
                    !!eventToEdit ? eventToEdit.playlist! : ({} as IPlaylist)
                  }
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
                <Summary event={eventToEdit!} />
              </TabPanel>
            )}
          </div>
        )
      }}
    </Formik>
  )
}

export default SaveEvent
