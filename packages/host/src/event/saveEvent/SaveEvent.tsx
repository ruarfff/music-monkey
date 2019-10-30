import React, { useEffect } from 'react'
import { Formik, FormikProps, Form, FormikHelpers } from 'formik'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import { Hidden, Grid, FormGroup, Button } from '@material-ui/core'
import MobileStepper from '@material-ui/core/MobileStepper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import isEmpty from 'lodash/isEmpty'
import IUser from 'user/IUser'
import IEvent from 'event/IEvent'
import EventInitialize from './EventInitialize'
import EventDetails from './EventDetails'
import Summary from './Summary'
import LinkButton from 'components/LinkButton'
import SaveEventFormValues from './SaveEventFormValues'
import saveEventFlow from './saveEventFlow'
import IAction from 'IAction'
import LoadingSpinner from 'loading/LoadingSpinner'
import locationResolver from './locationResolver'
import FormValidationSchema from './FormValidationSchema'
import getInitialFormValues from './getInitialFormValues'

import './SaveEvent.scss'

interface SaveEventProps extends RouteComponentProps {
  user: IUser
  event: IEvent
  isDesktop: boolean
  getEventById(id: string): IAction
}

const steps = ['Setup Event', 'Playlist', 'Add Tracks']

const SaveEvent = ({
  user,
  isDesktop,
  location,
  history,
  match,
  getEventById,
  event = {} as IEvent
}: SaveEventProps) => {
  const isEditing =
    location.pathname.startsWith('/events') &&
    location.pathname.includes('/edit')
  const eventIdFromPath = match.params['eventId']

  useEffect(() => {
    if (isEditing) {
      if (event.eventId !== eventIdFromPath) {
        getEventById(eventIdFromPath)
      }
    }
    // eslint-disable-next-line
  }, [event, eventIdFromPath])

  if (isEditing && isEmpty(event.eventId)) {
    return <LoadingSpinner />
  }

  const paths = isEditing ? locationResolver(event) : locationResolver()

  const pathToStep = {
    [paths[0]]: 0,
    [paths[1]]: 1,
    [paths[2]]: 2
  }
  const activeStep = pathToStep[location.pathname] || 0

  const handleSubmit = async (
    values: SaveEventFormValues,
    { setSubmitting, setStatus }: FormikHelpers<SaveEventFormValues>
  ) => {
    setSubmitting(true)
    try {
      const event = await saveEventFlow(values, isEditing)
      setStatus({ formState: 'success', event })
      setSubmitting(false)
      history.push(`/events/${event.eventId}`)
    } catch (err) {
      console.error(err)
      setStatus({ formState: 'error' })
    }
  }

  const MobileNav = () => (
    <MobileStepper
      steps={steps.length}
      position="static"
      variant="dots"
      activeStep={activeStep}
      nextButton={
        <LinkButton
          to={
            activeStep < steps.length - 1
              ? paths[activeStep + 1]
              : paths[steps.length - 1]
          }
          size="small"
          disabled={activeStep === steps.length - 1}
        >
          Next
          <KeyboardArrowRight />
        </LinkButton>
      }
      backButton={
        <LinkButton
          to={activeStep > 0 ? paths[activeStep - 1] : paths[0]}
          size="small"
          disabled={activeStep === 0}
        >
          <KeyboardArrowLeft />
          Back
        </LinkButton>
      }
    />
  )

  const LargeScreenNav = () => (
    <Stepper activeStep={activeStep}>
      {steps.map(label => {
        const stepProps: { completed?: boolean } = {}
        return (
          <Step key={label} {...stepProps}>
            <StepLabel>{label}</StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )

  return (
    <Formik
      initialValues={getInitialFormValues(user, event, isEditing)}
      validationSchema={FormValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        errors,
        status = {}
      }: FormikProps<SaveEventFormValues>) => (
        <div className="SaveEvent-root">
          <Hidden smDown implementation="css">
            <LargeScreenNav />
          </Hidden>
          <Hidden smUp implementation="css">
            <MobileNav />
          </Hidden>
          <Form className="SaveEvent-form">
            <Switch>
              <Route path={paths[0]} exact={true}>
                <EventInitialize
                  nextPath={paths[1]}
                  formValid={!errors.eventName && !errors.eventDescription}
                />
              </Route>
              <Route path={paths[1]} exact={true}></Route>
              <Route path={paths[2]} exact={true}></Route>
              <Route path={paths[3]} exact={true}>
                <Grid container>
                  <EventDetails />
                  <Grid item xs={12}>
                    <p>{errors.eventName}</p>
                    <p>{errors.eventDescription}</p>
                    <p>{errors.organizer}</p>
                    <p>{errors.tracks}</p>
                    <p>{errors.genre}</p>
                    <p>{errors.image}</p>
                    <p>{errors.location}</p>
                    <p>{errors.settings}</p>
                    <FormGroup className="SaveEvent-form-actions">
                      <Hidden smDown implementation="js">
                        <LinkButton
                          to={paths[2]}
                          variant="contained"
                          color="secondary"
                        >
                          Back
                        </LinkButton>
                      </Hidden>
                      {isSubmitting ? (
                        <div className="SaveEvent-loading">
                          <LoadingSpinner />
                        </div>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isEditing ? 'Save Event' : 'Create Event'}
                        </Button>
                      )}
                    </FormGroup>
                  </Grid>
                </Grid>
              </Route>
              <Route path={paths[4]} exact={true}>
                <Summary
                  backPath={paths[3]}
                  status={status.formStatus}
                  event={status.event}
                />
              </Route>
            </Switch>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default SaveEvent
