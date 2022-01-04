import { observer } from 'mobx-react'
import React from 'react'
import { ipfsGateway } from '../config'
import { contractStore } from '../stores/contractStore'

@observer
class SelectDiv extends React.Component {
  render() {
    return (
      <div>
        <h2 style={{ marginBottom: 30 }}>2. select</h2>
        {contractStore.loading && <p>... loading ...</p>}
        <p>total: {contractStore.totalTokens} tokens</p>
        {Array.from(contractStore.contracts.values()).map((c) => (
          <SelectContract key={c.address} contract={c} />
        ))}
      </div>
    )
  }
}

@observer
class SelectContract extends React.Component {
  render() {
    const { contract } = this.props

    return (
      <div style={{ marginTop: 50, marginBottom: 100 }}>
        <p>{contract.name}</p>
        <div style={{ marginTop: 10, marginBottom: 30 }}>
          {contract.tokens.map((t) => (
            <SelectToken key={contract.address + '-' + t.tokenId} token={t} />
          ))}
        </div>
      </div>
    )
  }
}

@observer
class SelectToken extends React.Component {
  render() {
    const { token } = this.props
    const showImage = !contractStore.largeWallet || token.showImage

    return (
      <div style={{ display: 'flex', marginBottom: 10 }}>
        {showImage && (
          <div
            className="token-image"
            style={{
              backgroundImage: token.imageIpfs ? `url(${ipfsGateway}/${token.imageIpfs})` : null,
            }}
          />
        )}
        {!showImage && (
          <div className="token-image token-image-show" onClick={() => token.allowImage(true)}>
            ⇓
          </div>
        )}
        <div style={{ marginLeft: 10 }}>
          <p>name: {token.name}</p>
          <p>id: {token.tokenId}</p>
          <p>balance: {token.balance}</p>
        </div>
      </div>
    )
  }
}

export default SelectDiv
