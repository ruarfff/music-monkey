import React from 'react'
import Button from '@material-ui/core/Button/Button'
import Input from '@material-ui/core/Input/Input'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'
import { object, ref, string } from 'yup'
import { Action } from 'mm-shared'
import ErrorNotification from 'util/ErrorNotification'
import LinkButton from 'util/LinkButton'
import './SignUp.scss'

interface ISignUpProps {
  isAuthenticating: boolean
  authError: any
  clearAuthError(): Action
  signUp(email: string, password: string): Action
}

interface ISignUpFormValues {
  email: string
  password: string
  repeatPassword: string
}

class SignUp extends React.Component<ISignUpProps, {}> {
  public render() {
    return (
      <div className="content-stepper-between login">
        <div className="content-scroll">
          <div className="Login">
            <div className="main-page-content-container">
              <div className="flex-block-center">
                <div className="login-header-container">
                  <div className="login-header-title">Sign Up</div>
                </div>
                <div className="main-page-content">
                  <Formik
                    initialValues={{
                      email: '',
                      password: '',
                      repeatPassword: ''
                    }}
                    validationSchema={object().shape({
                      email: string()
                        .required('Please enter your email address.')
                        .email('Please enter a valid email address.'),
                      password: string()
                        .min(8, 'Password must be at least 8 characters.')
                        .max(
                          256,
                          'Sorry! Password cannot be more than 256 characters.'
                        )
                        .required('Please enter a password.'),
                      repeatPassword: string()
                        .oneOf([ref('password'), null], 'Passwords must match')
                        .required('Please repeat password.')
                    })}
                    onSubmit={this.handleSubmit}
                    render={this.renderForm}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  private renderForm = ({
    isSubmitting,
    setSubmitting
  }: FormikProps<ISignUpFormValues>) => {
    const { authError } = this.props
    return (
      <Form>
        <div className="main-page-content sign-up">
          <div>
            <Field name="email" render={this.renderEmailInput} />
            <Field name="password" render={this.renderPasswordInput} />
            <Field name="repeatPassword" render={this.renderRepeatPassword} />
          </div>
          <div>
            {!this.props.isAuthenticating && (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            )}
          </div>
          <p>Already have an account?</p>
          <LinkButton variant="outlined" color="secondary" to="/login">
            Login
          </LinkButton>
        </div>
        {authError && authError.errorContext === 'signUp' && (
          <ErrorNotification
            message={
              (authError.response && authError.response.data) ||
              authError.message
            }
            onClose={this.handleErrorAcknowledged(setSubmitting)}
          />
        )}
      </Form>
    )
  }

  private renderEmailInput({ field, form }: FieldProps<ISignUpFormValues>) {
    const emailError: boolean = !!(form.touched.email && form.errors.email)
    return (
      <div className="login-input-container">
        <Input
          id="email-input"
          className="Auth-input"
          type="email"
          placeholder="Email"
          error={emailError}
          {...field}
        />
      </div>
    )
  }

  private renderRepeatPassword({ field, form }: FieldProps<ISignUpFormValues>) {
    const repeatPasswordError = !!(
      form.touched.repeatPassword && form.errors.repeatPassword
    )
    return (
      <div className="login-input-container">
        <Input
          id="repeat-password-input"
          className="Auth-input"
          type={'password'}
          placeholder="Password"
          error={repeatPasswordError}
          {...field}
        />
      </div>
    )
  }

  private renderPasswordInput = ({
    field,
    form
  }: FieldProps<ISignUpFormValues>) => {
    const passwordError = !!(form.touched.password && form.errors.password)
    return (
      <div className="login-input-container">
        <Input
          id="password-input"
          className="Auth-input"
          type={'password'}
          placeholder="Password"
          error={passwordError}
          {...field}
        />
      </div>
    )
  }

  private handleSubmit = (values: ISignUpFormValues) => {
    const { signUp } = this.props
    signUp(values.email, values.password)
  }

  private handleErrorAcknowledged = (setSubmitting: any) => {
    return () => {
      this.props.clearAuthError()
      setSubmitting(false)
    }
  }
}

export default SignUp
