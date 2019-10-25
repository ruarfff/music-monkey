import React from 'react'
import { DateTimePicker } from '@material-ui/pickers'
import './EventDateTimePicker.scss'

interface IEventDateTimePickerProps {
  value: any
  label: string
  disablePast?: boolean
  onChange(value: any): void
}

const EventDateTimePicker: React.SFC<IEventDateTimePickerProps> = props => {
  const handleChange = (eventDate: any) => {
    props.onChange(eventDate)
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
