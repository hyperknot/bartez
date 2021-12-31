import axios from 'redaxios'
import { bcdNetworkStr, ipfsGateway } from './config'

export async function getCached(url, expirySeconds) {
  const key = `cacheurl-${url}`
  const storageStr = localStorage.getItem(key)

  if (storageStr) {
    const oldStorageData = JSON.parse(storageStr)
    if (oldStorageData.timestamp) {
      const diffTime = new Date().getTime() / 1000 - oldStorageData.timestamp
      if (expirySeconds === -1 || (diffTime > 0 && diffTime < expirySeconds)) {
        return oldStorageData.data
      }
    }
  }

  const res = await axios.get(url)

  const newStorageData = {
    timestamp: new Date().getTime() / 1000,
    data: res.data,
  }

  localStorage.setItem(key, JSON.stringify(newStorageData))
  return res.data
}

export async function getTokenMetadata({ contract, tokenId }) {
  const url = `https://api.better-call.dev/v1/contract/${bcdNetworkStr}/${contract}/tokens?token_id=${tokenId}`
  const res = await getCached(url, -1)

  try {
    const ipfs = res[0].extras['@@empty'].slice(7)
    return await getIpfsData(ipfs)
  } catch (error) {
    return {}
  }
}

export async function getIpfsData(ipfs) {
  return await getCached(`${ipfsGateway}/${ipfs}`, -1)
}
