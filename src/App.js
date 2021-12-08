import React from 'react'
import SyncDiv from './components/sync'
import { userStore } from './stores/userStore'

class App extends React.Component {
  async componentDidMount() {
    await userStore.loadAccount()
  }

  render() {
    return (
      <div>
        1. sync <SyncDiv />
      </div>
    )
  }
}

export default App
