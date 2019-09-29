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
  const { value, disablePast } = props

  return (
    <DateTimePicker
      fullWidth={true}
      disablePast={disablePast}
      value={value}
      onChange={handleChange}
      className="EventDateTimePicker-root"
      InputProps={{ className: 'EventDateTimePicker-input' }}
      InputLabelProps={{ className: 'EventDateTimePicker-label' }}
    />
  )
}

export default EventDateTimePicker
