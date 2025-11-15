// Simple localStorage-backed mock tailor service for demo
const STORAGE_KEY = 'mock_tailors_v1'

function seedIfNeeded() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) return
  const sample = [
    { id: '101', name: 'Bouhafs Rim', role: 'Couture', phone: '+213623456789', address: 'Algiers', startDate: '12 Feb 2023', ccp: '00452378222', baridiMob: '007989890045', image: null },
    { id: '102', name: 'Abadelia Imad', role: 'METTAYA', phone: '+213612345678', address: 'Oran', startDate: '01 Mar 2022', ccp: '00452370011', baridiMob: '007989890046', image: null },
    { id: '103', name: 'Bouchene Meriem', role: 'SURGER', phone: '+213698765432', address: 'Annaba', startDate: '05 Jan 2021', ccp: '00452371234', baridiMob: '007989890047', image: null }
  ]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sample))
}

function readAll() {
  seedIfNeeded()
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

function writeAll(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export async function listTailors() {
  return Promise.resolve(readAll())
}

export async function getTailor(id) {
  const items = readAll()
  return Promise.resolve(items.find(t => String(t.id) === String(id)) || null)
}

export async function createTailor(payload) {
  const items = readAll()
  const id = Date.now().toString().slice(-6)
  const tailor = { id, ...payload }
  items.unshift(tailor)
  writeAll(items)
  return Promise.resolve(tailor)
}

export async function updateTailor(id, payload) {
  const items = readAll()
  const idx = items.findIndex(t => String(t.id) === String(id))
  if (idx === -1) return Promise.resolve(null)
  items[idx] = { ...items[idx], ...payload }
  writeAll(items)
  return Promise.resolve(items[idx])
}

export async function deleteTailor(id) {
  let items = readAll()
  items = items.filter(t => String(t.id) !== String(id))
  writeAll(items)
  return Promise.resolve(true)
}

export default { listTailors, getTailor, createTailor, updateTailor, deleteTailor }
