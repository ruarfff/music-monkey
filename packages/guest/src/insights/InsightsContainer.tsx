import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import IRootState from 'rootState'
import Insights from './Insights'

const mapStateToProps = (state: IRootState) => ({})

const mapDispatchToProps = {}

const InsightsContainer = connect(mapStateToProps, mapDispatchToProps)(Insights)

export default withRouter(InsightsContainer)
