import React from 'react'
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik'
import './CreateEvent.scss'

interface CreateEventFormValues {
  eventName: string
}

const CreateEvent = () => {
  return (
    <Formik
      initialValues={{ eventName: '' }}
      onSubmit={(values: CreateEventFormValues, actions) => {
        console.log({ values, actions })
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }}
      render={(formikBag: FormikProps<CreateEventFormValues>) => (
        <Form>
          <Field
            name="firstName"
            render={({ field, form }: FieldProps) => (
              <div>
                <input type="text" {...field} placeholder="Event Name" />
                {form.touched.eventName &&
                  form.errors.eventName &&
                  form.errors.eventName}
              </div>
            )}
          />
        </Form>
      )}
    />
  )
}

export default CreateEvent
