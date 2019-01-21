import { WithStyles } from '@material-ui/core/styles'
import DateTimePicker from 'material-ui-pickers/DateTimePicker'
import * as React from 'react'
import { decorate, IInputClasses } from '../globalStyles/Input'

interface IEventDateTimePickerProps {
  value: any
  label: string
  disablePast?: boolean
  onChange(value: string): void
}

const EventDateTimePicker: React.SFC<
  IEventDateTimePickerProps & WithStyles<IInputClasses>
> = props => {
  const handleChange = (event: any) => {
    props.onChange(event)
  }
  const { value, disablePast, classes } = props

  return (
    <DateTimePicker
      fullWidth={true}
      disablePast={disablePast}
      autoOk={true}
      ampm={false}
      value={value}
      onChange={handleChange}
      InputProps={{ className: classes.input }}
      InputLabelProps={{ className: classes.label }}
    />
  )
}

export default decorate(EventDateTimePicker)
