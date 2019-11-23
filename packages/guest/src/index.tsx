import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { history, store } from './store'

import './index.scss'

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root')
)
serviceWorker.unregister()
