import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from '../rootState'
import Home from './Home'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data,
  userLoading: state.user.isLoading,
  userError: state.user.error,
  locationPath: state.home.location
})

const mapDispatchToProps = {}

const HomeContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Home)
)

export default HomeContainer
