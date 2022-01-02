import { configure } from 'mobx'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import './scss/stylesheet.scss'

if (
  !new (class {
    x
  })().hasOwnProperty('x')
)
  throw new Error('Transpiler is not configured correctly')

configure({
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  // observableRequiresReaction: true,
  disableErrorBoundaries: true,
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
