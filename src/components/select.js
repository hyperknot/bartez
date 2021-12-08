import { observer } from 'mobx-react'
import React from 'react'
import { contractStore } from '../stores/contractStore'

@observer
class SelectDiv extends React.Component {
  render() {
    return (
      <div>
        <h2>2. select</h2>
        {contractStore.loading && '... loading ...'}
      </div>
    )
  }
}

export default SelectDiv
