import React from 'react'
import SyncDiv from './components/sync'
import { userStore } from './stores/userStore'

class App extends React.Component {
  async componentDidMount() {
    await userStore.loadAccount()
  }

  render() {
    return (
      <div className="app">
        <h1>bartezz</h1>
        <SyncDiv />
        <h2>2. select</h2>
      </div>
    )
  }
}

export default App
