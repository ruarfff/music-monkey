import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import './EventInput.scss'

interface IEventInputProps {
  value: string
  label?: string
  placeholder?: string
  maxRows?: number
  error?: boolean
  errorLabel?: string
  classes?: any
  autoFocus?: boolean
  onChange(value: string): void
}

const EventInput = ({
  label,
  placeholder,
  maxRows,
  value,
  error,
  errorLabel,
  autoFocus,
  onChange
}: IEventInputProps) => {
  const [touched, setTouched] = useState(false)

  const handleChange = (event: any) => {
    onChange(event.target.value)
  }

  const handleClick = () => {
    setTouched(true)
  }

  return (
    <TextField
      onClick={handleClick}
      label={error && touched ? errorLabel : label}
      placeholder={placeholder}
      required={true}
      autoFocus={autoFocus}
      fullWidth={true}
      rowsMax={maxRows}
      error={error && touched}
      margin="normal"
      multiline={!!maxRows}
      value={value}
      onChange={handleChange}
      className="EventInput-root"
      InputProps={
        maxRows
          ? { className: 'EventInput-text-area' }
          : { className: 'EventInput-input' }
      }
      InputLabelProps={{ className: 'EventInput-label' }}
    />
  )
}

export default EventInput
