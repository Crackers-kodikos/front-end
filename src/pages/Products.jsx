import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../component/Sidebar'
import ConfirmModal from '../component/ConfirmModal'
import * as mockProducts from '../api/mockProducts'

const SAMPLE = new Array(9).fill(0).map((_, i) => ({
  id: 10000 + i * 1234,
  name: 'Karakou - bleu',
  desc: 'traditionel\nCouture , SURGER , fetla , perlage',
  price: '2000 DA'
}))

export default function Products() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [deleting, setDeleting] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    mockProducts.listProducts().then(list => { if (mounted) setProducts(list) })
    return () => { mounted = false }
  }, [])

  const refresh = async () => setProducts(await mockProducts.listProducts())

  const handleDelete = (id) => {
    setDeleting(id)
    setConfirmOpen(true)
  }

  const confirmDelete = async () => {
    setConfirmOpen(false)
    if (!deleting) return
    await mockProducts.deleteProduct(deleting)
    setDeleting(null)
    refresh()
  }

  const cancelDelete = () => { setDeleting(null); setConfirmOpen(false) }

  return (
    <div className="min-h-screen bg-[#F6F6EE] font-poppins flex" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="flex items-center flex gap-90  mb-6">
          <h1 className="text-2xl font-semibold text-[#1F6A4A]">Products</h1>
          <div className="flex items-center justify-between gap-160 ">
            <div className="bg-white px-3 py-2 rounded shadow-sm flex items-center gap-2  align-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="#6B6B6B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <input placeholder="Search" className="outline-none text-sm" />
            </div>
            <div className="text-sm text-gray-600">Youcef Bouhafs<br/><span className="text-xs text-gray-400">Admin</span></div>
          </div>
        </header>

        <div className="mb-6">
          <div className="bg-white p-4 rounded shadow-sm flex items-center justify-between">
            <div className="text-sm text-[#6B6B6B]">Total products : <span className="font-semibold text-[#3F6E57]">120</span></div>

            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/orders/new')} className="px-3 py-2 border rounded text-sm">Create an order +</button>
              <button onClick={() => navigate('/products/new')} className="px-3 py-2 bg-[#3F6E57] text-white rounded text-sm">Add new product +</button>
            </div>
          </div>
        </div>

        <section className="bg-white rounded shadow-sm p-4">
          <div className="grid grid-cols-12 gap-4 items-center text-xs text-gray-500 font-medium pb-3 border-b border-[#F0F0EA]">
            <div className="col-span-6">Image<br/><span className="text-xs text-gray-400">name - couleur</span></div>
            <div className="col-span-2 text-center">id</div>
            <div className="col-span-2 text-right">price</div>
            <div className="col-span-2"></div>
          </div>

          <div className="mt-3 max-h-[60vh] overflow-y-auto">
            {products.map((p) => (
              <div key={p.id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
                <div className="flex items-start gap-4 flex-1">
                  <img src={p.image || '/src/assets/6b6752ac8194e5ebad81c81e4fc1695cf9c39259.jpg'} alt="product" className="w-20 h-20 object-cover rounded" />
                  <div>
                    <div className="font-semibold text-sm">{p.name}</div>
                    <div className="text-xs text-gray-500 whitespace-pre-line">{p.desc}</div>
                  </div>
                </div>

                <div className="w-28 text-center text-sm text-gray-700">{p.id}</div>
                <div className="w-28 text-center text-sm font-semibold">{p.price}</div>

                <div className="w-36 flex items-center justify-end gap-4">
                  <button aria-label="edit" onClick={() => navigate(`/products/${p.id}/edit`)} className="text-green-600 hover:text-green-700 text-lg">✎</button>
                  <button aria-label="delete" onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-700 text-lg">🗑</button>
                  <button onClick={() => navigate(`/products/${p.id}`)} className="w-8 h-8 rounded bg-white border text-[#3F6E57]">→</button>
                </div>
              </div>
            ))}
          </div>
          <ConfirmModal open={confirmOpen} title="Are you sure you want to delete this product ?" message="This action cannot be undone" onCancel={cancelDelete} onConfirm={confirmDelete} />
        </section>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <div>‹ Previous</div>
          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map(n => (
              <div key={n} className={`px-3 py-1 rounded ${n===1? 'bg-[#3F6E57] text-white' : 'bg-white'}`}>{n}</div>
            ))}
            <div>Next ›</div>
          </div>
        </div>

      </main>
    </div>
  )
}
