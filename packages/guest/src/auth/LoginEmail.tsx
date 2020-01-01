import { Icon, Input } from '@material-ui/core'
import Button from '@material-ui/core/Button/Button'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'
import * as React from 'react'
import { object, string } from 'yup'
import { Action } from 'mm-shared'
import ErrorNotification from '../util/ErrorNotification'
import './LoginEmail.scss'

interface ILoginEmailProps {
  isAuthenticating: boolean
  authError: any
  clearAuthError(): Action
  loginWithPassword(email: string, password: string): Action
}

interface ILoginFormValues {
  email: string
  password: string
}

class LoginEmail extends React.Component<ILoginEmailProps, any> {
  public state = {
    showPassword: false
  }
  public render() {
    return (
      <div className="LoginEmail">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={object().shape({
            email: string().required('Please enter your email address.'),
            password: string().required('Please enter a password.')
          })}
          onSubmit={this.handleSubmit}
          render={this.renderForm}
        />
      </div>
    )
  }

  private renderForm = ({
    isSubmitting,
    setSubmitting
  }: FormikProps<ILoginFormValues>) => {
    const { authError } = this.props
    return (
      <Form>
        <div className="LoginEmail-inputs">
          <Field name="email" render={this.renderEmailInput} />
          <Field name="password" render={this.renderPasswordInput} />
        </div>
        <div>
          {!this.props.isAuthenticating && (
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              color="primary"
            >
              LOG IN
            </Button>
          )}
        </div>
        <div className="login-link-container">
          <a>Forgot your Password?</a>
          <a href="/signup">Not a user? Sign Up</a>
        </div>
        {authError &&
          authError.errorContext === 'login' && (
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

  private renderEmailInput({ field, form }: FieldProps<ILoginFormValues>) {
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

  private renderPasswordInput = ({
    field,
    form
  }: FieldProps<ILoginFormValues>) => {
    const passwordError = !!(form.touched.password && form.errors.password)
    return (
      <div className="login-input-container">
        <Input
          id="password-input"
          className="Auth-input"
          type={this.state.showPassword ? 'text' : 'password'}
          placeholder="Password"
          error={passwordError}
          {...field}
        />
        <Icon className="login-eye-icon" onClick={this.showPassword}>
          {' '}
          remove_red_eye
        </Icon>
      </div>
    )
  }

  private showPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  private handleSubmit = (values: ILoginFormValues) => {
    const { loginWithPassword } = this.props
    loginWithPassword(values.email, values.password)
  }

  private handleErrorAcknowledged = (setSubmitting: any) => {
    return () => {
      this.props.clearAuthError()
      setSubmitting(false)
    }
  }
}

export default LoginEmail
