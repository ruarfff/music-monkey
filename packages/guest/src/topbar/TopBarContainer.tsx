import { withCookies } from 'react-cookie'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { logout } from '../auth/authActions'
import IRootState from '../rootState'
import TopBar from './TopBar'

const mapStateToProps = (state: IRootState) => ({
  user: state.user.data
})

const mapDispatchToProps = { logout }

const TopBarContainer = withCookies(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(TopBar)
  )
)

export default TopBarContainer
