import { connect } from 'react-redux'
import IRootState from '../../rootState'
import { shareByEmails } from '../../shareEvent/shareActions'
import ShareEventByEmail from './ShareEventByEmail'

const mapStateToProps = (state: IRootState) => ({})

const mapDispatchToProps = { shareByEmails }

const ShareEventByEmailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareEventByEmail)

export default ShareEventByEmailContainer
