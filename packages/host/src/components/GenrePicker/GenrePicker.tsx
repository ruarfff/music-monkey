import * as React from 'react'
import Select from 'react-select'
import options from './genres'
import './GenrePicker.scss'

interface IGenrePickerProps {
  value?: string
  onChange(value: string): void
}

const customStyles = {
  control: () => ({
    border: '1px solid #979797',
    display: 'flex',
    borderRadius: '4px',
    height: '40px'
  })
}

class GenrePicker extends React.PureComponent<IGenrePickerProps> {
  public state = {
    selectedOption: null
  }

  public componentWillReceiveProps(newProps: IGenrePickerProps) {
    this.setState({
      value: this.props.value,
      label: this.props.value
    })
  }

  public render() {
    const { selectedOption } = this.state
    const { value } = this.props
    return (
      <React.Fragment>
        <Select
          onInputChange={this.handleInputChange}
          className="select"
          options={options}
          styles={customStyles}
          onChange={this.handleChange}
          value={value ? { value, label: value } : selectedOption}
          placeholder={'Select genre'}
        />
      </React.Fragment>
    )
  }

  private handleInputChange = (inputText: any) => {
    options[options.length - 1] = { value: inputText, label: inputText }
  }

  private handleChange = (selectedOption: any) => {
    this.setState({ selectedOption })
    this.props.onChange(selectedOption.value)
  }
}

export default GenrePicker
