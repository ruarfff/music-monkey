import React from 'react'
import { DateTimePicker } from '@material-ui/pickers'
import './EventDateTimePicker.scss'

interface IEventDateTimePickerProps {
  value: any
  label: string
  disablePast?: boolean
  onChange(value: string): void
}

const EventDateTimePicker: React.SFC<IEventDateTimePickerProps> = props => {
  const handleChange = (event: any) => {
    props.onChange(event)
  }
  const { label, value, disablePast } = props

  return (
    <DateTimePicker
      label={label}
      fullWidth={true}
      disablePast={disablePast}
      value={value}
      onChange={handleChange}
    />
  )
}

export default EventDateTimePicker
