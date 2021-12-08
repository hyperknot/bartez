import React from 'react'
import ReactDOM from 'react-dom'
import './scss/stylesheet.scss'
import App from './app'

if (
  !new (class {
    x
  })().hasOwnProperty('x')
)
  throw new Error('Transpiler is not configured correctly')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
