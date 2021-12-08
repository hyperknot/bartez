import { AppContext } from '../context'

function SyncDiv() {
  return (
    <AppContext.Consumer>
      {({ myAddress, login }) => (
        <>
          {!myAddress && (
            <div>
              not logged in,{' '}
              <button onClick={login} style={{ border: '1px solid black' }}>
                login
              </button>
            </div>
          )}
          {myAddress && <div>my address: {myAddress}</div>}
        </>
      )}
    </AppContext.Consumer>
  )
}

export default SyncDiv
