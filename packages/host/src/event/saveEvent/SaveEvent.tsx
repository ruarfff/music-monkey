import React from 'react'
import * as Yup from 'yup'
import { withFormik, FormikProps, Form } from 'formik'
import { Switch, Route, Redirect } from 'react-router-dom'

import DetailsPage from './DetailsPage'
import PlaylistPage from './PlaylistPage'
import SummaryPage from './SummaryPage'

// Shape of form values
interface FormValues {
  email: string
  password: string
}

const SaveEventSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
})

const SaveEventForm = (props: FormikProps<FormValues>) => {
  return (
    <Form>
      <Switch>
        <Redirect from="/save-event" exact to="/save-event/details" />
        <Route path="/save-event/details" component={DetailsPage} />
        <Route path="/save-event/playlist" component={PlaylistPage} />
        <Route path="/save-event/summary" component={SummaryPage} />
      </Switch>
    </Form>
  )
}

interface SaveEventFormProps {
  initialEmail?: string
}

const SaveEvent = withFormik<SaveEventFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      email: props.initialEmail || '',
      password: ''
    }
  },

  validationSchema: SaveEventSchema,

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 1000)
  },

  displayName: 'SaveEvent'
})(SaveEventForm)

export default SaveEvent
