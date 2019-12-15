import React, { useEffect, useState } from 'react'
import { Formik, FormikHelpers, useFormikContext, Form } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import { AppBar, Tabs, Tab, ButtonGroup, Button } from '@material-ui/core'
import debounce from 'just-debounce-it'
import { useSnackbarAlert } from 'notification/alert'
import IUser from 'user/IUser'
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
import AddTracks from './AddTracksContainer'
import eventWillBeModified from './eventWillBeModified'
import updateEventFlow from './updateEventFlow'
import LinkButton from 'components/LinkButton'

import './SaveEvent.scss'

interface SaveEventProps extends RouteComponentProps {
  user: IUser
  deleteEvent(eventId: string): IAction
}

const SaveEvent = ({ user, deleteEvent, match, history }: SaveEventProps) => {
  const [eventToEdit, setEventToEdit] = useState<IEvent>()
  const [tabIndex, setTabIndex] = useState(0)
  const { showSuccess, showError } = useSnackbarAlert()
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

  const handleSubmit = (
    values: SaveEventFormValues,
    { setSubmitting }: FormikHelpers<SaveEventFormValues>
  ) => {
    return new Promise(resolve =>
      setTimeout(() => {
        if (eventWillBeModified(eventToEdit!, values)) {
          console.log('submit called')
          updateEventFlow(eventToEdit!, values)
            .then(event => {
              setEventToEdit(event)
              showSuccess('Event Saved')
              console.log('Success')
            })
            .catch(err => {
              showError('Could not save event')
              console.error(err)
            })
            .finally(() => {
              console.log('done')
              setSubmitting(false)
              resolve()
            })
        } else {
          console.log('no modification')
          setSubmitting(false)
        }
      }, 1000)
    )
  }

  function a11yProps(index: any) {
    return {
      id: `save-event-tab-${index}`,
      'aria-controls': `save-event-tabpanel-${index}`
    }
  }

  const AutoSave = ({ debounceMs }: { debounceMs: number }) => {
    const formik = useFormikContext()
    const debouncedSubmit = React.useCallback(
      debounce(() => {
        console.log('deb')
        if (!formik.isSubmitting && !!eventToEdit) {
          console.log('! sub deb')
          formik.submitForm()
        }
      }, debounceMs),
      [debounceMs, formik.submitForm]
    )

    React.useEffect(() => {
      debouncedSubmit()
    }, [debouncedSubmit, formik.values])

    return <></>
  }

  return (
    <Formik
      enableReinitialize
      initialValues={saveEventInitialFormValues(user, eventToEdit!)}
      validationSchema={FormValidationSchema}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form className="SaveEvent-root">
            <AutoSave debounceMs={1000} />
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

            <ButtonGroup
              fullWidth
              aria-label="event edit actions"
              className="SaveEvent-actions"
            >
              <LinkButton
                to={`/events/${!!eventToEdit ? eventToEdit!.eventId : ''}`}
              >
                Go to event
              </LinkButton>
              <Button
                onClick={() => {
                  deleteEvent(eventIdFromPath)
                  history.push('/')
                }}
              >
                Delete
              </Button>
            </ButtonGroup>

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
          </Form>
        )
      }}
    </Formik>
  )
}

export default SaveEvent
