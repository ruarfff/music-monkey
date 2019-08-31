import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Paper from '@material-ui/core/Paper/Paper'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import TextField from '@material-ui/core/TextField/TextField'
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'

const styles = (theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1,
      position: 'relative'
    },
    suggestion: {
      display: 'block'
    },
    suggestionsContainerOpen: {
      left: 0,
      listStyleType: 'none',
      margin: 0,
      marginTop: theme.spacing.unit,
      padding: 0,
      position: 'absolute',
      right: 0,
      zIndex: 1
    },
    input: {
      '&:after': {
        content: 'none'
      },
      '&:before': {
        content: 'none'
      },
      '&:hover:not($disabled):before': {
        borderBottom: '1px solid #979797!important'
      },
      border: '1px solid #979797',
      borderRadius: '4px',
      minHeight: '40px',
      paddingLeft: '16px',
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    label: {
      paddingLeft: '16px',
      '&:hover:not($disabled):before': {
        borderBottom: 'none!important'
      },
      paddingTop: '4px'
    },
    formControl: {
      margin: 0
    },
    disabled: {}
  })

interface LocationAutoCompleteProps extends WithStyles<typeof styles> {
  formClass: string
  onChange?: (address: string) => void
  onSelect?: (address: string) => void
  placeholder: string
  value: string
}

function renderInput(inputProps: any, classes: any) {
  const { onChange, onBlur, onKeyDown, placeholder, value } = inputProps
  return (
    <TextField
      label="Location *"
      fullWidth
      margin="normal"
      className={classes.formControl}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      value={value}
      InputProps={{ className: classes.input }}
      InputLabelProps={{ className: classes.label }}
    />
  )
}

function renderSuggestion(
  suggestion: any,
  { query, className, getSuggestionItemProps }: any
) {
  const matches = match(suggestion.description, query)
  const parts = parse(suggestion.description, matches)
  const itemProps = getSuggestionItemProps(suggestion)
  return (
    <MenuItem
      className={className}
      selected={suggestion.active}
      component="div"
      key={suggestion.id}
    >
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
  classes,
  onChange,
  onSelect,
  placeholder,
  value,
  formClass
}: LocationAutoCompleteProps) => (
  <div className={classes.container}>
    <PlacesAutocomplete onChange={onChange} onSelect={onSelect} value={value}>
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div>
          {renderInput(
            {
              ...getInputProps({
                formClass,
                placeholder
              })
            },
            classes
          )}

          {renderSuggestionsContainer({
            children: suggestions.map(suggestion =>
              renderSuggestion(suggestion, {
                className: classes.suggestion,
                getSuggestionItemProps,
                query: value
              })
            ),
            className: classes.suggestionsContainerOpen
          })}
        </div>
      )}
    </PlacesAutocomplete>
  </div>
)

export default withStyles(styles)(LocationAutoComplete)
