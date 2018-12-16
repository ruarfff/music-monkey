import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { history, store } from './store'

import './index.scss'

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root')
)
registerServiceWorker()
