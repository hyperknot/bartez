import { configure, makeObservable, observable } from 'mobx'

import { observer } from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'

configure({
  enforceActions: 'never',
})

export class TodoList {
  @observable items = []

  constructor() {
    makeObservable(this)
  }
}

export class TodoItem {
  @observable id

  constructor() {
    makeObservable(this)
  }
}

@observer
class TodoListEl extends React.Component {
  render() {
    return (
      <div style={{ wordWrap: 'break-word' }}>
        {list.items.map((i) => (
          <TodoItemEl key={i.id} item={i} />
        ))}
      </div>
    )
  }
}

function TodoItemEl(props) {
  return props.item.id + ' '
}

const list = new TodoList()

ReactDOM.render(
  <React.StrictMode>
    <TodoListEl />
  </React.StrictMode>,
  document.getElementById('root')
)

for (let i = 0; i < 1000; i++) {
  const item = new TodoItem()
  item.id = i
  list.items.push(item)
}
