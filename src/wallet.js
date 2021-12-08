import { networkType, state, wallet } from './config'

export async function getAccount() {
  const activeAccount = await wallet.client.getActiveAccount()
  if (activeAccount) {
    state.myAddress = activeAccount.address
  }
}

export async function connect() {
  const permissions = await wallet.client.requestPermissions({
    network: {
      type: networkType,
    },
  })
  console.log('New connection:', permissions.address)
}
