import axios from 'redaxios'
import { bcdNetworkStr, ipfsGateway } from './config'

export async function getCached(url) {
  const key = `cacheurl-${url}`
  const result = localStorage.getItem(key)
  if (result) return JSON.parse(result)

  const res = await axios.get(url)
  localStorage.setItem(key, JSON.stringify(res.data))
  return res.data
}

export async function getTokenMetadata({ contract, tokenId }) {
  const url = `https://api.better-call.dev/v1/contract/${bcdNetworkStr}/${contract}/tokens?token_id=${tokenId}`
  const res = await getCached(url)

  try {
    const ipfs = res[0].extras['@@empty'].slice(7)
    return await getIpfsData(ipfs)
  } catch (error) {
    return {}
  }
}

export async function getIpfsData(ipfs) {
  return await getCached(`${ipfsGateway}/${ipfs}`)
}
