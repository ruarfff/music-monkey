import React, { useState } from 'react'
import { Formik, FormikProps, FormikHelpers, Field, FieldProps } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import * as Yup from 'yup'
import createEventFlow from './createEventFlow'
import EventInitializeDialog from './EventInitializeDialog'
import CreateEventFormValues from './CreateEventFormValues'
import SeedPlaylist from './SeedPlaylistContainer'
import { User, Playlist, Action, useSnackbarAlert } from 'mm-shared'

import './CreateEvent.scss'

interface CreateEventProps extends RouteComponentProps {
  user: User
  getEvents(): Action
}

const CreateEvent = ({ user, history, getEvents }: CreateEventProps) => {
  const [openInitDialog, setOpenInitDialog] = useState(true)
  const { showSuccess, showError } = useSnackbarAlert()

  const handleSubmit = async (
    values: CreateEventFormValues,
    { setSubmitting }: FormikHelpers<CreateEventFormValues>
  ) => {
    try {
      const event = await createEventFlow(values)
      getEvents()
      setSubmitting(false)
      history.push('/events/' + event.eventId + '/save')
    } catch (err) {
      showError('Could not create event')
      console.error(err)
    }
  }

  return (
    <Formik
      initialValues={{
        user,
        eventName: '',
        eventDescription: ''
      }}
      validationSchema={Yup.object().shape({
        eventName: Yup.string().required('Event name is required'),
        eventDescription: Yup.string()
      })}
      onSubmit={handleSubmit}
    >
      {({
        submitForm,
        errors,
        isSubmitting
      }: FormikProps<CreateEventFormValues>) => {
        return (
          <div className="CreateEvent-root">
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

            <Field name="tracks">
              {({ form: { setFieldValue } }: FieldProps) => {
                return (
                  <SeedPlaylist
                    onPlaylistSelected={(playlist: Playlist) => {
                      setFieldValue(
                        'tracks',
                        playlist.tracks.items.map((item) => item.track)
                      )
                      submitForm()
                      showSuccess('Event Saved')
                    }}
                  />
                )
              }}
            </Field>
          </div>
        )
      }}
    </Formik>
  )
}

export default CreateEvent
