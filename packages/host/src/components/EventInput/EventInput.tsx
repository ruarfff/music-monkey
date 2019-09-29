import { WithStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField/TextField'
import * as React from 'react'
import { decorate } from 'globalStyles/Input'

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

class EventInput extends React.Component<IEventInputProps & WithStyles> {
  public state = {
    touched: false
  }

  public render() {
    const {
      classes,
      label,
      placeholder,
      maxRows,
      value,
      error,
      errorLabel,
      autoFocus
    } = this.props

    const { touched } = this.state

    return (
      <TextField
        onClick={this.handleClick}
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
        onChange={this.handleChange}
        className={classes.formControl}
        InputProps={
          maxRows
            ? { className: classes.textArea }
            : { className: classes.input }
        }
        InputLabelProps={{ className: classes.label }}
      />
    )
  }

  private handleChange = (event: any) => {
    this.props.onChange(event.target.value)
  }

  private handleClick = () => {
    this.setState({ touched: true })
  }
}

export default decorate(EventInput)
