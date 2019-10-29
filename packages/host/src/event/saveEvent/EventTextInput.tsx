import React from 'react'
import { Field, FieldProps } from 'formik'
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from '@material-ui/core'
import { InputProps } from '@material-ui/core/Input'

type InputType = 'email' | 'text'

interface EventTextInputProps {
  label: string
  name: string
  multiline?: boolean
  testid?: string
  type?: InputType
  autoFocus?: boolean
}

const EventTextInput = ({
  label,
  name,
  testid,
  autoFocus,
  multiline,
  type = 'text'
}: EventTextInputProps) => (
  <Field autoFocus name={name}>
    {({ field, form: { touched, errors } }: FieldProps) => {
      const inputProps: InputProps = {
        ...field,
        type
      }

      if (type === 'email') {
        inputProps.autoComplete = 'email'
      }

      const hasError = !!touched[field.name] && !!errors[field.name]
      return (
        <FormControl error={hasError} fullWidth>
          <InputLabel
            htmlFor={name + '-component'}
            data-testid={name + '-label'}
          >
            {label}
          </InputLabel>

          <Input
            id={name + '-component'}
            aria-describedby={name}
            autoFocus={autoFocus}
            multiline={multiline}
            inputProps={{ 'data-testid': testid }}
            {...inputProps}
          />

          {hasError && (
            <FormHelperText data-testid={testid + '-error'}>
              {errors[field.name]}
            </FormHelperText>
          )}
        </FormControl>
      )
    }}
  </Field>
)

export default EventTextInput
