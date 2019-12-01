import React from 'react'
import { Grid } from '@material-ui/core'
import { Field, FieldProps } from 'formik'
import IEvent from 'event/IEvent'
import ShareEvent from './ShareEventContainer'
import IAction from 'IAction'
import { isEmpty } from 'lodash'

import './Summary.scss'

interface SummaryProps {
  event: IEvent
}

const Summary = ({ event }: SummaryProps) => {
  let initialImage: any

  return (
    <Field name="image">
      {({ field: { value }, form: { setFieldValue } }: FieldProps) => {
        if (isEmpty(initialImage)) {
          initialImage = { url: event.imageUrl }
        }
        return (
          <Grid container className="Summary-root">
            <Grid item xs={12} className="Summary-image">
              {/* <ImageEditor
                initialImage={initialImage}
                onImageChanged={image => {
                  console.log(image)
                  setFieldValue('image', image)
                }}
              /> */}
            </Grid>
            <Grid item container xs={12}>
              <ShareEvent
                image={value.url}
                clearMessage={() => {
                  console.log('Clear Message')
                  return {} as IAction
                }}
                message="test message"
                event={event}
                inviteId={event && event.invites ? event.invites[0] : ''}
                onCopyEventInvite={() => {
                  console.log('event invite')
                }}
              />
            </Grid>
          </Grid>
        )
      }}
    </Field>
  )
}

export default Summary
