import React from 'react'
import ReactDOM from 'react-dom'
import SelectContract from './components/select'
import { Token, tokens } from './stores/token'
import { configure } from 'mobx'

configure({
  enforceActions: 'never',
})

ReactDOM.render(
  <React.StrictMode>
    <SelectContract />
  </React.StrictMode>,
  document.getElementById('root')
)

for (let i = 0; i < 713; i++) {
  const token = new Token()
  token.tokenId = (Math.random() + 1).toString(36).substring(7)
  token.name = (Math.random() + 1).toString(36).substring(7)
  token.balance = 1

  tokens.push(token)
}
