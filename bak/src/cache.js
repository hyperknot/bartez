export function getCachedLS(key, expirySeconds) {
  const prefixedKey = `cached-${key}`

  const storageStr = localStorage.getItem(prefixedKey)
  if (!storageStr) return null

  const storageData = JSON.parse(storageStr)

  if (!expirySeconds) {
    return storageData.data
  }

  if (!storageData.timestamp) {
    localStorage.removeItem(prefixedKey)
    return null
  }

  const diffTime = new Date().getTime() / 1000 - storageData.timestamp
  if (diffTime > expirySeconds) {
    localStorage.removeItem(prefixedKey)
    return null
  }

  return storageData.data
}

export function setCachedLS(key, data) {
  const prefixedKey = `cached-${key}`

  const newStorageData = {
    timestamp: new Date().getTime() / 1000,
    data: data,
  }

  localStorage.setItem(prefixedKey, JSON.stringify(newStorageData))
}

export function flushCachedLS() {
  for (const key of Object.keys(localStorage)) {
    if (key.startsWith('cached-')) {
      localStorage.removeItem(key)
    }
  }
}

window.flushCachedLS = flushCachedLS
