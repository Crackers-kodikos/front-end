import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../component/Sidebar'
import ConfirmModal from '../component/ConfirmModal'

export default function OrderDetail() {
  const navigate = useNavigate()
  const [completed, setCompleted] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleComplete = () => {
    // open modal instead of native confirm
    setShowConfirm(true)
  }

  const confirmComplete = () => {
    setShowConfirm(false)
    setCompleted(true)
    // show a small success toast then navigate back to orders
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      navigate('/orders')
    }, 1800)
    // In a real app call API here to persist the change and handle errors
  }

  const cancelComplete = () => setShowConfirm(false)

  return (
    <div className="min-h-screen bg-[#F6F6EE] font-poppins flex" style={{ fontFamily: 'Poppins' }}>
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="bg-white rounded p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/orders')} className="px-3 py-2 rounded bg-[#EAF4ED] text-[#2f6b4d]">←</button>
              <h2 className="text-lg font-semibold text-[#2f6b4d]">Order #10928</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">21 - 03 - 2025</div>
              {!completed ? (
                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded">In progress</div>
              ) : (
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded">Completed</div>
              )}
              <button className="px-3 py-1 border rounded text-sm">Export as pdf</button>
            </div>
          </div>
        </div>

          <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold">Order file details</h3>
          <div className="mt-4">
            <button disabled={completed} className={`px-4 py-2 ${completed ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-[#3F6E57] text-white'} rounded`}>view the file →</button>
          </div>
        </div>

        <section className="bg-white rounded shadow-sm p-6 mb-6">
          <h4 className="text-green-700 font-semibold mb-4">Product</h4>

          <div className="grid grid-cols-12 gap-4 items-start mb-4 text-sm text-gray-600">
            <div className="col-span-3 flex items-start gap-4">
              <img src="/src/assets/6b6752ac8194e5ebad81c81e4fc1695cf9c39259.jpg" alt="product" className="w-20 h-20 object-cover rounded" />
              <div>
                <div className="font-semibold">Karakou - bleu</div>
                <div className="text-xs text-gray-500">traditionel</div>
                <div className="text-xs text-gray-400 mt-1">Couture , SURGER , fetla , perlage</div>
              </div>
            </div>

            <div className="col-span-3"></div>
            <div className="col-span-2 text-center">FRCH-001</div>
            <div className="col-span-2 text-center">Karakou</div>
            <div className="col-span-2 text-right font-semibold">2000 DA</div>
          </div>

          <hr className="border-t border-dashed border-[#E8E8E4] my-4" />

          <div className="grid grid-cols-12 gap-4 items-center mb-4">
            <div className="col-span-4">
              <div className="text-xs text-gray-500">Total price</div>
              <input disabled={completed} className="mt-2 w-full p-2 rounded bg-[#F8F8F6] text-sm" defaultValue="1 000 000 DA" />
            </div>
            <div className="col-span-4">
              <div className="text-xs text-gray-500">Date started</div>
              <input disabled={completed} className="mt-2 w-full p-2 rounded bg-[#F8F8F6] text-sm" defaultValue="21 - 03 - 2025" />
            </div>
            <div className="col-span-4">
              <div className="text-xs text-gray-500">Date ended</div>
              <input disabled={completed} className="mt-2 w-full p-2 rounded bg-[#F8F8F6] text-sm" placeholder="-- -- ----" />
            </div>
          </div>

          <hr className="border-t border-dashed border-[#E8E8E4] my-4" />

          <div className="flex items-center justify-between">
            <h5 className="text-green-700 font-semibold">Components</h5>
            <button className="px-3 py-1 border rounded text-sm">add component +</button>
          </div>

          <div className="grid grid-cols-5 gap-4 mt-4">
            {['Couture','Surger','Mettaya','Khait','Hedid Aumballage'].map((c) => (
              <div key={c}>
                <div className="text-xs text-gray-500">{c}</div>
                <input disabled={completed} className="mt-2 w-full p-2 rounded bg-[#F8F8F6] text-sm" placeholder="---- DA" />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <h5 className="text-green-700 font-semibold">Assigned tailor</h5>
              <div className="flex items-center gap-3 mt-3">
                <img src="/src/assets/user-placeholder.png" alt="tailor" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold">Bouhafs Rim</div>
                  <div className="text-xs text-gray-500">Couture , surger , perlage</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <button className="px-3 py-1 border rounded text-sm">view tailor →</button>
              <button
                onClick={() => { if (!completed) handleComplete() }}
                disabled={completed}
                className={`px-4 py-2 rounded ${completed ? 'bg-green-600 text-white cursor-default' : 'bg-[#EAF4ED] text-[#3F6E57]'}`}>
                the order is completed ✓
              </button>
            </div>
          </div>
        </section>

          <ConfirmModal
          open={showConfirm}
          title="Are you sure the order is finished ?"
          message="the boutique will be notified"
          onCancel={cancelComplete}
          onConfirm={confirmComplete}
        />

          {/* Success toast */}
          {showSuccess && (
            <div className="fixed top-6 right-6 z-50">
              <div className="bg-white border border-green-200 text-green-700 px-4 py-3 rounded shadow">Order marked as completed</div>
            </div>
          )}

      </main>
    </div>
  )
}
