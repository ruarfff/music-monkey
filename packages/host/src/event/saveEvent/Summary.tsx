import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Field, FieldProps } from 'formik'
import IEvent from 'event/IEvent'
import ShareEvent from './ShareEventContainer'
import IAction from 'IAction'
import ImageEditor from 'imageEdit/ImageEditor'
import { isEmpty } from 'lodash'

import './Summary.scss'

interface SummaryProps {
  event: IEvent
}

const Summary = ({ event }: SummaryProps) => {
  const [imageUrl, setImageUrl] = useState()
  const [imageTouched, setImageTouched] = useState(false)
  let initialImage: any

  return (
    <Field name="image">
      {({ field: { value }, form: { setFieldValue } }: FieldProps) => {
        if (isEmpty(initialImage)) {
          initialImage = { ...value }
          setImageUrl(initialImage.url)
        }
        return (
          <Grid container className="Summary-root">
            <Grid item xs={12} className="Summary-image">
              <Typography variant="h6" align="center" gutterBottom>
                Event Image
              </Typography>

              <ImageEditor
                initialImage={initialImage}
                onImageChanged={image => {
                  if (imageTouched) {
                    setFieldValue('image', image)
                  }
                  setImageUrl(image.url)
                }}
                onTouched={() => {
                  if (!imageTouched) setImageTouched(true)
                }}
              />
            </Grid>
            <Grid item container xs={12}>
              <ShareEvent
                image={imageUrl}
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
