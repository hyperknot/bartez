import { NetworkType } from '@airgap/beacon-sdk'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { TezosToolkit } from '@taquito/taquito'

const usingTestnet = false
export const ipfsGateway = 'https://ipfs.io/ipfs'
// export const ipfsGateway = 'https://cloudflare-ipfs.com/ipfs'

export let simulateAddress
// simulateAddress = 'tz1WEgnR7fKQM78ttbCnQvBw87QfM4Jimnkz'
// simulateAddress = 'tz1NiPbBSbbTA2vP5fNN4mBfU1oFVPF9PAEn'
// simulateAddress = 'tz1KySTBB8RXWVraggfXWLaLR9H3K3JBEbgt'

export let rpcUrl, networkType, bcdNetworkStr

if (usingTestnet) {
  rpcUrl = 'https://rpc.hangzhounet.teztnets.xyz'
  networkType = NetworkType.HANGZHOUNET
  bcdNetworkStr = 'hangzhounet'
} else {
  rpcUrl = 'https://mainnet.api.tez.ie'
  networkType = NetworkType.MAINNET
  bcdNetworkStr = 'mainnet'
}

export const Tezos = new TezosToolkit(rpcUrl)
export const wallet = new BeaconWallet({ name: 'Bartez' })
Tezos.setWalletProvider(wallet)
