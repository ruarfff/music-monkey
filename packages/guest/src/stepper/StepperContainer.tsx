import { connect } from 'react-redux'
import IRootState from '../rootState'

import Stepper from './Stepper'

const mapStateToProps = (state: IRootState) => ({
  firstAuthenticated: state.auth.firstAuthenticated
})

const mapDispatchToProps = {}

const StepperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stepper)

export default StepperContainer
