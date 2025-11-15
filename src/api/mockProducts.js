// Simple localStorage-backed mock product service for local demo
const STORAGE_KEY = 'mock_products_v1'

function seedIfNeeded() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) return
  const sample = new Array(12).fill(0).map((_, i) => ({
    id: (10000 + i * 1234).toString(),
    name: 'Karakou - bleu',
    productType: `FRCH-${(i + 1).toString().padStart(3,'0')}`,
    price: '2000 DA',
    fabricType: 'satin, silk, crepe',
    fabricColor: 'Black, burgundy, emerald, white...',
    threadType: '1300',
    creationTime: '2 months',
    desc: 'traditionel\nCouture , SURGER , fetla , perlage',
  }))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sample))
}

function readAll() {
  seedIfNeeded()
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch { return [] }
}

function writeAll(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export async function listProducts() {
  return Promise.resolve(readAll())
}

export async function getProduct(id) {
  const items = readAll()
  return Promise.resolve(items.find(p => p.id === String(id)) || null)
}

export async function createProduct(payload) {
  const items = readAll()
  const id = Date.now().toString().slice(-6)
  const product = { id, ...payload }
  items.unshift(product)
  writeAll(items)
  return Promise.resolve(product)
}

export async function updateProduct(id, payload) {
  const items = readAll()
  const idx = items.findIndex(p => p.id === String(id))
  if (idx === -1) return Promise.resolve(null)
  items[idx] = { ...items[idx], ...payload }
  writeAll(items)
  return Promise.resolve(items[idx])
}

export async function deleteProduct(id) {
  let items = readAll()
  items = items.filter(p => p.id !== String(id))
  writeAll(items)
  return Promise.resolve(true)
}

export default { listProducts, getProduct, createProduct, updateProduct, deleteProduct }
