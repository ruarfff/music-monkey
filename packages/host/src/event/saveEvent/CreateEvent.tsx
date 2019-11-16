import React, { useState } from 'react'
import { Formik, FormikProps, FormikHelpers, Field, FieldProps } from 'formik'
import { RouteComponentProps } from 'react-router-dom'
import * as Yup from 'yup'
import IUser from 'user/IUser'
import createEventFlow from './createEventFlow'
import EventInitializeDialog from './EventInitializeDialog'
import EventSettingsDialog from './EventSettingsDialog'
import CreateEventFormValues from './CreateEventFormValues'
import SeedPlaylist from './SeedPlaylistContainer'
import IPlaylist from 'playlist/IPlaylist'
import LoadingSpinner from 'loading/LoadingSpinner'

import './CreateEvent.scss'

interface CreateEventProps extends RouteComponentProps {
  user: IUser
}

const CreateEvent = ({ user, location, match, history }: CreateEventProps) => {
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const [openInitDialog, setOpenInitDialog] = useState(true)

  const handleSubmit = async (
    values: CreateEventFormValues,
    { setSubmitting }: FormikHelpers<CreateEventFormValues>
  ) => {
    setSubmitting(true)
    try {
      const event = await createEventFlow(values)
      setSubmitting(false)
      history.push('/events/' + event.eventId + '/edit')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Formik
      initialValues={{
        user,
        eventName: '',
        eventDescription: '',
        settings: {
          dynamicVotingEnabled: true,
          autoAcceptSuggestionsEnabled: true,
          suggestingPlaylistsEnabled: true
        }
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
            {isSubmitting && (
              <div className="CreateEvent-loading">
                <LoadingSpinner />
              </div>
            )}
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
            <EventSettingsDialog
              open={settingsDialogOpen}
              handleClose={() => {
                setSettingsDialogOpen(false)
                submitForm()
              }}
            />
            <Field name="tracks">
              {({ form: { setFieldValue } }: FieldProps) => {
                return (
                  <SeedPlaylist
                    onPlaylistSelected={(playlist: IPlaylist) => {
                      setFieldValue(
                        'tracks',
                        playlist.tracks.items.map(item => item.track)
                      )
                      setSettingsDialogOpen(true)
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
