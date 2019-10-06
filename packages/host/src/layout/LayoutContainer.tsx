import { connect } from 'react-redux'
import IRootState from '../rootState'
import Layout from './Layout'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  userLoading: state.user.isLoading,
  userError: state.user.error
})

const mapDispatchToProps = {}

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

export default LayoutContainer
