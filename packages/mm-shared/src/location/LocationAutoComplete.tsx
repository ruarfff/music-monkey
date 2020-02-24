import React from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Paper from '@material-ui/core/Paper/Paper'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import TextField from '@material-ui/core/TextField/TextField'

interface LocationAutoCompleteProps {
  placeholder: string
  value: string
  onBlur(address: string): void
  onChange(address: string): void
  onSelect(location: any): void
}

function renderInput(inputProps: any) {
  const { onChange, onBlur, onKeyDown, placeholder, value } = inputProps
  return (
    <TextField
      label="Location"
      fullWidth
      margin="normal"
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      value={value}
    />
  )
}

function renderSuggestion(
  suggestion: any,
  { query, getSuggestionItemProps }: any
) {
  const matches = match(suggestion.description, query)
  const parts = parse(suggestion.description, matches)
  const itemProps = getSuggestionItemProps(suggestion)
  return (
    <MenuItem selected={suggestion.active} component="div" key={suggestion.id}>
      <div {...itemProps}>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          )
        })}
      </div>
    </MenuItem>
  )
}

function renderSuggestionsContainer(options: any) {
  const { className, children } = options
  return (
    <Paper className={className} square>
      {children}
    </Paper>
  )
}

const LocationAutoComplete = ({
  onBlur,
  onChange,
  onSelect,
  placeholder,
  value
}: LocationAutoCompleteProps) => {
  async function handleSelect(address: string) {
    const location = await geocodeByAddress(address).then((results: any) =>
      getLatLng(results[0])
    )
    onSelect({ latLng: location, address })
  }
  return (
    <div className="LocationAutoComplete-root">
      <PlacesAutocomplete
        onChange={onChange}
        onSelect={handleSelect}
        value={value}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            {renderInput({
              ...getInputProps({
                placeholder
              }),
              onBlur
            })}

            {renderSuggestionsContainer({
              children: suggestions.map(suggestion =>
                renderSuggestion(suggestion, {
                  getSuggestionItemProps,
                  query: value
                })
              )
            })}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  )
}

export default LocationAutoComplete
