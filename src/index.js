import { action, makeObservable, observable } from 'mobx'

import { observer } from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'

function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000))
}

class TodoList {
  @observable items = []

  constructor() {
    makeObservable(this)
  }

  async fetchPages() {
    for (let i = 1; i <= 40; i++) {
      const url = `https://jsonplaceholder.typicode.com/photos?_page=${i}&_limit=50`
      const res = await fetch(url)
      const data = await res.json()
      this.addRows(data)
      await sleep(1)
    }
  }

  @action
  addRows(data) {
    for (const row of data) {
      const item = new TodoItem()
      item.id = row.id
      list.items.push(item)
    }
  }
}

class TodoItem {
  @observable id

  constructor() {
    makeObservable(this)
  }
}

@observer
class TodoListEl extends React.Component {
  render() {
    console.log('re-render TodoListEl')
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

list.fetchPages()
