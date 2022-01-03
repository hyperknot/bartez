import { configure, makeObservable, observable } from 'mobx'

import { observer } from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'

configure({
  enforceActions: 'never',
})

@observer
class List extends React.Component {
  render() {
    return (
      <div style={{ wordWrap: 'break-word' }}>
        {items.map((i) => (
          <ItemEl key={i.id} item={i} />
        ))}
      </div>
    )
  }
}

function ItemEl(props) {
  return props.item.id + ' '
}

export class Item {
  @observable id

  constructor() {
    makeObservable(this)
  }
}

export const items = observable.array()

ReactDOM.render(
  <React.StrictMode>
    <List />
  </React.StrictMode>,
  document.getElementById('root')
)

for (let i = 0; i < 1000; i++) {
  const item = new Item()
  item.id = i
  items.push(item)
}
