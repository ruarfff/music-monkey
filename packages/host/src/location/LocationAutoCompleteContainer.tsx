import { connect } from 'react-redux'
import LocationAutoComplete from './LocationAutoComplete'
import { locationChanged, locationSelected } from '../event/eventActions'

const mapDispatchToProps = {
  onChange: locationChanged,
  onSelected: locationSelected
}

const LocationAutoCompleteContainer = connect(
  {} as any,
  mapDispatchToProps
)(LocationAutoComplete)

export default LocationAutoCompleteContainer
