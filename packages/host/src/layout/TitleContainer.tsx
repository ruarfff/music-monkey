import { connect } from 'react-redux'
import IRootState from 'rootState'
import Title from './Title'

const mapStateToProps = (state: IRootState) => ({
  event: state.event.event
})

const mapDispatchToProps = {}

const TitleContainer = connect(mapStateToProps, mapDispatchToProps)(Title)

export default TitleContainer
