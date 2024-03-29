import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from './rootReducer'
import rootSaga from './rootSaga'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

const isDevBuild = process.env.NODE_ENV !== 'production'

const rootMiddleWares = [sagaMiddleware, routerMiddleware(history)]

const middleware = isDevBuild
  ? [...rootMiddleWares, reduxImmutableStateInvariant()]
  : rootMiddleWares

if (isDevBuild) {
  ;(Map.prototype as any).toJSON = function() {
    return JSON.parse(JSON.stringify([...this]))
  }
}

const composeEnhancer: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  createRootReducer(history),
  undefined,
  composeEnhancer(applyMiddleware(...middleware))
)
sagaMiddleware.run(rootSaga)
