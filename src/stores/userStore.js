import { action, makeObservable, observable } from 'mobx'

import { networkType, simulateAddress, wallet } from '../config'
import { contractStore } from './contractStore'

class UserStore {
  @observable address = null

  constructor() {
    makeObservable(this)
  }

  async loadAccount() {
    const activeAccount = await wallet.client.getActiveAccount()
    if (activeAccount) {
      this.setAddress(activeAccount.address)
      await contractStore.loadBalances()
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

    // await contractStore.loadBalances()
  }

  async unsync() {
    await wallet.clearActiveAccount()
    this.address = null
  }

  get bcdAccountUrl() {
    return 'https://api.better-call.dev/v1/account/mainnet/' + this.address
  }

  @action
  setAddress(value) {
    this.address = value

    if (simulateAddress) {
      this.address = simulateAddress
    }
  }
}

export const userStore = new UserStore()
