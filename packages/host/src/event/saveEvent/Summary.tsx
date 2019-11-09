import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import { Field, FieldProps } from 'formik'
import IEvent from 'event/IEvent'
import ShareEventByEmail from './ShareEventByEmailContainer'
import IAction from 'IAction'
import ImageEditor from 'imageEdit/ImageEditor'
import { isEmpty } from 'lodash'

import './Summary.scss'

interface SummaryProps {
  event: IEvent
}

const Summary = ({ event }: SummaryProps) => {
  let initialImage: any

  return (
    <Grid container className="Summary-root">
      <Grid item xs={12} className="Event-image">
        <Typography variant="h6" align="center" gutterBottom>
          Event Image
        </Typography>
        <Field name="image">
          {({ field: { value }, form: { setFieldValue } }: FieldProps) => {
            if (isEmpty(initialImage)) {
              initialImage = { ...value }
            }
            return (
              <ImageEditor
                initialImage={initialImage}
                onImageChanged={image => {
                  console.log(image)
                  setFieldValue('image', image)
                }}
              />
            )
          }}
        </Field>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => {
            console.log(event)
            let nav: any = window.navigator
            if (nav && nav.share) {
              let invite = (event && event.invites && event.invites[0]) || ''
              const url = `https://guests.musicmonkey.io/invite/${invite}`

              nav
                .share({
                  title: event.name,
                  text: event.description,
                  url
                })
                .then(() => {
                  console.log('Thanks for sharing!')
                })
                .catch(console.error)
            } else {
              console.log('cannot share')
            }
          }}
        >
          Share
        </Button>
      </Grid>
      <ShareEventByEmail
        clearMessage={() => {
          console.log('Clear Message')
          return {} as IAction
        }}
        message="test message"
        withPreview={true}
        event={event}
        inviteId={event && event.invites ? event.invites[0] : ''}
        onCopyEventInvite={() => {
          console.log('event invite')
        }}
      />
    </Grid>
  )
}

export default Summary
