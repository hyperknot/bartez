import React from 'react'
import SelectDiv from './components/select'
import SyncDiv from './components/sync'
import { userStore } from './stores/userStore'

class App extends React.Component {
  async componentDidMount() {
    await userStore.loadAccount()
  }

  render() {
    return (
      <div className="app">
        <h1>bartez</h1>
        <SyncDiv />
        <SelectDiv />
      </div>
    )
  }
}

export default App
