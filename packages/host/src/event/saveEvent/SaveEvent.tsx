import React, { useState } from 'react'
import { Formik, FormikProps, Form } from 'formik'
import * as Yup from 'yup'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Zoom from '@material-ui/core/Zoom'
import EventInitialize from './EventInitialize'
import SeedPlaylist from './SeedPlaylistContainer'
import AddTracks from './AddTracks'
import EventDetails from './EventDetails'
import Summary from './Summary'
import './SaveEvent.scss'

interface SaveEventFormValues {
  eventName: string
  eventDescription: string
}

const ValidationSchema = Yup.object().shape({
  eventName: Yup.string().required('Event name is required'),
  eventDescription: Yup.string().required('Event description is required')
})

const steps = [
  'Setup Event',
  'Playlist',
  'Add Tracks',
  'Event Details',
  'Summary'
]

const SaveEvent = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set<number>())

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <Formik
      initialValues={{ eventName: '', eventDescription: '' }}
      validationSchema={ValidationSchema}
      onSubmit={(values: SaveEventFormValues, actions) => {
        console.log({ values, actions })
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }}
      render={(formikBag: FormikProps<SaveEventFormValues>) => (
        <div className="SaveEvent-root">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {}
              if (isStepSkipped(index)) {
                stepProps.completed = false
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          <Form className="SaveEvent-form">
            {activeStep === 0 && (
              <Zoom in={activeStep === 0} timeout={1000}>
                <EventInitialize handleNext={handleNext} />
              </Zoom>
            )}
            {activeStep === 1 && (
              <Zoom in={activeStep === 1} timeout={1000}>
                <SeedPlaylist
                  handleNext={handleNext}
                  handleBack={handleBack}
                  onPlaylistSelected={() => {}}
                />
              </Zoom>
            )}
            {activeStep === 2 && (
              <Zoom in={activeStep === 2} timeout={1000}>
                <AddTracks handleNext={handleNext} handleBack={handleBack} />
              </Zoom>
            )}
            {activeStep === 3 && (
              <Zoom in={activeStep === 3} timeout={1000}>
                <EventDetails handleNext={handleNext} handleBack={handleBack} />
              </Zoom>
            )}
            {activeStep === 4 && (
              <Zoom in={activeStep === 4} timeout={1000}>
                <Summary handleNext={handleNext} handleBack={handleBack} />
              </Zoom>
            )}
          </Form>
        </div>
      )}
    />
  )
}

export default SaveEvent
