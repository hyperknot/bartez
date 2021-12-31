import axios from 'redaxios'
import { bcdNetworkStr, ipfsGateway } from './config'
import { getCachedLS, setCachedLS } from './cache'

export async function getCachedURL(url, expirySeconds) {
  const cached = getCachedLS(url, expirySeconds)
  if (cached) return cached

  const res = await axios.get(url)
  setCachedLS(url, res.data)
  return res.data
}

export async function getTokenMetadata({ contract, tokenId }) {
  const url = `https://api.better-call.dev/v1/contract/${bcdNetworkStr}/${contract}/tokens?token_id=${tokenId}`
  const res = await getCachedURL(url)

  try {
    const ipfs = res[0].extras['@@empty'].slice(7)
    return await getIpfsData(ipfs)
  } catch (error) {
    return {}
  }
}

export async function getIpfsData(ipfs) {
  return await getCachedURL(`${ipfsGateway}/${ipfs}`)
}
