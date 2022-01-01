import { observer } from 'mobx-react'
import React from 'react'
import { userStore } from '../stores/userStore'

@observer
class SyncDiv extends React.Component {
  render() {
    return (
      <div>
        <h2 style={{ display: 'flex', justifyContent: 'space-between' }}>
          <>
            {!userStore.address && (
              <div>
                1. <button onClick={() => userStore.sync()}>sync</button>
              </div>
            )}
            {userStore.address && (
              <>
                <div>1. sync</div>
                <span onClick={() => userStore.unsync()}>unsync</span>
              </>
            )}
          </>
        </h2>
        {!userStore.address && <p>not logged in</p>}
        {userStore.address && <p>address: {userStore.domainOrAddress}</p>}
      </div>
    )
  }
}

export default SyncDiv
