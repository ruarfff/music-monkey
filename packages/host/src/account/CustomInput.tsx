import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import './CustomInput.scss'

interface ICustomInputProps {
  value: string
  label?: string
  placeholder?: string
  maxRows?: number
  error?: boolean
  errorLabel?: string
  onChange(value: string): void
}

class CustomInput extends React.Component<ICustomInputProps> {
  public state = {
    touched: false
  }

  public render() {
    const { label, placeholder, maxRows, value, error, errorLabel } = this.props

    const { touched } = this.state

    return (
      <TextField
        onClick={this.handleClick}
        label={error && touched ? errorLabel : label}
        placeholder={placeholder}
        required={true}
        autoFocus={true}
        fullWidth={true}
        rowsMax={maxRows}
        error={error && touched}
        margin="normal"
        multiline={!!maxRows}
        value={value}
        onChange={this.handleChange}
        className={'CustomInput-form-control'}
        InputProps={
          maxRows
            ? { className: 'CustomInput-text-area' }
            : { className: 'CustomInput-input' }
        }
        InputLabelProps={{ className: 'CustomInput-label' }}
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

export default CustomInput
