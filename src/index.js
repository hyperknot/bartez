import { createAtom, computed, configure, makeObservable, observable } from 'mobx'

import { observer } from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'

configure({
  enforceActions: 'never',
})

function debounceComputed(timeoutMs, computedOptions = {}) {
  return (target, key, descriptor) => {
    if (!descriptor.get) throw new Error('debounceComputed requires a getter')

    const internalFn = descriptor.get
    let cachedValue

    return computed(computedOptions)(target, key, {
      ...descriptor,
      get: function () {
        if (cachedValue) {
          // Don't calculate until the atom pings us
          cachedValue.atom.reportObserved()
        } else {
          // Calculate and cache the result:
          cachedValue = { value: internalFn.apply(this), atom: createAtom('DebounceAtom') }

          // Batch subsequent runs for the next timeoutMs:
          setTimeout(() => {
            const { atom } = cachedValue
            cachedValue = undefined
            atom.reportChanged() // Ping subscribers to update
          }, timeoutMs)
        }
        return cachedValue.value
      },
    })
  }
}

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
