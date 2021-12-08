import { observer } from 'mobx-react'
import React from 'react'
import { userStore } from '../stores/userStore'

@observer
class SyncDiv extends React.Component {
  render() {
    return (
      <>
        {!userStore.address && (
          <div>
            not logged in,{' '}
            <button onClick={() => userStore.sync()} style={{ border: '1px solid black' }}>
              sync
            </button>
          </div>
        )}
        {userStore.address && (
          <div>
            my address: {userStore.address}{' '}
            <button onClick={() => userStore.logout()} style={{ border: '1px solid black' }}>
              logout
            </button>
          </div>
        )}
      </>
    )
  }
}

export default SyncDiv
