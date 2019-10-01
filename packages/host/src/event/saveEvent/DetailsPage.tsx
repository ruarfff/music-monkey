import React from 'react'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'

const DetailsPage = () => {
  return (
    <div>
      <Field
        type="text"
        name="event-name"
        placeholder="Provide a name for your event"
        component={TextField}
        margin="normal"
        fullWidth
      />
    </div>
  )
}

export default DetailsPage
