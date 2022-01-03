import { observer } from 'mobx-react'
import React from 'react'
import { tokens } from '../stores/token'

@observer
class SelectContract extends React.Component {
  render() {
    return (
      <div>
        {tokens.map((t) => (
          <SelectToken key={t.tokenId} token={t} />
        ))}
      </div>
    )
  }
}

@observer
class SelectToken extends React.Component {
  render() {
    const { token } = this.props

    return (
      <div>
        <p>name: {token.name}</p>
        <p>id: {token.tokenId}</p>
        <p>balance: {token.balance}</p>
      </div>
    )
  }
}

export default SelectContract
