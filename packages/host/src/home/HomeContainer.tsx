import { connect } from 'react-redux'
import IRootState from 'rootState'
import Home from './Home'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data
})

const mapDispatchToProps = {}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
