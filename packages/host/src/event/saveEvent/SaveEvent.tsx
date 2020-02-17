import React, { FC, useEffect, useState } from 'react'
import { Formik, FormikHelpers, useFormikContext, Form } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import { withRouter } from 'react-router'
import isEmpty from 'lodash/isEmpty'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import debounce from 'just-debounce-it'
import {
  Event,
  Action,
  TabPanel,
  User,
  useSnackbarAlert,
  MarvinLoader
} from 'mm-shared'
import EventDetails from './EventDetails'
import SaveEventFormValues from './SaveEventFormValues'
import FormValidationSchema from './FormValidationSchema'
import saveEventInitialFormValues from './saveEventInitialFormValues'
import AddTracks from './AddTracksContainer'
import eventWillBeModified from './eventWillBeModified'
import updateEventFlow from './updateEventFlow'
import ShareEvent from './ShareEvent'

import './SaveEvent.scss'

interface SaveEventProps extends RouteComponentProps {
  user: User
  event: Event
  getEventById(eventId: string): Action
}

const SaveEvent: FC<SaveEventProps> = ({
  user,
  event,
  getEventById,
  match
}) => {
  const { showSuccess, showError } = useSnackbarAlert()
  const eventIdFromPath = match.params['eventId']
  const [tabIndex, setTabIndex] = useState(0)
  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue)
  }

  const handleSubmit = (
    values: SaveEventFormValues,
    { setSubmitting }: FormikHelpers<SaveEventFormValues>
  ) => {
    return new Promise(resolve => {
      if (eventWillBeModified(event, values)) {
        updateEventFlow(event, values)
          .then(event => {
            getEventById(eventIdFromPath)
            showSuccess('Event Saved')
          })
          .catch(err => {
            showError('Could not save event')
            console.error(err)
          })
          .finally(() => {
            setSubmitting(false)
            resolve()
          })
      } else {
        setSubmitting(false)
        resolve()
      }
    })
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
        if (!formik.isSubmitting) {
          formik.submitForm()
        }
      }, debounceMs),
      [debounceMs, formik.submitForm]
    )

    useEffect(() => {
      debouncedSubmit()
    }, [debouncedSubmit, formik.values])

    return <></>
  }

  if (isEmpty(event)) {
    return <MarvinLoader />
  }

  return (
    <Formik
      enableReinitialize
      initialValues={saveEventInitialFormValues(user, event)}
      validationSchema={FormValidationSchema}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form className="SaveEvent-root">
            <AutoSave debounceMs={1500} />
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

            {tabIndex === 0 && (
              <TabPanel value={tabIndex} index={0}>
                <AddTracks playlist={event.playlist!} />
              </TabPanel>
            )}
            {tabIndex === 1 && (
              <TabPanel value={tabIndex} index={1}>
                <EventDetails />
              </TabPanel>
            )}
            {tabIndex === 2 && (
              <TabPanel value={tabIndex} index={2}>
                <ShareEvent event={event} />
              </TabPanel>
            )}
          </Form>
        )
      }}
    </Formik>
  )
}

export default withRouter(SaveEvent)
