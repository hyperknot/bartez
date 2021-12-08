import { makeObservable, observable } from 'mobx'
import { userStore } from './userStore'
import axios from 'redaxios'

class ContractStore {
  @observable contracts = []
  @observable loading = false

  constructor() {
    makeObservable(this)
  }

  async loadBalances() {
    try {
      this.loading = true
      const res = await axios.get(
        userStore.bcdAccountUrl + '/token_balances?size=50&offset=0&hide_empty=true'
      )
      this.loading = false
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }
}

export const contractStore = new ContractStore()
