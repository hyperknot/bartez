import { action, computed, makeObservable, observable } from 'mobx'

export class Contract {
  @observable address
  @observable tokens = []
  @observable name
  @observable expanded = false

  constructor() {
    makeObservable(this)
  }

  @action
  setName(value) {
    if (!value) return
    this.name = value
  }

  @action
  addToken(token) {
    this.tokens.push(token)
  }

  @computed
  get nameOrAddress() {
    return this.name || this.address
  }

  @action
  toggleExpanded() {
    this.expanded = !this.expanded
  }
}
