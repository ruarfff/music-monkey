import React, { FC } from 'react'
import { Formik, FormikHelpers, useFormikContext, Form } from 'formik'
import { RouteComponentProps, withRouter } from 'react-router'
import debounce from 'just-debounce-it'
import SaveEventFormValues from './SaveEventFormValues'
import { Action, User, Event, useSnackbarAlert, EventTopMenu } from 'mm-shared'
import EventDetails from './EventDetails'
import eventWillBeModified from './eventWillBeModified'
import updateEventFlow from './updateEventFlow'
import FormValidationSchema from './FormValidationSchema'
import saveEventInitialFormValues from './saveEventInitialFormValues'

import './EditEventView.scss'
interface EditEventViewProps extends RouteComponentProps {
  user: User
  event: Event
  getEventById(eventId: string): Action
}

const EditEventView: FC<EditEventViewProps> = ({
  user,
  event,
  getEventById,
  match
}) => {
  const { showSuccess, showError } = useSnackbarAlert()
  const eventIdFromPath = match.params['eventId']

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

    React.useEffect(() => {
      debouncedSubmit()
    }, [debouncedSubmit, formik.values])
    return <></>
  }

  return (
    <div className="EditEventView-root">
      <EventTopMenu event={event} />
      <Formik
        enableReinitialize
        initialValues={saveEventInitialFormValues(user, event)}
        validationSchema={FormValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form className="EditEventView-form">
              <AutoSave debounceMs={1500} />
              <EventDetails showDetails={true} />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default withRouter(EditEventView)
