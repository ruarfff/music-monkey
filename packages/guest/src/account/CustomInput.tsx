import { WithStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField/TextField'
import * as React from 'react'

export const decorate = withStyles(() => ({
  input: {
    fontSize: '24px',
    borderRadius: '4px',
    border: '1px solid #979797',
    paddingLeft: '16px',
    minHeight: '40px',
    '&:hover:not($disabled):before': {
      borderBottom: '1px solid #979797!important',
    },
    '&:before': {
      content: 'none',
    },
    '&:after': {
      content: 'none',
    }
  },
  label: {
    paddingLeft: '16px',
    '&:hover:not($disabled):before': {
      borderBottom: 'none!important',
    },
    paddingTop: '4px'
  },
  textArea: {
    borderRadius: '4px',
    border: '1px solid #979797',
    paddingLeft: '16px',
    minHeight: '240px',
    '&:hover:not($disabled):before': {
      borderBottom: '1px solid #979797!important',
    },
    '&:before': {
      content: 'none',
    },
    '&:after': {
      content: 'none',
    }
  },
  formControl: {
    margin: 0,
  },
  disabled: {

  }
}))

interface ICustomInputProps {
  value: string
  label?: string
  placeholder?: string
  maxRows?: number
  error?: boolean
  errorLabel?: string
  classes?: any
  onChange(value: string): void
}

class CustomInput extends React.Component<ICustomInputProps & WithStyles> {
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
      errorLabel
    } = this.props

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

export default decorate(CustomInput)
