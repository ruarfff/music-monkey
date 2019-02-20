import { connect } from 'react-redux'
import IRootState from '../rootState'

import Stepper from './Stepper'

const mapStateToProps = (state: IRootState) => ({
    firstAuthenticated: state.auth.firstAuthenticated
})

const StepperContainer = connect(
  mapStateToProps,
  null
)(Stepper)

export default StepperContainer
