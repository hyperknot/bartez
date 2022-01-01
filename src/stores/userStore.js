import { action, computed, makeObservable, observable } from 'mobx'

import { bcdNetworkStr, networkType, simulateAddress, wallet } from '../config'
import { lookupDomain } from '../utils'
import { contractStore } from './contractStore'

class UserStore {
  @observable address = null
  @observable tezDomain

  constructor() {
    makeObservable(this)
  }

  @computed
  get domainOrAddress() {
    return this.tezDomain || this.address
  }

  async loadAccount() {
    const activeAccount = await wallet.client.getActiveAccount()
    if (activeAccount) {
      this.setAddress(activeAccount.address)
      this.setDomain(await lookupDomain(this.address))
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
    return `https://api.better-call.dev/v1/account/${bcdNetworkStr}/${this.address}`
  }

  @action
  setAddress(value) {
    this.address = value

    if (simulateAddress) {
      this.address = simulateAddress
    }
  }

  @action
  setDomain(value) {
    this.tezDomain = value
  }
}

export const userStore = new UserStore()
