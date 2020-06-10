import React, { FC } from 'react'
import { Formik, FormikHelpers, useFormikContext, Form } from 'formik'
import debounce from 'just-debounce-it'
import SaveEventFormValues from './SaveEventFormValues'
import { User, Event, useSnackbarAlert } from 'mm-shared'
import EventDetails from './EventDetails'
import eventWillBeModified from './eventWillBeModified'
import updateEventFlow from './updateEventFlow'
import FormValidationSchema from './FormValidationSchema'
import saveEventInitialFormValues from './saveEventInitialFormValues'

import './EditEventView.scss'

interface EditEventViewProps {
  user: User
  event: Event
}

const EditEventView: FC<EditEventViewProps> = ({ user, event }) => {
  const { showSuccess, showError } = useSnackbarAlert()

  const handleSubmit = (
    values: SaveEventFormValues,
    { setSubmitting }: FormikHelpers<SaveEventFormValues>
  ) => {
    return new Promise((resolve) => {
      if (eventWillBeModified(event, values)) {
        updateEventFlow(event, values)
          .then((event) => {
            showSuccess('Event Saved')
          })
          .catch((err) => {
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
      <Formik
        enableReinitialize
        initialValues={saveEventInitialFormValues(user, event)}
        validationSchema={FormValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="EditEventView-form">
            <AutoSave debounceMs={1500} />
            <EventDetails showDetails={true} />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditEventView
