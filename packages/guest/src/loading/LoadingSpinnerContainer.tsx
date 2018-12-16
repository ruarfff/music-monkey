import { connect } from 'react-redux'
import IRootState from '../rootState'

import LoadingSpinne from './LoadingSpinner'

const mapStateToProps = (state: IRootState) => ({
  showSpinner: state.active.showSpinner
})

const LoadingSpinneContainer = connect(mapStateToProps)(LoadingSpinne as any)

export default LoadingSpinneContainer
