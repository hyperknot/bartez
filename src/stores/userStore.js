import { makeObservable, observable } from 'mobx'

import { networkType, wallet } from '../config'

class UserStore {
  @observable address = null

  constructor() {
    makeObservable(this)
  }

  async loadAccount() {
    const activeAccount = await wallet.client.getActiveAccount()
    if (activeAccount) {
      this.address = activeAccount.address
    }
  }

  async sync() {
    try {
      const permissions = await wallet.client.requestPermissions({
        network: {
          type: networkType,
        },
      })
      console.log('New connection:', permissions.address)
      this.address = permissions.address
    } catch (error) {
      alert('Error syncing')
      console.error(error)
    }
  }

  async logout() {
    await wallet.clearActiveAccount()
    this.address = null
  }
}

export const userStore = new UserStore()
