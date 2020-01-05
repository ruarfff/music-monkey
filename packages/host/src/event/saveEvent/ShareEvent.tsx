import React, { useState } from 'react'
import { Input, Button, LinearProgress, ButtonGroup } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { Field, FieldProps } from 'formik'
import CopyToClipboard from 'react-copy-to-clipboard'
import uploadImage from 'upload/uploadImage'
import { useSnackbarAlert } from 'notification/alert'
import { Event, LinkButton } from 'mm-shared'
import EmailPreview from './EmailPreview'

import './ShareEvent.scss'

interface IShareEventProps {
  event: Event
  inviteId: string
  shareByEmails(emails: string[], emailText: string, event: Event): void
}

const ShareEvent = ({ inviteId, event }: IShareEventProps) => {
  const [loading, setLoading] = useState(false)
  const { showError, showSuccess } = useSnackbarAlert()
  if (!event) {
    return null
  }
  const eventName = encodeURIComponent(event.name)
  //const eventDescription = encodeURIComponent(event.description)
  const inviteUrl = `https://guests.musicmonkey.io/invite/${inviteId}`

  return (
    <Grid item container xs={12} spacing={1}>
      <Grid item={true} xs={12}>
        <ButtonGroup
          fullWidth
          aria-label="event edit actions"
          className="SaveEvent-actions"
        >
          <LinkButton to={`/events/${event.eventId}`}>Go to event</LinkButton>
        </ButtonGroup>
      </Grid>
      <Grid item={true} xs={12}>
        <Field name="imageUrl">
          {({ form: { setFieldValue } }: FieldProps) => {
            const onFileDialog = async (e: any) => {
              const files: any[] = Array.from(e.target.files)

              if (files.length > 1) {
                const msg = 'Only 1 images can be uploaded at a time'
                showError(msg)
                return
              }

              const types = ['image/png', 'image/jpeg', 'image/gif']
              const file = files[0]

              if (types.every(type => file.type !== type)) {
                showError(`'${file.type}' is not a supported format`)
                return
              }

              setLoading(true)
              try {
                const uploadResponse = await uploadImage(file.name, file)
                setFieldValue('imageUrl', uploadResponse.imgUrl)
              } catch (err) {
                console.error(err)
                showError(`'Failed to upload image`)
              }
              setLoading(false)
            }

            return loading ? (
              <LinearProgress variant="query" color="secondary" />
            ) : (
              <Button
                variant="contained"
                component="label"
                color="secondary"
                fullWidth
              >
                Upload new image
                <Input
                  type="file"
                  onChange={onFileDialog}
                  style={{ display: 'none' }}
                />
              </Button>
            )
          }}
        </Field>
      </Grid>
      <Grid item={true} xs={12}>
        <EmailPreview event={event} />
      </Grid>
      <Grid item={true} xs={12}>
        <a
          className="resp-sharing-button__link"
          href={`https://www.facebook.com/sharer/sharer.php?u=${inviteUrl}&t="${eventName}"`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large">
            <div
              aria-hidden="true"
              className="resp-sharing-button__icon resp-sharing-button__icon--solid"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
              </svg>
            </div>
            Share on Facebook
          </div>
        </a>
      </Grid>
      <Grid item={true} xs={12}>
        <a
          className="resp-sharing-button__link"
          href={`https://twitter.com/intent/tweet/?text=${eventName}&amp;url=${inviteUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large">
            <div
              aria-hidden="true"
              className="resp-sharing-button__icon resp-sharing-button__icon--solid"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
              </svg>
            </div>
            Share on Twitter
          </div>
        </a>
      </Grid>
      <Grid item={true} xs={12}>
        <a
          className="resp-sharing-button__link"
          href={`mailto:?subject=You are invited to ${eventName}&body=Link to your invite: ${inviteUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share by E-Mail"
        >
          <div className="resp-sharing-button resp-sharing-button--email resp-sharing-button--large">
            <div
              aria-hidden="true"
              className="resp-sharing-button__icon resp-sharing-button__icon--solid"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z" />
              </svg>
            </div>
            Share by E-Mail
          </div>
        </a>
      </Grid>
      <Grid item={true} xs={12}>
        <CopyToClipboard text={inviteUrl} onCopy={() => showSuccess('Copied')}>
          <div className="resp-sharing-button__link">
            <div className="resp-sharing-button resp-sharing-button--email resp-sharing-button--large">
              <div
                aria-hidden="true"
                className="resp-sharing-button__icon resp-sharing-button__icon--solid"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 561 561">
                  <path
                    d="M395.25,0h-306c-28.05,0-51,22.95-51,51v357h51V51h306V0z M471.75,102h-280.5c-28.05,0-51,22.95-51,51v357
			c0,28.05,22.95,51,51,51h280.5c28.05,0,51-22.95,51-51V153C522.75,124.95,499.8,102,471.75,102z M471.75,510h-280.5V153h280.5V510
			z"
                  />
                </svg>
              </div>
              Copy Link
            </div>
          </div>
        </CopyToClipboard>
      </Grid>
    </Grid>
  )
}

export default ShareEvent
