import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../component/Sidebar'
import ConfirmModal from '../component/ConfirmModal'
import * as mockProducts from '../api/mockProducts'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    let mounted = true
    mockProducts.getProduct(id).then(p => { if (mounted) setProduct(p) })
    return () => { mounted = false }
  }, [id])

  if (!product) return (
    <div className="min-h-screen bg-[#F6F6EE] font-poppins flex" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />
      <main className="flex-1 p-8">Loading…</main>
    </div>
  )

  const handleDelete = () => setConfirmOpen(true)
  const cancelDelete = () => setConfirmOpen(false)
  const confirmDelete = async () => {
    setConfirmOpen(false)
    await mockProducts.deleteProduct(id)
    navigate('/products')
  }

  return (
    <div className="min-h-screen bg-[#F6F6EE] font-poppins flex" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="bg-white rounded p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/products')} className="px-3 py-2 rounded bg-[#EAF4ED] text-[#2f6b4d]">←</button>
              <h2 className="text-lg font-semibold text-[#2f6b4d]">{product.name}</h2>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => navigate(`/products/${id}/edit`)} className="px-3 py-1 border rounded text-sm text-[#2f6b4d]">Edit product ✎</button>
              <button onClick={handleDelete} className="px-3 py-1 text-red-600">🗑</button>
            </div>
          </div>
        </div>

        <section className="bg-white rounded shadow-sm p-6 mb-6">
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-3">
              <img src={product.image || '/src/assets/6b6752ac8194e5ebad81c81e4fc1695cf9c39259.jpg'} alt="product" className="w-full rounded" />
              {product.image && (
                <div className="mt-2">
                  <button onClick={async () => { await mockProducts.updateProduct(id, { image: null }); setProduct(await mockProducts.getProduct(id)) }} className="px-3 py-1 border rounded text-sm text-red-600">Remove image</button>
                </div>
              )}
            </div>
            <div className="col-span-9">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Product Type</div>
                  <div className="mt-2 p-3 rounded bg-[#F8F8F6]">{product.productType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Price:</div>
                  <div className="mt-2 p-3 rounded bg-[#F8F8F6]">{product.price}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Fabric Type</div>
                  <div className="mt-2 p-3 rounded bg-[#F8F8F6]">{product.fabricType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Thread Type Used</div>
                  <div className="mt-2 p-3 rounded bg-[#F8F8F6]">{product.threadType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Fabric Color</div>
                  <div className="mt-2 p-3 rounded bg-[#F8F8F6]">{product.fabricColor}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Creation Time:</div>
                  <div className="mt-2 p-3 rounded bg-[#F8F8F6]">{product.creationTime}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ConfirmModal open={confirmOpen} title="Are you sure you want to delete this product ?" message="This action cannot be undone" onCancel={cancelDelete} onConfirm={confirmDelete} />
      </main>
    </div>
  )
}
