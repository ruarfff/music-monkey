import React, { useEffect, useState } from 'react'
import { Formik, FormikProps, FormikHelpers } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import {
  FormGroup,
  Button,
  Typography,
  Box,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core'
import isEmpty from 'lodash/isEmpty'
import IUser from 'user/IUser'
import IEvent from 'event/IEvent'
import EventInitialize from './EventInitialize'
import EventDetails from './EventDetails'
import Summary from './Summary'
import SaveEventFormValues from './SaveEventFormValues'
import saveEventFlow from './saveEventFlow'
import IAction from 'IAction'
import LoadingSpinner from 'loading/LoadingSpinner'
import FormValidationSchema from './FormValidationSchema'
import getInitialFormValues from './getInitialFormValues'
import SwipeableViews from 'react-swipeable-views'

import './SaveEvent.scss'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`save-event-tabpanel-${index}`}
      aria-labelledby={`save-event--tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

interface SaveEventProps extends RouteComponentProps {
  user: IUser
  event: IEvent
  isDesktop: boolean
  getEventById(id: string): IAction
}

const SaveEvent = ({
  user,
  location,
  history,
  match,
  getEventById,
  event = {} as IEvent
}: SaveEventProps) => {
  const isEditing =
    location.pathname.startsWith('/events') &&
    location.pathname.includes('/edit')
  const eventIdFromPath = match.params['eventId']

  const [value, setValue] = useState(0)
  useEffect(() => {
    if (isEditing) {
      if (event.eventId !== eventIdFromPath) {
        getEventById(eventIdFromPath)
      }
    }
    // eslint-disable-next-line
  }, [event, eventIdFromPath])

  if (isEditing && isEmpty(event.eventId)) {
    return <LoadingSpinner />
  }

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  const handleSubmit = async (
    values: SaveEventFormValues,
    { setSubmitting, setStatus }: FormikHelpers<SaveEventFormValues>
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
  }

  function a11yProps(index: any) {
    return {
      id: `save-event-tab-${index}`,
      'aria-controls': `save-event-tabpanel-${index}`
    }
  }

  const Nav = () => (
    <AppBar position="static" color="default">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="save event"
      >
        <Tab label="Playlist" {...a11yProps(0)} />
        <Tab label="Details" {...a11yProps(1)} />
        <Tab label="Invite" {...a11yProps(2)} />
      </Tabs>
    </AppBar>
  )

  return (
    <Formik
      initialValues={getInitialFormValues(user, event, isEditing)}
      validationSchema={FormValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        errors,
        status = {}
      }: FormikProps<SaveEventFormValues>) => (
        <div className="SaveEvent-root">
          <Nav />
          <SwipeableViews
            axis={'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={'ltr'}>
              <EventInitialize />
            </TabPanel>
            <TabPanel value={value} index={1} dir={'ltr'}>
              <EventDetails />
              <p>{errors.eventName}</p>
              <p>{errors.eventDescription}</p>
              <p>{errors.organizer}</p>
              <p>{errors.tracks}</p>
              <p>{errors.genre}</p>
              <p>{errors.image}</p>
              <p>{errors.location}</p>
              <p>{errors.settings}</p>
              <FormGroup className="SaveEvent-form-actions">
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
            </TabPanel>
            <TabPanel value={value} index={2} dir={'ltr'}>
              <Summary status={status.formStatus} event={status.event} />
            </TabPanel>
          </SwipeableViews>
        </div>
      )}
    </Formik>
  )
}

export default SaveEvent
